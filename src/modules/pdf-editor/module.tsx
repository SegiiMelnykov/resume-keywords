'use client';

import { ParsedPDF } from '@/utilities/parse-pdf';
import { Dispatch, SetStateAction } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Для стилей редактора

type Props = {
  pdfFile: File | null;
  setPdfFile: Dispatch<SetStateAction<File | null>>;
  pages: number | undefined;
  pdfData: ParsedPDF | null;
};

export function PdfEditor({ pdfFile, pages, setPdfFile, pdfData }: Props) {
  if (!pdfData?.text) return null;
  console.log(pdfData?.text);
  return (
    <div className='min-w-[75%]'>
      <h2 className='font-bold text-xl'>Edit that to improve</h2>
      <ReactQuill value={pdfData.text} />
    </div>
  );
}
