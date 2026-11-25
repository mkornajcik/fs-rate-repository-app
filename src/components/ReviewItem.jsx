import { View, StyleSheet, Pressable, Alert } from "react-native";
import { format } from "date-fns";
import Text from "./Text";
import theme from "./theme";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client/react";
import { DELETE_REVIEW } from "../graphql/mutations";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 5,
  },
  reviewRow: { flexDirection: "row", gap: 10 },
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
  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 5,
  },
  button: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  deleteButton: {
    flex: 1,
    backgroundColor: theme.colors.error,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

const ReviewItem = ({ review, showRepository, onDelete }) => {
  const navigate = useNavigate();
  const [mutate] = useMutation(DELETE_REVIEW);

  const confirmDelete = () =>
    Alert.alert("Delete review", "Are you sure you want to delete this review?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await mutate({ variables: { id: review.id } });
          await onDelete();
        },
      },
    ]);

  return (
    <View testID="reviewItem" style={styles.container}>
      <View style={styles.reviewRow}>
        <View style={styles.rating}>
          <Text fontWeight="bold" color="primary">
            {review.rating}
          </Text>
        </View>
        <View style={styles.content}>
          <Text fontWeight="bold">{showRepository ? review.repository.fullName : review.user.username}</Text>
          <Text color="textSecondary">{format(new Date(review.createdAt), "dd MMM yyyy")}</Text>
          {review.text && <Text>{review.text}</Text>}
        </View>
      </View>

      {showRepository && (
        <View style={styles.actions}>
          <Pressable style={styles.button} onPress={() => navigate(`/repository/${review.repository.id}`)}>
            <Text style={styles.buttonText}>View repository</Text>
          </Pressable>
          <Pressable style={styles.deleteButton} onPress={confirmDelete}>
            <Text style={styles.buttonText}>Delete review</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
