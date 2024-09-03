import React, { useState, useEffect, useRef } from 'react';

interface ContentEditableProps {
  html: string;
  onChange: (e: { target: { value: string } }) => void;
}

const ContentEditable: React.FC<ContentEditableProps> = ({ html, onChange }) => {
  const [content, setContent] = useState(html);
  const contentEditableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentEditableRef.current) {
      contentEditableRef.current.innerHTML = html;
      placeCaretAtEnd(contentEditableRef.current);
    }
  }, [html]);
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
    const newContent = e.currentTarget.innerHTML;
    setContent(newContent);
    onChange({ target: { value: newContent } });
  };

  return (
    <div
      ref={contentEditableRef}
      contentEditable
      onInput={handleInput}
      className="outline-none min-h-[1em]"
      style={{ 
        direction: 'ltr',
        unicodeBidi: 'plaintext',
      }}
    />
  );
};

export default ContentEditable;