import { Dimensions } from "react-native"

const params = {
    blockSize: 30, /* Tamanho fixo do bloco */
    borderSize: 5,
    fontSize: 15,
    headerRatio: 0.15, /* Tamanho do cabeçalho (em %) */
    difficultLevel: 0.1, /* Porcentagem de bombas */
    difficult: 'Fácil',
    levelBackground: '#49b65d',
    getColumnsAmount() {
        const width = Dimensions.get('window').width /* Largura da tela */
        return Math.floor(width / this.blockSize) /* Quantidade total de blocos colunas */   
    },
    getRowsAmount() {
        const totalHeight = Dimensions.get('window').height
        const boardHeight = totalHeight * (1 - this.headerRatio)
        return Math.floor(boardHeight / this.blockSize)
    }
}

export default params