import React, { useState } from 'react'
import * as S from './style'
import { Typography, Button, Box } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import Switch from '@material-ui/core/Switch'
import logo from '../../assets/SPOTENU.png'
import MusicMenu from './musicMenu'

function UserMenu(props) {

    const [plId, setPlId] = useState('')

    return (
        <div>
            <S.ImgWrapper src={logo}></S.ImgWrapper>
            <Typography variant='h4' align='center'>
                Minhas playlists
            </Typography>
            <S.StyledList>
                {props.playlitsList.length >= 1 ? props.playlitsList.map((pl, index) => {
                    return (
                        <li key={index}>
                            <Box
                                display="flex"
                                justifyContent='space-between'
                                mt={3}>
                                <Typography variant='h5'>{pl.name}</Typography>
                                <DeleteIcon size='big'
                                    color='disabled' />
                            </Box>
                            {plId === pl.id ? (
                                <div>
                                    <S.ClickedTypog
                                        size='small'
                                        onClick={() => setPlId('')}>
                                        Recolher Playlist
                                </S.ClickedTypog>
                                    <Box
                                        display="flex"
                                        alignItems='center'
                                        mb={2}>
                                        <Typography>Tornar Playlist pública</Typography>
                                        <Switch color='secondary' />
                                    </Box>
                                    <MusicMenu componentInfo={{ component: 'pl', componentName: pl.name }} />
                                </div>
                            ) : (
                                    <S.ClickedTypog
                                        size='small'
                                        onClick={() => setPlId(pl.id)}>
                                        Ver músicas
                                    </S.ClickedTypog>
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