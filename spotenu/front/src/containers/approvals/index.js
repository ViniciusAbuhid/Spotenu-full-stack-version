import React from 'react'
import Header from '../../components/header/index'
import * as S from './style'
import { Typography } from '@material-ui/core'
import { connect } from 'react-redux'

function Approvals(props) {

    function test() {
        console.log(props.newBandsList)
    }

    return (
        <S.PageWrapper>
            <Header></Header>
            <S.ContentWrapper elevation={10}>
                <Typography variant='h4' align='center' onClick={test}>Lista de bandas esperando aprovação</Typography>
                <ul>
                    {props.newBandsList.map(band => {
                        return <li>
                            <Typography variant='h5'>{band.name}</Typography>
                            <ul>
                                <li><Typography>{band.nickname}</Typography></li>
                                <li><Typography>{band.description}</Typography></li>
                                <li><Typography>{band.email}</Typography></li>
                            </ul>
                        </li>
                    })}
                </ul>
            </S.ContentWrapper>
        </S.PageWrapper>
    )
}

const mapStateToProps = state => {
    return {
        newBandsList: state.bands.newBands
    }

}

export default connect(mapStateToProps)(Approvals)