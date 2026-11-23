import { useQuery } from "@apollo/client/react";
import RepositoryItem from "./RepositoryItem";
import { GET_REPOSITORY } from "../graphql/queries";
import { useParams } from "react-router-native";
import Text from "./Text";
import { FlatList } from "react-native";
import ReviewItem from "./ReviewItem";
import { ItemSeparator } from "./RepositoryList";

const SingleRepository = () => {
  const { id } = useParams();
  const { data } = useQuery(GET_REPOSITORY, { variables: { id } });

  const repository = data?.repository;

  if (!repository) {
    return <Text>Loading...</Text>;
  }

  const reviews = repository.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={<RepositoryItem repository={repository} showUrl />}
    />
  );
};

export default SingleRepository;
