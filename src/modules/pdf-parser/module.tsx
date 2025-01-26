'use client';

type Props = {
  setPdfFile: (data: File | null) => void;
};

export function PdfParser({ setPdfFile }: Props) {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
    } else {
      alert('Пожалуйста, загрузите PDF файл.');
    }
  };

  return (
    <div className='flex flex gap-2 items-center'>
      <label className='w-full text-sm font-medium text-gray-700'>
        Upload a PDF File:
      </label>
      <input
        type='file'
        accept='application/pdf'
        onChange={handleFileUpload}
        className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none'
      />
    </div>
  );
}
