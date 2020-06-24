import React from 'react'
import logo from '../../assets/SPOTENU-HEADER.png'
import * as S from './style'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import SearchIcon from '@material-ui/icons/Search'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { routes } from '../../router/index'
import { Box, IconButton } from '@material-ui/core'

function Header(props) {

    function logout() {
        const result = window.confirm('Tem certeza que deseja sair?')
        result && window.localStorage.removeItem('token')
        result && window.localStorage.removeItem('role')
        result && props.logout()
    }

    return (
        <S.ComponentWrapper>
            <S.Header>
                <S.ImgWrapper src={logo} onClick={props.goToHomePage} />
                {props.logoutIcon || (
                    <S.Logout onClick={logout}>
                        <AccountCircleIcon fontSize="large" />
                            Logout
                    </S.Logout>)}
            </S.Header>
            {props.showSearch || (
                <S.BarWrapper>
                    <Box padding={2}>
                        <S.StyledTextField placeholder="O que você gostaria de escutar?"
                            color='secondary' />
                        <IconButton type="submit" aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Box>
                </S.BarWrapper>
            )}
        </S.ComponentWrapper>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        goToHomePage: () => dispatch(push(routes.home)),
        logout: () => dispatch(push(routes.login))
    }
}

export default connect(null, mapDispatchToProps)(Header)