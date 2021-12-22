import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useWatchList } from "../../Contexts/WatchListContext";
import { useNavigation } from "@react-navigation/native";

const Header = (props) => {
  const { image, symbol, marketCapRank, coinId } = props;
  const navigation = useNavigation();
  const { watchListCoinIds, storeWatchListCoinId, removeWatchListCoinId } =
    useWatchList();

  const checkIfCoinIsWatchListed = () =>
    watchListCoinIds.some((coinIdValue) => coinIdValue === coinId);

  const handleWatchListCoin = () => {
    if (checkIfCoinIsWatchListed()) {
      return removeWatchListCoinId(coinId);
    }
    return storeWatchListCoinId(coinId);
  };
  return (
    <View style={styles.container}>
      <Ionicons
        name="chevron-back-sharp"
        size={30}
        color="#ffffff"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.tickerContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <Text style={styles.symbol}>{symbol.toUpperCase()}</Text>
        <View style={styles.rankContainer}>
          <Text style={styles.rank}>#{marketCapRank}</Text>
        </View>
      </View>

      <FontAwesome
        name={checkIfCoinIsWatchListed() ? "star" : "star-o"}
        size={24}
        color={checkIfCoinIsWatchListed() ? "#f8d718" : "#ffffff"}
        onPress={handleWatchListCoin}
      />
    </View>
  );
};

export default Header;
