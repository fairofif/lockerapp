import React from "react";
import {
    createStackNavigator
} from '@react-navigation/stack'
import Login from '../screen/login'
import StatusLocker from "../screen/statuslocker";

const Stack = createStackNavigator();

const Router = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
            <Stack.Screen name="StatusLocker" component={StatusLocker} options={{headerShown: false}} />
        </Stack.Navigator>
    )
}

export default Router;