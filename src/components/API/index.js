import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";



import SearchBar from "../SearchBar";
import AnimeList from "../AnimeList";




function API({ route }) {

  const nav = useNavigation();
  const [search, setSearch] = useState('');
  const [data, setData] = useState({}); 
 

  const handleSearch = () => {
    getData();
  };

  const getData = async () => {
    if (search) {
      const res = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&sfw`);
      const { data } = await res.json();
      setData(data);
    }
  };

  useEffect(() => {
    if (route) {
      setSearch(searchCurrent);
    }
    getData();
  }, []);


  return (

  <View  >

    <SearchBar
     search={search}
     onSearchChange={setSearch}
     onSearchSubmit={handleSearch}
    />  
   
    <AnimeList
    search={search}
    data={data}
    navigation={nav}
    />   
  

  </View>
  )
}

export default API;