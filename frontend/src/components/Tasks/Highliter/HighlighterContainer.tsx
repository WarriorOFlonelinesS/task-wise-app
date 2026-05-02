import React, { useEffect } from 'react';
import { useState } from 'react';
import { HighlighterView } from './HighlighterView';
import { useHihglighter } from '../../../features/highlighter/hooks/useHighlighter';

export const HiglihterContainer = ({ text, selection, color }) => {
  const { raw, unique, parts } = useHihglighter({ text, selection });

  return <HighlighterView unique={unique} parts={parts} color={color} />;
};
