import styled from 'styled-components'
import { Paper, TextField, Typography } from '@material-ui/core'

export const PageWrapper = styled.div`
    box-sizing: border-box;
    min-height: 100vh;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #FE7E02;
    justify-content: space-between;
`
export const ContentWrapper = styled(Paper)`
    box-sizing: border-box;
    width: 30%;
    padding: 15px;
    margin: 50px 0;
    @media only screen and (max-width: 1100px){
        width: 40%;
    }
    @media only screen and (max-width: 767px){
        width: 50%;
    }
    @media only screen and (max-width: 480px){
        width: 60%;
        margin: 50px 0 100px 0;
    }
`
export const ImgWrapper = styled.img`
    width: 300px;
    height: 100px;
    display: block;
    @media only screen and (max-width: 767px){
        display: none;
    }
`
export const StyledList = styled.ul`
    list-style: none;
`
export const StyledTextField = styled(TextField)`
    width: 300px
`
export const ClickedTypog = styled(Typography)`
    &:hover {
    color: #FE7E02;
    cursor: pointer
        }
`