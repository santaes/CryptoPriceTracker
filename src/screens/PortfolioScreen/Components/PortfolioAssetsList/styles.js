import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  currentBalance: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
  currentBalanceValue: {
    color: "#ffffff",
    fontSize: 40,
    fontWeight: "700",
    letterSpacing: 1,
  },

  valueChange: {
    color: "#16c784",
    fontWeight: "600",
    fontSize: 16,
  },
  percentageChange: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
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
    backgroundColor: "#16c784",
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
  },
  buttonContainer: {
    backgroundColor: "#4169E1",
    padding: 10,
    alignItems: "center",
    marginVertical: 25,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "600",
  },
});

export default styles;
