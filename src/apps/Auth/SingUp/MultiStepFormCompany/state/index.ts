import { atom, selector } from "recoil";

export const createUserInfoState = atom({
  key: "createUserInfoState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});
