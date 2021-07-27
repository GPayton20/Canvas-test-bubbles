import Particle from "./particle.js";

// const dpi = window.devicePixelRatio;
export const canvas = document.getElementById("canvas1");
export const ctx = canvas.getContext("2d");

// This function helps prevent stretching and blurring of canvas elements
function fixDpi() {
  // const styleHeight = +getComputedStyle(canvas).getPropertyValue('height').slice(0, -2);
  // const styleWidth = +getComputedStyle(canvas).getPropertyValue('width').slice(0, -2);

  // canvas.setAttribute('height', styleHeight * dpi);
  // canvas.setAttribute('width', styleWidth * dpi);
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}

let particleArray;

function init() {
  particleArray = [];
  for (let i = 0; i < 100; i++) {
    const size = Math.floor(Math.random() * 35);
    const x = (Math.random() * (window.innerWidth - size * 2)) + size;
    const y = (Math.random() * (window.innerHeight - size * 2)) + size;
    const directionX = (Math.random() * 0.8) - 0.2;
    const directionY = (Math.random() * 0.8) - 0.2;
    const red = Math.floor(Math.random() * 50) + 200;
    const blue = Math.floor(Math.random() * 50) + 200;
    const alpha = Math.random();
    const colour = `rgba(${red}, 100, ${blue}, ${alpha})`;

    particleArray.push(new Particle(x, y, directionX, directionY, size, colour))
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
  }
}

function removeParticle(particle) {
  particleArray.splice(particleArray.indexOf(particle), 1);
}

window.addEventListener('resize', fixDpi);

canvas.addEventListener('click', (event) => {
  // Get pointer coordinates and check if any particles in particleArray are currently located
  // at those coordinates
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  for (let i = 0; i < particleArray.length; i++) {
    const particle = particleArray[i];

    if (mouseX > particle.x - particle.size &&
      mouseX < particle.x + particle.size &&
      mouseY > particle.y - particle.size &&
      mouseY < particle.y + particle.size) {
      // If user has clicked on a particle, run that particle's inflate() function
      const inflatedSize = particle.inflate();
      // If particle becomes larger than 150px, it "pops"
      // Run the particle's pop() function and after a short delay remove it from
      // particleArray so it is no longer rendered to the canvas
      if (inflatedSize > 150) {
        particle.pop();
        setTimeout(() => {
          removeParticle(particle);
        }, 20);
      }
      break;
    }
  }
});


fixDpi();
init();
animate();

