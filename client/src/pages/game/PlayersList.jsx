import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { useSelector } from 'react-redux';
import { chatSelector } from '../../store/selectors';
import Container from '@widgets/Container';
import crown from '@assets/images/crown.png';

const PlayersList = () => {
    const players = useSelector(state => state.game.players);

    return (
        <aside className={'h-[800px] w-[350px]'}>
            <Container className={'max-h-[100%] px-10 py-12  overflow-auto'}
                       sx={{
                           justifyContent: 'flex-start'
                       }}
            >
                <h2 className={'text-3xl font-bold text-emerald-500'}>List of players</h2>
                <List>
                    {players.map(player =>
                        <ListItem key={player.username}>
                            <ListItemText
                                primaryTypographyProps={{
                                    position: 'relative',
                                    display: 'flex',
                                    fontSize: 22,
                                    color: '#429899',
                                }}
                            >
                                {player.role === 'Owner'
                                    ? <img src={crown} alt='' className={'absolute -left-10 min-w-[30px] h-[30px]'} width={30} height={30}/>
                                    : null
                                }
                                {player.username} — {player.count ?? 0}
                            </ListItemText>
                        </ListItem>
                    )}
                </List>
            </Container>
        </aside>
    );
};

export default PlayersList;