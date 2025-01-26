'use client';

import { Dispatch, SetStateAction } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // For the editor styles

type Props = {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
};

export function PdfEditor({ text, setText }: Props) {
  if (!text) return null;

  return (
    <div className='min-w-[65%]'>
      <h2 className='font-bold text-xl'>Edit that to improve</h2>
      <ReactQuill value={text} onChange={setText} theme='snow' />
    </div>
  );
}
