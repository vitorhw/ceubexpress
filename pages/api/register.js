// pages/api/register.js
import fetch from "node-fetch";

const sleep = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, 350);
});

export default async function handler(req, res) {
  const { body, method } = req;
  const { captcha } = body;

  if (method === "POST") {
    if (!captcha) {
      return res.status(422).json({
        message: "Sem dados do captcha",
      });
    }

    try {
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          },
          method: "POST",
        }
      );
      const captchaValidation = await response.json();

      if (captchaValidation.success) {
        await sleep();
        return res.status(200).send(captchaValidation);
      }

      return res.status(422).json({
        message: "Codígo inválido do captcha",
      });
    } catch (error) {
      return res.status(422).json({ message: error });
    }
  }

  return res.status(404).send("Método não permitido");
}