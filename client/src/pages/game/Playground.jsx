import React, { useEffect, useRef, useState } from 'react';
import { socket } from '../../socket';
import DrawCanvas from './DrawCanvas';
import PreStartedInfo from './PreStartedInfo';

const Playground = ({isGameStarted}) => {



    return (
        <div className={'relative'}>
            {isGameStarted
                ? null
                : <PreStartedInfo/>
            }
            <DrawCanvas/>
        </div>
    );
};

export default Playground;