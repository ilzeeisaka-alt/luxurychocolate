import { sendTemplateEmail } from './transactional-email-templates/send-email.ts';
import { canSendOrderDocuments } from './order-document-access.ts';

export async function sendOrderDocuments(db: any, orderId: string, requesterId?: string, event = 'confirmed') {
  const { data: order, error } = await db.from('orders').select('id,user_id,order_number,customer_email,customer_name,total_cents,currency,status,order_items(product_name,quantity)').eq('id', orderId).maybeSingle();
  if (error || !order || !canSendOrderDocuments(requesterId, order.user_id, Boolean(requesterId))) throw new Error('Order not available');
  if (!order.customer_email || !order.order_items?.length) throw new Error('Order is incomplete');
  const invoiceType = ['pending', 'cancelled'].includes(order.status) ? 'proforma' : 'invoice';
  return await sendTemplateEmail('order-documents', order.customer_email, {
    templateData: {
      orderNumber: order.order_number,
      customerName: order.customer_name,
      total: new Intl.NumberFormat('lv-LV', { style: 'currency', currency: order.currency }).format(order.total_cents / 100),
      items: order.order_items,
      invoiceUrl: `https://luxurychocolate.lv/account/orders/${order.id}?type=${invoiceType}`,
      visualizationUrl: `https://luxurychocolate.lv/account/orders/${order.id}?type=visualization`,
    },
    idempotencyKey: `order-documents-${event}-${order.id}`,
  });
}
