import React, { useState, useEffect } from 'react'
import { TextField, Typography, Button, ButtonGroup, Box } from '@material-ui/core'
import * as S from './style'
import logo from '../../assets/SPOTENU.png'
import { connect } from 'react-redux'
import { sendSignupData } from '../../actions/usersActions'
import { push } from 'connected-react-router'
import { routes } from '../../router/index'
import Header from '../../components/header/index'
import Footer from '../../components/footer/index'

function Signup(props) {

    useEffect(() => {
        if (window.localStorage.getItem('role') === "ADMIN"){
          setRole('ADMIN')
        }
    }, [])

    const [role, setRole] = useState('')
    const [userData, setUserData] = useState({email: '', password: ''})

    function saveUserData(e) {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
        console.log(userData)
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
            showSearch={true}
            logoutIcon={true} />
            <S.ContentWrapper elevation={10}>
                <S.ImgWrapper src={logo}></S.ImgWrapper>
                {role === 'ADMIN'?
                    <Typography variant='h4'>Cadastro de novo administrador</Typography> :
                    <div>
                        <Typography variant='h3' align='center'>Cadastro</Typography>
                        <Typography align='center'>Desejo me cadastrar como:</Typography>
                        <Box mt={2} mb={role === ''? 5 : 1}>
                            <ButtonGroup color="secondary" aria-label="outlined primary button group">
                                <Button variant="contained"
                                    onClick={() => setRole('OUVINTE PAGANTE')}>Ouvinte pagante</Button>
                                <Button variant="contained"
                                    onClick={() => setRole('OUVINTE NAO PAGANTE')}>Ouvinte não pagante</Button>
                                <Button variant="contained"
                                    onClick={() => setRole('BANDA')}>Banda</Button>
                            </ButtonGroup>
                        </Box>
                    </div>
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
                            value={userData.password}
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
                        <Box mt={4} >
                            <Button variant="contained" color='secondary' type='onSubmit'>cadastrar</Button>
                        </Box>
                    </S.FormWrapper>
                    : ''}
            </S.ContentWrapper>
            <Footer/>
        </S.PageWrapper>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        sendSignupData: (updatedUserData) => dispatch(sendSignupData(updatedUserData)),
        goToLogin: ()=> dispatch(push(routes.login))
    }
}

export default connect(null, mapDispatchToProps)(Signup)