import React,{ useState, useEffect } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from '@react-navigation/native'
import { style } from "./style";


export default function CreateLogin() {

const [ userName, setUserName] = useState('')
const [ email, setEmail] = useState('')
const [ password, setPassword] = useState('')

const navigation = useNavigation()

const [ data, setData] = useState({}) 

async function CreateLogin(email, password) {  
  if (email !== '' && password !== '') {
    setData({
      name: userName,
      email,
      password,
      status: true
    });
    navigation.navigate("Home")
  }
}

const storeData = async (value) => {   
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@AR', jsonValue)
}

useEffect(() => {
  if (data.status && Object.keys(data).length !== 0) {
    storeData(data);
  }
}, [data.status]);



return(
  <View style={style.container}>

    <Image
      style={style.logo}
      source={require('../../components/img/icon-anima.jpg')}
    />
    <Text style={style.title}>Seja bem vindo!</Text>
    

    <TextInput
      style={style.input}
      value={userName}            
      onChangeText={(e)=>setUserName(e)}
      placeholder="Digite seu Usuario"
    />

    <TextInput
      style={style.input}
      value={email}            
      onChangeText={(e)=>setEmail(e)}
      placeholder="Digite seu email"
    />

    <TextInput
      style={style.input}
      value={password}            
      onChangeText={(e)=>setPassword(e)}
      placeholder="Digite seu password"
    />

    <TouchableOpacity style={style.button} onPress={()=>CreateLogin(email,password)}>
        <Text style={style.buttonText}>Criar</Text>
    </TouchableOpacity>
    
    <Text> ou  </Text>

      <TouchableOpacity style={style.button} onPress={()=>navigation.navigate("Login")}>
          <Text style={style.buttonText}> Logar </Text>
      </TouchableOpacity>   

  </View>
)}

