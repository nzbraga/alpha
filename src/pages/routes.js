import { createNativeStackNavigator} from "@react-navigation/native-stack";

import { useContext } from "react";
import { AuthContext } from "../context/auth";

import Login from "./Login";
import Home from "./Home";
import Info from "./Info"
import Favorites from "./Favorites";
import CreateLogin from "./CreateLogin"


const Stack = createNativeStackNavigator();

function Routes(){   

    const {user} = useContext(AuthContext)
    //console.log(user)
    

    return(
        <Stack.Navigator >                        
               

            <Stack.Screen name='Login' component={Login} options={{headerShown:false}} />    
            <Stack.Screen name='CreateLogin' component={CreateLogin} options={{headerShown:false}} />                     
                                            
            <Stack.Screen name='Home' component={Home} options={{headerShown:false}} />
            <Stack.Screen name='Info' component={Info} options={{headerShown:false}} />  
            <Stack.Screen name='Favorites' component={Favorites} options={{headerShown:false}} />
            
            


        </Stack.Navigator>
    )
}

export default Routes;