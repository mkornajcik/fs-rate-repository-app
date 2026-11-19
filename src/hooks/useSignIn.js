import { useMutation, useApolloClient } from "@apollo/client/react";
import { AUTHENTICATE } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: { username, password } });
    await authStorage.setAccessToken(data.authenticate.accessToken);
    await apolloClient.resetStore();

    return data.authenticate.accessToken;
  };

  return [signIn, result];
};

export default useSignIn;
