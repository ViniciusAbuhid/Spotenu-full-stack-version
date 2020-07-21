import React, { useEffect, useState } from 'react'
import * as S from './style'
import Header from '../../components/header/index'
import Footer from '../../components/footer/index'
import music from '../../assets/listening.png'
import MenuAdmin from './menuAdmin'
import { connect } from 'react-redux'
import { getAllPls } from '../../actions/playListsAction'
import { getAllAlbuns } from '../../actions/albunsAction'
import UserMenu from './userMenu'
import ArtistMenu from './artistMenu'
import { Box, IconButton, Typography } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import alternativeLogo from '../../assets/SPOTENU3.png'
import { push } from 'connected-react-router'
import { routes } from '../../router/index'
import { searchMusic } from '../../actions/musicsAction'

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

    const [search, setSearch] = useState({})

    const goSearch = (e) => {
        e.preventDefault()
        props.searchMusic(search.input)
    }

    const saveInput = (e) => {
        setSearch({ ...search, input: e.target.value })
    }

    const defineContent = () => {
        switch (window.localStorage.getItem('role')) {
            case 'ADMIN':
                return (
                    <S.ContentWrapper elevation={10}>
                        <MenuAdmin />
                    </S.ContentWrapper>
                )
            case 'OUVINTE PAGANTE':
                return (
                    <S.ContentWrapper elevation={10}>
                        <UserMenu playlitsList={props.playLists} role='payer-user' />
                    </S.ContentWrapper>)
            case 'BANDA':
                return (
                    <S.ContentWrapper elevation={10}>
                        <ArtistMenu albunsList={props.albuns} />
                    </S.ContentWrapper>)
            default:
                return (
                    <Box display='flex' flexDirection='column' alignItems='center'>
                        <S.StyledLogo src={alternativeLogo} />
                        <Box mt={2}>
                            <Typography align='center'>O que você quer escutar?</Typography>
                        </Box>
                        <Box 
                            mt={3} 
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
                                    value={search.input || ''}
                                    color='secondary'
                                    autoFocus={true}
                                    required />
                            </form>
                            {/* <S.StyledBackGround src={music}/> */}
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
        goToLogin: () => dispatch(push(routes.login)),
        searchMusic: (musicName) => dispatch(searchMusic(musicName, null))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)