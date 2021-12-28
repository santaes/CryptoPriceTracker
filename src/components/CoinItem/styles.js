import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  title: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 3,
    fontFamily: "Gilroy",
  },
  text: {
    color: "#ffffff",
    marginRight: 5,
    fontFamily: "Gilroy",
  },
  coinContainer: {
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#282828",
    padding: 15,
  },
  rank: {
    fontWeight: "bold",
    color: "#ffffff",
    fontFamily: "Gilroy",
  },
  rankContainer: {
    backgroundColor: "#585858",
    paddingHorizontal: 5,
    borderRadius: 5,
    marginRight: 5,
  },
});

export default styles;
