import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRef } from 'react';
import { styled } from '@mui/material';

const ReturnRoomDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 10,
        background: '#161B22',
        padding: '10px 15px',
        minWidth: 500
    },
}));
const ReturnToGameDialog = ({setOpen, open, back, leave}) => {
    const handleClose = () => {
        setOpen(false);
    };
    const handleLeave = () => {
        leave();
        handleClose();
    }
    const handleBack = () => {
        back();
        handleClose();
    }
    console.log(open);
    return (
        <div>
            <ReturnRoomDialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle
                    sx={{
                         background: '#161B22',
                         fontSize: 28,
                         fontWeight: 700,
                    }}
                >
                    You already have a game session!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText color={'#fff'} fontSize={17}>
                        What do you want to do?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLeave}
                            color={'error'}
                    >
                        Leave game
                    </Button>
                    <Button onClick={handleBack} variant={'contained'} autoFocus>
                        Back to game
                    </Button>
                </DialogActions>
            </ReturnRoomDialog>
        </div>
    );
}

export default ReturnToGameDialog;