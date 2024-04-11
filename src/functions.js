/* Função que cria o tabuleiro */
/* É uma matriz de objeto, com atributos */
/* Recebe a quantidade de linhas e colunas e cria o tabuleiro */
const createBoard = (rows, columns) => {

    /* Preenche um array de 'rows' elementos com 0, usa o map para preencher o array com outros atributos e utilza apenas o indice do array */
    return Array(rows).fill(0).map((_, row) => {

        /* Para cada indice de linha do array, é criado outro array de colunas */
        return Array(columns).fill(0).map((_,column) => {

            /* Uma vez chego no elemento x,y agora vamos preencher o objeto daquele indice */

            return {
                row,
                column,
                opened: false,
                flagged: false,
                mined: false,
                explosed: false,
                nearMines: 0,
            }

        })
    
    })

}

/* Função que recebe o tabuleiro criado + quantidade de bombas a seres distribuidas, e insere minas nesse tabuleiro */

const spreadMines = (board, minesAmount) => {
    const rows = board.length
    // acho que está errado essa parte de verificar a altura
    const columns = board[0].length // verifica a quantidade de elementos na coluna, usa apenas a linha 0 como referência pois todas as linhas possuem a mesmo quantidade de colunas

    let minesPlanted = 0

    // Enquanto não preencheu a quantidade de minas esperadas, o loop se repete
    while (minesPlanted < minesAmount) {
        const rowSel = parseInt(Math.random() * rows, 10) //Numero aleatório a ser escolhido dentre a matriz de linhas
        const columnSel = parseInt(Math.random() * columns, 10) 

        if (!board[rowSel][columnSel].mined) { // Se o elemento escolhido não tiver uma bomba já plantada

            board[rowSel][columnSel].mined = true // mina o elemento*/
            minesPlanted++

        }

    }

}

/* Função que instancia o tabuleiro e chama o preenchimento das bombas */
// Basicamente essa função instancia e une as duas outras que já definimos

const createMinedBoard = (rows, colums, minesAmount) => {
    const board = createBoard(rows, colums)
    spreadMines(board, minesAmount)
    return board
}

// Função que clona nosso tabuleiro
const cloneBoard = board => {
    return board.map(rows => {
        return rows.map(field => {
            return { ...field }
        })
    })
}


// Função que percorre os vizinhos do campo que estamos abrindo
// Mesma lógica da desenhada no word
const getNeighbors = (board, row, column) => {
    const neighbors = []
    const rows = [row-1, row, row+1]
    const columns = [column-1, column, column+1]

    rows.forEach(r => {
        columns.forEach(c => {
            // Caso a linha ou a coluna seja diferente do nosso campo, significa que não estamos olhando o próprio campo
            const diferent = r !== row || c != column
            // Validamos as extremidades, se o vizinho está dentro do board
            const validRow = r >= 0 && r < board.length
            const validColumn = c >= 0 && c < board[0].length

            if (diferent && validRow && validColumn) {
                neighbors.push(board[r][c])
            }
        })
    })
    return neighbors
}

// Função que verifica se a vizinhança é segura, ou seja, não possui bombas

const safeNeighborhood = (board, row, column) => {
    // Criamos uma função em forma de constante, que recebe o resultado (verdadeiro ou falso) e se o campo não está minado
    const safes = (result, neighbor) => result && !neighbor.mined

    // Retorna verdadeiro ou false
    // Primeiro pega o array dos vizinhos
    // Depois usa uma função de reduce, que basicamente roda a função constante definida em cada elemento do vetor
    // Caso um deles possua bomba, o retorno será sempre falso
    return getNeighbors(board, row, column).reduce(safes, true)
}

// Função que abre o campo, verifica se possui bomba, quantidade de vizinhos minados, etc.

const openField = (board, row, column) => {
    const field = board[row][column]
    if (!field.opened) {
        field.opened = true
        if (field.mined) {
            field.exploded = true
        } else if (safeNeighborhood(board, row, column)) { 
            //Se a vizinhança não possui nenhuma bomba, abrimos todos os campos da vizinhança de forma recursiva automaticamente
            getNeighbors(board, row, column).forEach( n => openField(board, n.row, n.column))
        } else {
            // Se o campo não está minado e a vizinhança não é segura
            // Pegamos os vizinhos
            const neighbors = getNeighbors(board, row, column)
            // Filtramos apenas os elementos do array de vizinhos que estão minados, e pegamos a quantidade
            // Salvamos em nearmines a quantidade de vizinhos minados
            field.nearMines = neighbors.filter(n => n.mined).length
        }
    }   
}

// Função que transforma nossa matriz do board, em um simples array
// Tem como objetivo facilitar percorrer pelos elementos sem ter que olhar linhas e colunas
const fields = board => [].concat(...board)

// Função que verifica se o tabuleiro possui algum campo explodido
const hadExplosion = board => fields(board).filter(field => field.exploded).length > 0

// Função que verifica se tem algum campo pendente no tabuleiro
const pendding = field => (field.mined && !field.flagged) || (!field.mined && !field.opened)

// Função que verifica se o usuario venceu o jogo
const wonGame = board => fields(board).filter(pendding).length === 0

// Função que abre todos os campos minados no tabuleiro
const showMines = board => fields(board).filter(field => field.mined).forEach(field => field.opened = true)

// Função que marca a bandeirinha em cima do campo
const invertFlag = (board, row, column) => {
    const field = board[row][column]
    field.flagged = !field.flagged // Salva na variavel flagged o inverso do que estava preenchido
}

const flagsUsed = board => fields(board).filter(field => field.flagged).length

export { 
    createMinedBoard,
    cloneBoard,
    openField,
    hadExplosion,
    wonGame,
    showMines,
    invertFlag,
    flagsUsed
}