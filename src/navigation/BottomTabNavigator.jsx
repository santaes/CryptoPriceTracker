import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { Entypo } from "@expo/vector-icons";
import WatchListScreen from "../screens/WatchListScreen";
import { FontAwesome,Foundation } from "@expo/vector-icons";
import PortfolioScreen from "../screens/PortfolioScreen";

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: "#181818",
        },
        tabBarInactiveTintColor: "#c0c0c0",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Entypo name="home" size={focused ? 30 : 25} color={color} />
          ),
          tabBarActiveTintColor: "#ffffff",
          tabBarInactiveTintColor: "#c0c0c0",
        }}
      />
      <Tab.Screen
        name="WatchList"
        component={WatchListScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome name="star" size={focused ? 30 : 25} color={color} />
          ),
          tabBarActiveTintColor: "#ffffff",
          tabBatInactiveTintColor: "#c0c0c0",
        }}
      />
      <Tab.Screen
        name="PortFolio"
        component={PortfolioScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Foundation name="graph-pie" size={focused ? 35 : 30} color={color} />
          ),
          tabBarActiveTintColor: "#ffffff",
          tabBatInactiveTintColor: "#c0c0c0",
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
