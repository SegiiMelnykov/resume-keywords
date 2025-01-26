'use client';

import { Dispatch, SetStateAction } from 'react';
import { Page, pdfjs, Document } from 'react-pdf';

type Props = {
  pdfFile: File | null;
  setPdfFile: Dispatch<SetStateAction<File | null>>;
  pages: number | undefined;
};

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export function PdfEditor({ pdfFile, pages, setPdfFile }: Props) {
  if (!pdfFile) return null;
  return (
    <div className='min-w-[75%]'>
      <h2 className='font-bold text-xl'>Edit that to improve</h2>
      <Document file={pdfFile} renderMode='canvas'>
        {pages &&
          Array.from({ length: pages }, (_, index) => (
            <Page
              key={index}
              pageNumber={index + 1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          ))}
      </Document>
    </div>
  );
}
