import styled from 'styled-components'
import {Paper} from '@material-ui/core'

export const PageWrapper = styled.div`
    box-sizing: border-box;
    height: 100vh;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #FE7E02
`
export const ContentWrapper = styled(Paper)`
    width: 60%;
    margin-top: 60px
`