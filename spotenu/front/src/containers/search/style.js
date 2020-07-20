import styled from 'styled-components'
import { Paper, Typography } from '@material-ui/core'

export const PageWrapper = styled.div`
    box-sizing: border-box
    max-width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: #FE7E02
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
    }
`

export const ClickedTypog = styled(Typography)`
    text-align: center;
    &:hover {
        color: #0063a5;
        cursor: pointer
        }
`
export const StyledList = styled.ul`
    list-style: none;
`
export const ImgWrapper = styled.img`
    width: 300px;
    height: 100px;
    display: block;
    margin: 0 auto;
    @media only screen and (max-width: 767px){
        display: none;
    }
`