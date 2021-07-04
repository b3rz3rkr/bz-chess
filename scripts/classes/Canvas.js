export default class Canvas {
    constructor(options) {
        this.selector = options?.selector ? options.selector : 'body';
        this.aspect = options?.aspect ? options.aspect : 1;
        this.size = options?.size ? options.size : this.calcSize(this.aspect);
        this.parent = document.querySelector(this.selector);
        if (options?.updateOnResize !== false) {
            this.updateOnResize();
        }
        this.init();
    }

    init() {
        this.canvas = this.create();
        this.setSize();
    }

    create() {
        const canvas = document.createElement('canvas',);
        this.parent.append(canvas);
        return canvas;
    }

    updateOnResize() {
        window.addEventListener('resize', () => {
            this.size = this.calcSize();
            this.setSize();
        });
    }

    setSize() {
        this.canvas.width = this.size.x;
        this.canvas.height = this.size.y;
    }

    calcSize(aspect = this.aspect) {
        const size = {},
            windowSize = this.getWindowSize();

        if (windowSize.y <= windowSize.x / aspect) {
            size.x = windowSize.y * aspect;
            size.y = windowSize.y;
        } else {
            size.x = windowSize.x;
            size.y = windowSize.x / aspect;
        }
        return size;
    }

    getWindowSize() {
        return {
            x: window.innerWidth,
            y: window.innerHeight
        };
    }
}