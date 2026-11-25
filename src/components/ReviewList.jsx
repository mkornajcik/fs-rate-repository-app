import { FlatList } from "react-native";
import ReviewItem from "./ReviewItem";
import { useQuery } from "@apollo/client/react";
import { ME } from "../graphql/queries";
import { ItemSeparator } from "./RepositoryList";

const ReviewList = () => {
  const { data, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  const reviews = data?.me?.reviews.edges.map((edge) => edge.node) ?? [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} showRepository onDelete={refetch} />}
      keyExtractor={({ id }) => id}
    />
  );
};

export default ReviewList;
