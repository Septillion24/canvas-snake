class SnakePart {
    constructor(x, y, next) {
        this.x = x;
        this.y = y;
        this.next = next;
    }
    move(x, y) {
        if (this.next) {
            if (!(this.next.x === this.x && this.next.y === this.y)){
                this.next.move(this.x, this.y);
            }
        }
        this.x = x;
        this.y = y;
    }
    addPart() {
        if (!this.next) {
            this.next = new SnakePart(this.x, this.y);
        } else {
            this.next.addPart();
        }
    }
}
