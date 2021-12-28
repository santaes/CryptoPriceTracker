import React, { Suspense } from "react";
import { View, Text,ActivityIndicator } from "react-native";
import PortfolioAssetsList from "./Components/PortfolioAssetsList";

const PortfolioScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Suspense
        fallback={
        <View style={{alignItems:'center', justifyContent:'center'}}>
          <ActivityIndicator size={"large"} color={"#ffffff"} />
        </View>
      }
      >
        <PortfolioAssetsList />
      </Suspense>
    </View>
  );
};

export default PortfolioScreen;
