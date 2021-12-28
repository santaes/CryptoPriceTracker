import React,{useState} from "react";
import { View, Text, Pressable,RefreshControl } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import styles from "./styles";
import PortfolioAssetItem from "../PortfolioAssetItem";
import { useNavigation } from "@react-navigation/native";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  allPortfolioAssets,
  allPortfolioBoughtAssetsInStorage,
} from "../../../../atoms/PortfolioAssets";
import { SwipeListView } from "react-native-swipe-list-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PortfolioAssetsList = () => {
  const navigation = useNavigation();

  const assets = useRecoilValue(allPortfolioAssets);
  const [storageAssets, setStorageAssets] = useRecoilState(
    allPortfolioBoughtAssetsInStorage
  );
  const [loading, setLoading] = useState(false);

  const getCurrentBalance = () =>
    assets.reduce(
      (total, currentAsset) =>
        total + currentAsset.currentPrice * currentAsset.quantityBought,
      0
    );

  const getCurrentValueChange = () => {
    const currentBalance = getCurrentBalance();
    const boughtBalance = assets.reduce(
      (total, currentAsset) =>
        total + currentAsset.priceBought * currentAsset.quantityBought,
      0
    );

    return (currentBalance - boughtBalance).toFixed(2);
  };

  const getCurrentPercentageChange = () => {
    const currentBalance = getCurrentBalance();
    const boughtBalance = assets.reduce(
      (total, currentAsset) =>
        total + currentAsset.priceBought * currentAsset.quantityBought,
      0
    );
    return (
      (((currentBalance - boughtBalance) / boughtBalance) * 100).toFixed(2) || 0
    );
  };

  const onDeleteAsset = async (asset) => {
    
    const newAssets = storageAssets.filter(
      (coin) => coin.unique_id !== asset.item.unique_id
    );
    const jsonValue = JSON.stringify(newAssets);
    await AsyncStorage.setItem("@portfolio_coins", jsonValue);
    setStorageAssets(newAssets);
  };
  const renderDeleteButton = (data) => {
    return (
      <Pressable
        style={{
          flex: 1,
          backgroundColor: "#ea3943",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingRight: 25,
          marginLeft: 20,
        }}
        onPress={() => onDeleteAsset(data)}
      >
        <FontAwesome name="trash-o" size={25} color="#ffffff" />
      </Pressable>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.balanceContainer}>
        <View>
          <Text style={styles.currentBalance}>Current Balance</Text>
          <Text style={styles.currentBalanceValue}>
            {getCurrentBalance().toFixed(2)}$
          </Text>
          <Text
            style={{
              ...styles.valueChange,
              color: getCurrentValueChange() >= 0 ? "#16c784" : "#ea3943",
            }}
          >
            {getCurrentValueChange()} $ (All Time)
          </Text>
        </View>
        <View
          style={{
            ...styles.priceChangePercentageContainer,
            backgroundColor:
              getCurrentValueChange() >= 0 ? "#16c784" : "#ea3943",
          }}
        >
          <AntDesign
            name={getCurrentValueChange() >= 0 ? "caretup" : "caretdown"}
            size={13}
            color={"#ffffff"}
            style={{ alignSelf: "center", marginRight: 5 }}
          />
          <Text style={styles.percentageChange}>
            {getCurrentPercentageChange()}%
          </Text>
        </View>
      </View>

      <View>
        <Text style={styles.assetsLabel}>Your Assets</Text>
      </View>
      <SwipeListView
        data={assets}
        renderItem={({ item }) => <PortfolioAssetItem assetItem={item} />}
        rightOpenValue={-70}
        disableRightSwipe
        renderHiddenItem={(data) => renderDeleteButton(data)}
        keyExtractor={({ id, unique_id, index }) => `${id}${unique_id}${index}`}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            tintColor="#ffffff"
            onRefresh={() => <PortfolioAssetsList/>}
          />
        }
      />

      <Pressable
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("AddNewAssetScreen")}
      >
        <Text style={styles.buttonText}>Add New Asset</Text>
      </Pressable>
    </View>
  );
};

export default PortfolioAssetsList;
