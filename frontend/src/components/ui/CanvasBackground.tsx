import React, { useEffect, useRef } from 'react';

const CanvasBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const particles: Particle[] = [];
        const particleCount = 40;

        class Particle {
            x: number;
            y: number;
            size: number;
            speedY: number;
            speedX: number;
            opacity: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 20 + 15; // Heart size
                this.speedY = Math.random() * 1.5 + 0.5;
                this.speedX = Math.random() * 1 - 0.5; // Sway
                this.opacity = Math.random() * 0.3 + 0.1;
            }

            update() {
                this.y -= this.speedY; // Floating up? prompt says "falling heart"? 
                // Prompt says "animated pink heart particles for a whimsical effect". Usually hearts float up or fall. 
                // "falling" was in my thought, prompt just says "animated". 
                // I will make them float UP like love usually does, or float DOWN like confetti.
                // Let's make them float UP.
                this.y -= this.speedY;
                this.x += Math.sin(this.y * 0.01) * 0.5; // Swaying

                if (this.y < -50) {
                    this.y = height + 50;
                    this.x = Math.random() * width;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.globalAlpha = this.opacity;
                ctx.font = `${this.size}px serif`;
                ctx.fillStyle = '#ff3e8d';
                ctx.fillText('♥', this.x, this.y);
                ctx.globalAlpha = 1;
            }
        }

        const init = () => {
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        };

        init();
        animate();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" />;
};

export default CanvasBackground;
