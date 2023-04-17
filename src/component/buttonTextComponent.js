import { Text, StyleSheet } from "react-native";

const ButtonTextComponent = ({isFilled}) => {
    if (isFilled) {
        return (
            <Text style={styles.text}>Set Empty</Text>
        )
    }
    else {
        return (
            <Text style={styles.text}>Set Filled</Text>
        )
    }
}

export default ButtonTextComponent;

const styles = StyleSheet.create({
    text: {
        color: 'white'
    }
})

