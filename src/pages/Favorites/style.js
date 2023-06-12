import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#65945F",
    height:"100%"
  },
  fundo:{
    height:"100%"
  },
  itemContainer: {
    width: '90%',    
    flexDirection: 'row',    
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "space-evenly",
    margin:10
    
  },
  animeContainer: {
    width: '90%',
    backgroundColor: "#126635",    
    margin: 5,
    padding: 8,    
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "space-evenly",
    borderRadius: 25,
  },
  btnContainer: {      
    //flexDirection: 'row',
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "space-evenly",
  },
  btnBox:{
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "space-around",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 25,
  },
  textContainer: {
    backgroundColor: "#65945F",
    width: 180,
    height:100,    
    justifyContent: 'center',
    borderRadius: 25,
    padding:10
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',  
  },
  synopsisText: {
    fontSize: 8,       
  }, 
  episodeText: {
    fontSize: 10,    
  },
  starContainer: {
   position: "absolute",
   bottom: 8,   
   right: 15
  },
  starIcon: {
    fontSize: 8,
    opacity:0.5
  },
  epbtnUp:{  
    marginHorizontal:5,
    paddingHorizontal:10,
    backgroundColor:"#126635",
    margin:3,
    borderTopStartRadius:8,
    borderTopEndRadius:8,
  },
  epbtnDown:{   
    marginHorizontal:5,
    paddingHorizontal:10,
    backgroundColor:"#126635",
    margin:3,
    borderBottomStartRadius:8,
    borderBottomEndRadius:8,
    
  },
  epBtnRemove:{
    marginHorizontal:5,
    paddingHorizontal:10,
    backgroundColor:"#126635",
    margin:3,   
    borderRadius:8,
    color:"#900"
  },
  inputEp:{
    backgroundColor:"#ccc",
    fontSize:15,  
    width:100,
    alignItems: "center",
    textAlign:"center" 
  },
  box:{
    flexDirection:"row",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "space-around",
  }
});

export default styles;
