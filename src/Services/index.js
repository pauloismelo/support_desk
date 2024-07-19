const express = require("express");
const app = express();

const mysql = require("mysql");
const cors = require("cors")
const jwt = require("jsonwebtoken")
const secret = "desk";

const bcrypt = require("bcrypt");
const saltRounds = 10;

function dataAtualFormatada(data){
    var data = new Date(data),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return anoF+"-"+mesF+"-"+diaF;
}


const db= mysql.createPool({
    host:"localhost",
    user:"root",
    password:"admin123",
    database: "support_desk"
});

app.use(cors());
app.use(express.json());

app.post("/login", (req, res)=>{
    
    const {email} = req.body;
    const {password} = req.body;
    db.query("select * from users where email=?",
        [email],
        async (err, result)=>{
        if(err) {
            res.send(err);
        }
        //console.log(result)
        if (result.length >0){
            
            const match = await bcrypt.compare(password, result[0].password);
            //console.log(match)
            if (match){
                const token = jwt.sign(result[0].id, secret) //300 segundos
                res.send({token: token, msg: "Usuario encontrado!",id: result[0].id});
            }else{
                res.send({msg: "Conta nao encontrada!!"});
            }
            
        }else{
            res.send({msg: "Conta nao encontrada!"});
        }
    })

    

})


app.post('/user', (req,res)=>{
    const {name} = req.body;
    const {email} = req.body;
    const {password} = req.body;
    const {token} = req.body;
    
    const timeElapsed = Date.now();
    const date_now = new Date(timeElapsed);
    const today = dataAtualFormatada(date_now.toLocaleDateString());

    const userreg = jwt.verify(token, secret);

    bcrypt.hash(password, saltRounds, function(err, hash){
        if (err){
            console.log()
        }else{
            //tratar para nao aceitar email repetido
            db.query("select * from users where email=?", 
                [email],
                (err, result) =>{
                    if (err){
                        console.log(err)
                    }else{
                        if (result.length>0){
                            res.send({msg: "Email utilizado!"})
                        }else{

                            db.query("insert into users (name, email, password, date_reg, user_reg) values(?,?,?, ?, ?)",
                            [name, email, hash, today, userreg],
                            (err, result)=>{
                                if (err){
                                    console.log(err)
                                }else{
                                    res.send(result);
                                }
                            })

                        }
                    }
                }
            )
            
        }
    })
});

app.delete('/user/:id', (req,res)=>{
    const {id} = req.params;
    db.query("delete from users where id=?",
        [id],
        (err,result) =>{
            if (err){
                console.log(err)
            }else{
                res.send(result)
            }
        }

    )
})

app.get('/user/:id', (req,res)=>{
    const {id} = req.params;
    db.query("select * from users where id=?",
        [id],
        (err,result) =>{
            if (err){
                console.log(err)
            }else{
                res.send({
                    id : result[0].id,
                    name :result[0].name,
                    email : result[0].email
                })
            }
        }

    )
})

app.put('/user/:id', (req, res) =>{
    const {id} = req.params;
    const {name} = req.body;
    const {email} = req.body;
    
    db.query("update users set name=?, email=? where id=?",
        [name, email, id],
        (err, result) =>{
            if (err){
                console.log(err)
            }else{
                res.send({msg:"Atualizado com sucesso!"})
            }
        }
    )
})

app.get ('/users', (req,res)=>{
    db.query("select * from users",
        (err,result)=>{
            if (err){
                console.log(err)
            }else{
                res.send(result)
            }
        }
    )
})

app.get('/userlogged/:token', (req,res)=>{
    const {token} = req.params;

    const id = jwt.verify(token, secret);
    db.query("select * from users where id=?",
        [id],
        (err,result) =>{
            if (err){
                console.log(err)
            }else{
                res.send(result)
            }
        }

    )
})
// ======To ===========
app.get('/to/:token', (req,res)=>{
    const {token} = req.params;

    const id = jwt.verify(token, secret);
    db.query("select * from users where id<>?",
        [id],
        (err,result) =>{
            if (err){
                console.log(err)
            }else{
                res.send(result)
            }
        }

    )
})
// ====== tickets ======
app.get('/tickets/:token', (req,res)=>{
    const {token} = req.params;

    const id = jwt.verify(token, secret);
    db.query("select * from support where from_person=? or to_person=?",
        [id,id],
        (err,result) =>{
            if (err){
                console.log(err)
            }else{
                res.send(result)
            }
        }

    )
})
app.get('/ticket/:id', (req,res)=>{
    const {id} = req.params;
    db.query("select * from support where id=?",
        [id],
        (err,result) =>{
            if (err){
                console.log(err)
            }else{
               // console.log(result)
                const var_to_person = parseInt(result[0].to_person);
                const var_from_person = parseInt(result[0].from_person);
                console.log('ID to: ', var_to_person)

                    db.query("select name from users where id=?",
                    [var_to_person],
                    (erro, resultado)=>{
                        if (erro) { console.log('Erro::::', erro)}
                        else{
                            console.log('resultado: ', resultado)
                            const name_to=resultado[0].name;
                            console.log('Name to: ', name_to)

                            db.query("select name from users where id=?",
                                [var_from_person],
                                (erro2, resultado2)=>{
                                    if (erro2) { console.log(erro2)}
                                    else{
                                        const name_from=String(resultado2[0].name);
                                        console.log('Name from: ', name_from)

                                        res.send({
                                            title: result[0].title,
                                            description: result[0].description,
                                            date_reg: result[0].date_reg,
                                            user_reg: result[0].user_reg,
                                            status: result[0].status,
                                            from: name_from,
                                            to: name_to,
                                        })
                                        
                                    }
                                }
                            )
                        }
                    }
)
                
            }
        }
    )
})

app.post('/ticket/', (req, res)=>{
    const {title} = req.body;
    const {description} = req.body;
    const {to} = req.body;
    const {token} = req.body;
    
    const timeElapsed = Date.now();
    const date_now = new Date(timeElapsed);
    const today = dataAtualFormatada(date_now.toLocaleDateString());

    const from = jwt.verify(token, secret);

    db.query("insert into support (title, description, date_reg, user_reg, status, from_person, to_person) values (?,?,?,?,?,?,?)", 
        [title, description, today, from, "ABERTO", from, to],
        (err, result)=>{
            if (err){
                console.log(err)
            }else{
                res.send({msg:"Inserido com sucesso!"})
            }
        }
    )
})


app.listen(3001,()=>{
    console.log("Rodando server")
})