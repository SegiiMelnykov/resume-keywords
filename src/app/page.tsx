import { EntriesTable } from '@/modules/entries-table';
import { FirstOccurrenceOfEntryTable } from '@/modules/first-occurrence-of-entry-table';
import { PdfParser } from '@/modules/pdf-parser';

export default function Home() {
  return (
    <div className='min-h-screen p-8 pb-20 gap-16'>
      <main className='flex flex-col items-start justify-start gap-6'>
        <h1>Key Analyzer </h1>
        <PdfParser />
        <EntriesTable />
        <FirstOccurrenceOfEntryTable />
      </main>
    </div>
  );
}
