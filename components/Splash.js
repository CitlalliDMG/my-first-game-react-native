import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
    $primaryColor: '#32ffff',
    $textColor: '#000000',
    text: {
        color: '$textColor',
        fontSize: 50,
    }
});

export const Splash = () => {
    return (
        <View style={{ flex: 1, backgroundColor: styles.$primaryColor, alignItems: "center", justifyContent: "center" }}>
            <Text style={styles.text}>
                Tic Tac Toe
            </Text>
        </View>
    )
};