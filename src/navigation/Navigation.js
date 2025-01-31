import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// Import Screens
import LoginScreen from "../screens/LoginScreen"; 
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen"; 
import ProfileScreen from "../screens/ProfileScreen";
import CartScreen from "../screens/CartScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import RecipesScreen from "../screens/RecipesScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Product") {
            iconName = "headset";
          } else if (route.name === "Profile") {
            iconName = "person";
          } else if (route.name === "Cart") {
            iconName = "cart";
          } else if (route.name === "Recipes") {
            iconName = "flame";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Product" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Recipes" component={RecipesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Stack Navigator
const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="HomeTabs" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
};

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
