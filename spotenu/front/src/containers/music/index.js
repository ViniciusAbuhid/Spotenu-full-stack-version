import React, { useState } from 'react'
import * as S from './style'
import Header from '../../components/header/index'
import Footer from '../../components/footer/index'
import { Typography, Button, Box } from '@material-ui/core'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { routes } from '../../router/index'
import { searchMusic } from '../../actions/musicsAction'

function MusicSession(props) {

    return (
        <S.PageWrapper>
            <Header/>
            <S.ContentWrapper elevation={10}>
            <Typography variant='h4' align='center'>
                Resultado da busca
            </Typography>
            <S.StyledList>
            {props.searchedMusics.length? props.searchedMusics.map((music, index) => {
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
                            </Box>
                            )
                    }) : 
                    <Typography>
                        Nenhum resultado encontrado para 
                    </Typography>
                    }
            </S.StyledList>
            <Box mb={2}>
            <S.ClickedTypog>Use a barra de pesquisa acima para uma nova busca</S.ClickedTypog>
            </Box>
            <S.ClickedTypog onClick={()=>props.goToHomePage()}>Voltar</S.ClickedTypog>
            </S.ContentWrapper>
            <Footer />
        </S.PageWrapper>
    )
}

const mapStateToProps = state => {
    return {
        searchedMusics: state.research.searchedMusics
    }
}

const mapDispatchToProps = dispatch => {
    return {
        goToHomePage: () => dispatch(push(routes.home)),
        searchMusic: (musicName) => dispatch(searchMusic(musicName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicSession)