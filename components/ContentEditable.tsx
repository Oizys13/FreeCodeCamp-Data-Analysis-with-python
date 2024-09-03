import React, { useState, useEffect, useRef } from 'react';

interface ContentEditableProps {
  html: string;
  onChange: (e: { target: { value: string } }) => void;
  onKeyDown ?: (e: React.KeyboardEvent) => void;
  placeholder?: string;
}

const ContentEditable: React.FC<ContentEditableProps> = ({ html, onChange, onKeyDown, placeholder }) => {
  const [content, setContent] = useState(html);
  const [isPlaceholder, setIsPlaceholder] = useState(html === '');
  const contentEditableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentEditableRef.current) {
      if (html === '' && isPlaceholder) {
        contentEditableRef.current.textContent = placeholder || '';
      } else {
        contentEditableRef.current.textContent = html;
      }
      // Place cursor at the end
      placeCaretAtEnd(contentEditableRef.current);
    }
  }, [html, isPlaceholder, placeholder]);

  const placeCaretAtEnd = (element: HTMLElement) => {
    element.focus();
    if (typeof window.getSelection != "undefined"
        && typeof document.createRange != "undefined") {
      const range = document.createRange();
      range.selectNodeContents(element);
      range.collapse(false);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.textContent || '';
    if (newContent === '') {
      setContent('');
      onChange({ target: { value: '' } });
      setIsPlaceholder(true);
    } else {
      setContent(newContent);
      onChange({ target: { value: newContent } });
      setIsPlaceholder(false);
    }
  };

  const handleFocus = () => {
    if (isPlaceholder) {
      setContent('');
      setIsPlaceholder(false);
      if (contentEditableRef.current) {
        contentEditableRef.current.textContent = '';
      }
    }
  };

  const handleBlur = () => {
    if (content === '') {
      setIsPlaceholder(true);
      if (contentEditableRef.current) {
        contentEditableRef.current.textContent = placeholder || '';
      }
    }
  };

  return (
    <div
      ref={contentEditableRef}
      contentEditable
      onInput={handleInput}
      onKeyDown={onKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={`outline-none ${isPlaceholder ? 'text-gray-400' : ''}`}
      style={{ 
        direction: 'ltr',
        unicodeBidi: 'plaintext',
      }}
    />
  );
};

export default ContentEditable;


