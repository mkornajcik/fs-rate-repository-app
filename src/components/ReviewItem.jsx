import { View, StyleSheet } from "react-native";
import { format } from "date-fns";
import Text from "./Text";
import theme from "./theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 5,
    flexDirection: "row",
    gap: 10,
  },
  rating: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 5,
    borderColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    gap: 5,
  },
});

const ReviewItem = ({ review }) => {
  return (
    <View testID="reviewItem" style={styles.container}>
      <View style={styles.rating}>
        <Text fontWeight="bold" color="primary">
          {review.rating}
        </Text>
      </View>
      <View style={styles.content}>
        <Text fontWeight="bold">{review.user.username}</Text>
        <Text color="textSecondary">{format(new Date(review.createdAt), "dd MMM yyyy")}</Text>
        {review.text && <Text>{review.text}</Text>}
      </View>
    </View>
  );
};

export default ReviewItem;
