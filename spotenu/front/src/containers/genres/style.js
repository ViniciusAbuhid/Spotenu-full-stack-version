import styled from 'styled-components'
import { Paper, Button, TextField, Typography } from '@material-ui/core'

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
    width: 40%;
    padding: 15px;
    margin: 50px 0
`
export const ImgWrapper = styled.img`
    width: 300px;
    height: 100px;
    display: block;
    margin: 0 auto
`
export const StyledList = styled.ul`
    list-style: none;
`
export const StyledTextField = styled(TextField)`
    width: 300px
`
export const ClickedTypog = styled(Typography)`
    &:hover {
    color: #0063a5;
    cursor: pointer
        }
`