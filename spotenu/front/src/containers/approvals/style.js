import styled from 'styled-components'
import { Paper, Typography } from '@material-ui/core'

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
    }
`
export const FilterWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 5px;
    @media only screen and (max-width: 1100px){
        flex-direction: column;
        justify-content: center;
        align-items: left;
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
export const ListWrapper = styled.ul`
    padding-left: 15px;
    margin-bottom: 10px
`
export const ClickedTypog = styled(Typography)`
    &:hover {
    color: #0063a5;
    cursor: pointer
        }
`