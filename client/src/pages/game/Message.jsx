import React from 'react';
import { ListItem, ListItemText } from '@mui/material';

const Message = ({username, message, type}) => {
    return (
        type === 'DEFAULT'
            ? <ListItem sx={{ padding: 0 }}>
                <ListItemText p={0} className={'mb-0 text-left'}
                              primaryTypographyProps={{ fontSize: 21 }}>
                    <span className={'text-blue-400 text-xl font-bold'}>{username}</span>: {message}
                </ListItemText>
            </ListItem>
            : <ListItem sx={{ padding: 0 }}>
                <ListItemText p={0} className={'mb-0 text-center'}
                              primaryTypographyProps={{ fontSize: 24 }}>
                    <span className={'text-red-500'}>{username}</span> joined
                </ListItemText>
            </ListItem>

    );
};

export default Message;