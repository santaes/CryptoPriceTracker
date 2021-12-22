import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import CoinDetailScreen from "../screens/CoinDetailScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import AddNewAssetScreen from "../screens/AddNewAssetScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Root">
      <Stack.Screen
        name={"Root"}
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"CoinDetail"}
        component={CoinDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"AddNewAssetScreen"}
        component={AddNewAssetScreen}
        options={{ headerShown: false }}
      />
      
    </Stack.Navigator>
  );
};

export default Navigation;
