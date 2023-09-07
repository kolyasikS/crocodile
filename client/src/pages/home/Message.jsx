import React from 'react';
import { ListItem, ListItemText } from '@mui/material';

const Message = ({username, message, type}) => {
    console.log(username);
    return (
        type === 'DEFAULT'
            ? <ListItem sx={{ padding: 0 }}>
                <ListItemText p={0} className={'mb-0 text-left'}
                              primaryTypographyProps={{ fontSize: 20 }}>
                    <span>{username}</span>: {message}
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