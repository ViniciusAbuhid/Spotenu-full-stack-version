import styled from 'styled-components'
import { Paper, Typography } from '@material-ui/core'

export const PageWrapper = styled.div`
    box-sizing: border-box
    max-width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #FE7E02;
`
export const ContentWrapper = styled(Paper)`
    width: 30%;
    padding: 15px;
    display: flex;
    flex-direction: column;
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
    @media only screen and (max-width: 767px){
        display: none;
    }
`
export const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
`
export const ClickedTypog = styled(Typography)`
    text-align: center;
    &:hover {
    color: #FE7E02;
    cursor: pointer
        }
`
