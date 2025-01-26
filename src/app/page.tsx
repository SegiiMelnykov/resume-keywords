'use client';

import { WordEntriesTable } from '@/modules/entries-table';
import { PdfEditor } from '@/modules/pdf-editor';
import { PdfParser } from '@/modules/pdf-parser';
import { ParsedPDF, parsePDF } from '@/utilities/parse-pdf';

import { useEffect, useState } from 'react';

export default function Home() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfData, setPdfData] = useState<ParsedPDF | null>(null);
  const [text, setText] = useState<string>('');

  const handleParseFile = async (file: File) => {
    try {
      const parsedPdf = await parsePDF(URL.createObjectURL(file));
      setPdfData(parsedPdf);
      setText(parsedPdf.html);
    } catch (error) {
      console.error('Error parsing PDF:', error);
    }
  };

  useEffect(() => {
    if (pdfFile) {
      handleParseFile(pdfFile);
    }
  }, [pdfFile]);
  return (
    <div className='min-h-screen p-8 pb-20 gap-16'>
      <main className='flex flex-col items-start justify-start gap-6'>
        <div className='flex flex-col gap-1'>
          <h1 className='font-bold text-xl'>Key Analyzer </h1>
          <PdfParser setPdfFile={setPdfFile} />
        </div>
        <div className='flex gap-4 w-full'>
          <PdfEditor text={text} setText={setText} />
          <WordEntriesTable text={text} />
        </div>
      </main>
    </div>
  );
}
