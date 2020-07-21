import styled from 'styled-components'
import { Paper, Typography } from '@material-ui/core'

export const PageWrapper = styled.div`
    max-width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: #FE7E02
`
export const Header = styled.div`
    width: 100%;
    padding: 15px;
    background-color: #0063a5;
    @media only screen and (max-width: 767px){
        display: flex;
        justify-content: center;
        align-items: center;
    }
`
export const LogoWrapper = styled.img`
    width: 150px;
    height: 50px;
    @media only screen and (max-width: 767px){
        width: 50%;
        height: 80px;
    };
    @media only screen and (max-width: 480px){
        width: 70%;
        height: 80px;
    }
`
export const ContentWrapper = styled(Paper)`
    width: 30%;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 50px 0;
    @media only screen and (max-width: 1100px){
        width: 40%;
    }
    @media only screen and (max-width: 767px){
        width: 50%;
    }
    @media only screen and (max-width: 480px){
        width: 60%;
    }
`
export const ImgWrapper = styled.img`
    display: block;
    width: 300px;
    height: 100px;
    @media only screen and (max-width: 767px){
        display: none;
    }
`
export const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
export const Invitation = styled(Typography)`
    &:hover {
    color: #FE7E02;
    cursor: pointer
        }
`
export const Footer = styled.div`
    background-color: #0063a5;
    width: 100%;
    padding: 5px;
`