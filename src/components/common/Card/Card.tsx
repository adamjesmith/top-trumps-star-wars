import cn from 'clsx';
import Image from 'next/image';

import s from './Card.module.css';

import { Starship } from '@/lib/types/generated';
import {
  useIncComputerScore,
  useIncPlayerScore,
  usePlayable,
  useSetHidden,
  useSetResult,
} from '@/lib/utils/zustand';
type CardProps = {
  className?: string;
  buttons?: boolean;
  hidden?: boolean;
  starship: Starship;
};

export default function Card({
  className,
  hidden = false,
  buttons = false,
  starship,
}: CardProps) {
  const {
    costInCredits,
    filmConnection,
    name,
    passengers,
    maxAtmospheringSpeed,
  } = starship;

  const incComputerScore = useIncComputerScore();
  const incPlayerScore = useIncPlayerScore();
  const setHidden = useSetHidden();
  const setResult = useSetResult();
  const playable = usePlayable();

  function compareMaxSpeed() {
    const speed1 = playable[0].maxAtmospheringSpeed || 0;
    const speed2 = playable[1].maxAtmospheringSpeed || 0;
    result(speed1, speed2);
  }

  function compareCredits() {
    const credits1 = playable[0].costInCredits || 0;
    const credits2 = playable[1].costInCredits || 0;
    result(credits1, credits2);
  }

  function comparePassengers() {
    const passengers1 = Number(playable[0].passengers) || 0;
    const passengers2 = Number(playable[1].passengers) || 0;
    result(passengers1, passengers2);
  }

  function compareFilmApps() {
    const filmApps1 = playable[0].filmConnection?.totalCount || 0;
    const filmApps2 = playable[1].filmConnection?.totalCount || 0;
    result(filmApps1, filmApps2);
  }

  function result(player: number, computer: number) {
    setHidden(false);

    const result =
      player > computer ? 'win' : computer > player ? 'lose' : 'draw';
    result === 'win' && incPlayerScore();
    result === 'lose' && incComputerScore();

    setTimeout(() => setResult(result), 500);
  }

  return (
    <div className={cn(s.root, className)}>
      <div className={s.header}>{name}</div>
      <div className={s.imageContain}>
        <Image
          className={s.image}
          src='/images/star-wars.webp'
          alt='Stars'
          layout='fill'
          objectFit='cover'
          objectPosition='center'
          priority={true}
        />
      </div>

      {buttons ? (
        <div className={s.text}>
          <button
            onClick={() => compareMaxSpeed()}
            className={cn(s.field, s.button)}
          >
            <span className={s.title}>Max Speed</span>
            <span className={s.value}>{maxAtmospheringSpeed || 0}</span>
          </button>

          <button
            onClick={() => compareCredits()}
            className={cn(s.field, s.button)}
          >
            <span className={s.title}>Credit Cost</span>
            <span className={s.value}>{costInCredits || 0}</span>
          </button>

          <button
            onClick={() => comparePassengers()}
            className={cn(s.field, s.button)}
          >
            <span className={s.title}>Passengers</span>
            <span className={s.value}>{passengers || 0}</span>
          </button>

          <button
            onClick={() => compareFilmApps()}
            className={cn(s.field, s.button)}
          >
            <span className={s.title}>Film Appearances</span>
            <span className={s.value}>{filmConnection?.totalCount || 0}</span>
          </button>
        </div>
      ) : (
        <div className={s.text}>
          <div className={s.field}>
            <span className={s.title}>Max Speed</span>
            <span className={s.value}>
              {hidden ? '?' : maxAtmospheringSpeed || 0}
            </span>
          </div>

          <div className={s.field}>
            <span className={s.title}>Credit Cost</span>
            <span className={s.value}>{hidden ? '?' : costInCredits || 0}</span>
          </div>

          <div className={s.field}>
            <span className={s.title}>Passengers</span>
            <span className={s.value}>{hidden ? '?' : passengers || 0}</span>
          </div>

          <div className={s.field}>
            <span className={s.title}>Film Appearances</span>
            <span className={s.value}>
              {hidden ? '?' : filmConnection?.totalCount || 0}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
