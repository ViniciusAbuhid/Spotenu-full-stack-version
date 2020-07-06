import React, { useEffect, useState } from 'react'
import * as S from './style'
import Header from '../../components/header/index'
import Footer from '../../components/footer/index'
import { connect } from 'react-redux'
import { getAllGenres, deleteGenre, addNewGenre } from '../../actions/genresAction'
import { Typography, Box, Button, TextField } from '@material-ui/core'
import logo from '../../assets/SPOTENU.png'
import DeleteIcon from '@material-ui/icons/Delete';

function Genres(props) {
    useEffect(() => {
        props.getAllGenres()
        window.localStorage.getItem('role') === 'ADIMN' || setRole('ADMIN')
    }, [])

    const [role, setRole] = useState('')
    const [toggleGenre, setToggleGenre] = useState(false)
    const [newGenre, setNewGenre] = useState({})

    function addNewGenre(e) {
        if (!toggleGenre) {
            setToggleGenre(true)
        }
        else if (toggleGenre && (!e.keyCode || e.keyCode === 13)) {
            props.addNewGenre(newGenre)
            setToggleGenre(false)
            setNewGenre({})
        }
    }

    function saveNewGenre(e) {
        setNewGenre({ ...newGenre, name: e.target.value })
    }

    return (
        <S.PageWrapper>
            <Header />
            <S.ContentWrapper>
                <S.ImgWrapper src={logo}></S.ImgWrapper>
                <Typography variant='h4' align='center'>Gêneros musicais</Typography>
                <S.StyledList>
                    {props.genres ? props.genres.map((genre, index) => {
                        return (
                            <li key={index}>
                                <Box
                                    display="flex"
                                    justifyContent='space-between'
                                    mt={3}>
                                    <Typography variant='h5'>{genre.name}</Typography>
                                    {role === 'ADMIN' && <DeleteIcon
                                        size='small'
                                        onClick={() => props.deleteGenre(genre.id)} />
                                    }
                                </Box>
                            </li>
                        )
                    }) :
                        <Typography variant='h5' align='center'>Não há nenhum gênero até o momento...
                        </Typography>
                    }
                </S.StyledList>
                {role && <Box
                    display="flex"
                    justifyContent='center'
                    mt={2}
                    mb={3}>
                    <Button
                        variant='contained'
                        color='secondary'
                        onClick={addNewGenre}>
                        Adicionar gênero
                        </Button>
                </Box >}
                {toggleGenre && (
                    <Box
                        display="flex"
                        justifyContent='center'
                        mt={2}
                        mb={3}>
                        <TextField
                            color='secondary'
                            placeholder='novo gênero...'
                            onChange={saveNewGenre}
                            value={newGenre.name || ''}
                            onKeyDown={addNewGenre}
                        />
                    </Box>
                )}
            </S.ContentWrapper>
            <Footer />
        </S.PageWrapper>
    )
}

const mapStateToProps = state => {
    return {
        genres: state.genres.allGenres
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllGenres: () => dispatch(getAllGenres()),
        deleteGenre: (genreId) => dispatch(deleteGenre(genreId)),
        addNewGenre: (newGenre) => dispatch(addNewGenre(newGenre))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Genres)