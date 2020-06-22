import {Request, Response} from 'express'
import { MusicBusiness } from "../business/MusicBusiness";
import { MusicDataBase } from "../data/MusicDataBase";
import IdGenerator from "../services/IdGenerator";
import BaseDataBase from '../data/BaseDataBase';
import TokenGenerator from '../services/TokenGenerator';

export class MusicController {
    public static musicBusiness = new MusicBusiness(new MusicDataBase(), new IdGenerator())

    public async addGenre(req: Request, res:Response){
        try{
            const result = MusicController.musicBusiness.addGenre(req.body.name)
            res.status(200).send({
                message: result
            })
        }
        catch (err) {
            res.status(200).send({
                message: err.message
            })
        }
        finally {
            await BaseDataBase.destroy()
        }
    }

    public async getAllGenres(req: Request, res: Response){
        try{
            const verifyToken = new TokenGenerator().verifyToken(req.headers.authorization as string) as any
            if(verifyToken.role !== 'ADMIN' && verifyToken.role !== 'BANDA'){
                throw new Error('ação restrita à administradores e bandas')
            }
            const result = MusicController.musicBusiness.getAllGenres()
            res.status(200).send(result)
        }
        catch (err) {
            res.status(200).send({
                message: err.message
            })
        }
        finally {
            await MusicDataBase.destroy()
        }
    }
}