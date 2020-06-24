import express from 'express'
import { MusicController } from '../controller/MusicController'

export const musicRouter = express.Router()

musicRouter.put('/addGenre', new MusicController().addGenre)
musicRouter.get('/allGenres', new MusicController().getAllGenres)

musicRouter.delete('/delete/genre/:id', new MusicController().deleteGenre)
musicRouter.get('/allAlbuns', new MusicController().getAllAlbuns)
musicRouter.post('/create/album', new MusicController().createAlbum)

musicRouter.put('/addMusic', new MusicController().addMusic)
musicRouter.delete('/delete/music/:id', new MusicController().deleteMusic)
musicRouter.get('/allMusics/:id', new MusicController().getAllMusicsFromCertainAlbum)