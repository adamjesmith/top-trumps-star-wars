import cn from 'clsx';
import Image from 'next/image';

import s from './Modal.module.css';

import { shuffle } from '@/lib/utils/shuffle';
import {
  useComputerScore,
  usePlayable,
  usePlayerScore,
  useResetScores,
  useResult,
  useSetHidden,
  useSetPlayable,
  useSetResult,
  useStarships,
} from '@/lib/utils/zustand';

export default function Modal() {
  const computerScore = useComputerScore();
  const playable = usePlayable();
  const playerScore = usePlayerScore();
  const result = useResult();
  const starships = useStarships();
  const setHidden = useSetHidden();
  const setPlayable = useSetPlayable();
  const setResult = useSetResult();
  const resetScores = useResetScores();

  function playAgain() {
    playable.splice(0, 2);
    setResult(null);
    setHidden(true);
    setPlayable(playable);
  }

  function reset() {
    setResult(null);
    setHidden(true);
    setPlayable(shuffle(starships));
    resetScores();
  }

  const title =
    result === 'win' ? 'You Win!' : result === 'lose' ? 'You Lose!' : 'Draw';
  const message =
    result === 'win'
      ? 'You must have used the force'
      : result === 'lose'
      ? 'Join the darkside!!!'
      : 'Play again, you must...';

  return (
    <div className={s.root}>
      <div className={s.modal}>
        <div className={s.image}>
          <Image
            src={
              result === 'win'
                ? '/images/obi-wan.jpg'
                : result === 'lose'
                ? '/images/vader.jpg'
                : '/images/yoda.jpg'
            }
            alt='Modal Image'
            height={500}
            width={400}
            priority={true}
          />
        </div>

        <div className={s.textContain}>
          {playable.length == 2 ? (
            <>
              <h3 className={s.title}>Game Over</h3>
              <p className={s.message}>
                Final score {playerScore} - {computerScore}
              </p>
              <button onClick={() => reset()} className={cn(s.button, s.reset)}>
                Play Again
              </button>
            </>
          ) : (
            <>
              <h3 className={s.title}> {title} </h3>
              <p className={s.message}>{message}</p>
              <button
                onClick={() => playAgain()}
                className={cn(s.button, s.again)}
              >
                Next Hand
              </button>
            </>
          )}
        </div>
      </div>
      <div className={s.overlay}></div>
    </div>
  );
}
