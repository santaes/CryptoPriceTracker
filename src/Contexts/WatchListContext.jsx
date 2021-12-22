import React, { useContext, createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WatchListContext = createContext();

export const useWatchList = () => useContext(WatchListContext);

const WatchListProvider = ({ children }) => {
  const [watchListCoinIds, setWatchListCoinIds] = useState([]);

  const getWatchListData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@watchList_coins");
      setWatchListCoinIds(jsonValue !== null ? JSON.parse(jsonValue) : []);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getWatchListData();
  }, []);

  const storeWatchListCoinId = async (coinId) => {
    try {
      const newWatchList = [...watchListCoinIds, coinId];
      const jsonValue = JSON.stringify(newWatchList);
      await AsyncStorage.setItem("@watchList_coins", jsonValue);
      setWatchListCoinIds(newWatchList);
    } catch (e) {
      console.log(e);
    }
  };

  const removeWatchListCoinId = async (coinId) => {
    const newWatchList = watchListCoinIds.filter((coinIdValue) => coinIdValue !== coinId);
    const jsonValue = JSON.stringify(newWatchList);
    await AsyncStorage.setItem("@watchList_coins", jsonValue);
    setWatchListCoinIds(newWatchList);
  }

  

  return (
    <WatchListContext.Provider value={{ watchListCoinIds, storeWatchListCoinId,removeWatchListCoinId }}>
      {children}
    </WatchListContext.Provider>
  );
};

export default WatchListProvider;
