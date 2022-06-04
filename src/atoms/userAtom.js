import { atom, selector } from "recoil";

export const authUserAtom = atom( {
  key: "authUser",
  default: null,
} );

export const userDBAtom = atom( {
  key: "userDB",
  default: null,
} );