import { Request, Response } from "express";
import { HTML_ALERT } from "../helpers/html";
import twilio from "twilio";
import nodemailer from "nodemailer";

const accountSid = "Tu account ID de Twilio";
// To3Ts8jyUHRC-Ti314m8whWDGWTIm2tYU9YZuqQL
const authToken = "Tu Token de twilio";

export const enviarAlertas = async (req: Request, res: Response) => {
  try {
    await enviarEmail();
    await enviarSMS();
    await llamar();
    res.send({
      msg: "Alerta enviada correctamente",
    });
  } catch (error) {
    res.send({ msg: error }).status(404);
  }
};

async function enviarEmail() {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "Tu correo electronico",
      pass: "Token de tu correo electronico.",
    },
  });

  let mailOptions = {
    from: "Tu correo electronico",
    to: "Correo Destino",
    subject: `ALERTA DE HUMO!`, // Se puede personalizar
    text: `Se detecto humo`,
    html: HTML_ALERT, // Se puede personalizar
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado: " + info.response);
  } catch (error) {
    console.log(error);
  }
}

async function enviarSMS() {
  const client = twilio(accountSid, authToken);

  try {
    const message = await client.messages.create({
      body: `Se ha detectado humo en la ubicación monitoreada. 
      Por favor, tome las precauciones necesarias de inmediato.`,
      from: "Tu numero de Twilio", 
      to: "Numero destino (Debe estar registado en twilio)",
    });
    console.log("Mensaje enviado con éxito. SID del mensaje:", message.sid);
  } catch (error) {
    console.log("Error al enviar el mensaje:", error);
  }
}

async function llamar() {
  const client = twilio(accountSid, authToken);

  try {
    const call = await client.calls.create({
      url: "http://demo.twilio.com/docs/voice.xml",
      from: "Tu numero de Twilio", 
      to: "Numero destino (Debe estar registado en twilio)",
    });
    console.log("Llamada realizada con éxito. SID de la llamada:", call.sid);
  } catch (error) {
    console.log("Error al realizar la llamada:", error);
  }
}
