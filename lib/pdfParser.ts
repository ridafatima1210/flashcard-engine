// Uses pdf.js via dynamic import (avoid SSR issues)

export async function extractTextFromPDF(file: File): Promise<string> {
  if (!file || file.type !== 'application/pdf') {
    throw new Error('File must be a PDF');
  }

  if (file.size > 20 * 1024 * 1024) {
    throw new Error('PDF must be under 20MB');
  }

  const arrayBuffer = await file.arrayBuffer();

  const pdfjsLib = await import('pdfjs-dist');

  // ✅ FIX: correct worker path
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

  let pdf;
  try {
    pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  } catch {
    throw new Error('Failed to read PDF. Try another file.');
  }

  if (!pdf || pdf.numPages === 0) {
    throw new Error('This PDF appears to be empty.');
  }

  const maxPages = Math.min(pdf.numPages, 50); // limit for performance
  const pageTexts: string[] = [];

  for (let i = 1; i <= maxPages; i++) {
    try {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();

      const text = (content.items as Array<{ str: string }>)
        .map(item => item.str)
        .join(' ');

      pageTexts.push(text);
    } catch {
      console.warn(`Skipping page ${i}`);
    }
  }

  const fullText = pageTexts.join('\n\n').trim();

  if (fullText.length < 100) {
    throw new Error(
      'No readable text found. Use a text-based PDF (not scanned images).'
    );
  }

  // ✅ CLEAN TEXT (important for AI quality)
  const cleaned = fullText
    .replace(/\s+/g, ' ')          // remove extra spaces
    .replace(/[\u0000-\u001F]/g, '') // remove weird chars
    .trim();

  // ✅ LIMIT TOKENS (~12k words)
  const words = cleaned.split(/\s+/);
  const truncated = words.slice(0, 12000).join(' ');

  return truncated;
}