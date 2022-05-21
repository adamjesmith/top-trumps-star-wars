import cn from 'clsx';

import s from './Score.module.css';

type ScoreProps = {
  score: number;
  className?: string;
};

export default function Score({ score, className }: ScoreProps) {
  return <div className={cn(s.root, className)}>{score}</div>;
}
