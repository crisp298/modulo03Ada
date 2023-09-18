
const sqlite3 = require("sqlite3").verbose();//função verbose é necessária para configuração inicial do sqlite3, or isso não se pode usar o import.
const filePath ="./db/school.db";//cria o arquivo scholl.db dentro da pasta db para aramazenar o banco de dados no VS Code.

let db: any = null;// na próxima chamada de função o banco deixa de ser nulo, é nulo só pra ser criado e chamado nas funções

const createTable = () => {
    console.log("criando tabela")
    db.run(`CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(50),
            shift VARCHAR(50),
            year VARCHAR(50),
            room VARCHAR(50)
            )
    `);

    db.run(`CREATE TABLE IF NOT EXISTS employee (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(50),
            jobFunction VARCHAR (50),
            jobLocation VARCHAR (50),
            shift VARCHAR(50),
            nationalID VARCHAR (50)
            )
    `);

    db.run(`CREATE TABLE IF NOT EXISTS teacher (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject VARCHAR (50),
            isClassRegent INTEGER,
            numberOfStudents INTEGER,
            name VARCHAR(50),
            jobFunction VARCHAR (50),
            jobLocation VARCHAR (50),
            shift VARCHAR(50),
            nationalID VARCHAR (50)
            )
    `);
}


const createDbConnection = () => {
    db = new sqlite3.Database(filePath, (error: any) => {
        if (error){
            return console.error(error.message);//passam ensagem de erro como reorno de um calback necessário na função Database do sqlite
        }
    })//funções na documentação do sqlite3 para passar a estrutura do sqlite3 para o banco dirado em db
    console.log("Connection with SQLite has been estabilished");
    createTable();
    return db;
}


export {createDbConnection}