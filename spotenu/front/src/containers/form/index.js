import React, { useState } from 'react'
import * as S from './style'
import Header from '../../components/header/index'
import Footer from '../../components/footer/index'
import { TextField, Typography, Box, Button } from '@material-ui/core'
import logo from '../../assets/SPOTENU.png'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { routes } from '../../router/index'
import { createAlbum } from '../../actions/albunsAction'

function Form(props) {

    const [albumData, setAlbumData] = useState({})
    
    function saveAlbumData(e) {
        const {name, value} = e.target
        setAlbumData({...albumData, [name]:value})
        console.log(albumData)
    }

    function sendAlbumData(e) {
        props.createAlbum(albumData)
    }

    return (
        <S.PageWrapper>
            <Header/>
            <S.ContentWrapper elevation={10}>
                <S.ImgWrapper src={logo}></S.ImgWrapper>
                <S.FormWrapper onSubmit={sendAlbumData}>
                    <Typography variant='h3' align='center'>Adicionar álbum</Typography>
                    <TextField
                        color='secondary'
                        label='Nome do álbum'
                        name='name'
                        required
                        value={albumData.name || ''}
                        onChange={saveAlbumData} />
                    <TextField
                        color='secondary'
                        label='Gênero predominante'
                        name='genre'
                        value={albumData.genre || ''}
                        required
                        onChange={saveAlbumData} />
                    <Box mt={4} mb={3} >
                        <Button variant="contained" color='secondary' type='onSubmit'>Adicionar</Button>
                    </Box>
                </S.FormWrapper>
            </S.ContentWrapper>
            <Footer/>
        </S.PageWrapper>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        createAlbum: (albumData)=> dispatch(createAlbum(albumData))
    }
}

export default connect(null, mapDispatchToProps)(Form)