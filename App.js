import React from "react";
import { View, Text } from "react-native";
import AppNavigation from "./src/navigation/Navigation";
import { CartProvider } from "./src/components/CartContext"; // Import CartProvider

export default function App() {
  return (
    <CartProvider> {/* Wrap your entire app with CartProvider */}
      <AppNavigation />
    </CartProvider>
  );
}
