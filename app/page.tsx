"use client"
import React, { useState } from 'react';
import Head from 'next/head';

interface Block {
  id: string;
  type: 'text' | 'heading';
  content: string;
}

const Home: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([
    { id: '1', type: 'heading', content: 'Welcome to Notion Clone' },
    { id: '2', type: 'text', content: 'Start typing here...' },
  ]);

  const handleBlockChange = (id: string, content: string) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, content } : block
    ));
  };

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Notion Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {blocks.map(block => (
          <div key={block.id} className="mb-4">
            {block.type === 'heading' ? (
              <h1 className="text-3xl font-bold">
                <ContentEditable
                  html={block.content}
                  onChange={(e) => handleBlockChange(block.id, e.target.value)}
                />
              </h1>
            ) : (
              <p>
                <ContentEditable
                  html={block.content}
                  onChange={(e) => handleBlockChange(block.id, e.target.value)}
                />
              </p>
            )}
          </div>
        ))}
      </main>
    </div>
  );
};

const ContentEditable: React.FC<{
  html: string;
  onChange: (e: { target: { value: string } }) => void;
}> = ({ html, onChange }) => {
  const [content, setContent] = useState(html);

  const handleChange = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerHTML;
    setContent(newContent);
    onChange({ target: { value: newContent } });
  };

  return (
    <div
      contentEditable
      onInput={handleChange}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default Home;