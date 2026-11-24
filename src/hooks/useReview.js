import { useMutation } from "@apollo/client/react";
import { CREATE_REVIEW } from "../graphql/mutations";

const useReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    const { data } = await mutate({ variables: { ownerName, repositoryName, rating, text } });

    return data;
  };

  return [createReview, result];
};

export default useReview;
