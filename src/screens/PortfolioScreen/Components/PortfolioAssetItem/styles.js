import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  image: {
    height: 30,
    width: 30,
  },
  name: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  ticker: {
    color: "#c0c0c0",
    fontWeight: "600",
  },
  coinContainer: {
    flexDirection: "row",
    padding: 15,
    
  },
  quantityContainer:{
      marginLeft:'auto',
      alignItems:'flex-end',
  },
});
export default styles;
