import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import SearchableDropdown from "react-native-searchable-dropdown";
import styles from "./styles";
import { useRecoilState } from "recoil";
import { allPortfolioBoughtAssetsInStorage } from "../../atoms/PortfolioAssets";
import { getAllCoins, getDetailCoinData } from "../../services/requests";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import uuid from 'react-native-uuid';

const AddNewAssetScreen = () => {
  const [allCoins, setAllCoins] = useState([]);
  const [boughtAssetQuantity, setBoughtAssetQuantity] = useState("");
  const [assetsInStorage, setAssetsInStorage] = useRecoilState(
    allPortfolioBoughtAssetsInStorage
  );
  const [loading, setLoading] = useState(false);
  const [selectedCoinId, setSelectedCoinId] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);

  const navigation = useNavigation();

  const isQuantityEntered = () => boughtAssetQuantity === "";

  const fetchAllCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const allCoins = await getAllCoins();
    setAllCoins(allCoins);
    setLoading(false);
  };

  const fetchCoinInfo = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinInfo = await getDetailCoinData(selectedCoinId);
    setSelectedCoin(coinInfo);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllCoins();
  }, []);

  useEffect(() => {
    if (selectedCoinId) {
      fetchCoinInfo();
    }
  }, [selectedCoinId]);

  const onAddNewAsset = async () => {
    const newAsset = {
      id: selectedCoin.id,
      unique_id: selectedCoin.id + uuid.v4(),
      name: selectedCoin.name,
      image: selectedCoin.image.small,
      ticker: selectedCoin.symbol.toUpperCase(),
      quantityBought: parseFloat(boughtAssetQuantity),
      priceBought: selectedCoin.market_data.current_price.usd,
      
    };

    const newAssets = [...assetsInStorage, newAsset];
    const jsonValue = JSON.stringify(newAssets);
    await AsyncStorage.setItem('@portfolio_coins', jsonValue);
    setAssetsInStorage(newAssets);
    navigation.goBack();
  };
  


  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 150}
      >
        <SearchableDropdown
          items={allCoins}
          onItemSelect={(item) => setSelectedCoinId(item.id)}
          containerStyle={styles.dropdownContainer}
          itemStyle={styles.item}
          itemTextStyle={{
            color: "#ffffff",
          }}
          resetValue={false}
          placeholder={selectedCoinId || "Select a coin"}
          placeholderTextColor="#ffffff"
          textInputProps={{
            underlineColorAndroid: "transparent",
            style: {
              padding: 12,
              borderWidth: 1.5,
              borderColor: "#444444",
              borderRadius: 5,
              backgroundColor: "#1e1e1e",
              color: "#ffffff",
            },
          }}
        />
        {selectedCoin && (
          <>
            <View style={styles.boughtQuantityContainer}>
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  value={boughtAssetQuantity}
                  onChangeText={setBoughtAssetQuantity}
                  placeholder="0"
                  keyboardType="numeric"
                  style={styles.textInput}
                  returnKeyType="done"
                  selectionColor={"#ffffff"}
                />
                <Text style={styles.ticker}>
                  {selectedCoin.symbol.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.pricePerCoin}>
                {selectedCoin.market_data.current_price.usd}$ per coin
              </Text>
            </View>
            <Pressable
              style={{
                ...styles.buttonContainer,
                backgroundColor: isQuantityEntered() ? "#303030" : "#4169E1",
              }}
              onPress={onAddNewAsset}
              disabled={isQuantityEntered()}
            >
              <Text
                style={{
                  ...styles.buttonText,
                  color: isQuantityEntered() ? "grey" : "#ffffff",
                }}
              >
                Add New Asset
              </Text>
            </Pressable>
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default AddNewAssetScreen;
