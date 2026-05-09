import React, { useEffect } from 'react';
import { isHighlighted } from '../../../helpers/isHighlighted';

type HighlighterViewProps = {
  unique: string[];
  parts: string[];
  color?: string;
};

export const HighlighterView = ({ unique, parts, color = '#FFD700' }: HighlighterViewProps) => {
  return (
    <span>
      {parts.map((part, i) =>
        isHighlighted(unique, part) ? (
          <mark key={i} style={{ backgroundColor: color }}>
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </span>
  );
};
