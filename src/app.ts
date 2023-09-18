import express from "express";
import dotenv from "dotenv";
import studentsRouter from "../routes/studentsRouter";
import cors from "cors";//middleware para habilitar endereços de ip deifernetes

import employeeRouter from "../routes/employeeRouter";
import teacherRouter from "../routes/teacherRouter";

dotenv.config()

const app = express();//cria servidor para usar express
const port = process.env.PORT;//sinaliza porta para o servidor

app.use(express.urlencoded({extended: false}));//middleware
app.use(express.json());//middleware

app.get("/", (req, res) => {
    res.send("Hello, world");
});//comando para acessar o endero raiz do programa e sua resposta equivalente

app.use("/students", studentsRouter);

app.use("/employee", employeeRouter);

app.use("/teacher", teacherRouter);

app.listen(port, () => {
    console.log(`Servido escutando na porta ${port}`);
});

