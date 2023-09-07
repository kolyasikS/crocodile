import React, { useRef } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    styled,
    TextField,
} from '@mui/material';
import { LightStandardTextField, LightTextField } from '@shared/CustomMUIComponents';

const JoinRoomDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 10,
        background: '#161B22',
        padding: '10px 15px',
        minWidth: 500
    },
}));

const JoinToRoomDialog = ({open, setOpen, join}) => {
    const linkRef = useRef();
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div>
                <JoinRoomDialog open={open} onClose={handleClose}
                        sx={{
                        }}>
                    <DialogTitle
                        sx={{
                            background: '#161B22',
                            fontSize: 28,
                            fontWeight: 700
                        }}
                    >Joining</DialogTitle>
                    <DialogContent sx={{
                        background: '#161B22'
                    }}>
                        <DialogContentText color={'#fff'} fontSize={17}>
                            Paste the invite link, please
                        </DialogContentText>
                        <LightStandardTextField
                            sx={{
                                marginY: 2
                            }}
                            color={''}
                            variant={'standard'}
                            fullWidth={true}
                            inputRef={linkRef}
                            placeholder={'Link here'}
                        />
                    </DialogContent>
                    <DialogActions

                        sx={{
                            background: '#161B22',
                            gap: 2
                        }}
                    >
                        <Button variant={'contained'} color={'error'}
                                sx={{
                                    color: '#000',
                                    fontSize: 15,
                                    borderRadius: 2,
                                    fontWeight: 600
                                }}
                                onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button variant={'contained'} color={'success'}
                                sx={{
                                    color: '#ffffff',
                                    fontSize: 15,
                                    borderRadius: 2,
                                    fontWeight: 600
                                }}
                                onClick={() => join(linkRef.current.value)}
                        >
                            Join
                        </Button>
                    </DialogActions>
                </JoinRoomDialog>
            </div>
        </div>
    );
};

export default JoinToRoomDialog;