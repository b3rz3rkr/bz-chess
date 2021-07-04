export default class Game {
    constructor({board, view}) {
        this.board = board;
        this.view = view;
        this.loop = this.loop.bind(this);
    }

    async init() {
        await this.view.init();
        this.addMouseEvents();
    }

    start() {
        requestAnimationFrame(this.loop);
    }

    loop() {
        this.board.update();
        this.view.update(this.board);
        requestAnimationFrame(this.loop);
    }

    mouseSelect(event) {
        this.board.selected = null;
        this.board.dragged = null;
        const
            position = this.eventCanvasPosition(event),
            boardCoordinates = this.board.getBoardCoordinates(position.x, position.y);
        return this.board.activePiece = this.board.getPiece(boardCoordinates);
    }

    addMouseEvents() {
        this.view.canvas.addEventListener('mousedown', event => {
            let activePiece = this.mouseSelect(event);
            if (activePiece) {
                const
                    position = this.eventCanvasPosition(event),
                    downBoardCoordinates = this.board.getBoardCoordinates(position.x, position.y),
                    drag = event => {
                        const position = this.eventCanvasPosition(event);
                        this.board.dragged = [activePiece, position, this.board.squareSize, downBoardCoordinates];
                    },
                    up = event => {
                        this.board.dragged = null;
                        document.removeEventListener('mousemove', drag);
                        document.removeEventListener('mouseup', up);
                        const
                            position = this.eventCanvasPosition(event),
                            upBoardCoordinates = this.board.getBoardCoordinates(position.x, position.y),
                            capture = this.board.getPiece(upBoardCoordinates);

                        if (this.samePositions(upBoardCoordinates, downBoardCoordinates)) {
                            console.log('sel');
                            const cellPosition = this.board.getPixelPosition(this.view.canvasSize, upBoardCoordinates.col, upBoardCoordinates.row);
                            this.board.selected = [activePiece, {
                                x: cellPosition[0],
                                y: cellPosition[1]
                            }, this.board.squareSize];
                        } else if (capture) {
                            console.log('capture');
                            this.board.removePiece(upBoardCoordinates)
                            activePiece = this.board.getPiece(downBoardCoordinates);
                            this.board.movePiece(activePiece, upBoardCoordinates);
                        } else {
                            console.log('move');
                            this.board.movePiece(activePiece, upBoardCoordinates);
                        }
                    };
                this.board.dragged = [activePiece, position, this.board.squareSize, downBoardCoordinates];
                document.addEventListener('mousemove', drag);
                document.addEventListener('mouseup', up);
            }
        });
    }

    eventCanvasPosition(event) {
        return {
            x: event.clientX - event.target.offsetLeft,
            y: event.clientY - event.target.offsetTop
        };
    }

    samePositions(pos1, pos2) {
        return pos1.col === pos2.col && pos1.row === pos2.row;
    }
}