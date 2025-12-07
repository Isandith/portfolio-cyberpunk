import React from 'react';
import useScrambleText from './useScrambleText';

type ScrambleTitleProps = {
  text: string;
  className?: string;
};

const ScrambleTitle: React.FC<ScrambleTitleProps> = ({ text, className = "" }) => {
  const scrambled = useScrambleText(text);
  return <span className={className}>{scrambled}</span>;
};

export default ScrambleTitle;
