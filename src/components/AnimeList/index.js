import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";

import styles from "./style";

import { useNavigation } from "@react-navigation/native";

function ApiList({ data }) {

  const navigation = useNavigation()

  const [animeFav, setAnimeFav] = useState({})


  const renderItem = ({ item }) => (


    <View style={styles.itemContainer}>

      <View style={styles.imageContainer}>

        <TouchableOpacity onPress={() => handleAnimeInfo(item)}>
          <Image source={{ uri: item.images.jpg.large_image_url }} style={styles.image} />
        </TouchableOpacity>


      </View>

      <View style={styles.textContainer}>

        <Text style={styles.titleText}>
          {item.title.length > 18
            ? item.title.substring(0, 18) + '...' 
            : item.title
          }

        </Text>

        <Text style={styles.synopsisText}>

          {item.synopsis && item.synopsis.length > 15
            ? item.synopsis.substring(0, 55) + '...' 
            : item.synopsis
          }
        </Text>

        {item.episodes > 1 ?
          <>
            <Text style={styles.episodeText}>Episodes: {item.episodes}</Text>
          </>
          :
          <>
            <Text> OVA / Filme </Text>
          </>}

        <TouchableOpacity onPress={() => handleAnimeFav(item)} style={styles.starContainer}>
          <Text style={styles.starIcon}>🤍</Text>
        </TouchableOpacity>

      </View>


    </View>

  );

  function handleAnimeInfo(item) {
    navigation.navigate('Info', { item });
    //console.log("Info" + item)
  }
  function handleAnimeFav(item) {  
    
    navigation.navigate('Favorites', {item} );
    //console.log("Fav" + item)
   
    
  }
  
  return (
    <View style={styles.container}>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.mal_id.toString()}
      />
    </View>
  );
}

export default ApiList;
