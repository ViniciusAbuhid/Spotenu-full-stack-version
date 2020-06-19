import React, { useState, useEffect } from 'react'
import { TextField, Typography, Button, ButtonGroup, Box } from '@material-ui/core'
import * as S from './style'
import logo from '../../assets/SPOTENU.png'
import { connect } from 'react-redux'
import { sendSignupData } from '../../actions/usersActions'

function Signup(props) {

    useEffect(() => {
        // if (token.role){
        //   this.props.goToLogin()
        // role = admin
    }, [])

    const [role, setRole] = useState('')
    const [userData, setUserData] = useState({})

    function saveUserData(e) {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    function sendSignupData(e) {
        e.preventDefault()
        props.sendSignupData(userData)
    }

    return (
        <S.PageWrapper>
            <S.ContentWrapper elevation={10}>
                <S.ImgWrapper src={logo}></S.ImgWrapper>
                {role === 'admin' ?
                    <Typography variant='h4'>Cadastro de novo administrador</Typography> :
                    <div>
                        <Typography variant='h3' align='center'>Cadastro</Typography>
                        <Typography align='center'>Desejo me cadastrar como:</Typography>
                        <Box mt={2} mb={1}>
                            <ButtonGroup color="secondary" aria-label="outlined primary button group">
                                <Button variant="contained"
                                    onClick={() => setRole('payer-user')}>Ouvinte pagante</Button>
                                <Button variant="contained"
                                    onClick={() => setRole('normal-user')}>Ouvinte não pagante</Button>
                                <Button variant="contained"
                                    onClick={() => setRole('artist')}>Banda</Button>
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
                            // value={userData.password || ''}
                            onChage={saveUserData}
                            inputProps={role === 'admin' ? { minLength: 10 } : { minLength: 6 }} />
                        {role === 'artist' ?
                            <TextField
                                color='secondary'
                                label='Descrição'
                                name='description'
                                value={userData.desciption || ''}
                                onChange={saveUserData}></TextField> : ''
                        }
                        <Box mt={4} >
                            <Button variant="contained" color='secondary' type='onSubmit'>cadastrar</Button>
                        </Box>
                    </S.FormWrapper>
                    : ''}
            </S.ContentWrapper>
        </S.PageWrapper>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        sendSignupData: (userData) => dispatch(sendSignupData(userData))
    }
}

export default connect(null, mapDispatchToProps)(Signup)