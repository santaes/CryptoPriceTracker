import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";


const PortfolioAssetItem = ({ assetItem }) => {
  const {
    currentPrice,
    image,
    name,
    priceBought,
    priceChangePercentage,
    quantityBought,
    ticker,
  } = assetItem;

  const isChangePositive = () => priceChangePercentage >= 0 ;

 
  

  return (
    <View style={styles.coinContainer}>
      <Image source={{ uri: image}} style={styles.image} />
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.ticker}>{ticker}</Text>
      </View>
      <View style={{ marginLeft: "auto",alignItems:'flex-end' }}>
        <Text style={styles.name}>{currentPrice?.toFixed(2)}$</Text>
        <View style={{ flexDirection: "row",alignSelf:'flex-end' }}>
          <AntDesign
            name={isChangePositive() ? "caretup" : "caretdown"}
            size={13}
            color={isChangePositive() ?   "#16c784" : "#ea3943" }
            style={{ alignSelf: "center", marginRight: 5 }}
          />
          <Text style={{ color: isChangePositive() ?  "#16c784" : "#ea3943", fontWeight: "700",alignSelf:'center', }}>{priceChangePercentage?.toFixed(2)}%</Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <Text style={styles.name}>{(currentPrice * quantityBought)?.toFixed(3)}$</Text>
        <Text style={styles.ticker}>{quantityBought} {ticker}</Text>
      </View>
    </View>
  );
};

export default PortfolioAssetItem;
