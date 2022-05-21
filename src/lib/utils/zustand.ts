import create from 'zustand';

import { Starship } from '@/lib/types/generated';

type Result = 'win' | 'lose' | 'draw' | null;

interface State {
  computerScore: number;
  hidden: boolean;
  playable: Starship[];
  playerScore: number;
  result: Result;
  starships: Starship[];
  incComputerScore: () => void;
  incPlayerScore: () => void;
  setHidden: (hidden: boolean) => void;
  setPlayable: (starships: Starship[]) => void;
  setStarships: (starships: Starship[]) => void;
  setResult: (result: Result) => void;
  resetScores: () => void;
}

const useStore = create<State>((set) => ({
  computerScore: 0,
  hidden: true,
  playable: [],
  playerScore: 0,
  result: null,
  starships: [],
  incComputerScore: () =>
    set((state) => ({ computerScore: state.computerScore + 1 })),
  incPlayerScore: () =>
    set((state) => ({ playerScore: state.playerScore + 1 })),
  setHidden: (hidden) =>
    set((state) => ({
      ...state,
      hidden,
    })),
  setPlayable: (playable) =>
    set((state) => ({
      ...state,
      playable,
    })),
  setStarships: (starships) =>
    set((state) => ({
      ...state,
      starships,
    })),
  setResult: (w) => set(() => ({ result: w })),
  resetScores: () => set(() => ({ computerScore: 0, playerScore: 0 })),
}));

export const useComputerScore = () => useStore((state) => state.computerScore);
export const useHidden = () => useStore((state) => state.hidden);
export const usePlayable = () => useStore((state) => state.playable);
export const usePlayerScore = () => useStore((state) => state.playerScore);
export const useResult = () => useStore((state) => state.result);
export const useStarships = () => useStore((state) => state.starships);

export const useIncPlayerScore = () =>
  useStore((state) => state.incPlayerScore);

export const useIncComputerScore = () =>
  useStore((state) => state.incComputerScore);

export const useSetHidden = () => useStore((state) => state.setHidden);

export const useSetPlayable = () => useStore((state) => state.setPlayable);

export const useSetStarships = () => useStore((state) => state.setStarships);

export const useSetResult = () => useStore((state) => state.setResult);

export const useResetScores = () => useStore((state) => state.resetScores);
