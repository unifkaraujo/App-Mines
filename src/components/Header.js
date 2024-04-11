import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import Flag from './Flag'

export default props => {
    
    return (

        /* Imprime duas views, organizadas na mesma linha, uma de quantidade de bandeiras faltantes e outra de novo jogo */
        // A primeira view recebe o retorno da bandeira, mandando o parametro bigger, nesse caso a bandeira impressa será grande
        // A srgunda basicamente é um texto novo jogo, que ao clicado em cima (onPress), executa a função onNewGame passada por parametro (que reseta o estado do board)

        <View style={[styles.container, {backgroundColor: props.levelBackground}]} >
            
            <View style={styles.flagContainer} >
                <TouchableOpacity onPress = {props.onFlagPress} style={styles.flagButton}>
                    <Flag bigger />
                </TouchableOpacity>

                <Text style={styles.flagsLeft} > = {props.flagsLeft} </Text>
                
            </View>

            <TouchableOpacity style={styles.button} onPress={props.onNewGame}>
                <Text style={styles.buttonLabel}> Novo Jogo </Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 20,
        paddingHorizontal: 20,
    },

    flagContainer: {
        flexDirection: 'row',
    },

    flagButton: {
        marginTop: 10,
        minWidth: 30
    },

    flagsLeft: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingTop: 5,
        marginLeft: 20,
        color: '#FFF'
    },

    button: {
        backgroundColor: '#999',
        padding: 5
    },

    buttonLabel: {
        fontSize: 20,
        color: '#FFF',
        fontWeight: 'bold'
    }

})