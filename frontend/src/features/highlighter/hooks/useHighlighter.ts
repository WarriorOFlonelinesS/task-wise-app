import { useMemo } from 'react';

type UseHihglighterParams = {
  text: string;
  selection: string | string[];
};

type UseHihglighterResult = {
  raw: string;
  unique: string[];
  parts: string[];
};

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function useHihglighter({ text, selection }: UseHihglighterParams): UseHihglighterResult {
  const raw = useMemo(() => String(text ?? ''), [text]);

  const unique = useMemo(() => {
    const list = (Array.isArray(selection) ? selection : [selection])
      .map((s) => String(s).trim())
      .filter(Boolean);
    const seen = new Set<string>();
    const deduped = list.filter((s) => {
      const k = s.toLowerCase();
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
    deduped.sort((a, b) => b.length - a.length);
    return deduped;
  }, [selection]);

  const parts = useMemo(() => {
    if (!unique.length) return [raw];
    const pattern = unique.map(escapeRegExp).join('|');
    return raw.split(new RegExp(`(${pattern})`, 'gi'));
  }, [raw, unique]);

  return { raw, unique, parts };
}
