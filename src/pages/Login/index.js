import React,{ useContext, useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation } from '@react-navigation/native';
import { AuthContext } from "../../context/auth";

import { style } from "./style";

export default function Login() {

  const {user} = useContext(AuthContext)

    const [ name, setName] = useState('')
    const [ password, setPassword] = useState('')    

    const [ data, setData] = useState({}) 

    const navigation = useNavigation()

    function handleLogin(name, password) {

      // (name === user.name && password === user.password) {
      if (name !== "") {
        setData({
          name,
          email: user.name,
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
    
    // mudar o user status por login true/false
    useEffect(()=>{
      {user.status === true ? 
        navigation.navigate("Home")
        :
        navigation.navigate("Login")
      }
    },[user.status])



    return(
        <View style={style.container}>
            <Text style={style.title}>Seja bem vindo!</Text>

            <TextInput
            style={style.input}
            value={name}
            onChangeText={(text)=> setName(text)}
            placeholder="Digite seu Usuario"
            />

            <TextInput
            style={style.input}
            value={password}
            onChangeText={(text)=> setPassword(text)}
            placeholder="Digite seu password"
            />

            <TouchableOpacity style={style.button} onPress={()=>handleLogin(name,password)}>
                <Text style={style.buttonText}>Acessar</Text>
            </TouchableOpacity>
        </View>
    )

}


