import React, { useState } from 'react'
import * as S from './style'
import { Typography, Button, Box } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import Switch from '@material-ui/core/Switch'

function ArtistMenu(props) {

    const [albumId, setAlbumId] = useState('')

    return (
        <div>
            <Typography variant='h4' align='center'>
                Meus álbuns
            </Typography>
            <S.StyledList>
                {props.albunsList? props.albunsList.map(album => {
                    return (
                        <li>
                            <Box
                                display="flex"
                                justifyContent='space-between'
                                mt={3}>
                                <Typography variant='h5'>{album.name}</Typography>
                                <DeleteIcon size='small' />
                            </Box>
                            {albumId === album.id ? (
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
                                        onClick={() => setAlbumId('')}>
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
                                        onClick={() => setAlbumId(album.id)}>
                                        Ver músicas
                                    </Button>
                                )}
                        </li>)
                }) :
                    <Typography
                        variant='h5'
                        align='center'>Você não tem nenhum álbum
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
                    color='secondary'>
                        Adicionar álbum
                </Button>
            </Box>
        </div>
    )
}

export default ArtistMenu