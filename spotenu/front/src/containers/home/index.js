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
import SearchBar from '../../components/searchBar/index'
import {Box, IconButton} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import logo from '../../assets/SPOTENU.png'

function Home(props) {

    useEffect(() => {
        // if (!window.localStorage.getItem('token') || !token.role){
        //   this.props.goToLogin()
        // }
        // setRole('role')
        props.getAllPls()
        props.getAllAlbuns()
        console.log(props.playLists)
    }, [])

    const [role, setRole] = useState('artist')

    const defineContent = () => {
        switch (role) {
            case 'admin':
                return (
                    <S.ContentWrapper elevation={10}>
                        <MenuAdmin />
                    </S.ContentWrapper>
                )
            case 'payer-user':
                return (
                    <S.ContentWrapper elevation={10}>
                        <UserMenu playlitsList={props.playLists} role='payer-user' />
                    </S.ContentWrapper>)
            case 'artist':
                return (
                    <S.ContentWrapper elevation={10}>
                        <ArtistMenu albunsList={props.albuns} />
                    </S.ContentWrapper>)
            default:
                return (
                    <S.ContentWrapper elevation={10}>
                        <S.ImgWrapper src={logo}></S.ImgWrapper>
                        <SearchBar/>
                    </S.ContentWrapper>
                )
        }

    }


    return (
        <S.PageWrapper>
            <Header />
            {role && <SearchBar/> }
            {defineContent()}
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
        getAllAlbuns: () => dispatch(getAllAlbuns())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)