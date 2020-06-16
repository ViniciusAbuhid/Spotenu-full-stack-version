import styled from 'styled-components'
import { Paper } from '@material-ui/core'

export const PageWrapper = styled.div`
    box-sizing: border-box
    max-width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #FE7E02
`

export const ContentWrapper = styled(Paper)`
    box-sizing: border-box;
    width: 40%;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const ImgWrapper = styled.img`
    width: 300px;
    height: 100px
`
