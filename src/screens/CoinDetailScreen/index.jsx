import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Dimensions,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Header from './Header';
import styles from './styles';
import { AntDesign } from '@expo/vector-icons';
import { LineChart, CandlestickChart } from 'react-native-wagmi-charts';
import { useRoute } from '@react-navigation/native';
import {
  getCoinMarketChart,
  getDetailCoinData,
  getCandleChartData,
} from '../../services/requests';
import FilterComponent from './FilterComponent';
import { MaterialIcons } from '@expo/vector-icons';

const filterDaysArray = [
  { filterDay: '1', filterText: '24 H' },
  { filterDay: '7', filterText: '7 D' },
  { filterDay: '30', filterText: '30 D' },
  { filterDay: '365', filterText: '1 Y' },
  { filterDay: 'max', filterText: 'All time' },
];

const CoinDetailScreen = () => {
  const [coin, setCoin] = useState(null);
  const [coinMarketData, setCoinMarketData] = useState(null);
  const [coinCandleChartData, setCoinCandleChartData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [coinValue, setCoinValue] = useState('1');
  const [usdValue, setUsdValue] = useState('');
  const [selectedRange, setSelectedRange] = useState('1');
  const [isCandleChartVisible, setIsCandleChartVisible] = useState(false);

  const route = useRoute();

  const {
    params: { coinId },
  } = route;

  const fetchCoinData = async () => {
    setLoading(true);
    const fetchedCoinData = await getDetailCoinData(coinId);
    const fetchedCoinMarketData = await getCoinMarketChart(
      coinId,
      selectedRange,
    );
    setCoin(fetchedCoinData);
    setCoinMarketData(fetchedCoinMarketData);
    setUsdValue(fetchedCoinData.market_data.current_price.usd.toString());
    setLoading(false);
  };

  const fetchMarketCoinData = async (selectedRangeValue) => {
    const fetchedCoinMarketData = await getCoinMarketChart(
      coinId,
      selectedRangeValue,
    );
    setCoinMarketData(fetchedCoinMarketData);
  };

  const fetchCandleStickChartData = async (selectedRangeValue) => {
    const fetchedSelectedCandleStickChartData = await getCandleChartData(
      coinId,
      selectedRangeValue,
    );
    setCoinCandleChartData(fetchedSelectedCandleStickChartData);
  };

  useEffect(() => {
    fetchCoinData();
    fetchMarketCoinData(1);
    fetchCandleStickChartData();
  }, []);
  const onSelectedRangeChange = (selectedRangeValue) => {
    setSelectedRange(selectedRangeValue);
    fetchMarketCoinData(selectedRangeValue);
    fetchCandleStickChartData(selectedRangeValue);
  };

  const memoOnSelectedRangeChange = React.useCallback(
    (range) => onSelectedRangeChange(range),
    [],
  );

  if (loading || !coin || !coinMarketData || !coinCandleChartData) {
    return <ActivityIndicator size='large' />;
  }
  const {
    id,
    image: { small },
    symbol,
    name,

    market_data: {
      market_cap_rank,
      current_price,
      price_change_percentage_24h,
    },
  } = coin;
  const { prices } = coinMarketData;

  const formatCurrency = ({ value }) => {
    'worklet';
    if (value === '') {
      if (current_price.usd < 1) {
        return `${current_price.usd} US $`;
      }
      return `${current_price.usd.toFixed(2)} US $`;
    }
    if (current_price.usd < 1) {
      return `${parseFloat(value).toFixed(8)} US $`;
    }
    return `${parseFloat(value).toFixed(2)} US $`;
  };

  const changeCoinValue = (value) => {
    setCoinValue(value);
    const floatValue = parseFloat(value.replace(',', '.')) || 0;
    setUsdValue((floatValue * current_price.usd).toFixed(3).toString());
  };
  const changeUsdValue = (value) => {
    setUsdValue(value);
    const floatValue = parseFloat(value.replace(',', '.')) || 0;
    setCoinValue((floatValue / current_price.usd).toFixed(6).toString());
  };
  const percentageColor =
    price_change_percentage_24h < 0 ? '#ea3943' : '#16c784' || '#ffffff';

  const chartColor = current_price.usd > prices[0][1] ? '#16c784' : '#ea3943';

  const screenWidth = Dimensions.get('window').width;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 100}
    >
      <ScrollView style={{ paddingHorizontal: 10, flex: 1 }}>
        <Header
          coinId={id}
          image={small}
          symbol={symbol}
          name={name}
          marketCapRank={market_cap_rank}
        />
        <LineChart.Provider
          data={prices.map(([timestamp, value]) => ({ timestamp, value }))}
        >
          <View style={styles.priceContainer}>
            <View>
              <Text style={styles.name}>{name}</Text>
              <LineChart.PriceText
                style={styles.currentPrice}
                format={formatCurrency}
              />
            </View>
            <View
              style={{
                paddingVertical: 8,
                paddingHorizontal: 3,
                borderRadius: 5,
                flexDirection: 'row',
                backgroundColor: percentageColor,
              }}
            >
              <AntDesign
                name={price_change_percentage_24h < 0 ? 'caretdown' : 'caretup'}
                size={13}
                color={'#ffffff'}
                style={{ alignSelf: 'center', marginRight: 5 }}
              />
              <Text style={styles.priceChange}>
                {price_change_percentage_24h?.toFixed(2)}%
              </Text>
            </View>
          </View>
          <View style={styles.filtersContainer}>
            {filterDaysArray.map((day) => (
              <FilterComponent
                filterDay={day.filterDay}
                filterText={day.filterText}
                selectedRange={selectedRange}
                setSelectedRange={memoOnSelectedRangeChange}
                key={day.filterText}
              />
            ))}
            {isCandleChartVisible ? (
              <TouchableOpacity onPress={() => setIsCandleChartVisible(false)}>
                <MaterialIcons name='show-chart' size={24} color='#16c784' />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setIsCandleChartVisible(true)}>
                <MaterialIcons
                  name='waterfall-chart'
                  size={24}
                  color='#16c784'
                />
              </TouchableOpacity>
            )}
          </View>

          {isCandleChartVisible ? (
            <CandlestickChart.Provider
              data={coinCandleChartData.map(
                ([timestamp, open, high, low, close]) => ({
                  timestamp,
                  open,
                  high,
                  low,
                  close,
                }),
              )}
            >
              <CandlestickChart
                height={screenWidth / 2}
                width={screenWidth - 15}
              >
                <CandlestickChart.Candles />
                <CandlestickChart.Crosshair>
                  <CandlestickChart.Tooltip />
                </CandlestickChart.Crosshair>
              </CandlestickChart>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View>
                  <Text style={styles.candleStickTextLabel}>Open</Text>
                  <CandlestickChart.PriceText
                    type='open'
                    style={styles.candleStickText}
                  />
                </View>
                <View>
                  <Text style={styles.candleStickTextLabel}>High</Text>
                  <CandlestickChart.PriceText
                    type='high'
                    style={styles.candleStickText}
                  />
                </View>
                <View>
                  <Text style={styles.candleStickTextLabel}>Low</Text>
                  <CandlestickChart.PriceText
                    type='low'
                    style={styles.candleStickText}
                  />
                </View>
                <View>
                  <Text style={styles.candleStickTextLabel}>Close</Text>
                  <CandlestickChart.PriceText
                    type='close'
                    style={styles.candleStickText}
                  />
                </View>
              </View>
              <CandlestickChart.DatetimeText
                style={{ color: 'white', fontWeight: '700', margin: 10 }}
              />
            </CandlestickChart.Provider>
          ) : (
            <LineChart height={screenWidth / 2} width={screenWidth - 15}>
              <LineChart.Path color={chartColor} />
              <LineChart.CursorCrosshair color={chartColor} />
            </LineChart>
          )}

          <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <Text style={{ color: '#ffffff', alignSelf: 'center' }}>
                {symbol.toUpperCase()}
              </Text>
              <TextInput
                style={styles.input}
                value={coinValue}
                keyboardType='numeric'
                onChangeText={changeCoinValue}
                returnKeyType='done'
              />
            </View>

            <View style={{ flexDirection: 'row', flex: 1 }}>
              <Text style={{ color: '#ffffff', alignSelf: 'center' }}>USD</Text>
              <TextInput
                style={styles.input}
                value={usdValue}
                keyboardType='numeric'
                onChangeText={changeUsdValue}
                returnKeyType='done'
              />
            </View>
          </View>
        </LineChart.Provider>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CoinDetailScreen;
