import React, { useState, useEffect } from 'react'
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
import { searchMusic } from '../../actions/musicsAction'

function SearchSession(props) {

    useEffect(() => {
        // let newLimit = props.searchedMusics.length
        // if (newLimit <= 10) {
        //     setLimit(10)
        // }
        // else {
        //     while (newLimit % 10 !== 0) {
        //         newLimit = newLimit - 1
        //     }
        //     setLimit(newLimit)
        // }
        // console.log(props.searchedMusics.length, limit)
    })

    // const [limit, setLimit] = useState(10)

    // const getMoreResults = () => {
    //     props.searchMusic(props.searchedTerm)
    // }

    // const getLessResults = () => {
    //     props.searchMusic(props.searchedTerm)
    // }

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
                            Resultado da busca para '{props.searchedTerm}'
                        </Typography>
                        {props.searchedMusics.length ? (
                            <div>
                                {props.searchedMusics.map((music, index) => {
                                    // if (index < props.searchedMusics.length - 1) {
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
                                                <p>{index}</p>
                                            </Box>
                                        )
                                    // }
                                })}
                                {/* <Box
                                    display={limit > 10 ? 'flex' : 'none'}
                                    justifyContent='center'
                                    alignItems='center'
                                    mb={2} >
                                    <S.ClickedTypog
                                        onClick={getLessResults}
                                    >Mostrar menos</S.ClickedTypog>
                                </Box>
                                <Box
                                    display={limit === 10 ? props.searchedMusics.length === limit + 1 ? 'flex' :
                                        'none' : props.searchedMusics.length === limit + 11 ? 'flex' : 'none'}
                                    justifyContent='center'
                                    alignItems='center'
                                    mb={2} >
                                    <S.ClickedTypog
                                        onClick={getMoreResults}
                                    >Mostrar mais</S.ClickedTypog>
                                </Box> */}
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
        goToHomePage: () => dispatch(push(routes.home)),
        searchMusic: (musicName) => dispatch(searchMusic(musicName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchSession)