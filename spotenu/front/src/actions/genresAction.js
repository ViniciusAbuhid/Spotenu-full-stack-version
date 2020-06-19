export const setAllGenres = (genresList) =>{
    return {
        type: 'SET_GENRES',
        payload: {
            genresList
        }
    }
} 

const mockedGenres = []
// ['forro', 'samba', 'reaggae', 'cumbia colombiana']

export const getAllGenres = () => dispatch => {
    try {
        // const result = axios.post('link', 'req')
        dispatch(setAllGenres(mockedGenres))
    }
    catch (err) {
        alert('Não foi possível carregar os gÊneros, tente novamente mais tarde...')
    }
}

export const deleteGenre = (genreName) => dispatch => {
    try{
        // axios.delete('link', 'req')
        const filteredMock = mockedGenres.filter(genre => {
            return genre !== genreName
        })
        dispatch(setAllGenres(filteredMock))
    }
    catch (err) {
        alert('Não foi possível deletar o gênero escolhido, tente novamente mais tarde...')
    }
}

export const addNewGenre = (genreName) => dispatch => {
    try {
        // axios.put('link', 'req')
        console.log(genreName)
        const pushedMock = [...mockedGenres, genreName.name]
        dispatch(setAllGenres(pushedMock))
    }
    catch (err) {
        alert('Não foi possível adicionar o gênero escolhido, tente novamente mais tarde...')
    }
}