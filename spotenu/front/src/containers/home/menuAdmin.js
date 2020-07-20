import React from 'react'
import * as S from './style'
import { Typography, Box, Select, MenuItem, Button, NativeSelect } from '@material-ui/core'
import logo from '../../assets/SPOTENU.png'
import { connect } from 'react-redux'
import { routes } from '../../router'
import { push } from 'connected-react-router'
import { useState } from 'react'

function MenuAdmin(props) {

    const [task, setTask] = useState('')

    function handleTaskChange(e) {
        if(e.target.value === 'BANDS'){
            setTask(e.target.value)
        }
        else if(e.target.value === 'GENRES'){
            setTask(e.target.value)
        }
        else if(e.target.value === 'SIGNUP'){
            setTask(e.target.value)
        }
    }

    function goDoTheTak(){
        if(task === 'BANDS'){
            props.goToBandsApprovals()
        }
        else if(task === 'GENRES'){
            props.goToGenresPage()
        }
        else if(task === 'SIGNUP'){
            props.goToSignupAdmin()
        }
    }

    return (
        <div>
            <Box display='flex' justifyContent='center' alignContent='center'>
            <S.ImgWrapper src={logo}></S.ImgWrapper>
            </Box>
            <Typography variant='h4' align='center'>
                Seja bem-vind@
            </Typography>
            <Box mb={2} mt={2}>
            <Typography align='center'>O que deseja fazer?</Typography>
            </Box>
            <S.AnotherFormWrapper onSubmit={goDoTheTak}>
            <NativeSelect onChange={handleTaskChange} value={task}>
                    <option value="" disabled>selecione</option>
                    <option value='BANDS'>Gerenciar bandas</option>
                    <option value='GENRES'>Gerenciar gêneros</option>
                    <option value='SIGNUP'>Cadastrar administrador</option>
            </NativeSelect>
            <Button variant="contained" color='secondary' type='onSubmit'>ir</Button>
            </S.AnotherFormWrapper>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        goToBandsApprovals: () => dispatch(push(routes.approvals)),
        goToGenresPage: () => dispatch(push(routes.genres)),
        goToSignupAdmin: () => dispatch(push(routes.signup))
    }
}

export default connect(null, mapDispatchToProps)(MenuAdmin)