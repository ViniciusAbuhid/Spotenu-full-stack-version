import styled from 'styled-components'
import { Paper } from '@material-ui/core'

export const PageWrapper = styled.div`
    box-sizing: border-box;
    height: 100vh;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #FE7E02;
    position: relative;
`
export const ContentWrapper = styled(Paper)`
    box-sizing: border-box;
    width: 60%;
    margin-top: 60px;
    padding: 20px
`
export const StyledList = styled.ul`
    list-style: none
`
export const ListWrapper = styled.ul`
    padding-left: 15px;
    margin-bottom: 10px
`