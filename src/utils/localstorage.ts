import SecureLS from "secure-ls";
import { ENCODING_TYPE } from "./constants";

const ls = new SecureLS({ encodingType: ENCODING_TYPE.AES });

export const setLocalStorage = (key: string, value: any) => {
  // console.log({ key, value });

  ls.set(key, value);
};

export const getLocalStorage = (key: string) => {
  // console.log(ls.get(key));

  return ls.get(key);
};

export const getUser = () => {
  return ls.get("user");
};
