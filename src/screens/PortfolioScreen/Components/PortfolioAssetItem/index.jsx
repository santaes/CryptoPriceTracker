import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";

const PortfolioAssetItem = () => {
  return (
    <View style={styles.coinContainer}>
      <Image source={{ uri: "" }} style={styles.image} />
      <View>
        <Text style={styles.name}>Bitcoin</Text>
        <Text style={styles.ticker}>BTC</Text>
      </View>
      <View style={{marginLeft:'auto'}}>
        <Text style={styles.name}>4000$</Text>
        <View style={{ flexDirection: "row" }}>
          <AntDesign
            name={"caretup"}
            size={13}
            color={"#16c784"}
            style={{ alignSelf: "center", marginRight: 5 }}
          />
          <Text style={{color:"#16c784", fontWeight:'700'}}>1.2%</Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
          <Text style={styles.name}>80000$</Text>
          <Text style={styles.ticker}>2 BTC</Text>
      </View>
    </View>
  );
};

export default PortfolioAssetItem;
