export const setAlbuns = (albunsList) => {
    console.log(albunsList)
    return {
        type: 'SET_ALBUNS',
        payload: {
            albunsList
        }
    }
}

export const getAllAlbuns = () => dispatch => {
    try{
        // const result = axios.get('lin', 'req')
        const mockedAlbuns = [{
            name: 'Album 1',
            genres: ['samba','forro','reaggae'],
            id: 1
        },{
            name: 'Album 2',
            genres: ['rock','pop','phunk'],
            id: 2
        },{
            name: 'Album 3',
            genres: ['pagode','samba-raíz'],
            id: 3
        }]
        dispatch(setAlbuns(mockedAlbuns))
    }
    catch (err) {
        alert('Não foi possível carregar os seus álbuns, tente novamente mais tarde...')
    }
}