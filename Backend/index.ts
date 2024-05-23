import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { sensores_routes } from "./src/routes/sensores.routes";

const Serialport = require("serialport").SerialPort;
const { DelimiterParser } = require("@serialport/parser-delimiter");
const axios = require("axios");

dotenv.config();

console.clear();

const PORT = process.env.PORT || 9000;
const APP = express();


APP.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, x_token ,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

APP.use(express.json());

APP.use("/api", sensores_routes);

APP.listen(PORT, () => {
  console.log(`API escuchando en: http://localhost:${PORT}`);
});





const puerto = new Serialport({
  path: "COM3",
  baudRate: 9600,
});

let ALERTA_ENVIADA = false;

const API = "http://localhost:9000";

const parser = puerto.pipe(new DelimiterParser({ delimiter: "\n" }));

parser.on("open", function () {
  console.log("Conexión success");
});

parser.on("data", async function (data: any) {
  let enc = new TextDecoder("utf-8");
  let arr = new Uint8Array(data);
  let ready = enc.decode(arr);
  console.log("🍑  ready", ready)
  // await enviarAlerta();
  if (Number(ready) < 50) {
    if (!ALERTA_ENVIADA) {
      await enviarAlerta();
      ALERTA_ENVIADA = true;

      setTimeout(() => {
        ALERTA_ENVIADA = false;
      }, 10000);
    }

    console.log("🔥🔥🔥");
  }
});

puerto.on("error", function (err: any) {
  console.log(err);
});

const enviarAlerta = async () => {
  var config = {
    method: "get",
    url: `${API}/api/alerta/0`,
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios(config)
    .then((response: any) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error: any) => {
      console.log(error);
    });
};
