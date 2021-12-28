import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  image: {
    height: 30,
    width: 30,
    alignSelf:'center',
  },
  name: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft:5,
    alignSelf:'flex-end',
    fontFamily: "Gilroy",
  },
  ticker: {
    color: "#c0c0c0",
    fontWeight: "600",
    marginLeft:5,
    fontFamily: "Gilroy",
    
  },
  coinContainer: {
    flexDirection: "row",
    padding: 15,
    backgroundColor:"#121212",
    
    
    
  },
  quantityContainer:{
      marginLeft:'auto',
      alignItems:'flex-end',
  },
});
export default styles;
