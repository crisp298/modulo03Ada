"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const studentsRouter_1 = __importDefault(require("../routes/studentsRouter"));
const employeeRouter_1 = __importDefault(require("../routes/employeeRouter"));
const teacherRouter_1 = __importDefault(require("../routes/teacherRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)(); //cria servidor para usar express
const port = process.env.PORT; //sinaliza porta para o servidor
app.use(express_1.default.urlencoded({ extended: false })); //middleware
app.use(express_1.default.json()); //middleware
app.get("/", (req, res) => {
    res.send("Hello, world");
}); //comando para acessar o endero raiz do programa e sua resposta equivalente
app.use("/students", studentsRouter_1.default);
app.use("/employee", employeeRouter_1.default);
app.use("/teacher", teacherRouter_1.default);
app.listen(port, () => {
    console.log(`Servido escutando na porta ${port}`);
});
