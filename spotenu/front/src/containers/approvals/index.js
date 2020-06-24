import React, { useEffect, useState } from 'react'
import Header from '../../components/header/index'
import * as S from './style'
import { Typography, Button, ButtonGroup, Box } from '@material-ui/core'
import { connect } from 'react-redux'
import { getAllBands, approveBand, disapproveBand } from '../../actions/bandsAction'
import Footer from '../../components/footer'
import { routes } from '../../router'
import { push } from 'connected-react-router'

function Approvals(props) {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (window.localStorage.getItem('role') !== "ADMIN") {
            props.goToHomePage()
        }
        props.getAllBands()
        console.log(props.bandsList)
    }, [])

    function approveBand(id) {
        props.approveBand(id)
    }

    function disapproveBand(id) {
        props.disapproveBand(id)
    }

    return (
        <S.PageWrapper>
            <Header />
            <S.ContentWrapper elevation={10}>
                <Typography variant='h4' align='center'>
                    Bandas cadastradas
                </Typography>
                <S.StyledList>
                    {props.bandsList.length > 0 ? props.bandsList.map(band => {
                        return <li>
                            <Box mt={2}>
                                <Typography variant='h5'>{band.name}</Typography>
                            </Box>
                            <S.ListWrapper>
                                <li><Typography>{band.nickname}</Typography></li>
                                <li><Typography>{band.description}</Typography></li>
                                <li><Typography>{band.email}</Typography></li>
                            </S.ListWrapper>
                            {band.approved? '' : (
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