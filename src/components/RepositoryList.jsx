import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import { useState } from "react";
import OrderBar from "./OrderBar";
import SearchBar from "./SearchBar";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const orderOptions = {
  latest: { orderBy: "CREATED_AT", orderDirection: "DESC" },
  highest: { orderBy: "RATING_AVERAGE", orderDirection: "DESC" },
  lowest: { orderBy: "RATING_AVERAGE", orderDirection: "ASC" },
};

export const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, onPressRepository, listHeader }) => {
  const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => onPressRepository(item.id)}>
          <RepositoryItem repository={item} />
        </Pressable>
      )}
      ListHeaderComponent={listHeader}
    />
  );
};

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchKeyword] = useDebounce(searchQuery, 500);

  const { orderBy, orderDirection } = orderOptions[selectedOrder];

  const { repositories } = useRepositories({ orderBy, orderDirection, searchKeyword });

  const navigate = useNavigate();

  return (
    <RepositoryListContainer
      repositories={repositories}
      onPressRepository={(id) => navigate(`/repository/${id}`)}
      listHeader={
        <>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <OrderBar selectedOrder={selectedOrder} onSelect={setSelectedOrder} />
        </>
      }
    />
  );
};

export default RepositoryList;
