import boardConfig from './variables/defaultBoardConfig.js';
import spriteConfig from './variables/defaultSpriteConfig.js';

import Game from './classes/Game.js';
import View from './classes/View.js';
import Board from './classes/Board.js';
import Sprite from './classes/Sprite.js';
import Canvas from './classes/Canvas.js';

const
    canvas = new Canvas({aspect:boardConfig.cols/boardConfig.rows}),
    sprite = new Sprite(spriteConfig),
    board = new Board (boardConfig),
    view = new View(canvas.canvas, sprite, board),
    game = new Game({
            board,
            view
        }
    );

game.init().then(() => game.start());
game.start();