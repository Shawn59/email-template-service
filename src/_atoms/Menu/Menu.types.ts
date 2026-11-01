import { JSX } from 'react';

export interface IMenuAtomData {
  id: number;
  label: string;
  onClick: () => void;
}

export interface IMenuAtom {
  elem: React.ReactNode;
  data: IMenuAtomData[];
}
