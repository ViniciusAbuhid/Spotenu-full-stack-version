import React from 'react'
import * as S from './style'
import { Typography, Box, Button, ButtonGroup } from '@material-ui/core'
import logo from '../../assets/SPOTENU.png'
import { connect } from 'react-redux'
import { routes } from '../../router'
import { push } from 'connected-react-router'

function MenuAdmin(props) {

    return (
        <div>
            <S.ImgWrapper src={logo}></S.ImgWrapper>
            <Typography variant='h4' align='center'>
                Olá, administrador, o que deseja fazer?
            </Typography>
            <Box mt={2} mb={3} display='flex' justifyContent='space-evenly' >
                    <S.ClickedTypog onClick={props.goToBandsApprovals}>Gerenciar bandas</S.ClickedTypog>
                    <S.ClickedTypog onClick={props.goToGenresPage} >Gerenciar gêneros</S.ClickedTypog>
                    <S.ClickedTypog onClick={props.goToSignupAdmin}>Cadastrar administrador</S.ClickedTypog>
            </Box>
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