export default class Board {

    constructor(config) {
        this.config = config;
        this.formation = config.formation;
        this.startingFen = config.startingFen;
        this.squares = this.createBoard();
        this.squareSize = {};
        this.activePiece = null;
        this.dragged = null;
        this.selected = null;
    }

    createBoard() {
        const board = [];
        let row = 1;
        while (row < this.config.rows + 1) {
            let col = 1;
            while (col < this.config.cols + 1) {
                const color = ((col + row) % 2 === 0) ? 'black' : 'white';
                board.push({
                    row, col, letter: this.getLetter(col), color
                });
                col++;
            }
            row++;
        }
        return board;
    }

    getLetter(col) {
        let letter = '';
        if (col > 26) {
            let i = 0;
            while (col > 26) {
                col -= 26;
                i++;
            }
            letter = String.fromCharCode(96 + i);
        }
        letter += String.fromCharCode(96 + col);

        return letter;


    }

    getPixelPosition(dimensions, col, row) {
        this.squareSize = this.getSquareSize(dimensions);
        const
            boardRow = this.config.rows - row,
            positionX = (col - 1) * this.squareSize.width,
            positionY = boardRow * this.squareSize.height;
        return [positionX, positionY, this.squareSize.width, this.squareSize.height];
    }

    getBoardCoordinates(x, y) {
        const
            col = Math.floor(x / this.squareSize.width) + 1,
            row = this.config.rows - Math.floor(y / this.squareSize.height),
            offsetX = x - Math.round((col - 1) * this.squareSize.width),
            offsetY = y - Math.round((this.config.rows - row) * this.squareSize.height);
        return {
            col,
            row,
            offsetX,
            offsetY
        };
    }

    getPiece(boardCoordinates) {
        const colors = Object.keys(this.formation);
        let thisPiece = null;
        for (const color of colors) {
            if (thisPiece === null) {
                const pieces = Object.keys(this.formation[color]);
                for (const type of pieces) {
                    const
                        index = this.formation[color][type].findIndex(
                            piece => piece.join('') === [boardCoordinates.col, boardCoordinates.row].join('')
                        ),
                        position = this.formation[color][type][index];
                    if (position) {
                        thisPiece = {
                            index,
                            position,
                            color,
                            type
                        };
                        break;
                    }
                }
            } else {
                break;
            }
        }
        return thisPiece;
    }

    removePiece(boardCoordinates) {
        const piece = this.getPiece(boardCoordinates);
        this.formation[piece['color']][piece['type']].splice(piece['index'], 1);
    }

    replacePiece(oldPiece, newPiece) {

    }

    movePiece(piece, newPosition) {
        this.formation[piece['color']][piece['type']][piece['index']] = [newPosition.col, newPosition.row];
    }


    addPiece(piece, coordinates) {
        this.formation[piece['color']][piece['type']].splice(piece['index'], 0, [coordinates.col, coordinates.row]);
    }

    getSquareSize(dimensions) {
        return {
            width: dimensions.width / this.config.cols,
            height: dimensions.height / this.config.rows
        };
    }

    getFormationFromFen(fen) {
        const
            pieces = {
                p: 'pawn',
                r: 'rook',
                n: 'knight',
                b: 'bishop',
                q: 'queen',
                k: 'king'
            },
            fenBoard = fen.split(' ')[0],
            fenLength = fenBoard.length,
            formation = {};

        let col = 1,
            row = this.config.rows,
            i = 0;


        while (i < fenLength) {
            const symbol = fenBoard[i];
            if (symbol === '/') {
                col = 1;
                row--;
            } else {
                if (this.isDigit(symbol)) {
                    let txtNum = this.getNumberFromArray(fenBoard, i);
                    i += txtNum.length - 1;
                    col += Number(txtNum);
                } else {
                    const
                        color = this.isUpperCase(symbol) ? 'white' : 'black',
                        piece = pieces[symbol.toLowerCase()];
                    if (!(color in formation)) {
                        formation[color] = {};
                    }
                    if (!(piece in formation[color])) {
                        formation[color][piece] = [];
                    }
                    formation[color][piece].push([col, row]);
                    col++;
                }
            }
            i++;
        }
        return formation;
    }

    update() {
    }

    isDigit(symbol) {
        return /^\d+$/.test(symbol);
    }

    isUpperCase(symbol) {
        return symbol.toUpperCase() === symbol;
    }

    getNumberFromArray(array, startPosition = 0, numString = '') {
        numString += array[startPosition];

        if (this.isDigit(array[startPosition + 1])) {
            return this.getNumberFromArray(array, startPosition + 1, numString);
        }
        return numString;
    }
}