import React, { useState } from 'react'
import * as S from './style'
import Header from '../../components/header/index'
import Footer from '../../components/footer/index'
import { TextField, Typography, Box, Button } from '@material-ui/core'
import logo from '../../assets/SPOTENU.png'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { routes } from '../../router/index'
import { sendLoginData } from '../../actions/usersActions'

function Login(props) {

    const [userData, setUserData] = useState({})

    function saveUserData(e) {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    function sendLoginData(e) {
        e.preventDefault()
        let updatedUserData = {}
        if (userData.credential.includes('@')) {
            updatedUserData = {
                email: userData.credential,
                password: userData.password
            }
        }
        else {
            updatedUserData = {
                nickname: userData.credential,
                password: userData.password
            }
        }
        props.sendLoginData(updatedUserData)
    }

    return (
        <S.PageWrapper>
            <Header
                showSearch={true}
                logoutIcon={true}/>
            <S.ContentWrapper elevation={10}>
                <S.ImgWrapper src={logo}></S.ImgWrapper>
                <S.FormWrapper onSubmit={sendLoginData}>
                    <Typography variant='h3' align='center'>Login</Typography>
                    <TextField
                        color='secondary'
                        label='Email ou nickname'
                        name='credential'
                        required
                        value={userData.credential || ''}
                        onChange={saveUserData} />
                    <TextField
                        color='secondary'
                        label='Senha'
                        type='password'
                        name='password'
                        required
                        value={userData.password || ''}
                        onChange={saveUserData} />
                    <Box mt={4} mb={3} >
                        <Button variant="contained" color='secondary' type='onSubmit'>Enviar</Button>
                    </Box>
                </S.FormWrapper>
                <S.Invitation onClick={props.goToSignup}>Não tem cadastro? Clique aqui</S.Invitation>
            </S.ContentWrapper>
            <Footer />
        </S.PageWrapper>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        goToSignup: () => dispatch(push(routes.signup)),
        sendLoginData: (updatedUserData) => dispatch(sendLoginData(updatedUserData))
    }
}

export default connect(null, mapDispatchToProps)(Login)