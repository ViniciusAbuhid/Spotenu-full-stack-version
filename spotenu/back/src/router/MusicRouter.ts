import express from 'express'
import { MusicController } from '../controller/MusicController'

export const musicRouter = express.Router()

musicRouter.put('/addGenre/', new MusicController().addGenre)
musicRouter.get('/allGenres/', new MusicController().getAllGenres)
musicRouter.post('/create/album', new MusicController().createAlbum)