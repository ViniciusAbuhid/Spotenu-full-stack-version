import React, { useEffect, useState } from 'react'
import * as S from './style'
import Header from '../../components/header/index'
import Footer from '../../components/footer/index'
import MenuAdmin from './menuAdmin'
import { connect } from 'react-redux'
import { getAllPls } from '../../actions/playListsAction'
import { getAllAlbuns } from '../../actions/albunsAction'
import UserMenu from './userMenu'
import ArtistMenu from './artistMenu'
import { Box, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import alternativeLogo from '../../assets/SPOTENU3.png'
import { push } from 'connected-react-router'
import { routes } from '../../router/index'
import { albuns } from '../../reducers/music'

function Home(props) {

    useEffect(() => {
        if (!window.localStorage.getItem('role')) {
            props.goToLogin()
        }
        if (window.localStorage.getItem('role') === 'OUVINTE PAGANTE') {
            props.getAllPls()
        }
        if (window.localStorage.getItem('role') === 'BANDA') {
            props.getAllAlbuns()
        }
        defineContent()
    }, [])


    const defineContent = () => {
        switch (window.localStorage.getItem('role')) {
            case 'ADMIN':
                return(
                    <S.ContentWrapper elevation={10}>
                        <MenuAdmin />
                    </S.ContentWrapper>
                )
            case 'OUVINTE PAGANTE':
                return(
                    <S.ContentWrapper elevation={10}>
                        <UserMenu playlitsList={props.playLists} role='payer-user' />
                    </S.ContentWrapper>)
            case 'BANDA':
                return(
                    <S.ContentWrapper elevation={10}>
                        <ArtistMenu albunsList={props.albuns} />
                    </S.ContentWrapper>)
            default:
                return(
                    <Box display='flex' flexDirection='column' alignItems='center'>
                        <S.StyledLogo src={alternativeLogo} />
                        <Box mt={3}>
                            <S.StyledTextField
                                color='secondary'
                                defaultValue='O que você quer escutar?'
                                autoFocus='true' />
                            <IconButton type="submit" aria-label="search" color='secondary'>
                                <SearchIcon />
                            </IconButton>
                        </Box>
                    </Box>
                )
        }

    }

    let screen = defineContent()

    return (
        <S.PageWrapper>
            <Header
                showSearch={window.localStorage.getItem('role') === 'OUVINTE NÃO PAGANTE' ? true : null}
                logoutIcon={null} />
            {screen}
            <Footer />
        </S.PageWrapper>
    )
}

const mapStateToProps = state => {
    return {
        playLists: state.playLists.allPlayLists,
        albuns: state.albuns.albunsList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllPls: () => dispatch(getAllPls()),
        getAllAlbuns: () => dispatch(getAllAlbuns()),
        goToLogin: () => dispatch(push(routes.login))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)