import React, { useState } from 'react'
import * as S from './style'
import { Typography, Button, Box, TextField, Tooltip } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import logo from '../../assets/SPOTENU.png'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { routes } from '../../router/index'
import MusicMenu from './musicMenu'

function ArtistMenu(props) {

    const [albumId, setAlbumId] = useState('')
    const [musicCreator, setMusicCreator] = useState('')

    return (
        <div>
            <S.ImgWrapper src={logo}></S.ImgWrapper>
            <Typography variant='h4' align='center'>
                Meus álbuns
            </Typography>
            <S.StyledList>
                {props.albunsList.length >= 1 ? props.albunsList.map(album => {
                    return (
                        <li>
                            <Box
                                display="flex"
                                justifyContent='space-between'
                                mt={3}>
                                <Typography variant='h5'>{album.name}</Typography>
                                <DeleteIcon 
                                size='big' 
                                color='disabled'/>
                            </Box>
                            {albumId === album.id ? (
                                <div>
                                    <Button
                                        color='primary'
                                        size='small'
                                        onClick={() => setAlbumId('')}>
                                        Recolher Álbum
                                    </Button>
                                    <MusicMenu componentInfo = {{component: 'album', componentName: album.name}} />
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
                        align='center'>Você não tem nenhum álbum até o momento...
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
                    color='secondary'
                    onClick={props.goToForm}>
                    Adicionar álbum
                </Button>
            </Box>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        goToForm: () => dispatch(push(routes.form))
    }
}

export default connect(null, mapDispatchToProps)(ArtistMenu)