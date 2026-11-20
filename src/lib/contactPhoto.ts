export const CONTACT_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];
export function isContactPhotoType(type: string) {
  return CONTACT_PHOTO_TYPES.includes(type);
}

export async function prepareContactPhoto(file: File): Promise<Blob> {
  if (!isContactPhotoType(file.type)) throw new Error("Izvēlieties JPG, PNG vai WebP foto.");
  const bitmap = await createImageBitmap(file);
  try {
    const scale = Math.min(1, 1000 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Neizdevās sagatavot foto.");
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    return await new Promise<Blob>((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error("Neizdevās sagatavot foto.")), "image/png"));
  } finally { bitmap.close(); }
}