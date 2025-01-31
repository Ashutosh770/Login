import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const PokemonDetailScreen = ({ route }) => {
  const { pokemonData } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{pokemonData.name.toUpperCase()}</Text>
      <Image source={{ uri: pokemonData.sprites.front_default }} style={styles.image} />
      <Text style={styles.detail}>Height: {pokemonData.height}</Text>
      <Text style={styles.detail}>Weight: {pokemonData.weight}</Text>
      <Text style={styles.detail}>Base Experience: {pokemonData.base_experience}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  detail: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default PokemonDetailScreen;
