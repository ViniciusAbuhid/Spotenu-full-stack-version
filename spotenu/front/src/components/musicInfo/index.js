import React from 'react'
import styled from 'styled-components'
import { Typography, Paper } from '@material-ui/core'

export const ContentWrapper = styled(Paper)`
    width: 30%;
    padding: 15px;
    z-index: 2;
    position: fixed;
    top: 35%;
    left: 35%;
    // @media only screen and (max-width: 1100px){
    //     width: 40%;
    // }
    // @media only screen and (max-width: 767px){
    //     width: 50%;
    // }
    // @media only screen and (max-width: 480px){
    //     width: 60%;
    //     margin: 50px 0 100px 0;
    // }
`

function MusicInfo(props) {

    return (
        <ContentWrapper>
            <Typography variant='h4'>{props.name}</Typography>
            <Typography>Artista: {props.artist}</Typography>
            <Typography>Album: {props.album}</Typography>
            <Typography>Link: {props.link}</Typography>
        </ContentWrapper>
    )
}

export default MusicInfo