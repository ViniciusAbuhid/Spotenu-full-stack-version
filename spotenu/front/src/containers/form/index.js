import React, { useState, useEffect } from 'react'
import * as S from './style'
import Header from '../../components/header/index'
import Footer from '../../components/footer/index'
import { TextField, Typography, Box, Button, Checkbox, FormControlLabel } from '@material-ui/core'
import logo from '../../assets/SPOTENU.png'
import { connect } from 'react-redux'
import { getAllGenres } from '../../actions/genresAction'
import { createAlbum } from '../../actions/albunsAction'
import genres from '../genres'
import { routes } from '../../router'
import { push } from 'connected-react-router'

function Form(props) {
    useEffect(() => {
        props.getAllGenres()
    }, [])

    const [albumData, setAlbumData] = useState({ list: [] })

    function saveAlbumData2(e) {
        if (e.target.checked) {
            setAlbumData({ ...albumData, list: [...albumData.list, e.target.value] })
        }
        else {
            const filteredGenresList = albumData.list.filter(genre => genre !== e.target.value)
            setAlbumData({ ...albumData, list: filteredGenresList })
        }
    }

    function saveAlbumName(e) {
        setAlbumData({ ...albumData, name: e.target.value })
    }

    function sendAlbumData(e) {
        e.preventDefault()
        props.createAlbum(albumData)
    }

    return (
        <S.PageWrapper>
            <Header />
            <S.ContentWrapper elevation={10}>
                <Box
                    mt={2}
                    display='flex'
                    justifyContent='center' >
                    <S.ImgWrapper src={logo}></S.ImgWrapper>
                </Box>
                <S.FormWrapper onSubmit={sendAlbumData}>
                    <Typography variant='h3' align='center'>Adicionar álbum</Typography>
                    <Box
                        display='flex'
                        flexDirection='row'
                        alignItems='center'
                        mt={2}
                    >
                        <Typography>Nome*:</Typography>
                        <TextField
                            placeholder=' Nome do álbum'
                            color='secondary'
                            name='name'
                            required
                            value={albumData.name || ''}
                            onChange={saveAlbumName} />
                    </Box>
                    {genres.length > 0 || (
                        <Box
                            mt={2}
                            display='flex'
                            flexDirection='column' >
                            <Typography>Escolha pelo menos um gênero*</Typography>
                            {props.genres.map((genre, index) => {
                                return (
                                    <FormControlLabel
                                        label={genre.name}
                                        control={
                                            <Checkbox
                                                color='secondary'
                                                name='list'
                                                value={genre.name}
                                                onClick={saveAlbumData2} />}
                                    />)
                            })}
                        </Box >)
                    }

                    <Box 
                    mt={4} 
                    mb={3} 
                    display='flex'
                    justifyContent='center' >
                        <Button variant="contained" color='secondary' type='onSubmit'>Adicionar</Button>
                    </Box>
                </S.FormWrapper>
                <S.ClickedTypog onClick={()=>props.goToHomePage()}>Voltar</S.ClickedTypog>
            </S.ContentWrapper>
            <Footer />
        </S.PageWrapper>
    )
}

const mapStateToProps = state => {
    return {
        genres: state.genres.allGenres
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createAlbum: (albumData) => dispatch(createAlbum(albumData)),
        getAllGenres: () => dispatch(getAllGenres()),
        goToHomePage: () => dispatch(push(routes.home))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)