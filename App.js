import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput } from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";

export default function App() {
  const [drinks, setDrinks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const filteredDrinks = drinks.filter((drink) => drink.strDrink.toLowerCase().startsWith(searchQuery.toLowerCase()));

  useEffect(() => {
    const fetchDrinks = async () => {
      const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=all");
      setDrinks(response.data.drinks);
    };
    fetchDrinks();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>My Drinks</Text>
      <TextInput
        style={styles.searchInput}
        placeholder='Search Drinks...'
        defaultValue={searchQuery}
        onChangeText={handleSearch}></TextInput>
      {filteredDrinks.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No results!</Text>
        </View>
      ) : (
        <FlatList
          data={filteredDrinks}
          renderItem={({ item }) => (
            <View style={styles.drinkContainer}>
              <Image style={styles.drinkImage} source={{ uri: item.strDrinkThumb }}></Image>
              <Text style={styles.drinkName}>{item.strDrink}</Text>
            </View>
          )}
          keyExtractor={(item) => item.idDrink}></FlatList>
      )}

      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  text: {
    fontSize: 26,
    margin: 12,
  },
  drinkContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  drinkImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  drinkName: {
    fontSize: 16,
  },
  searchInput: {
    width: "75%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  noResultsContainer: {
    marginTop: 10,
  },
  noResultsText: {
    fontSize: 18,
    color: "red",
    marginBottom: 600,
  },
});
