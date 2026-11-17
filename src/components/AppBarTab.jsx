import { StyleSheet } from "react-native";
import Text from "./Text";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  barTab: {
    color: "#ffff",
    padding: 10,
  },
});

const AppBarTab = ({ title, url }) => {
  return (
    <Link to={url}>
      <Text style={styles.barTab}>{title}</Text>
    </Link>
  );
};

export default AppBarTab;
