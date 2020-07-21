import React from 'react'
import * as S from './style'
import Header from '../../components/header/index'
import Footer from '../../components/footer/index'
import { Typography, Button, Box, Grid } from '@material-ui/core'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { routes } from '../../router/index'
import logo from '../../assets/SPOTENU.png'
import { history } from '../../App'

function SearchSession(props) {

    return (
        <S.PageWrapper>
            <Header />
            <S.ContentWrapper elevation={10}>
                <Box mb={props.searchedTerm ? 2 : 0}>
                    <S.ImgWrapper src={logo}></S.ImgWrapper>
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
                                    if ((props.searchedMusics.length - 1) % 10 === 0 
                                        && 
                                        index === (props.searchedMusics.length - 1) 
                                        &&
                                        props.searchedMusics.length >= 10
                                        ){}
                                    else {
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
                                    }
                                })}
                            </div>)
                            : (
                                <Typography align='center'>
                                    Nenhum registro...
                                </Typography>)
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