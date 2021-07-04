export default class View {
    constructor(canvas, sprite, board) {
        this.canvas = canvas;
        this.sprite = sprite;
        this.board = board;
        this.context = this.canvas.getContext('2d');
    }

    async init() {
        await this.sprite.load();
    }

    update() {
        this.board.update();
        this.clear();
        this.renderBoard();
        if (this.board.selected) {
            this.renderPiece(...this.board.selected);
        }
        this.renderPieces();
        if (this.board.dragged) {
            this.renderPiece(...this.board.dragged);
        }
    }

    renderBoard() {
        const
            squares = this.board.squares,
            fontSize = 18;
        this.context.font = `${fontSize}px sans-serif`;
        //draw squares
        squares.forEach(square => {
            const
                position = this.board.getPixelPosition(
                    this.canvasSize,
                    square.col,
                    square.row
                ),
                image = this.sprite.getImage(square.color),
                [positionX, positionY, squareWidth, squareHeight] = position;
            this.context.drawImage(...image, ...position);

            //draw row number
            if (square.col === 1) {
                this.context.fillText(
                    square.row,
                    positionX + fontSize / 4,
                    positionY + fontSize * 1.2
                );
            }
            //draw col letter
            if (square.row === 1) {
                this.context.fillText(
                    square.letter,
                    positionX + squareWidth - fontSize,
                    positionY + squareHeight - fontSize / 2
                );
            }

        });
    }

    renderPieces(formation = this.board.formation) {
        const colors = Object.keys(formation);
        colors.forEach(color => {
            const side = formation[color],
                sidePieces = Object.keys(side);
            sidePieces.forEach(piece => {
                const positions = side[piece];
                positions.forEach(position => {
                    let newColor = color;
                    if (this.board.activePiece?.position.join('') === position.join('')) {
                        this.context.filter = 'drop-shadow(0px 0px 20px #0066aa) blur(1px)';
                        newColor = 'shadow';
                    } else {
                        this.context.filter = 'blur(.5px)';
                    }
                    this.context.drawImage(...this.sprite.getImage(newColor, piece), ...this.board.getPixelPosition(this.canvasSize, position[0], position[1]));
                    this.context.filter = 'none';
                });
            });
        });
    }

    renderPiece(piece, position, size, offset = null) {
        let posX = Math.round(position.x),
            posY = Math.round(position.y);
        if (offset !== null) {
            posX -= offset.offsetX;
            posY -= offset.offsetY;
        }
        this.context.drawImage(...this.sprite.getImage(piece.color, piece.type), posX, posY, size.width, size.height);
    }

    clear() {
        this.context.clearRect(
            -this.canvas.width,
            -this.canvas.height,
            this.canvas.width,
            this.canvas.height
        );
    }

    get canvasSize() {
        return {
            width: this.canvas.width,
            height: this.canvas.height
        };
    }
}