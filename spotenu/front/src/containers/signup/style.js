import styled from 'styled-components'
import {Paper} from '@material-ui/core'

export const PageWrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #FE7E02
`

export const ContentWrapper = styled(Paper)`
    width: 40%;
    margin: 0 auto;
    padding: 15px;
`

export const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center
`
export const ImgWrapper = styled.img`
    width: 300px;
    height: 100px
`