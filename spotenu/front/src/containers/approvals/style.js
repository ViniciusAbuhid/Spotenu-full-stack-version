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
    width: 40%;
    padding: 15px;
    margin: 50px 0
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