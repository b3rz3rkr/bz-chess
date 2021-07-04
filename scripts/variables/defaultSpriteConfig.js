const config = {
    src: './img/sprite.png',
    size: {
        x: 8,
        y: 3
    },
    partSize: {
        x: 210,
        y: 210
    },
    idx: {
        type: {
            square: 0,
            pawn: 1,
            rook: 2,
            knight: 3,
            bishop: 4,
            queen: 5,
            king: 6,
            active: 7
        },
        color: {
            white: 0,
            black: 1,
            shadow: 2
        }
    }
};
export default config;