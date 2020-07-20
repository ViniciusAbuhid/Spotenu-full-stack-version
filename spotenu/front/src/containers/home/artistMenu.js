import React, { useState } from 'react'
import * as S from './style'
import { Typography, Button, Box } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import logo from '../../assets/SPOTENU.png'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { routes } from '../../router/index'
import MusicMenu from './musicMenu'
import { deleteAlbuns } from '../../actions/albunsAction'

function ArtistMenu(props) {

    const [albumId, setAlbumId] = useState('')

    return (
        <div>
            <Box display='flex' justifyContent='center' alignContent='center'>
                <S.ImgWrapper src={logo}></S.ImgWrapper>
            </Box>
            <Typography variant='h4' align='center'>
                Meus álbuns
            </Typography>
            <S.StyledList>
                {props.albunsList.length >= 1 ? props.albunsList.map((album, index) => {
                    return (
                        <li key={index} >
                            <Box
                                display="flex"
                                justifyContent='space-between'
                                mt={3}>
                                <Typography variant='h5'>{album.name}</Typography>
                                <DeleteIcon
                                    onClick={()=>props.deleteAlbum(album.id)}
                                    size='big'
                                    color='disabled' />
                            </Box>
                            {albumId === album.id ? (
                                <Box>
                                    <Box mb={2}>
                                    <S.ClickedTypog
                                        size='small'
                                        onClick={() => setAlbumId('')}>
                                        Recolher Álbum
                                    </S.ClickedTypog>
                                    </Box>
                                    <MusicMenu componentInfo={{ component: 'album', componentId: album.id }} />
                                </Box>
                            ) : (
                                    <S.ClickedTypog
                                        size='small'
                                        onClick={() => setAlbumId(album.id)}>
                                        Ver músicas
                                    </S.ClickedTypog>
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
        deleteAlbum: (albumId)=> dispatch(deleteAlbuns(albumId)),
        goToForm: () => dispatch(push(routes.form))
    }
}

export default connect(null, mapDispatchToProps)(ArtistMenu)