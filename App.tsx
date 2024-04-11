import React, { Component } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native'

import params from './src/params'

import MineField from './src/components/MineField'

import Header from './src/components/Header'

import {
  cloneBoard,
  createMinedBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines,
  invertFlag,
  flagsUsed
} from './src/functions'

import LevelSelection from './src/screens/LevelSelection'

export default class App extends Component {

  // Construtor que chama a função para criar o tabuleiro assim que inicia o processamento
  constructor(props: any) {
    super(props)
    this.state = this.createState()
  }

  // Função que determina a quantidade de minas dentro do tabuleiro
  minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.difficultLevel)
  }

  // Função que cria o tabuleiro e salva na variavel de estados board, won, lost
  createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return {
      board: createMinedBoard(rows, cols, this.minesAmount()),
      won: false,
      lost: false,
      showLevelSelection: false,
    }
  }

  // Função marca a bandeira em cima do campo e verifica se o usuario venceu
  onSelectField = (row: any, column: any) => {
    // cria um clone temporario do field
    const board = cloneBoard(this.state.board)
    // abre a função invertFlag, enviando os dados temporarios do board, marca ou desmarca a bandeira
    invertFlag(board, row, column)
    // verifica se não existe mais campos para serem abertos
    const won = wonGame(board)

    if (won) {
      Alert.alert('Parabéns, venceu!')
    }

    // muda a variavel de estados board, passando da variavel temporaria para a variavel real
    this.setState({board, won})

  }

  // Função que abre o campo e verifica se o usuario ganhou ou perdeu o jogo
  onOpenField = (row: any, column: any) => {
    // cria um clone temporario do field
    const board = cloneBoard(this.state.board)
    // abre a função openField, enviando os dados temporarios do board, abre os campos, vizinhos, verifica bombas, etc.
    openField(board, row, column)
    // verifica se alguma bomba foi explodido, nesse caso o jogador perdeu
    const lost = hadExplosion(board)
    // verifica se não existe mais campos para serem abertos
    const won = wonGame(board)

    if (lost) {
      // abre o tabuleiro na localização das bombas
      showMines(board)
      Alert.alert ('Perdeu!')
    }

    if (won) {
      Alert.alert('Parabéns, venceu!')
    }

    // muda a variavel de estados board, passando da variavel temporaria para a variavel real
    this.setState({board, lost, won})

  }

  onLevelSelected = (level: any, levelBackground: any, difficult: any) => {
    params.difficultLevel = level
    params.levelBackground= levelBackground
    params.difficult = difficult

    this.setState(this.createState())
  }

  render() {
    
    return (

      <View style={styles.container} > 

      <LevelSelection isVisible={this.state.showLevelSelection} onLevelSelected={this.onLevelSelected} onCancel={() => this.setState({ showLevelSelection: false })} />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.levelText}> Level: <Text style={{color: params.levelBackground}}> {params.difficult} </Text> </Text> 
        <Text style={{color: '#000'}}> Feito por: Kaique - Cod3r </Text>
      </View>

      <Header levelBackground={params.levelBackground} flagsLeft = {this.minesAmount() - flagsUsed(this.state.board)} onNewGame = {() => this.setState(this.createState())} onFlagPress={() => this.setState({ showLevelSelection: true })} /> 
        
        <View style={styles.board}>
            <MineField board={this.state.board} onOpenField={this.onOpenField} onSelectField={this.onSelectField}/>
        </View> 
       
                
      </View>

    )
  
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA'
  },
  levelText: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold'
  }
});