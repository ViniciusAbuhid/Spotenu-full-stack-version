import styled from 'styled-components'
import { TextField } from '@material-ui/core'

export const BarWrapper = styled.div`
    width: 100%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1
`
export const StyledTextField = styled(TextField)`
    width: 300px
`