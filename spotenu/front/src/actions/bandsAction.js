export const setAllNewBands = (newBands) => {
    console.log('cheguei na action')
    return {
        type: 'SET_NEW_BANDS',
        payload: {
            newBands
        }
    }
}

export const getAllNewBands = () => dispatch => {
    try {
        console.log('cheguei no actions')
        // axios.get('link', 'headers')
        dispatch(setAllNewBands([
            {
                name: 'banda1',
                nickname: 'banda1',
                email: 'banda1@email.com',
                description: 'somos uma banda muito massa!'
            
            },
            {
                name: 'banda1',
                nickname: 'banda1',
                email: 'banda1@email.com',
                description: 'somos uma banda muito massa!'
            },
            {
                name: 'banda1',
                nickname: 'banda1',
                email: 'banda1@email.com',
                description: 'somos uma banda muito massa!'
            }]
        ))
    }
    catch (err) {

    }
}

export const approveBand = () => dispatch => {
    try{
        // axios.post('link', 'info')
        console.log('banda aprovada com sucesso')
    }
    catch (err) {

    }
}

export const disapproveBand = () => dispatch => {
    try{
        // axios.post('link', 'info')
        console.log('banda reprovada com sucesso')
    }
    catch (err) {

    }
}