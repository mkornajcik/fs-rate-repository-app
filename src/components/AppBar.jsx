import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import theme from "./theme";
import useSignOut from "../hooks/useSignOut";
import { ME } from "../graphql/queries";
import { useQuery } from "@apollo/client/react";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
  },
});

const AppBar = () => {
  const { data } = useQuery(ME);
  const signOut = useSignOut();

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab title="Repositories" url="/" />
        {data?.me && <AppBarTab title="Create a review" url="/review" />}
        {data?.me && <AppBarTab title="My reviews" url="/myreviews" />}

        {data?.me ? <AppBarTab title="Sign out" onPress={signOut} /> : <AppBarTab title="Sign in" url="/signin" />}
        {!data?.me && <AppBarTab title="Sign up" url="/signup" />}
      </ScrollView>
    </View>
  );
};

export default AppBar;
