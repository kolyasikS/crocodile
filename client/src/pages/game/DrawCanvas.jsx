import React, { useEffect, useRef, useState } from 'react';
import { socket } from '../../socket';

const DrawCanvas = () => {
    const canvasRef = useRef();
    const ctx = useRef();
    const drawing = useRef();
    const [isConnected, setIsConnected] = useState(socket.connected);
    const rectRef = useRef();
    useEffect(() => {
        ctx.current = canvasRef.current.getContext('2d');
        canvasRef.current.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        })
    }, []);
    useEffect(() => {
        function onDraw(data) {
            if (drawing.current) {
                return;
            }
            const lineWidth = 5;
            if (data.starting) {
                ctx.current.beginPath();
                ctx.current.moveTo(data.x, data.y);
            }
            ctx.current.lineWidth = lineWidth;
            ctx.current.lineCap = 'round';
            ctx.current.lineJoin = 'round';
            ctx.current.lineTo(data.x, data.y);
            ctx.current.stroke();
            ctx.current.beginPath();
            ctx.current.moveTo(data.x, data.y);
        }

        socket.on('draw', onDraw);

        return () => {
            socket.off('draw', onDraw);
        };
    }, []);

    const startPosition = (e) => {
        drawing.current = true;
        ctx.current.beginPath();
        rectRef.current = e.target.getBoundingClientRect();
        ctx.current.moveTo(e.pageX - rectRef.current.left - 2, e.pageY - rectRef.current.top - 2);
        draw(e, true);

    }

    const finishedPosition = () => {
        drawing.current = false;
    }
    const draw = (e, starting) => {
        let left, top;
        if (rectRef.current) {
            [left, top] = [rectRef.current.left, rectRef.current.top];
        } else {
            rectRef.current = e.target.getBoundingClientRect();
            [left, top] = [rectRef.current.left, rectRef.current.top];
        }
        if (!drawing.current) {
            return;
        }
        const lineWidth = 5;
        ctx.current.lineWidth = lineWidth;
        ctx.current.lineCap = 'round';
        ctx.current.lineJoin = 'round'
        ctx.current.strokeStyle = '#f123cd';

        ctx.current.lineTo(e.pageX - left - 2, e.pageY - top - 2);
        ctx.current.stroke();
        ctx.current.beginPath();
        ctx.current.moveTo(e.pageX - left - 2, e.pageY - top - 2);
        socket.timeout(5000).emit('draw', {
            x: e.pageX - left - 2,
            y: e.pageY - top - 2,
            starting
        }, () => {
        });
    }


    return (
        <canvas ref={canvasRef}
                onMouseUp={finishedPosition}
                onMouseDown={startPosition}
                onMouseMove={draw}
                onMouseLeave={finishedPosition}
                width={700}
                height={700}
                tabIndex={1}
                className={'shadow-lg bg-[#101418] shadow-[#64c7ee] border-2 border-white rounded-2xl'}
        ></canvas>
    );
};

export default DrawCanvas;