import React, { useState } from 'react'
import logo from '../../assets/SPOTENU-HEADER.png'
import * as S from './style'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import SearchIcon from '@material-ui/icons/Search'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { routes } from '../../router/index'
import { Box, IconButton } from '@material-ui/core'
import { searchMusic } from '../../actions/musicsAction'

function Header(props) {

    const [search, setSearch] = useState({})

    function logout() {
        const result = window.confirm('Tem certeza que deseja sair?')
        result && window.localStorage.removeItem('token')
        result && window.localStorage.removeItem('role')
        result && props.logout()
    }

    const goSearch = (e) => {
        e.preventDefault()
        props.searchMusic(search.input)
    }

    const saveInput = (e) => {
        setSearch({ ...search, input: e.target.value })
    }


    return (
        <S.ComponentWrapper>
            <S.Header>
                <S.InvisibleSpan/>
                <S.ImgWrapper src={logo} onClick={props.goToHomePage} />
                {props.logoutIcon || (
                    <S.Logout onClick={logout}>
                        <AccountCircleIcon fontSize="large" />
                    </S.Logout>)}
            </S.Header>
            {props.showSearch || (
                <S.BarWrapper>
                    <Box padding={2}
                        width= '100%'
                        display='flex'
                        alignItems='center'
                        justifyContent='center'>
                        <IconButton
                            aria-label="search"
                            color='secondary'>
                            <SearchIcon />
                        </IconButton>
                        <form onSubmit={goSearch}>
                            <S.StyledTextField
                                onChange={saveInput}
                                placeholder="O que você gostaria de escutar?"
                                value={search.input || ''}
                                color='secondary'
                                autoFocus={props.focus}
                                required
                            />
                        </form>
                    </Box>
                </S.BarWrapper>
            )}
        </S.ComponentWrapper>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        goToHomePage: () => dispatch(push(routes.home)),
        logout: () => dispatch(push(routes.login)),
        searchMusic: (musicName) => dispatch(searchMusic(musicName, null))
    }
}

export default connect(null, mapDispatchToProps)(Header)