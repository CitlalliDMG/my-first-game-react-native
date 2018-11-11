import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>

        <View style={{flexDirection:"row"}}>
          <View style={[styles.tile, { borderLeftWidth:0, borderTopWidth:0 } ]} />
          <View style={[styles.tile, { borderTopWidth:0 }]} />
          <View style={[styles.tile, { borderTopWidth: 0, borderRightWidth:0 }]} />
        </View>

        <View style={{flexDirection:"row"}}>
          <View style={[styles.tile, { borderLeftWidth:0 }]} />
          <View style={[styles.tile, {}]} />
          <View style={[styles.tile, { borderRightWidth:0 }]} />
        </View>

        <View style={{flexDirection:"row"}}>
          <View style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth:0 }]} />
          <View style={[styles.tile, { borderBottomWidth: 0 }]} />
          <View style={[styles.tile, { borderBottomWidth:0, borderRightWidth:0 }]} />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tile: {
    borderWidth: 10,
    width: 100,
    height: 100,
  }
});
