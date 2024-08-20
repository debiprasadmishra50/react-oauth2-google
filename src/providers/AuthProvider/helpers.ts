import { getLocalStorage } from "../../utils/localstorage";

const AUTH_TOKEN_KEY = "token";

interface AuthData {
  accessToken?: string;
}

const DEFAULT_AUTH_DATA: AuthData = {
  accessToken: undefined,
};

export const getAuthData = () => {
  const access_token = getLocalStorage(AUTH_TOKEN_KEY);

  if (access_token === null) {
    return DEFAULT_AUTH_DATA;
  }

  try {
    return {
      accessToken: access_token,
    } as AuthData;
  } catch (e) {
    console.log(e);
    return DEFAULT_AUTH_DATA;
  }
};
