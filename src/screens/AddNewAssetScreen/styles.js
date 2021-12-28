import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  dropdownContainer: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  item: {
    padding: 10,
    marginTop: 2,
    backgroundColor: "#1e1e1e",
    borderWidth: 0.5,
    borderColor: "#444444",
    borderRadius: 5,
  },
  textItem: {
    padding: 12,
    borderWidth: 1.5,
    borderColor: "#444444",
    borderRadius: 5,
    backgroundColor: "#1e1e1e",
    color: "#ffffff",
    fontFamily: "Gilroy",
  },
  textInput: {
    color: "#ffffff",
    fontSize: 90,
    
    marginRight:5,
  },
  ticker: {
    color: "#444444",
    fontWeight: "700",
    fontSize: 20,
    marginTop: 25,
    marginLeft: 10,
    fontFamily: "Gilroy",
  },
  boughtQuantityContainer: {
    alignItems: "center",
    marginTop: 50,
    flex: 1,
  },
  buttonContainer: {
    /* backgroundColor: "#4169E1", */
    padding: 10,
    alignItems: "center",
    marginVertical: 40,
    marginHorizontal: 25,
    borderRadius: 5,
  },
  buttonText: {
    /* color: "#ffffff", */
    fontSize: 17,
    fontWeight: "600",
    fontFamily: "Gilroy",
  },
  pricePerCoin: {
    color: "#444444",
    fontWeight: "600",
    fontSize: 17,
    letterSpacing:1,
    fontFamily: "Gilroy",
  },
});

export default styles;
