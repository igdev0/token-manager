"use client";
import {useEffect, useRef, useState} from 'react';

export default function Background() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState({width: 0, height: 0});
  // Track mouse and animated circle position
  const mouse = useRef({x: window.innerWidth / 2, y: window.innerHeight / 2});
  const circle = useRef({x: window.innerWidth / 2, y: window.innerHeight / 2});

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if(ref.current === null) return;
      const rect = ref.current?.getBoundingClientRect();
      if (rect) {
        mouse.current.x = e.clientX - rect.left;
        mouse.current.y = e.clientY - rect.top;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth animation
  useEffect(() => {
    const ctx = ref.current?.getContext('2d');

    if (!ctx || !ref.current) return;

    const render = () => {
      circle.current.x += (mouse.current.x - circle.current.x) * 0.01;
      circle.current.y += (mouse.current.y - circle.current.y) * 0.01;
      if (ref.current === null) return;

      ctx.clearRect(0, 0, ref.current.width, ref.current.height);
      const radius = Math.min(ref.current.width, ref.current.height) / 5;

      ctx.beginPath();
      ctx.arc(circle.current.x, circle.current.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = '#000';
      ctx.filter =  `blur(200px)`
      ctx.fill();

      requestAnimationFrame(render);
    };

    render();
  }, []);

  // Resize handling
  useEffect(() => {
    const resize = () => {
      setSize({width: window.innerWidth, height: window.innerHeight});
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
      <canvas
          ref={ref}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          width={size.width}
          height={size.height}
      />
  );
}