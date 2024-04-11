import React from "react";
import {View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import params from '../params'

import Mine from './Mine'
import Flag from "./Flag";

export default props => {

    // a impressão do bloco será diferente para cada condição: minado, aberto, quantidade de minas proximas, explodido
    const {mined, opened, nearMines, exploded, flagged} = props
    
    // definindo que tipo de bloco será impresso
    // primeiro estilo (field) é utilizado em todos os tipos de blocos
    const styleField = [styles.field]
    
    // se aberto:
    if (opened) styleField.push(styles.opened)

    // se explodido:
    if (exploded) styleField.push(styles.exploded)

    // se possui um bandeira
    if (flagged) styleField.push(styles.flagged)

    // caso não tenha aberto e nem explodido, será adicionado o estilo padrão do bloco fechado (regular)
    if (!opened && !exploded) styleField.push(styles.regular)

    // cor da letra que indica as minas dependerá da quantidade de minas próximas
    if (nearMines > 0) {
        if (nearMines == 1) color = '#2A28D7'
        if (nearMines == 2) color = '#2B520F'
        if (nearMines > 2 && nearMines < 6) color = '#F9060A'
        if (nearMines >= 6) color = '#F221A9'
    }

    return (

        // quando clicado em cima de um campo, evento onpress chama a função enviada de app -> minefield (onOpenField -> onOpen)
        <TouchableWithoutFeedback onPress = {props.onOpen} onLongPress={props.onSelect}>
        <View style={styleField}>
        
        { /* Imprime a mina aberta, caso esteja nessa condição */ }
        {!mined && opened && nearMines > 0 ?
            <Text style={[styles.label, {color: color} ]} >
                {nearMines} </Text> : false}

        { /* Imprime a bomba desenhada juntamente com o bloco, caso minado e aberto */ }
        {mined && opened ? <Mine /> : false}

        { /* Caso o bloco possua uma bandeira e ainda não foi aberto, imprimimos a bandeira */ }
        {flagged && !opened ? <Flag /> : false}

        </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    
    field: {
        height: params.blockSize,
        width: params.blockSize,
        borderWidth: params.borderSize
    },
    regular: {
        backgroundColor: '#999',
        borderLeftColor: '#CCC',
        borderTopColor: '#CCC',
        borderRightColor: '#333',
        borderBottomColor: '#333'
    },
    opened: {
        backgroundColor: '#999',
        borderColor: '#777',
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        fontWeight: 'bold',
        fontSize: params.fontSize,
    },
    exploded: {
        backgroundColor: 'red',
        borderColor: 'red'
    }
})