export type BlockType = 'paragraph' | 'heading1' | 'heading2' | 'heading3' | 'bulletList' | 'numberedList';

export interface ListItem {
  id: string;
  content: string;
}

export interface Block {
  id: string;
  type: BlockType;
  content: string | ListItem[];
}