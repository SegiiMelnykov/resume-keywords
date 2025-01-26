import * as pdfjsLib from 'pdfjs-dist';
import { GlobalWorkerOptions, PDFDocumentProxy } from 'pdfjs-dist';
import { TextItem } from 'pdfjs-dist/types/src/display/api';

// Set the worker source for Turbopack
GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

// Type definition for the extracted PDF text
export interface ParsedPDF {
  text: string;
  pageCount: number;
}

// Function to parse a PDF and extract text
export async function parsePDF(pdfUrl: string): Promise<ParsedPDF> {
  try {
    const pdf: PDFDocumentProxy = await pdfjsLib.getDocument(pdfUrl).promise;

    let extractedText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items
        .map((item) => (item as TextItem).str)
        .join(' ');
      extractedText += pageText + '\n';
    }

    return {
      text: extractedText,
      pageCount: pdf.numPages,
    };
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw new Error('Failed to parse PDF');
  }
}
