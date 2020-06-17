import React, { useState } from 'react'
import * as S from './style'
import { Typography, Button, Box } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import Switch from '@material-ui/core/Switch'

function UserMenu(props) {

    const [plId, setPlId] = useState('')

    return (
        <div>
            <Typography variant='h4' align='center'>
                Minhas playlists
            </Typography>
            <S.StyledList>
                {props.playlitsList ? props.playlitsList.map(pl => {
                    return (
                        <li>
                            <Box
                                display="flex"
                                justifyContent='space-between'
                                mt={3}>
                                <Typography variant='h5'>{pl.name}</Typography>
                                <DeleteIcon size='small' />
                            </Box>
                            {plId === pl.id ? (
                                <div>
                                    <Box
                                        display="flex"
                                        alignItems='center'>
                                        <Typography>Tornar Playlist pública</Typography>
                                        <Switch color='primary' />
                                    </Box>
                                    <Button
                                        color='primary'
                                        size='small'
                                        onClick={() => setPlId('')}>
                                        Recolher Playlist
                                    </Button>
                                    <Box>
                                        <Button
                                            color='primary'
                                            size='small'>
                                            Adicionar música
                                        </Button>
                                    </Box>
                                </div>
                            ) : (
                                    <Button
                                        color='primary'
                                        size='small'
                                        onClick={() => setPlId(pl.id)}>
                                        Ver músicas
                                    </Button>
                                )}
                        </li>)
                }) :
                    <Typography
                        variant='h5'
                        align='center'>Você não tem nenhuma playlist até o momento...
                    </Typography>
                }
            </S.StyledList>
            <Box
                display="flex"
                justifyContent='center'
                mt={2}
                mb={3}>
                <Button
                    variant='contained'
                    color='secondary'>Adicionar playlist
                </Button>
            </Box>
        </div>
    )
}

export default UserMenu