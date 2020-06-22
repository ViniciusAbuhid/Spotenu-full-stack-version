import React, { useEffect, useState } from 'react'
import Header from '../../components/header/index'
import * as S from './style'
import { Typography, Button, ButtonGroup, Box } from '@material-ui/core'
import { connect } from 'react-redux'
import { getAllNewBands, approveBand, disapproveBand } from '../../actions/bandsAction'
import Footer from '../../components/footer'
import { routes } from '../../router'
import { push } from 'connected-react-router'
import CircularProgress from '@material-ui/core/CircularProgress'

function Approvals(props) {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // if (window.localStorage.getItem('role')!== "ADMIN"){
        //   props.goToHomePage()
        // }
        props.getAllNewBands()
        setLoading(false)
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
                    Bandas esperando aprovação
                </Typography>
                {loading || <Box
                    display='flex'
                    justifyContent='center'
                    mt={2} >
                    <CircularProgress color='secondary' /></Box>}
                {loading && (
                    <S.StyledList>
                        {props.newBandsList.length > 0 ? props.newBandsList.map(band => {
                            if (!band.approval) {
                                return <li>
                                    <Box mt={2}>
                                        <Typography variant='h5'>{band.name}</Typography>
                                    </Box>
                                    <S.ListWrapper>
                                        <li><Typography>{band.nickname}</Typography></li>
                                        <li><Typography>{band.description}</Typography></li>
                                        <li><Typography>{band.email}</Typography></li>
                                    </S.ListWrapper>
                                    <ButtonGroup color="secondary" aria-label="outlined primary button group">
                                        <Button
                                            onClick={() => approveBand(band.id)}
                                            variant='contained'>
                                            Aprovar
                                </Button>
                                        <Button
                                            onClick={() => disapproveBand(band.id)}
                                            variant='contained'>
                                            Desaprovar
                                </Button>
                                    </ButtonGroup>
                                </li>
                            }
                        }) :
                            <Typography variant='h5' align='center'>Não há nenhuma banda para ser aprovada...
                        </Typography>
                        }
                    </S.StyledList>
                )}
            </S.ContentWrapper>
            <Footer />
        </S.PageWrapper>
    )
}

const mapStateToProps = state => {
    return {
        newBandsList: state.bands.newBands
    }

}

const mapDispatchToProps = dispatch => {
    return {
        getAllNewBands: () => dispatch(getAllNewBands()),
        approveBand: (id) => dispatch(approveBand(id)),
        disapproveBand: (id) => dispatch(disapproveBand(id)),
        goToHomePage: () => dispatch(push(routes.home))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Approvals)