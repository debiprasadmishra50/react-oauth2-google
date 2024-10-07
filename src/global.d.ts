interface Window {
  AppleID: {
    auth: {
      signIn: () => Promise<any>;
      init: (config: {
        clientId: string;
        scope: string;
        redirectURI: string;
        state?: string;
        nonce?: string;
        usePopup: boolean;
      }) => void;
    };
  };
}
