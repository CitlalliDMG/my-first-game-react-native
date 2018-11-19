import React from 'react';
import {
    View,
    TouchableHighlight,
    TouchableNativeFeedback,
    Text,
    Platform,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
    $primaryColor: '#32ffff',
    $textColor: '#000000',
    $buttonColorUnderlay: '#adffff',
    button: {
        paddingVertical: 20,
        paddingHorizontal: 35,
        backgroundColor: '$primaryColor',
        '@media ios': {
            borderRadius: 4,
        },
        '@media android': {
            borderRadius: 1,
            elevation: 4,
        }
    },
    text: {
        color: '$textColor',
        fontSize: 15,
    }
});

export const CustomButton = ({ text, onPress }) => {
    if(Platform.OS === 'ios') {
        return(
            <TouchableHighlight
                onPress={onPress}
                style={styles.button}
                underlayColor={styles.$buttonColorUnderlay}
            >
                <Text style={styles.text}>{text}</Text>
            </TouchableHighlight>
        )
    }

    return (
        <TouchableNativeFeedback
            onPress={onPress}
            background={TouchableNativeFeedback.Ripple(styles.$buttonColorUnderlay)}
        >
            <View style={styles.button}>
                <Text style={styles.text}>
                    {text}
                </Text>
            </View>
        </TouchableNativeFeedback>
    )
};