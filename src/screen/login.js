import {
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    View,
    TouchableOpacity,
    TextInput,
    Keyboard
} from 'react-native'

import React, {
    useState
} from 'react'

const Login = ({navigation}) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const url = "https://wakacipuy.my.id/lockerapi/login/"+username+"/"+password;
        const value = await fetch(url)
            .then(res => {
                return res.json();
            })
            .then(res => {
                return (res);
            })
            .catch(err => {
                console.log(err);
            })
        if (value.status) {
            navigation.navigate('StatusLocker', {username})
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Username"
                    value={username}
                    onChangeText={text => setUsername(text)}
                    style={styles.inputBox}
                />

                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.inputBox}
                    secureTextEntry
                />
            </View>
            <TouchableOpacity
                onPress={handleLogin}
                style={styles.button}
            >
                <Text style={styles.buttonText}>
                    Login    
                </Text>   
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#292b2f'
    },
    inputContainer: {
        width: '80%'
    },
    inputBox: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5
    },
    button: {
        backgroundColor: '#7366FE',
        width: '40%',
        marginTop: 8,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: 'white',
        elevation: 6
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
})