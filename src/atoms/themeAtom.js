import { atom, selector } from "recoil";

export const themeAtom = atom( {
  key: "themeAtom",
  default: 'light',
} );

export const menuStateAtom = atom( {
  key: "menuStateAtom",
  default: true,
} );

export const screenSizeAtom = atom( {
  key: "screenSizeAtom",
  default: '',
} );