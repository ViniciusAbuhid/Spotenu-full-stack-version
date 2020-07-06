import { Request, Response } from 'express'
import { MusicBusiness } from "../business/MusicBusiness";
import { MusicDataBase } from "../data/MusicDataBase";
import IdGenerator from "../services/IdGenerator";
import BaseDataBase from '../data/BaseDataBase';
import TokenGenerator from '../services/TokenGenerator';

export class MusicController {
    public static musicBusiness = new MusicBusiness(new MusicDataBase(), new IdGenerator())

    public async getAllGenres(req: Request, res: Response) {
        try {
            const verifyToken = new TokenGenerator().verifyToken(req.headers.authorization || req.headers.Authorization as string) as any
            if (verifyToken.role !== 'ADMIN' && verifyToken.role !== 'BANDA') {
                throw new Error('ação restrita à administradores e bandas')
            }
            const result = await MusicController.musicBusiness.getAllGenres()
            res.status(200).send(result)
        }
        catch (err) {
            res.status(400).send({
                message: err.message
            })
        }
        finally {
            await MusicDataBase.destroy()
        }
    }

    public async addGenre(req: Request, res: Response) {
        try {
            const result = await MusicController.musicBusiness.addGenre(req.body.name)
            res.status(200).send({
                message: result
            })
        }
        catch (err) {
            res.status(400).send({
                message: err.message
            })
        }
        finally {
            await BaseDataBase.destroy()
        }
    }

    public async deleteGenre(req: Request, res: Response) {
        try {
            await MusicController.musicBusiness.deleteGenre(req.params.id)
            res.status(200).send("gênero deletado com sucesso")
        }
        catch (err) {
            res.status(400).send({
                message: err.message
            })
        }
        finally {
            await BaseDataBase.destroy()
        }
    }

    public async getAllAlbuns(req: Request, res: Response) {
        try {
            console.log(req.headers.authorization as string || req.headers.Authorization as string)
            const verifyToken = new TokenGenerator().
            verifyToken(req.headers.authorization as string || req.headers.Authorization as string) as any
            console.log(verifyToken.id)
            const result = await new MusicDataBase().getAllAlbunsById(verifyToken.id)
            res.status(200).send(result)
        }
        catch (err) {
            res.status(400).send({
                message: err.message
            })
        }
        finally {
            await MusicDataBase.destroy()
        }
    }

    public async createAlbum(req: Request, res: Response) {
        try {
            const verifyToken = new TokenGenerator().verifyToken(req.headers.authorization || req.headers.Authorization as string) as any
            const result = await MusicController.musicBusiness.
                createAlbum(req.body.name, verifyToken.id, req.body.list)
            res.status(200).send({
                message: result
            })
        }
        catch (err) {
            res.status(400).send({
                message: err.message
            })
        }
        finally {
            await BaseDataBase.destroy()
        }
    }

    public async deleteAlbum(req: Request, res: Response) {
        try {
            await MusicController.musicBusiness.deleteAlbum(req.params.id)
            res.status(200).send("Album deletado com sucesso")
        }
        catch (err) {
            res.status(400).send({
                message: err.message
            })
        }
        finally {
            await BaseDataBase.destroy()
        }
    }

    public async getAllMusicsFromCertainAlbum(req: Request, res: Response) {
        try {
            const result = await MusicController.musicBusiness.getAllMusicsFromCertainAlbum(req.params.id)
            res.status(200).send(result)
        }
        catch (err) {
            res.status(400).send({
                message: err.message
            })
        }
        finally {
            await BaseDataBase.destroy()
        }
    }

    public async addMusic(req: Request, res: Response) {
        try {
            const verifyToken = new TokenGenerator().verifyToken(req.headers.authorization || req.headers.Authorization as string) as any
            if (verifyToken.role !== 'BANDA') {
                throw new Error('função exclusiva para as bandas')
            }
            const result = await MusicController.musicBusiness
                .addMusic(req.body.name, req.body.componentId, req.body.link)
            res.status(200).send({
                message: result
            })
        }
        catch (err) {
            res.status(400).send({
                message: err.message
            })
        }
        finally {
            await BaseDataBase.destroy()
        }
    }

    public async deleteMusic(req: Request, res: Response) {
        try {
            await MusicController.musicBusiness.deleteMusic(req.params.id)
            res.status(200).send("música deletada com sucesso")
        }
        catch (err) {
            res.status(400).send({
                message: err.message
            })
        }
        finally {
            await BaseDataBase.destroy()
        }
    }
}