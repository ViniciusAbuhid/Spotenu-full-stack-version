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
                return <MenuAdmin/>
            case 'payer-user':
                return <UserMenu playlitsList = {props.playLists} role='payer-user'/>
            case 'artist':
                return <ArtistMenu albunsList = {props.albuns}/>
            default:
                return 'defo'
        }

    }


    return (
        <S.PageWrapper>
            <Header />
            <S.ContentWrapper elevation={10}>
                {defineContent()}
            </S.ContentWrapper>
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
        getAllPls: ()=> dispatch(getAllPls()),
        getAllAlbuns: ()=> dispatch(getAllAlbuns())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)