import React, { useEffect } from 'react'
import Header from '../../components/header/index'
import * as S from './style'
import { Typography, Button, ButtonGroup } from '@material-ui/core'
import { connect } from 'react-redux'
import { getAllNewBands, approveBand, disapproveBand } from '../../actions/bandsAction'
import Footer from '../../components/footer'

function Approvals(props) {

    useEffect(() => {
        props.getAllNewBands()
        console.log(props.newBandsList)
    }, [])

    function approveBand(e) {
        props.approveBand()
    }

    function disapproveBand(e) {
        props.disapproveBand()
    }

    return (
        <S.PageWrapper>
            <Header />
            <S.ContentWrapper elevation={10}>
                <Typography variant='h4' align='center'>
                    Bandas esperando aprovação
                </Typography>
                <S.StyledList>
                    {props.newBandsList.length > 0 ? props.newBandsList.map(band => {
                        return <li>
                            <Typography variant='h5'>{band.name}</Typography>
                            <S.ListWrapper>
                                <li><Typography>{band.nickname}</Typography></li>
                                <li><Typography>{band.description}</Typography></li>
                                <li><Typography>{band.email}</Typography></li>
                            </S.ListWrapper>
                            <ButtonGroup color="secondary" aria-label="outlined primary button group">
                                <Button
                                    onClick={approveBand}
                                    variant='contained'>
                                    Aprovar
                                </Button>
                                <Button
                                    onClick={disapproveBand}
                                    variant='contained'>
                                    Desaprovar
                                </Button>
                            </ButtonGroup>
                        </li>
                    }) :
                        <Typography variant='h5' align='center'>Não há nenhuma banda para ser aprovada...
                        </Typography>
                    }
                </S.StyledList>
            </S.ContentWrapper>
            <Footer/>
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
        approveBand: () => dispatch(approveBand()),
        disapproveBand: () => dispatch(disapproveBand())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Approvals)