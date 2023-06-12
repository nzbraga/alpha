import React from "react";
import { View, StatusBar, ImageBackground } from "react-native";

import { useNavigation } from '@react-navigation/native';

import API from '../../components/API'
import Header from '../../components/Header'
import { styles } from "./style";

export default function Home(){
    
    const navigation = useNavigation()

    return(
        <View style={styles.container} >

            <ImageBackground style={styles.fundo}  source={require('../../components/img/loading.gif')}>                
            <StatusBar/>
            <Header />
            <API/>            
            </ImageBackground>
            
        </View>
    )
}

