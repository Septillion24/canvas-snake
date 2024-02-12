class SnakePart {
    constructor(x, y, next) {
        this.x = x;
        this.y = y;
        this.next = next;
    }
    move(x, y) {
        if (this.next) {
            this.next.move(this.x, this.y);
        }
        this.x = x;
        this.y = y;
    }
}
