export default class Sprite {
    constructor(options) {
        this.src = options.src;
        this.image = new Image();
        this.size = options.size;
        this.partSize = options.partSize;
        this.idx = options.idx;
    }

    async load() {
        const response = await fetch(this.src);

        if (response.ok) {
            const img = await response.blob();
            this.image.src = URL.createObjectURL(img);
            this.image.onload = () => {
                this.partSize = this.getPartSize(this.image);
            };

        } else {
            console.log('sprite fetch error');
        }

    }

    getPartSize(img) {
        return {
            x: img.naturalWidth / this.size.x,
            y: img.naturalHeight / this.size.y
        };
    };

    getImage(color = 'white', type = 'square') {
        let spriteOffsetX = this.idx.type[type] * this.partSize.x,
            spriteOffsetY = this.idx.color[color] * this.partSize.y;

        return [
            this.image,
            spriteOffsetX,
            spriteOffsetY,
            this.partSize.x,
            this.partSize.y
        ];
    }
}

