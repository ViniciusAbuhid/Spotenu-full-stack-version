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
    background-color: #FE7E02;
`
export const ContentWrapper = styled(Paper)`
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
export const ClickedTypog = styled(Typography)`
    text-align: center;
    &:hover {
        color: #FE7E02;
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
    @media only screen and (max-width: 767px){
        display: none;
    }
`
export const BackgroundWrapper = styled.div`
    position: fixed;
    display: ${props => props.display};
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    z-index: 1;
    cursor: pointer;
`