import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  currentBalance: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 10,
    fontFamily: "Gilroy",
  },
  currentBalanceValue: {
    color: "#ffffff",
    fontSize: 40,
    fontWeight: "700",
    letterSpacing: 1,
    marginLeft: 5,
    
  },

  valueChange: {
    marginLeft: 10,
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "Gilroy",
  },
  percentageChange: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Gilroy",
  },
  balanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 10,
  },
  priceChangePercentageContainer: {
    flexDirection: "row",

    borderRadius: 10,
    paddingHorizontal: 3,
    paddingVertical: 5,
  },
  assetsLabel: {
    fontSize: 23,
    fontWeight: "700",
    color: "#ffffff",
    paddingVertical: 20,
    paddingHorizontal: 10,
    fontFamily: "Gilroy",
  },
  buttonContainer: {
    backgroundColor: "#4169E1",
    padding: 10,
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "600",
    fontFamily: "Gilroy",
  },
  buttonClearContainer: {
    backgroundColor: "#ea3943",
    padding: 3,
    alignItems: "center",
    marginHorizontal: 130,
    borderRadius: 5,
    marginVertical: 5,
  },
});

export default styles;
