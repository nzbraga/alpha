import React, { useContext, useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { AuthContext } from '../../context/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';
import{useNavigation} from '@react-navigation/native'



 // Defaults to the Classic family, Solid style

import  styles  from './style';


const Header = () => {

    const { user } = useContext(AuthContext)
    const [data, setData] = useState({})   

    const nav = useNavigation()

    function handleLogOut() {
        LogOut()
    }
    
    async function LogOut() {
        setData({
            name: user.name,
            email: user.email,
            password: user.password,
            status: false
        });
    }

    const storeData = async (value) => {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@AR', jsonValue)
    }

    useEffect(() => {
        if (data.status === false && Object.keys(data).length !== 0) {
            storeData(data);
            nav.navigate("Login")
        }
    }, [data]);
    

    return (

        
        <View style={styles.header}>
            
            <View style={styles.user}>
            <Image
                style={styles.image}
                source={require('../img/photo.jpg')}
                />
                <TouchableOpacity  style={styles.headerNameBtn}
                onPress={()=>nav.navigate('Home')}                >
                <Text style={styles.headerName}> {user.name} </Text>    
                </TouchableOpacity>
            </View>


            <View style={styles.nav}>

               

                <TouchableOpacity 
                style={styles.btn}
                onPress={() => nav.navigate('Home')}
                >
                    <Text>🏠</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={styles.btn}
                onPress={() => nav.navigate('Favorites')}
                >
                    <Text>♥️</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.btn}
                onPress={() => handleLogOut()}
                >
                    <Text>🚪</Text>
                </TouchableOpacity>

                <Image
                style={styles.logo}
                source={require('../img/icon-anima.jpg')}
                />

            </View>

        </View>

    )
}

export default Header