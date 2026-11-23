import { View, Image, StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import theme from "./theme";
import { formatNumber } from "../util";
import * as Linking from "expo-linking";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    gap: 5,
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 20,
  },
  info: {
    alignItems: "flex-start",
    gap: 5,
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: "white",
    padding: 5,
    borderRadius: 20,
  },
  stats: {
    flexDirection: "row",
    margin: 10,
  },
  stat: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

const RepositoryItem = ({ repository, showUrl }) => {
  const stats = [
    { label: "Stars", value: formatNumber(repository.stargazersCount) },
    { label: "Forks", value: formatNumber(repository.forksCount) },
    { label: "Reviews", value: formatNumber(repository.reviewCount) },
    { label: "Rating", value: repository.ratingAverage },
  ];

  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.avatar} source={{ uri: repository.ownerAvatarUrl }} />
        <View style={styles.info}>
          <Text fontWeight="bold">{repository.fullName}</Text>
          <Text color="textSecondary">{repository.description}</Text>
          <Text style={styles.language}>{repository.language}</Text>
        </View>
      </View>

      <View style={styles.stats}>
        {stats.map(({ label, value }) => (
          <View key={label} style={styles.stat}>
            <Text fontWeight="bold">{value}</Text>
            <Text color="textSecondary">{label}</Text>
          </View>
        ))}
      </View>

      {showUrl && (
        <Pressable style={styles.button} onPress={() => Linking.openURL(repository.url)}>
          <Text style={styles.buttonText}>Open in GitHub</Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;
