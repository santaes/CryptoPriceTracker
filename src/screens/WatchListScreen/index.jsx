import React, { useState, useEffect } from "react";
import { FlatList, RefreshControl } from "react-native";
import { useWatchList } from "../../Contexts/WatchListContext";
import CoinItem from "../../components/CoinItem";
import { getWatchListedCoins } from "../../services/requests";

const WatchListScreen = () => {
  const { watchListCoinIds } = useWatchList();

  
  const [coins, setCoins] = useState([]);

  const [loading, setLoading] = useState(false);

  const transformCoinIds = () => watchListCoinIds.join("%2C");

  const fetchWatchListedCoins = async () => {
    if (loading) {
      return;
    }

    setLoading(true);
    const watchListedCoinsData = await getWatchListedCoins(
      1,
      transformCoinIds()
    );
    setCoins(watchListedCoinsData);
    setLoading(false);
  };

  /*   useEffect(() => {
    fetchWatchListedCoins();
  }, []); */

  useEffect(() => {
    fetchWatchListedCoins();
  }, [watchListCoinIds]);

  return (
    <FlatList
      data={coins}
      renderItem={({ item }) =>  <CoinItem marketCoin={item} /> }
      refreshControl={
        <RefreshControl
          refreshing={loading}
          tintColor="#ffffff"
          onRefresh={fetchWatchListedCoins}
        />
      }
    />
  );
};

export default WatchListScreen;
