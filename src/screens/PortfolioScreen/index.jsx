import React from "react";
import { View, Text, FlatList } from "react-native";
import PortfolioAssetsList from './Components/PortfolioAssetsList';

const PortfolioScreen = () => {
  return (
    <View>
      <PortfolioAssetsList/>
    </View>
  );
};

export default PortfolioScreen;
