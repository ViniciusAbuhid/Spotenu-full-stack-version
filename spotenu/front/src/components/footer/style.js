import styled from 'styled-components'
import { Typography } from '@material-ui/core';

export const Footer = styled.div`
    width: 100%;
    background-color: #0063a5;
    color: #FE7E02;
    padding: 5px;
    @media only screen and (max-width: 480px){
        position: fixed;
        left: 0;
        bottom: 0;
        padding: 5px 0;
    }
`
export const StyledTypog = styled(Typography)`
    display: block;
    @media only screen and (max-width: 480px){
        display: none
    }
`
export const Logout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    display: none;
    @media only screen and (max-width: 480px){
        display: inline
    }
`
export const Home = styled.div`
    display: none;
    @media only screen and (max-width: 480px){
        display: inline
    }
`
export const Play = styled.div`
    display: none;
    @media only screen and (max-width: 480px){
        display: inline
    }
`
export const IconsWrapper = styled.div`
    display: flex;
    justify-content: space-around;
`