import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal
} from 'react-native'

/* Cria o modal, que é uma caixa sobreposta que será exibida sempre que o parametro isVisible for true */
/* Fecha a caixinha quando showLevelSelection: false */
/* Quando clicado em voltar no android, onRequestClose é ativado, sendo assim, chamará onCancel (showLevelSelection: false)  */ 

export default props => {

    return (
        <Modal onRequestClose={props.onCancel} visible={props.isVisible} animationType='slide' transparent={true}>

            <View style={styles.frame} > 
            
                <View style={styles.container} >

                    {/* Areas que podem ser apertadas, muda o parametro difficultLevel de acordo com o que for apertado */}
                    <TouchableOpacity style={[styles.button, styles.bgEasy]} 
                    onPress={() => props.onLevelSelected(0.1,styles.bgEasy.backgroundColor,'Fácil')}>
                        <Text style={styles.buttonLabel}> Fácil </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.bgNormal]} 
                    onPress={() => props.onLevelSelected(0.2,styles.bgNormal.backgroundColor,'Intermediário')}>
                        <Text style={styles.buttonLabel}> Intermediário </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.bgHard]} 
                    onPress={() => props.onLevelSelected(0.3,styles.bgHard.backgroundColor,'Difícil')}>
                        <Text style={styles.buttonLabel}> Difícil </Text>
                    </TouchableOpacity>

                </View>

            </View>       
        
        </Modal>
    )

}

const styles = StyleSheet.create({ 

    frame: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },

    container: {
        backgroundColor: '#EEE',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },

    button: {
        marginTop: 10,
        padding: 5
    },

    buttonLabel: {
        fontSize: 20,
        color: '#EEE',
        fontWeight: 'bold'
    },

    bgEasy: {
        backgroundColor: '#49b65d'
    },

    bgNormal: {
        backgroundColor: '#2765F7'
    },

    bgHard: {
        backgroundColor: '#F26337'
    },

})