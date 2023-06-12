import { View, Text, Image, ScrollView, TouchableOpacity} from 'react-native'
import React from 'react'

import Header from '../../components/Header'
import style from './style';

import { useNavigation } from "@react-navigation/native";

export default function Info({ route }) {

  const nav = useNavigation()

  const anime = route.params.item
  console.log(anime.images.jpg.large_image_url)

  function handleAnimeFav(item) {
    nav.navigate('Favorites', { item });
    console.log("Fav-Info")
    console.log(item)
  }



  return (
    
<View style={style.containerBack}>
  <Header />
  <ScrollView style={style.container}>
    <View style={style.animeContainer}>
      <Text style={style.title}>{anime.title}</Text>

      <Text>{anime.title_japanese}</Text>        
      <>      
      <Image style={style.image} source={{ uri: anime.images.jpg.large_image_url }} />
      </>
      
      
      <View style={style.episodes}>
        <Text>Ano:</Text>
        <Text>{anime.year}  /  </Text>  

        <Text>Episodios:</Text>
        <Text>{anime.episodes}  /  </Text>         
 
        <Text>Rank:</Text>
        <Text>{anime.rank}</Text>         
      <TouchableOpacity onPress={() => handleAnimeFav(anime)} style={style.starContainer}>
          <Text style={style.starIcon}>❤️</Text>
      </TouchableOpacity>
      </View>
      

      <Text style={style.subTitle}>Sinopse:</Text>
      <Text style={style.synopsis}>{anime.synopsis}</Text>
    </View>
  
  </ScrollView>
</View>
  )
}