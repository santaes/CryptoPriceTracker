import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React,{useEffect} from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import Navigation from "./src/navigation";
import WatchListProvider from "./src/Contexts/WatchListContext";
import { useFonts } from 'expo-font';

import { RecoilRoot } from "recoil";



import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {

  const [loaded] = useFonts({
    Gilroy: require("./assets/fonts/Gilroy-Bold.ttf"),
  });
  
  if (!loaded) {
    return null;
  }

/*   let [fontsLoaded] = useFonts({
    
    Gilroy: require("./assets/fonts/Gilroy-Bold.ttf"),
  });

  if (!fontsLoaded) {
    <ActivityIndicator size={"large"} />;
  } */

  return (
    <NavigationContainer
      theme={{
        colors: {
          background: "#121212",
        },
      }}
    >
      <RecoilRoot>
        <WatchListProvider>
          <View style={styles.container}>
            <Navigation />
          </View>
          <StatusBar style="light" />
        </WatchListProvider>
      </RecoilRoot>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 50,
  },
});
