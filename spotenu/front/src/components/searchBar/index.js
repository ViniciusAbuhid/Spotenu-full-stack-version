import React from 'react'
import * as S from './style'
import { Typography, Box, IconButton, TextField } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';

function SearchBar() {

    return (
        <S.BarWrapper>
            <Box padding={2}>
                <S.StyledTextField placeholder="O que você gostaria de escutar?"
                 color='secondary'/>
                <IconButton type="submit" aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Box>
        </S.BarWrapper>
    )
}

export default SearchBar