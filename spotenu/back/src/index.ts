import express from 'express'
import dotenv from "dotenv";
import { AddressInfo } from "net";
import {userRouter} from './router/UserRouter'
import cors from 'cors'
import { musicRouter } from './router/MusicRouter';

const app = express()
dotenv.config();
app.use(express.json());
app.use(cors())

app.use('/user', userRouter)
app.use('/music', musicRouter)

const server = app.listen(3001, () => {
    if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Servidor rodando em http://localhost:${address.port}`);
    } else {
      console.error(`Falha ao rodar o servidor.`);
    }
  });