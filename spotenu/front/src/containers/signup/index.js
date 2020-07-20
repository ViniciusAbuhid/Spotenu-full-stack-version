import React, { useState, useEffect } from 'react'
import { TextField, Typography, Button, Box, Select, MenuItem, InputLabel, NativeSelect } from '@material-ui/core'
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

    function handleRoleChange(e) {
        setRole(e.target.value)
        console.log('testeee', role)
    }

    function sendSignupData(e) {
        e.preventDefault()
        if(role === ''){
            alert('Por favor, especifique um tipo de usuário')
        }
        else{
        const updatedUserData = {
            ...userData, role
        }
        props.sendSignupData(updatedUserData)
        }
    }

    return (
        <S.PageWrapper>
            <Header
                showSearch={window.localStorage.getItem('role') === 'ADMIN' ? null : true}
                logoutIcon={window.localStorage.getItem('role') === 'ADMIN' ? null : true} />
            <S.ContentWrapper elevation={10}>
                <S.ImgWrapper src={logo}></S.ImgWrapper>
                {role === 'ADMIN' ?
                    <Typography variant='h4' align='center'>Cadastro de novo administrador</Typography> :
                    <S.RolesWrapper>
                        <Box mb={2}>
                            <Typography variant='h3' align='center'>Cadastro</Typography>
                        </Box>
                        <Box
                            mt={2}
                            display='flex'
                            flexDirection='column'
                            justifyContent="center"
                            alignItems='center'
                        >
                            <Typography id='user type'>Desejo me cadastrar como:</Typography>
                            <NativeSelect
                                color='secondary'
                                value={role}
                                onChange={handleRoleChange}
                                required
                            >
                                <option value="" disabled>
                                    selecione
                                </option>
                                <option
                                    value='OUVINTE PAGANTE'>
                                    Ouvinte pagante
                                </option>
                                <option
                                    value='OUVINTE NAO PAGANTE'>
                                    Ouvinte não pagante
                                </option>
                                <option
                                    value='BANDA'>
                                    Banda
                                </option>
                            </NativeSelect>
                        </Box>
                    </S.RolesWrapper>
                }
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