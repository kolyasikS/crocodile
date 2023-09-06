import React, { useEffect, useRef, useState } from 'react';
import { socket } from '../../socket';

const Playground = () => {
    const canvasRef = useRef();
    const ctx = useRef();
    const drawing = useRef();
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        ctx.current = canvasRef.current.getContext('2d');
    }, []);

    const startPosition = (e) => {
        drawing.current = true;
        ctx.current.beginPath();
        ctx.current.moveTo(e.pageX - e.target.offsetLeft - 2, e.pageY - e.target.offsetTop - 2);
        draw(e);
    }

    const finishedPosition = () => {
        drawing.current = false;
    }
    const draw = (e) => {
        if (!drawing.current) {
            return;
        }
        const {offsetX, offsetY} = e;
        const lineWidth = 5;
        ctx.current.lineWidth = lineWidth;
        ctx.current.lineCap = 'round';
        ctx.current.strokeStyle = '#000';

        ctx.current.lineTo(e.pageX - e.target.offsetLeft - 2, e.pageY - e.target.offsetTop - 2);
        ctx.current.stroke();
        ctx.current.beginPath();
        ctx.current.moveTo(e.pageX - e.target.offsetLeft - 2, e.pageY - e.target.offsetTop - 2);
        socket.timeout(5000).emit('draw', {x: e.pageX - e.target.offsetLeft - 2, y: e.pageY - e.target.offsetTop - 2}, () => {
        });
    }


    useEffect(() => {
        function onDraw(data) {
            if (drawing.current) {
                return;
            }
            const lineWidth = 5;
            let newCtx = canvasRef.current.getContext('2d');
            newCtx.lineWidth = lineWidth;
            newCtx.lineTo(data.x, data.y);
            newCtx.stroke();
            newCtx.beginPath();
            newCtx.moveTo(data.x, data.y);
        }

        socket.on('draw', onDraw);

        return () => {
            socket.off('draw', onDraw);
        };
    }, []);

    return (
        <div>
            <canvas ref={canvasRef}
                    onMouseUp={finishedPosition}
                    onMouseDown={startPosition}
                    onMouseMove={draw}
                    width={700}
                    height={700}
                    className={'border-2 border-black rounded-2xl'}
            ></canvas>
        </div>
    );
};

export default Playground;