import { ParsedPDF } from '@/utilities/parse-pdf';

type Props = {
  pdfData: ParsedPDF | null;
};

export function PdfEditor({ pdfData }: Props) {
  return (
    <div className='min-w-[75%]'>
      <h2 className='font-bold text-xl'>Edit that to improve</h2>
      <div>editor</div>
    </div>
  );
}
