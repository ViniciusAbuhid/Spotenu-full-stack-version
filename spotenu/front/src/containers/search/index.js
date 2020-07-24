import React, { useState, useEffect } from 'react'
import * as S from './style'
import Header from '../../components/header/index'
import Footer from '../../components/footer/index'
import { Typography, Box} from '@material-ui/core'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { routes } from '../../router/index'
import logo from '../../assets/SPOTENU.png'
import { history } from '../../App'
import MusicInfo, { ClickedTypog } from '../../components/musicInfo'

function SearchSession(props) {

    const [pageMin, setPageMin] = useState(0)
    const [pageMax, setPageMax] = useState(10)
    const [toggle, setToggle] = useState(false)
    const [musicInfo, setMusicInfo] = useState('')

    function handleMusicInfo(music) {
            setMusicInfo(music)
            setToggle(true)
    }

    function handleResultDisplay(page) {
        setPageMin(page)
        setPageMax(page + 10)
    }

    function turnOffToggle(){
        setToggle(false)
    }

    return (
            <S.PageWrapper>
                <S.BackgroundWrapper 
                display={toggle? 'block' : 'none'}
                onClick={turnOffToggle}/>
                <Header />
                <S.ContentWrapper elevation={10}>
                    <Box mb={props.searchedTerm ? 2 : 0} >
                        <Box display='flex' justifyContent='center' alignContent='center'>
                            <S.ImgWrapper src={logo}></S.ImgWrapper>
                        </Box>
                        <Typography align='center' variant='h4' >
                            Pesquisar músicas
                    </Typography>
                    </Box>
                    {props.searchedTerm ? (
                        <div>
                            <Typography align='center'>
                                Resultado da busca para '{props.searchedTerm}':
                        </Typography>
                            {props.searchedMusics.length ? (
                                <div>
                                    {props.searchedMusics.map((music, index) => {
                                        if (index >= pageMin && index < pageMax) {
                                            return (
                                                <Box
                                                    key={index}
                                                    mt={2}
                                                    display='flex'
                                                    justifyContent='space-between'>
                                                    <Box display='flex'>
                                                        <PlayCircleFilledIcon />
                                                        <ClickedTypog
                                                        onClick={() => handleMusicInfo(music)}>
                                                        {music.name}
                                                        </ClickedTypog>
                                                    </Box>
                                                    <Box
                                                        display=
                                                        {toggle && musicInfo.name === music.name ?
                                                        'flex' : 'none'}>
                                                        <MusicInfo
                                                        name={music.name}
                                                        link={music.link}
                                                        album={music.album}
                                                        artist={music.artist}
                                                        goBack={turnOffToggle}
                                                        />
                                                    </Box>
                                                </Box>
                                            )
                                        }
                                    })}
                                    <Box display='flex' justifyContent='center' mb={2} mt={2}>
                                        <Typography>Página:</Typography>
                                        {props.searchedMusics.map((music, index) => {
                                            if (index % 10 === 0) {
                                                return (
                                                    <Box ml={2}>
                                                        <S.ClickedTypog
                                                            key={index}
                                                            onClick={() => handleResultDisplay(index)}>
                                                            {index === 0 ? 1 : (index / 10 + 1)}
                                                        </S.ClickedTypog>
                                                    </Box>
                                                )
                                            }
                                        })}
                                    </Box>
                                </div>)
                                : (
                                    <Box mt={2} mb={2}>
                                        <Typography align='center'>
                                            Nenhum registro...
                                </Typography>
                                    </Box>)
                            }
                            <Box mb={2}>
                                <Typography align='center'>
                                    Use a barra de pesquisa acima para uma nova busca
                            </Typography>
                            </Box>
                        </div>) : (
                            <Box mb={3} mt={3}>
                                <Typography align='center'>
                                    Use a barra de pesquisa acima para fazer a sua busca
                        </Typography>
                            </Box>)
                    }
                    <S.ClickedTypog onClick={() => history.goBack()}>Voltar</S.ClickedTypog>
                </S.ContentWrapper>
                <Footer />
            </S.PageWrapper>
    )
}

const mapStateToProps = state => {
    return {
        searchedMusics: state.research.searchedMusics,
        searchedTerm: state.query.searchedTerm
    }
}

const mapDispatchToProps = dispatch => {
    return {
        goToHomePage: () => dispatch(push(routes.home))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchSession)