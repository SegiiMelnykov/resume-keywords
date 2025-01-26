'use client';
import { Dropdown } from '@/components/dropdown';
import { useState } from 'react';

type Props = {
  text: string;
};

export function PhraseEntriesTable({ text }: Props) {
  const [entries, setEntries] = useState(30);

  if (!text) {
    return <div>No PDF data available.</div>;
  }

  // Remove <p>, </p>, and <br> tags from the text
  const removeTags = (text: string) => {
    return text.replace(/<p[^>]*>|<\/p>|<br[^>]*>/g, ' '); // Remove <p>, </p>, and <br> tags
  };

  // Process the text to count word occurrences and find first occurrences
  const cleanText = removeTags(text); // Remove the <p> tags before processing
  const words = cleanText.split(/\s+/); // Split text into words by whitespace

  const phrases = new Map<string, { count: number; firstIndex: number }>();

  // Collect phrases of 2-4 words
  for (let i = 0; i < words.length; i++) {
    for (let length = 2; length <= 4; length++) {
      const phrase = words.slice(i, i + length).join(' ');
      if (phrase.split(' ').length === length) {
        if (phrases.has(phrase)) {
          const { count, firstIndex } = phrases.get(phrase)!;
          phrases.set(phrase, { count: count + 1, firstIndex });
        } else {
          phrases.set(phrase, { count: 1, firstIndex: i });
        }
      }
    }
  }

  const phrasesEntries = Array.from(phrases.entries())
    .map(([phrase, { count, firstIndex }]) => ({
      phrase,
      count,
      firstIndex,
    }))
    .sort((a, b) => b.count - a.count) // Sort by count in descending order
    .slice(0, entries);

  return (
    <div className='grow'>
      <div className='flex justify-between items-end'>
        <h2 className='font-bold text-xl'>Entries Table</h2>
        <Dropdown
          onChange={(value) => setEntries(+value)}
          value={entries.toString()}
          options={['20', '30', '40', '50']}
        />
      </div>
      <div className='overflow-hidden rounded-lg border border-gray-400 mt-1'>
        <table className='w-full border-collapse'>
          <thead>
            <tr>
              <th className='border border-gray-400 p-1'>Phrase</th>
              <th className='border border-gray-400 p-1'>Count</th>
              <th className='border border-gray-400 p-1'>First Occurrence</th>
            </tr>
          </thead>
          <tbody>
            {phrasesEntries.map(({ phrase, count, firstIndex }) => (
              <tr key={phrase}>
                <td className='border border-gray-400 p-1'>{phrase}</td>
                <td className='border border-gray-400 p-1'>{count}</td>
                <td className='border border-gray-400 p-1'>{firstIndex}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
