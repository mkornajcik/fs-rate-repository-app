import { Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  barTab: {
    color: "#fff",
    padding: 10,
  },
});

const AppBarTab = ({ title, url, onPress }) => {
  const tab = <Text style={styles.barTab}>{title}</Text>;

  if (url) {
    return <Link to={url}>{tab}</Link>;
  }

  return <Pressable onPress={onPress}>{tab}</Pressable>;
};
export default AppBarTab;
