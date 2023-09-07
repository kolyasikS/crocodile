import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { useSelector } from 'react-redux';
import { chatSelector } from '../../store/selectors';

const PlayersList = () => {
    const players = useSelector(state => state.game.players);

    return (
        <List>
            <ListItem>
                <ListItemText
                    primary="Single-line item"
                />
            </ListItem>
        </List>
    );
};

export default PlayersList;