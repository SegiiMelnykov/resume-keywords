'use client';
import { Dropdown } from '@/components/dropdown';
import { ParsedPDF } from '@/utilities/parse-pdf';
import { useState } from 'react';

type Props = {
  text: string;
};

export function PhraseEntriesTable({ text }: Props) {
  const [entries, setEntries] = useState(30);
  if (!text || !text) {
    return <div>No PDF data available.</div>;
  }

  console.log('rerender');

  // List of stop words to exclude
  const stopWords = new Set([
    'a',
    'an',
    'the',
    'and',
    'or',
    'but',
    'is',
    'by',
    'to',
    'of',
    'in',
    'on',
    'with',
    'for',
    'as',
    'at',
    'from',
    'this',
    'that',
    'it',
    'be',
    'was',
    'were',
    'are',
    'has',
    'had',
    'have',
    'not',
    'no',
    'yes',
    'do',
    'does',
    'did',
    'will',
    'would',
    'can',
    'could',
    'shall',
    'should',
    'may',
    'might',
    '&',
    '-',
    '|',
    'page',
    'amp',
  ]);

  // Remove <p>, </p>, and <br> tags from the text
  const removeTags = (text: string) => {
    return text.replace(/<p[^>]*>|<\/p>|<br[^>]*>/g, ' '); // Remove <p>, </p>, and <br> tags
  };
  // Process the text to count word occurrences and find first occurrences
  const cleanText = removeTags(text); // Remove the <p> tags before processing
  const words = cleanText.split(/\s+/); // Split text into words by whitespace
  const wordMap = new Map<string, { count: number; firstIndex: number }>();

  // Regular expression to clean words
  const cleanWord = (word: string) =>
    word
      .trim()
      .replace(/[,:;!?()]/g, '')
      .replace(/^[^a-zа-яё]+|[^a-zа-яё]+$/gi, '')
      .toLowerCase();

  words.forEach((word, index) => {
    const normalizedWord = cleanWord(word);
    if (normalizedWord && !stopWords.has(normalizedWord)) {
      if (!wordMap.has(normalizedWord)) {
        wordMap.set(normalizedWord, { count: 1, firstIndex: index + 1 });
      } else {
        const entry = wordMap.get(normalizedWord)!;
        entry.count += 1;
      }
    }
  });

  const wordEntries = Array.from(wordMap.entries())
    .map(([word, { count, firstIndex }]) => ({
      word,
      count,
      firstIndex,
    }))
    .sort((a, b) => b.count - a.count) // Sort by count in descending order
    .slice(0, entries); // Take only the first 25 entries

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
              <th className='border border-gray-400 p-1'>Word</th>
              <th className='border border-gray-400 p-1'>Count</th>
              <th className='border border-gray-400 p-1'>First Occurrence</th>
            </tr>
          </thead>
          <tbody>
            {wordEntries.map(({ word, count, firstIndex }) => (
              <tr key={word}>
                <td className='border border-gray-400 p-1'>{word}</td>
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
