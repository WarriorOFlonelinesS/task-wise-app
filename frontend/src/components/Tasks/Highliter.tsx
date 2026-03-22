import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function escapeRegExp(s: string) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

export const Higlihter = ({ text, selection, color }) => {
  
  const raw = String(text ?? '');
  const list = (Array.isArray(selection) ? selection : [selection])
  .map((s) => String(s).trim())
  .filter(Boolean);

  const seen = new Set<string>();
  const unique = list.filter((s) => {
    const k = s.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });

  unique.sort((a,b) => b.length - a.length);

  if (unique.length === 0) {
    return <span>{raw}</span>
  }

  const pattern = unique.map(escapeRegExp).join('|');
  const parts = raw.split(new RegExp(`(${pattern})`, 'gi'));

  const isHighlighted = (part: string) => 
    unique.some((u)=> part.toLowerCase() === u.toLowerCase());


  return (
    <span>
      {parts.map((part, i) =>
        isHighlighted(part) ? (
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
