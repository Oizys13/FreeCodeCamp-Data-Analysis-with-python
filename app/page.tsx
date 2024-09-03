"use client"
import React, { useState } from 'react';
import Head from 'next/head';
import { Block, BlockType, ListItem } from '@/lib/types';
import BlockComponent from '../components/BlockComponent';

const Home: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([
    { id: '1', type: 'heading1', content: 'Welcome to Notion Clone' },
    { id: '2', type: 'paragraph', content: '' },
  ]);

  const handleBlockChange = (id: string, content: string | ListItem[]) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, content } : block
    ));
  };

  const handleBlockTypeChange = (id: string, newType: BlockType) => {
    setBlocks(blocks.map(block => {
      if (block.id === id) {
        if ((newType === 'bulletList' || newType === 'numberedList') && typeof block.content === 'string') {
          return { ...block, type: newType, content: [{ id: Date.now().toString(), content: block.content }] };
        } else if ((block.type === 'bulletList' || block.type === 'numberedList') && Array.isArray(block.content)) {
          return { ...block, type: newType, content: block.content[0]?.content || '' };
        } else {
          return { ...block, type: newType };
        }
      }
      return block;
    }));
  };

  const addNewBlock = (id: string) => {
    const index = blocks.findIndex(block => block.id === id);
    const newBlock: Block = { id: Date.now().toString(), type: 'paragraph', content: '' };
    setBlocks([...blocks.slice(0, index + 1), newBlock, ...blocks.slice(index + 1)]);
  };

  const deleteBlock = (id: string) => {
    if (blocks.length > 1) {
      setBlocks(blocks.filter(block => block.id !== id));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Notion Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {blocks.map(block => (
          <BlockComponent 
            key={block.id}
            block={block}
            onContentChange={handleBlockChange}
            onTypeChange={handleBlockTypeChange}
            onAddNewBlock={addNewBlock}
            onDeleteBlock={deleteBlock}
          />
        ))}
      </main>
    </div>
  );
};

export default Home;