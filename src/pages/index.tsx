import { GetStaticProps } from 'next';
import Image from 'next/image';
import { useEffect } from 'react';

import s from '@/styles/index.module.css';

import { Starship } from '@/lib/types/generated';
import { shuffle } from '@/lib/utils/shuffle';
import {
  useComputerScore,
  useHidden,
  usePlayable,
  usePlayerScore,
  useResult,
  useSetPlayable,
  useSetStarships,
} from '@/lib/utils/zustand';

import { Card, Modal, Score } from '@/components/common';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { getStarshipsQuery } from '@/graphql/queries.graphql';

import client from '../../apollo-client';

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: getStarshipsQuery,
  });

  const { starships } = data.allStarships;

  return {
    props: { starships },
  };
};

type HomePageProps = {
  starships: Starship[];
};

export default function HomePage({ starships }: HomePageProps) {
  const computerScore = useComputerScore();
  const hidden = useHidden();
  const playable = usePlayable();
  const playerScore = usePlayerScore();
  const result = useResult();
  const setPlayable = useSetPlayable();
  const setStarships = useSetStarships();

  useEffect(() => {
    setPlayable(shuffle(starships));
    setStarships(starships);
  }, [starships]);

  return (
    <Layout>
      <Seo templateTitle='Star Wars Top Trumps' />

      <main className={s.root}>
        <Image
          className={s.image}
          src='/images/stars.jpeg'
          alt='Stars'
          layout='fill'
          objectFit='cover'
          objectPosition='center'
        />

        {result !== null && <Modal></Modal>}

        {playable[0] && playable[1] && (
          <div className={s.container}>
            <div className={s.col}>
              <Score className={s.score} score={playerScore} />
              <Card buttons={true} className={s.card} starship={playable[0]} />
            </div>
            <div className={s.col}>
              <Score className={s.score} score={computerScore} />
              <Card className={s.card} hidden={hidden} starship={playable[1]} />
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
}
