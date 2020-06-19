import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Box, Typography, Button, TextField, Grid, Paper } from '@material-ui/core'
import * as S from './style'
import { getMusicList, addMusic, deleteMusic } from '../../actions/musicsAction'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import DeleteIcon from '@material-ui/icons/Delete';

function MusicMenu(props) {

    useEffect(() => {
        props.getMusicList(props.componentInfo)
    }, [])

    const [musicData, setMusicData] = useState({})
    const [toggleMusic, setToggleMusic] = useState(false)

    function saveMusicData(e) {
        const { name, value } = e.target
        setMusicData({ ...musicData, [name]: value })
    }

    function sendMusicData(e) {
        e.preventDefault()
        console.log({ ...props.componentInfo, ...musicData })
        props.addMusic({ ...props.componentInfo, ...musicData })
    }

    return (

        <div>
            {props.MusicList.length >= 1 ? (
                <div>
                    {props.MusicList.map(relation => {
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
                                    onClick={() => props.deleteMusic({
                                        ...props.componentInfo,
                                        name: relation.music
                                    })} />
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
        MusicList: state.music.MusicList
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