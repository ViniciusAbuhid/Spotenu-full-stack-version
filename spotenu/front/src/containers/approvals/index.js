import React, { useEffect, useState } from 'react'
import Header from '../../components/header/index'
import * as S from './style'
import { Typography, Button, ButtonGroup, Box } from '@material-ui/core'
import { connect } from 'react-redux'
import { getAllBands, approveBand, disapproveBand } from '../../actions/bandsAction'
import Footer from '../../components/footer'
import { routes } from '../../router'
import { push } from 'connected-react-router'
import logo from '../../assets/SPOTENU.png'

export function Approvals(props) {

    useEffect(() => {
        if (window.localStorage.getItem('role') !== "ADMIN") {
            props.goToHomePage()
        }
        props.getAllBands()
    }, [])

    const [filter, setFilter] = useState('')

    function approveBand(id) {
        props.approveBand(id)
    }

    function disapproveBand(id) {
        props.disapproveBand(id)
    }

    function filterBands(bandsList) {
        if (filter === 'approved') {
            return props.bandsList.filter((band, index) => {
                return band.approved
            })
        }
        else if (filter === 'not approved') {
            return props.bandsList.filter((band, index) => {
                return !band.approved
            })
        }
        else {
            return bandsList
        }
    }

    return (
        <S.PageWrapper>
            <Header />
            <S.ContentWrapper elevation={10}>
                <Box display='flex' justifyContent='center' alignContent='center'>
                    <S.ImgWrapper src={logo}></S.ImgWrapper>
                </Box>
                <Typography variant='h4' align='center'>
                    Bandas cadastradas
                </Typography>
                <S.FilterWrapper>
                    <S.ClickedTypog
                        onClick={() => setFilter('approved')}
                        color={filter === 'approved' ? 'secondary' : ''} >
                        Aprovadas
                    </S.ClickedTypog>
                    <S.ClickedTypog
                        onClick={() => setFilter('not approved')}
                        color={filter === 'not approved' ? 'secondary' : ''} >
                        Aguardando aprovação
                    </S.ClickedTypog>
                    <S.ClickedTypog
                        onClick={() => setFilter('')}
                        color={filter === '' ? 'secondary' : ''} >
                        Todas
                    </S.ClickedTypog>
                </S.FilterWrapper>
                <S.StyledList>
                    {props.bandsList.length > 0 ? filterBands(props.bandsList).map((band, index) => {
                        return <li key={index}>
                            <Box mt={2}>
                                <Typography variant='h5'>{band.name}</Typography>
                            </Box>
                            <S.ListWrapper>
                                <li><Typography>{band.nickname}</Typography></li>
                                <li><Typography>{band.email}</Typography></li>
                                {band.description && <li><Typography>{band.description}</Typography></li>}
                            </S.ListWrapper>
                            {band.approved ? '' : (
                                <ButtonGroup color="secondary" aria-label="outlined primary button group">
                                    <Button
                                        onClick={() => approveBand(band.id)}
                                        variant='contained'>
                                        Aprovar
                                </Button>
                                    <Button
                                        onClick={() => disapproveBand(band.id)}
                                        variant='contained'>
                                        Reprovar
                                </Button>
                                </ButtonGroup>)}
                        </li>
                    }) :
                        <Typography variant='h5' align='center'>Nenhuma até o momento...
                        </Typography>
                    }
                </S.StyledList>
                <Box mt={2}>
                    <S.ClickedTypog 
                    align='center'
                    onClick={()=> props.goToHomePage()}>Voltar</S.ClickedTypog>
                </Box>
            </S.ContentWrapper>
            <Footer />
        </S.PageWrapper>
    )
}

const mapStateToProps = state => {
    return {
        bandsList: state.bands.bands
    }

}

const mapDispatchToProps = dispatch => {
    return {
        getAllBands: () => dispatch(getAllBands()),
        approveBand: (id) => dispatch(approveBand(id)),
        disapproveBand: (id) => dispatch(disapproveBand(id)),
        goToHomePage: () => dispatch(push(routes.home))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Approvals)