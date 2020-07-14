import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Box, Typography, Button, TextField } from '@material-ui/core'
import * as S from './style'
import { getMusicList, addMusic, deleteMusic } from '../../actions/musicsAction'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import DeleteIcon from '@material-ui/icons/Delete';

function MusicMenu(props) {

    useEffect(() => {
        props.getMusicList(props.componentInfo)
        console.log(props.musicList)
    }, [])

    const [musicData, setMusicData] = useState({})
    const [toggleMusic, setToggleMusic] = useState(false)

    function saveMusicData(e) {
        const { name, value } = e.target
        setMusicData({ ...musicData, [name]: value })
    }

    function sendMusicData(e) {
        e.preventDefault()
        props.addMusic({ ...props.componentInfo, ...musicData })
        setMusicData({})
    }

    return (

        <div>
            {props.musicList.length >= 1 ? (
                <div>
                    {props.musicList.map((music, index) => {
                        return (
                            <Box
                                key={index}
                                mb={2}
                                display='flex'
                                justifyContent='space-between'>
                                <Box display='flex'>
                                    <PlayCircleFilledIcon />
                                    <Typography>{music.name}</Typography>
                                </Box>
                                <DeleteIcon
                                    size='small'
                                    color='disabled'
                                    onClick={() => props.deleteMusic({
                                        ...props.componentInfo,
                                        id: music.id
                                    })} />
                            </Box>)
                    })}
                </div>) : (
                    <Typography
                        align='center'>Albúm vazio...
                    </Typography>
                )}
            <Box>
                <S.ClickedTypog
                    size='small'
                    onClick={() => setToggleMusic(!toggleMusic)}>
                    Adicionar música
                </S.ClickedTypog>
            </Box>
            {toggleMusic && (
                <S.FormWrapper onSubmit={sendMusicData}>
                    <TextField
                        placeholder='Nome da música'
                        color='secondary'
                        size='small'
                        name='name'
                        required
                        value={musicData.name || ''}
                        onChange={saveMusicData} />
                    <TextField
                        color='secondary'
                        placeholder='Link'
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
        </div>
    )
}

const mapStateToProps = state => {
    return {
        musicList: state.music.musicList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getMusicList: (componentInfo) => dispatch(getMusicList(componentInfo)),
        addMusic: (musicData) => dispatch(addMusic(musicData)),
        deleteMusic: (musicData) => dispatch(deleteMusic(musicData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicMenu)