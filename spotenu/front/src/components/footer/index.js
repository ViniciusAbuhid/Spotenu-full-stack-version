import React from 'react'
import * as S from './style'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import HomeIcon from '@material-ui/icons/Home';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { routes } from '../../router/index'

function Footer(props) {

    function logout() {
        const result = window.confirm('Tem certeza que deseja sair?')
        result && window.localStorage.removeItem('token')
        result && window.localStorage.removeItem('role')
        result && props.logout()
    }

    return (
        <S.Footer>
            <S.StyledTypog align='center' variant='h6' >Feito por Vinícius Abuhid</S.StyledTypog>
            <S.IconsWrapper>
                <S.Home>
                    <HomeIcon fontSize="large" onClick={()=> props.goToHomePage()}/>
                </S.Home>
                <S.Play>
                    <PlayCircleFilledIcon fontSize="large"onClick={()=> alert('solta o som Dj...')}/>
                </S.Play>
                <S.Logout>
                    <AccountCircleIcon fontSize="large" onClick={logout}/>
                </S.Logout>
            </S.IconsWrapper>
        </S.Footer>
    )
}

const mapStateToProps = (dispatch) => {
    return {
        goToHomePage: () => dispatch(push(routes.home)),
        logout: () => dispatch(push(routes.login))
    }
}

export default connect(null, mapStateToProps)(Footer)