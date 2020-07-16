import React, { useState, useEffect } from 'react'
import { TextField, Typography, Button, Box } from '@material-ui/core'
import * as S from './style'
import logo from '../../assets/SPOTENU.png'
import { connect } from 'react-redux'
import { sendSignupData } from '../../actions/usersActions'
import Header from '../../components/header/index'
import Footer from '../../components/footer/index'
import { history } from '../../App'

function Signup(props) {

    useEffect(() => {
        if (window.localStorage.getItem('role') === "ADMIN") {
            setRole('ADMIN')
        }
    }, [])

    const [role, setRole] = useState('')
    const [userData, setUserData] = useState({})

    function saveUserData(e) {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    function sendSignupData(e) {
        e.preventDefault()
        const updatedUserData = {
            ...userData, role
        }
        props.sendSignupData(updatedUserData)
    }

    return (
        <S.PageWrapper>
            <Header
                showSearch={window.localStorage.getItem('role') === 'ADMIN' ? null : true}
                logoutIcon={window.localStorage.getItem('role') === 'ADMIN' ? null : true} />
            <S.ContentWrapper elevation={10}>
                <S.ImgWrapper src={logo}></S.ImgWrapper>
                {role === 'ADMIN' ?
                    <Typography variant='h4'>Cadastro de novo administrador</Typography> :
                    <S.RolesWrapper>
                        <Typography variant='h3' align='center'>Cadastro</Typography>
                        <Typography align='center'>Quero me cadastrar como:</Typography>
                        <Box
                        mt={2} mb={role === '' ? 5 : 1} 
                        display='flex' 
                        justifyContent="space-evenly"
                        alignItems = 'center'
                        >
                            <S.ClickedTypog
                                color={role === 'OUVINTE PAGANTE' ? 'secondary' : ''}
                                onClick={() => setRole('OUVINTE PAGANTE')}>
                                Ouvinte pagante
                                </S.ClickedTypog>
                                <Typography>|</Typography>
                            <S.ClickedTypog
                                color={role === 'OUVINTE NAO PAGANTE' ? 'secondary' : ''}
                                onClick={() => setRole('OUVINTE NAO PAGANTE')}>
                                Ouvinte não pagante
                                </S.ClickedTypog>
                                <Typography>|</Typography>
                            <S.ClickedTypog
                                color={role === 'BANDA' ? 'secondary' : ''}
                                onClick={() => setRole('BANDA')}>
                                Banda
                                </S.ClickedTypog>
                        </Box>
                    </S.RolesWrapper>
                }
                {role !== '' ?
                    <S.FormWrapper onSubmit={sendSignupData}>
                        <TextField
                            color='secondary'
                            label='Nome'
                            name='name'
                            required
                            value={userData.name || ''}
                            onChange={saveUserData} />
                        <TextField
                            color='secondary'
                            label='E-mail'
                            type='email'
                            name='email'
                            required
                            value={userData.email || ''}
                            onChange={saveUserData} />
                        <TextField
                            color='secondary'
                            label='Nickname'
                            name='nickname'
                            required
                            inputProps={{ pattern: "^[a-zA-Z0-9]*$" }}
                            value={userData.nickname || ''}
                            onChange={saveUserData} />
                        <TextField
                            color='secondary'
                            label='Senha'
                            type='password'
                            name='password'
                            required
                            value={userData.password || ''}
                            onChange={saveUserData}
                            inputProps={role === 'ADMIN' ? { minLength: 10 } : { minLength: 6 }}
                        />
                        {role === 'BANDA' ?
                            <TextField
                                color='secondary'
                                label='Descrição'
                                name='description'
                                value={userData.description || ''}
                                onChange={saveUserData}>
                            </TextField> : ''
                        }
                        <Box mt={4} mb={2} >
                            <Button variant="contained" color='secondary' type='onSubmit'>cadastrar</Button>
                        </Box>
                    </S.FormWrapper>
                    : ''}
                <S.ClickedTypog onClick={() => history.goBack()}>Voltar</S.ClickedTypog>
            </S.ContentWrapper>
            <Footer />
        </S.PageWrapper>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        sendSignupData: (updatedUserData) => dispatch(sendSignupData(updatedUserData))
    }
}

export default connect(null, mapDispatchToProps)(Signup)