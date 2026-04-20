const clientToken = import.meta.env.VITE_PAYMENTS_CLIENT_TOKEN as string | undefined;

export function PaymentTestModeBanner() {
  if (!clientToken?.startsWith("pk_test_")) return null;
  return (
    <div className="w-full bg-amber-100 border-b border-amber-300 px-4 py-2 text-center text-xs text-amber-900">
      Testa režīms — maksājumi netiek apstrādāti reāli. Lieto karti{" "}
      <code className="font-mono">4242 4242 4242 4242</code>.
    </div>
  );
}
