const isPDF = async (file: File) => {
  if (!file.name.endsWith('.pdf')) return false;

  const buffer = Buffer.from(await file.arrayBuffer());
  if (buffer.slice(0, 4).toString() !== '%PDF') return false;

  const bufferString = buffer.toString();
  if (
    !bufferString.includes('/Catalog') ||
    !bufferString.includes('/Pages') ||
    !bufferString.includes('xref')
  )
    return false;

  const eof = buffer.slice(-6).toString();
  if (!eof.includes("%%EOF")) return false;

  return true;
};

export { isPDF };
