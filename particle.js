import { canvas, ctx } from "./script.js";

class Particle {
  constructor(x, y, directionX, directionY, size, colour) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.initialSize = size;

    this.colour = colour;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.colour;
    ctx.fill();
  }

  update() {
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y + this.size > canvas.height || this. y - this.size < 0) {
      this. directionY = -this.directionY;
    }
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }

  inflate() {
    if (this.size > this.initialSize * 2) {
      this.initialSize = this.size;
      return;
    }
    this.size += 2;
    requestAnimationFrame(this.inflate.bind(this));
    return this.size;
  }

  pop() {
    this.colour = 'white';
    this.size = 300;
  }
}

export default Particle;
