import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, Text, View, Image } from 'react-native';
import CoinItem from '../../components/CoinItem';
import { getMarketData } from '../../services/requests';

const HomeScreen = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoins = async (pageNumber) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getMarketData(pageNumber);
    setCoins((existingCoins) => [...existingCoins, ...coinsData]);
    setLoading(false);
  };
  const refetchCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getMarketData();
    setCoins(coinsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, []);
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: '5%',
        }}
      >
        <Text
          style={{
            color: '#ffffff',
            fontSize: 20,
            letterSpacing: 1,
            paddingHorizontal: 22,

            fontFamily: 'Gilroy',
          }}
        >
          Batsol Crypto Tracker
        </Text>
        <View style={{ marginRight: '10%' }}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 10,
                color: '#c0c0c0',
              }}
            >
              Powered by
            </Text>
            <Text
              style={{
                fontSize: 10,
                color: '#c0c0c0',
              }}
            >
              CoinGecko
            </Text>
          </View>
        </View>
      </View>

      <FlatList
        data={coins}
        renderItem={({ item }) => <CoinItem marketCoin={item} />}
        onEndReached={() => fetchCoins(coins.length / 50 + 1)}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            tintColor='#ffffff'
            onRefresh={refetchCoins}
          />
        }
      />
    </View>
  );
};

export default HomeScreen;
