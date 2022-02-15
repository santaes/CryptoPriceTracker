import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  image: {
    width: 25,
    height: 25,
  },
  symbol: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginHorizontal: 5,
    fontSize: 17,
    fontFamily: 'Gilroy',
  },
  rank: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'Gilroy',
  },
  rankContainer: {
    backgroundColor: '#565656',
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  container: {
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentPrice: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '600',
    letterSpacing: 1,
    fontFamily: 'Gilroy',
    alignItems: 'flex-start',
    marginHorizontal: 5,
  },
  name: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Gilroy',
  },
  priceContainer: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceChange: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },
  input: {
    flex: 1,
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
    padding: 10,
    fontSize: 16,
    color: '#ffffff',
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2b2b2b',
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 10,
    marginBottom: 20,
  },
  candleStickText: {
    color: 'white',
    fontWeight: '700',
  },
  candleStickTextLabel: {
    color: '#c0c0c0',
    fontSize: 13,
  },
});

export default styles;
