import React from 'react';
import { Block, BlockType, ListItem } from '../lib/types';

import ContentEditable from './ContentEditable2';

interface BlockComponentProps {
    block: Block;
    onContentChange: (id: string, content: string | ListItem[]) => void;
    onTypeChange: (id: string, newType: BlockType) => void;
    onAddNewBlock: (id: string) => void;
    onDeleteBlock: (id: string) => void;
  }
  
  const BlockComponent: React.FC<BlockComponentProps> = ({ 
    block, 
    onContentChange, 
    onTypeChange, 
    onAddNewBlock,
    onDeleteBlock
  }) => {
    const handleListItemChange = (itemId: string, newContent: string) => {
      if (Array.isArray(block.content)) {
        const newItems = block.content.map(item =>
          item.id === itemId ? { ...item, content: newContent } : item
        );
        onContentChange(block.id, newItems);
      }
    };
  
    const renderListItems = () => {
      if (!Array.isArray(block.content)) return null;
      return block.content.map((item, index) => (
        <div key={item.id} className="flex items-start mb-1">
          <span className="mr-2 mt-1">{block.type === 'bulletList' ? '•' : `${index + 1}.`}</span>
          <ContentEditable
            html={item.content}
            onChange={(e) => handleListItemChange(item.id, e.target.value)}
          />
        </div>
      ));
    };
  
    const renderBlock = () => {
      switch (block.type) {
        case 'heading1':
          return <h1 className="text-4xl font-bold">{renderContent()}</h1>;
        case 'heading2':
          return <h2 className="text-3xl font-bold">{renderContent()}</h2>;
        case 'heading3':
          return <h3 className="text-2xl font-bold">{renderContent()}</h3>;
        case 'bulletList':
        case 'numberedList':
          return renderListItems();
        default:
          return <p>{renderContent()}</p>;
      }
    };
  
    const renderContent = () => {
      if (typeof block.content === 'string') {
        return (
          <ContentEditable
            html={block.content}
            onChange={(e) => onContentChange(block.id, e.target.value)}
          />
        );
      }
      return null;
    };
  
    return (
      <div className="mb-4 group">
        <div className="flex items-start">
          <select 
            value={block.type} 
            onChange={(e) => onTypeChange(block.id, e.target.value as BlockType)}
            className="mr-2 p-1 border rounded bg-slate-800"
          >
            <option value="paragraph">Text</option>
            <option value="heading1">Heading 1</option>
            <option value="heading2">Heading 2</option>
            <option value="heading3">Heading 3</option>
            <option value="bulletList">Bullet List</option>
            <option value="numberedList">Numbered List</option>
          </select>
          <div className="flex-grow">{renderBlock()}</div>
          <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => onAddNewBlock(block.id)} 
              className="mr-1 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              +
            </button>
            <button 
              onClick={() => onDeleteBlock(block.id)} 
              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              -
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default BlockComponent;