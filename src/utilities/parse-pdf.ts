import * as pdfjsLib from 'pdfjs-dist';
import { GlobalWorkerOptions, PDFDocumentProxy } from 'pdfjs-dist';
import { TextItem } from 'pdfjs-dist/types/src/display/api';

// Set the worker source for Turbopack
GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

// Type definition for the extracted PDF text with HTML formatting
export interface ParsedPDF {
  html: string;
  pageCount: number;
}

// Function to parse a PDF and extract text with basic styling
export async function parsePDF(pdfUrl: string): Promise<ParsedPDF> {
  try {
    const pdf: PDFDocumentProxy = await pdfjsLib.getDocument(pdfUrl).promise;

    let extractedHtml = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();

      let pageHtml = '';

      // Iterate through text items to extract text and basic styles
      for (const item of content.items) {
        const textItem = item as TextItem;
        if (textItem.height === 9) {
          continue;
        }
        // Extract font size and color
        const fontSize = textItem.transform ? textItem.transform[0] : 12; // Example: extract font size

        // Wrap the text item in a span with styles
        pageHtml += `<p style="font-size: ${fontSize}px;">${textItem.str}</p>`;

        // Check if the text item is followed by a line-break
        if (textItem.hasEOL) {
          pageHtml += '<p></p>';
        }
      }

      extractedHtml += pageHtml;
    }

    return {
      html: extractedHtml,
      pageCount: pdf.numPages,
    };
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw new Error('Failed to parse PDF');
  }
}
