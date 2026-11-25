import { Searchbar } from "react-native-paper";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: "white",
    margin: 10,
  },
});

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return <Searchbar style={styles.searchBar} placeholder="Search" onChangeText={setSearchQuery} value={searchQuery} />;
};

export default SearchBar;
