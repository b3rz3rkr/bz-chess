const config = {
    rows: 8,
    cols: 8,
    formation: {
        white: {
            rook: [[1, 1], [8, 1]],
            knight: [[2, 1], [7, 1]],
            bishop: [[3, 1], [6, 1]],
            queen: [[4, 1]],
            king: [[5, 1]],
            pawn: [
                [ 1, 2 ],
                [ 2, 2 ],
                [ 3, 2 ],
                [ 4, 2 ],
                [ 5, 2 ],
                [ 6, 2 ],
                [ 7, 2 ],
                [ 8, 2 ]
            ]
        },
        black: {
            rook: [[1, 8], [8, 8]],
            knight: [[2, 8], [7, 8]],
            bishop: [[3, 8], [6, 8]],
            queen: [[4, 8]],
            king: [[5, 8]],
            pawn: [
                [1, 7],
                [2, 7],
                [3, 7],
                [4, 7],
                [5, 7],
                [6, 7],
                [7, 7],
                [8, 7]
            ]
        }
    },
    startingFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
};
export default config;