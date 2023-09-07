import React from 'react';
import styles from './styles/preStartedInfo.module.scss';
import { Button } from '@mui/material';

const PreStartedInfo = () => {
    return (
        <div className={styles.infoBlock}>
            <div className={`${styles.infoBlock__inner} shadow-lg shadow-cyan-600`}>
                <h2>There must be 2 and more players to start</h2>
                <h3>Share this link to invite people</h3>
                <p className={styles.link}>{window.location.href}</p>
                <Button
                    onClick={() => navigator.clipboard.writeText(window.location.href)}
                    sx={{
                        fontSize: 16,
                        mt: 2
                    }}
                    color={'success'}
                    variant={'contained'}>
                    Copy to clipboard
                </Button>
            </div>
        </div>
    );
};

export default PreStartedInfo;