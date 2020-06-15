import React, { useState } from 'react'
import { TextField, Typography, Button, ButtonGroup, Box } from '@material-ui/core'
import * as S from './style'
import logo from '../../assets/SPOTENU.png'
import { connect } from 'react-redux'
import { sendUserData } from '../../actions/usersActions'

function Signup(props) {

    const [role, setRole] = useState('')
    const [userData, setUserData] = useState({})

    function saveUserData(e) {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
        console.log(userData)
    }

    function sendSubscription(e) {
        e.preventDefault()
        props.sendUserData(userData)
    }

    return (
        <S.PageWrapper>
            <S.ContentWrapper>
                <S.FormWrapper onSubmit={sendSubscription}>
                    <S.ImgWrapper src={logo}></S.ImgWrapper>
                    {role === 'admin' ? 
                        <Typography variant='h4'>Cadastro de novo administrador</Typography> : 
                        <div>
                            <Typography variant='h3' align='center'>Cadastro</Typography>
                            <Typography align='center'>Desejo me cadastrar como:</Typography>
                            <Box mt={2}>
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
                    <TextField
                        color='secondary'
                        label='Nome'
                        name='name'
                        // required
                        onChange={saveUserData} />
                    <TextField
                        color='secondary'
                        label='E-mail'
                        type='email'
                        name='email'
                        // required
                        onChange={saveUserData} />
                    <TextField
                        color='secondary'
                        label='Nickname'
                        name='nickname'
                        // required
                        onChange={saveUserData} />
                    <TextField
                        color='secondary'
                        label='Senha'
                        type='password'
                        name='password'
                        required
                        onChage={saveUserData}
                        inputProps={role === 'admin' ? { minLength: 10 } : { minLength: 6 }} />
                    {role === 'artist' ?
                        <TextField
                            color='secondary'
                            label='Descrição'
                            name='description'
                            onChange={saveUserData}></TextField> : ''
                    }
                    <Box mt={4} >
                        <Button variant="contained" color='secondary' type='onSubmit'>cadastrar</Button>
                    </Box>
                </S.FormWrapper>
            </S.ContentWrapper>
        </S.PageWrapper>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        sendUserData: (userData) => dispatch(sendUserData(userData))
    }
}

export default connect(null, mapDispatchToProps)(Signup)