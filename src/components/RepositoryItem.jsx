import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "./theme";
import { formatNumber } from "../util";

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
});

const RepositoryItem = ({ repository }) => {
  const stats = [
    { label: "Stars", value: formatNumber(repository.stargazersCount) },
    { label: "Forks", value: formatNumber(repository.forksCount) },
    { label: "Reviews", value: formatNumber(repository.reviewCount) },
    { label: "Rating", value: repository.ratingAverage },
  ];

  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default RepositoryItem;
