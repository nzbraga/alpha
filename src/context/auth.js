import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native'

export const AuthContext = createContext({});

function AuthProvider({children}){  
    
    const navigation = useNavigation()    
    
    const[user,setUser] = useState({})

        
    useEffect(() => {
        getData();
    }, []);      


    async function getData() {
        try {
          const jsonValue = await AsyncStorage.getItem('@AR');
          const data = JSON.parse(jsonValue);
          if (data) {setUser(data)}
          else {navigation.navigate("CreateLogin")}
        } catch (error) {
            console.error(error);
        }
    }    

    
    return(
        <AuthContext.Provider value={{
            user, 
        }}>            
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;



