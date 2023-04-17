import { View, StyleSheet, Image } from "react-native";


const StatusComponent = ({isFilled}) => {
    if (isFilled) {
        return (
            <View style={styles.circularContainer}>
                <Image
                    source={require('../../assets/boxclose.png')}
                    style={styles.statusBox}
                />
            </View>
        )
    }
    else {
        return (
            <View style={styles.circularContainer}>
                <Image
                    source={require('../../assets/boxopen.png')}
                    style={styles.statusBox}
                />
            </View>
        )
    }
}

export default StatusComponent;

const styles = StyleSheet.create({
    circularContainer: {
        width: '40%',
        aspectRatio: 1,
        backgroundColor: 'white',
        marginTop: '20%',
        borderRadius: 85,
        alignItems: 'center',
        justifyContent: 'center'
    },
    statusBox: {
        width: '70%',
        height: '70%'
    }
})