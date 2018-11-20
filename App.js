import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Header } from "react-native-elements";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import EStyleSheet from 'react-native-extended-stylesheet';
import { CustomButton } from './components/CustomButton';
import{ Splash } from './components/Splash';

EStyleSheet.build();

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      currentPlayer: 1,
      currentScreen: "splash",
    };

    setTimeout( () => {
      this.setState({ currentScreen: "main" })
    }, 2000 );

  }

  componentDidMount() {
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({
      gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      currentPlayer: 1
    });
  };

  getWinner = () => {
    const NUM_TILES = 3;
    const arr = this.state.gameState;
    let sum;
    // Check if have a winner in rows
    for (let i = 0; i < NUM_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum === 3) {
        return 1;
      } else if (sum === -3) {
        return -1;
      }
    }

    // Check if have a winner in columns
    for (let i = 0; i < NUM_TILES; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum === 3) {
        return 1;
      } else if (sum === -3) {
        return -1;
      }
    }

    // Check if have a winner in diagonal 1
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum === 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }

    // Check if have a winner in diagonal 2
    sum = arr[0][2] + arr[1][1] + arr[2][0];
    if (sum === 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }

    // If there isn't a winner
    return 0;
  };

  onTilePress = (row, col) => {
    // Show in console the row and col pressed
    console.log(row, col);

    // Check if the tile has been pressed and avoid changing it again
    const value = this.state.gameState[row][col];
    if (value !== 0) {
      Alert.alert("Esa casilla ya esta ocupada");
      return;
    }

    // Get the current player
    const currentPlayer = this.state.currentPlayer;

    // Set the correct tile according to the current player
    const arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({ gameState: arr });

    // Switch to other player
    const nextPlayer = currentPlayer === 1 ? -1 : 1;
    this.setState({ currentPlayer: nextPlayer });

    // Run the function to check if there is a winner
    let winner = this.getWinner();
    if (winner === 1) {
      Alert.alert(`El jugador ⭐ (1) es el ganador`);
      this.initializeGame();
    } else if (winner === -1) {
      Alert.alert("El jugador ☁️ (2) es el ganador");
      this.initializeGame();
    }
  };

  onNewGamePress = () => {
    // Shows an alert asking if you want to reset the game
    Alert.alert("Reiniciar juego", "¿Quieres reiniciar el juego?", [
      { text: "No", onPress: () => console.log("Cancelada"), style: "cancel" },
      {
        text: "Sí",
        onPress: () => {
          this.initializeGame();
        }
      }
    ]);
  };

  // Render an icon according to the player in turn
  renderIcon = (row, col) => {
    const value = this.state.gameState[row][col];
    switch (value) {
      case 1:
        return <Icon name="star-face" style={styles.tileX} />;
      case -1:
        return (
          <Icon name="cloud" style={styles.tileO} />
        );
      default:
        return <View />;
    }
  };

  render() {
    if (this.state.currentScreen === "splash") {
      return (
        <Splash/>
      )
    }

    return (
      <View style={styles.mainContainer}>

        {/* <CustomHeader/> */}
        <Header 
          centerComponent={{text: "Tic-Tact-Toe", style: { fontSize: 20 }}}
          outerContainerStyles={{ backgroundColor: "#32ffff", height: 90 }}
        />

        <View style={styles.content}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => this.onTilePress(0, 0)}
              style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}
            >
              {this.renderIcon(0, 0)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(0, 1)}
              style={[styles.tile, { borderTopWidth: 0 }]}
            >
              {this.renderIcon(0, 1)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(0, 2)}
              style={[styles.tile, { borderTopWidth: 0, borderRightWidth: 0 }]}
            >
              {this.renderIcon(0, 2)}
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => this.onTilePress(1, 0)}
              style={[styles.tile, { borderLeftWidth: 0 }]}
            >
              {this.renderIcon(1, 0)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(1, 1)}
              style={[styles.tile, {}]}
            >
              {this.renderIcon(1, 1)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(1, 2)}
              style={[styles.tile, { borderRightWidth: 0 }]}
            >
              {this.renderIcon(1, 2)}
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => this.onTilePress(2, 0)}
              style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]}
            >
              {this.renderIcon(2, 0)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(2, 1)}
              style={[styles.tile, { borderBottomWidth: 0 }]}
            >
              {this.renderIcon(2, 1)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(2, 2)}
              style={[styles.tile, { borderBottomWidth: 0, borderRightWidth: 0 }]}
            >
              {this.renderIcon(2, 2)}
            </TouchableOpacity>
          </View>

          <View style={styles.buttonNewGameContainer}>
            {/* <Button
              title="Reiniciar juego"
              onPress={this.onNewGamePress}
              style={styles.buttonNewGame}
            /> */}
            <CustomButton
              text="Reiniciar juego"
              onPress={this.onNewGamePress}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // Give style to the main container
  mainContainer: {
    flex: 1,
    backgroundColor: "#333333",
  },

  // Give style to the main container
  content: {
    flex: 1,
    backgroundColor: "#333333",
    alignItems: "center",
    justifyContent: "center"
  },

  // Give base style to each tile
  tile: {
    borderWidth: 5,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#d3d3d3"
  },

  // Give style to X's
  tileX: {
    color: "#ffff32",
    fontSize: 60
  },

  // Give style to O's
  tileO: {
    color: "#32ffff",
    fontSize: 60
  },

  // Give style to the "new game" button
  buttonNewGameContainer: {
    marginTop: 50
  }
});
