import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Image,ImageBackground, FlatList, TouchableOpacity, Alert } from 'react-native';

import { AuthContext } from '../../context/auth';
import styles from './style'

import Header from '../../components/Header'
import SearchBar from "../../components/SearchBar";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native"



function Favorites({ route }) {

  //console.log(route.params.item)

  const navigation = useNavigation()
  const { user } = useContext(AuthContext)
  const [search, setSearch] = useState('');

  const [favorites, setFavorites] = useState([]);
  const [isDuplicate, setIsDuplicate] = useState(false);

  const [currentEp, setCurrentEp] = useState('')
  const [animeEp, setAnimeEp] = useState('')
  const [newEp, setNewEp] = useState('')

  const handleSearch = () => {
    getData();
  };

  function getList() {
    AsyncStorage.getItem('@ARList').then((storedData) => {
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setFavorites(parsedData);
      }
    });
  }
  function handleRemoveAnime(item) {
    
  
    AsyncStorage.getItem('@ARList').then((storedData) => {
      let existingFavorites = [];
      if (storedData) {
        existingFavorites = JSON.parse(storedData);
      }

      const updatedFavorites = existingFavorites.filter(
        (favorite) => favorite.title !== item.title
      );

      AsyncStorage.setItem('@ARList', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    });
  
        
   
  }


  function handleAnimeInfo(item) {
    navigation.navigate('Info', { item });
    //console.log("Info")
  }

  function handleCurrentUp(n,item) {
    if(n<= item.episodes){
    const newCep = Number(n)
    const newCurrentEp = newCep +1
    setCurrentEp(newCurrentEp);
    updateCurrentEp(item, newCurrentEp);
  }
    }
  function handleCurrentDown(n, item) {
    if(n>0){
      const newCep = Number(n)  
      const newCurrentEp = newCep -1
      setCurrentEp(newCurrentEp);
      updateCurrentEp(item, newCurrentEp);
    }
    }

  function updateCurrentEp(item, newCurrentEp) {
    
    AsyncStorage.getItem('@ARList').then((storedData) => {
      let existingFavorites = [];
      if (storedData) {
        existingFavorites = JSON.parse(storedData);
      }

      const updatedFavorites = existingFavorites.map((favorite) => {
        if (favorite.title === item.title) {
          return { ...favorite, cEp: newCurrentEp };
        }
        return favorite;
      });

      AsyncStorage.setItem('@ARList', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    });
    
  }

  function updateAnimeEp(item, newAnimeEp) {
    AsyncStorage.getItem('@ARList').then((storedData) => {
      let existingFavorites = [];
      if (storedData) {
        existingFavorites = JSON.parse(storedData);
      }

      const updatedFavorites = existingFavorites.map((favorite) => {
        if (favorite.title === item.title) {
          return { ...favorite, episodes: newAnimeEp };
        }
        return favorite;
      });

      AsyncStorage.setItem('@ARList', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    });
  }



  useEffect(() => {
    getList()
  }, [AsyncStorage]);



  useEffect(() => {
    if (route.params?.item) {
      const newItem = route.params.item;
      

      //console.log(newItem)

      AsyncStorage.getItem('@ARList').then((storedData) => {
        let existingFavorites = [];
        if (storedData) {
          existingFavorites = JSON.parse(storedData);
        }

        const isDuplicate = existingFavorites.some((favorite) => favorite.title === newItem.title);
        if (isDuplicate) {
          setIsDuplicate(true);                  
        } else {         
          newItem.cEp = 0
          const updatedFavorites = [newItem, ...existingFavorites];
          AsyncStorage.setItem('@ARList', JSON.stringify(updatedFavorites));
          setFavorites(updatedFavorites);
          setIsDuplicate(false);
        }
      });
    }
  }, [route.params?.item]);


  const renderItem = ({ item }) => (

    <View style={styles.animeContainer} >
      {/*console.log(item)*/}

      <Text style={styles.titleText}>
        {item.title.length > 30
          ? item.title.substring(0, 30) + '...'
          : item.title
        }
      </Text>
      <View style={styles.itemContainer}>


        <View>
          <TouchableOpacity onPress={() => handleAnimeInfo(item)}>
            <Image source={{ uri: item.images.jpg.large_image_url }} style={styles.image} />
          </TouchableOpacity>
        </View>



        <View style={styles.textContainer}>



          <View>
            <View style={styles.box}>
              {item.episodes === item.cEp ?
              <>
              <Text>✅</Text>
              <TouchableOpacity onPress={() => handleRemoveAnime(item)}>
              <Text style={styles.epBtnRemove}>x</Text>
            </TouchableOpacity>
            </>
              :
              <>
              <View style={styles.btnContainer}>
                
                <Text style={styles.episodeText}>Episodes:</Text>

                <TextInput
                style={styles.inputEp}
                //keyboardType="numeric"
                value={item.episodes}
                onChangeText={(v)=>updateAnimeEp(item, v)} />

                <Text style={styles.episodeText}>Assistidos:</Text>

                <TextInput
                style={styles.inputEp}
                //keyboardType="numeric"
                value={item.cEp}
                onChangeText={(v)=>updateCurrentEp(item, v)} />

              </View>
              
              <View style={styles.btnBox} >
                <TouchableOpacity onPress={() => handleRemoveAnime(item)}>
                  <Text style={styles.epbtnUp}>x</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCurrentUp(item.cEp, item)}>
                  <Text style={styles.epbtnUp}>▲</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCurrentDown(item.cEp, item)}>
                  <Text style={styles.epbtnDown}>▼</Text>
                </TouchableOpacity>
              </View>
              </>
}
            </View>
          </View>


        </View>

      </View>


    </View>

  );

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.fundo}  source={require('../../components/img/loading.gif')}>
      <Header />


      <FlatList
        data={favorites}
        keyExtractor={({ item }, index) => index.toString()}
        renderItem={renderItem}
      />
      </ImageBackground>                
    </View>
  );
}




export default Favorites;
