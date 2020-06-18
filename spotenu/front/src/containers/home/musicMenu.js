import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Box, Typography, Button, TextField, Grid, Paper } from '@material-ui/core'
import * as S from './style'
import { getAlbumMusics, addMusic, deleteMusic } from '../../actions/musicsAction'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import DeleteIcon from '@material-ui/icons/Delete';

function MusicMenu(props) {

    useEffect(() => {
        props.getAlbumMusics(props.albumName)
    }, [])

    const [musicData, setMusicData] = useState({})
    const [toggleMusic, setToggleMusic] = useState(false)

    function saveMusicData(e) {
        const { name, value } = e.target
        setMusicData({ ...musicData, [name]: value })
    }

    function sendMusicData(e) {
        e.preventDefault()
        props.addMusic(musicData)
    }

    return (

        <div>
            {props.albumMusics.length >= 1 ? (
                <div>
                    {props.albumMusics.map(relation => {
                        return (
                            <Box
                                mb={2}
                                display='flex'
                                justifyContent='space-between'>
                                <Box display='flex'>
                                    <PlayCircleFilledIcon />
                                    <Typography>{relation.music}</Typography>
                                </Box>
                                <DeleteIcon
                                    size='small'
                                    color='disabled'
                                    onClick={()=> props.deleteMusic(relation.music)} />
                            </Box>)
                    })}
                    <Box>
                        <Button
                            color='primary'
                            size='small'
                            onClick={() => setToggleMusic(!toggleMusic)}>
                            Adicionar música
                </Button>
                    </Box>
                    {toggleMusic && (
                        <S.FormWrapper onSubmit={sendMusicData}>
                            <TextField placeholder='Nome da música'
                                size='small'
                                name='name'
                                required
                                value={musicData.name || ''}
                                onChange={saveMusicData} />
                            <TextField placeholder='Link'
                                size='small'
                                name='link'
                                required
                                value={musicData.link || ''}
                                onChange={saveMusicData} />
                            <Button
                                variant='contained'
                                color='secondary'
                                size='small'
                                type='onSubmit' >
                                Adicionar
                </Button>
                        </S.FormWrapper>)}
                </div>) : (
                    <Typography
                        align='center'>Albúm vazio...
                    </Typography>
                )}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        albumMusics: state.music.albumMusics
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAlbumMusics: (albumName) => dispatch(getAlbumMusics(albumName)),
        addMusic: (musicData) => dispatch(addMusic(musicData)),
        deleteMusic: (musicName) => dispatch(deleteMusic(musicName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicMenu)