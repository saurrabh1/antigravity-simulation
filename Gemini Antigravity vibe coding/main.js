const container = document.getElementById('particlesContainer');
const particleCount = 150; // Number of particles
const particles = [];

// Initialize particles
for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Random initial position
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    // Random size variation (small ticks)
    const width = 2 + Math.random() * 3;
    const height = 4 + Math.random() * 8;

    particle.style.width = `${width}px`;
    particle.style.height = `${height}px`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    // Random rotation
    const rotation = Math.random() * 360;
    particle.style.transform = `rotate(${rotation}deg)`;

    container.appendChild(particle);

    // Store particle data for animation
    particles.push({
        element: particle,
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 0.5, // Velocity X
        vy: (Math.random() - 0.5) * 0.5, // Velocity Y
        rotation: rotation,
        vRot: (Math.random() - 0.5) * 2 // Rotation speed
    });
}

// Mouse interaction
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Animation Loop
function animate() {
    particles.forEach(p => {
        // Move particle
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;

        // Wrap around screen
        if (p.x < -20) p.x = window.innerWidth + 20;
        if (p.x > window.innerWidth + 20) p.x = -20;
        if (p.y < -20) p.y = window.innerHeight + 20;
        if (p.y > window.innerHeight + 20) p.y = -20;

        // Mouse repulsion/attraction effect (Swarm behavior)
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Gentle attraction to mouse, but with a swirl
        if (distance < 400) {
            const force = (400 - distance) / 400;
            p.vx += (dx / distance) * force * 0.05;
            p.vy += (dy / distance) * force * 0.05;
        }

        // Dampen velocity to prevent infinite acceleration
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Apply styles
        p.element.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rotation}deg)`;
    });

    requestAnimationFrame(animate);
}

animate();

// Handle resize
window.addEventListener('resize', () => {
    // Optional: Reset particles or adjust bounds
});
