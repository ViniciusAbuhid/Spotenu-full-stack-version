import React from 'react'
import logo from '../../assets/SPOTENU-HEADER.png'
import * as S from './style'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { routes } from '../../router/index'

function Header(props){

    function goHome(){
        props.goToHomePage()
    }

    function logout(){
        const result = window.confirm('Tem certeza que deseja sair?')
        result && props.logout()
    }

    return(
        <S.Header>
            <S.ImgWrapper src={logo} onClick={goHome} />
            <S.Logout onClick={logout}>
            <AccountCircleIcon fontSize="large"/>
            Logout
            </S.Logout>
        </S.Header>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        goToHomePage: () => dispatch(push(routes.home)),
        logout: () => dispatch(push(routes.login))
    }
}

export default connect(null, mapDispatchToProps)(Header)