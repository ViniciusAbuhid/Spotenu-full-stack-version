import React from 'react'
import styled from 'styled-components'
import { Typography, Paper } from '@material-ui/core'

export const ContentWrapper = styled(Paper)`
    width: 250px;
    padding: 15px;
    z-index: 2;
    position: fixed;
    top: 35%;
    left: 40%;
    @media only screen and (max-width: 1100px){
        left: 38%;
    }
    @media only screen and (max-width: 767px){
        left: 33%;
    }
    @media only screen and (max-width: 480px){
        left: 22%;
    }
`
export const StyledTypog = styled(Typography)`
    margin-top: 20px
`

export const ClickedTypog = styled(Typography)`
    margin-top: 20px;
    &:hover {
    color: #FE7E02;
    cursor: pointer
        }
`

function MusicInfo(props) {

    return (
        <ContentWrapper>
            <StyledTypog variant='h4' color='secondary'>{props.name}</StyledTypog>
            <StyledTypog>Artista: {props.artist}</StyledTypog>
            <StyledTypog>Album: {props.album}</StyledTypog>
            <StyledTypog>Link: {props.link}</StyledTypog>
            <ClickedTypog onClick={props.goBack} align='center'>Voltar</ClickedTypog>
        </ContentWrapper>
    )
}

export default MusicInfo