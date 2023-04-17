import { useRoute } from "@react-navigation/native";
import React from "react";
import { 
    Text,
    StyleSheet,
    View,
    TouchableOpacity
} from "react-native";
import StatusComponent from "../component/statuscomponent";
import ButtonTextComponent from "../component/buttonTextComponent";
import { useEffect, useState } from "react";

const StatusLocker = () => {

    const route = useRoute();
    const [isFilled, setIsFilled] = useState(false)
    const [currentLocker, setCurrentLocker] = useState("")

    useEffect(() => {
        fetchLockerID();
        fetchIsFilled();
    })

    const fetchLockerID = async () => {
        const url = "https://wakacipuy.my.id/lockerapi/getLockerID/"+route.params.username
        const value = await fetch(url)
            .then(res => {
                return res.json();
            })
            .then(res => {
                setCurrentLocker(res['lockerID']);
                return res;
            })
            .catch(err => {
                console.log(err);
            })
    }

    const fetchIsFilled = async () => {
        const url = "https://wakacipuy.my.id/lockerapi/isFilled/"+currentLocker
        const value = await fetch(url)
            .then(res => {
                return res.json();
            })
            .then(res => {
                setIsFilled(res['isFilled']);
                return res;
            })
            .catch(err => {
                console.log(err);
            })
    }

    const changeCondition = () => {
        var url;
        if (isFilled) {
            url = "https://wakacipuy.my.id/lockerapi/changeCondition/"+currentLocker+"/0"
        }
        else {
            url = "https://wakacipuy.my.id/lockerapi/changeCondition/"+currentLocker+"/1"
        }
        const value = fetch(url, {method: 'POST'})
            .then(res => {
                return res.json();
            })
            .then(res => {
                return res;
            })
            .catch(err => {
                console.log(err);
            })
        setIsFilled(!isFilled)
    }

    return (
        <View style={styles.main}>
            <Text style={styles.textLocker}>{currentLocker}</Text>
            <View style={styles.container}>
                <StatusComponent
                    isFilled={isFilled}
                />
                <TouchableOpacity 
                    style={styles.button}
                    onPress={changeCondition}
                >
                    <ButtonTextComponent
                        isFilled={isFilled}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}


export default StatusLocker;

const styles = StyleSheet.create({
    main: {
        flex:1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    textLocker: {
        marginTop: '20%',
        fontSize: 20
    },
    container: {
        marginTop: '20%',
        width: '100%',
        height: '100%',
        backgroundColor: '#292b2f',
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        alignItems: 'center'
    },
    button: {
        height: '5%',
        width: '40%',
        backgroundColor: '#7366FE',
        marginTop: '20%',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    }
})