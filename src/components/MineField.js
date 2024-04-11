import React from "react";
import { View, StyleSheet, Text } from 'react-native'
import Field from './Field'

export default props => {

    // recebe o tabuleiro montado e guarda em row o array da linha da matriz (essa parte ficou confusa, não entendi muito bem)
    const rows = props.board.map((row, r) => {

        // no array da linha da matriz (que possui o elemento da linha), é feito outra varredura na coluna daquela linha, e armazenado os valores no field
        const colums = row.map((field, c) => {
            // retorna o bloco do indice que estamos olhando
            return <Field {...field} key={c} onOpen={() => props.onOpenField(r,c)} onSelect={() => props.onSelectField(r,c)}/>
        })
        // colums armazena todos os blocos retornados da matriz, simplesmente colocamos-o em uma view
        return <View key={r} style={{flexDirection: 'row'}}>{colums}</View>
    })   
    
    // retorna os elementos em jsx, que estão armazenados em rows
    return (
        <View style={styles.container}> 
            {rows}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEE'
    }
})