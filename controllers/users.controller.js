const { request,response } = require('express')
const User = require('../models/user.model')
const bcryptjs = require('bcryptjs');


const usersGet = async (req = request, res)=> {

    const {page} = req.query;
    const userState = {state:true}
    const parsedPage = Number(page)

    let skipPage = () =>{
        if(parsedPage == 1){
            return 0
        }else{
            return (parsedPage-1)*10
        }
    }

    let limitPage = async () =>{
        if(!page){
            const total = await User.count(userState)
            return total
        }else{
            return 10
        }
    }


    // const total = await User.countDocuments()
    // const usuarios = await User.find().skip(skipPage()).limit(10)

    const [total, usuarios] = await Promise.all([
        User.countDocuments(userState),
        User.find(userState).skip(skipPage()).limit(limitPage())
    ])

    res.json({
        total,
        usuarios
    })
}

const usersPost = async (req, res =  response)=> {

    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role});

    //Encriptar la contraseña

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //Guardar en base de datos
    await user.save();

    res.json({
        msg: "usuario creado existosamente",
        user 
    })
}

const usersPut = async (req, res)=> {

    const {id} = req.params;
    const {password, google, email, ...resto} = req.body;

    if(password){
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, resto);

    res.json({
        msg: "Data actualizada exitosamente",
        user
    })
}

const usersPatch = async (req, res)=> {

    res.json({
        msg: "put API -  controlador"
    })
}

const usersDelete = async (req, res)=> {

    const {id} = req.params
    console.log(id)
    // Para eliminar fisicamente el usuario de la BD
    // const deletedUser = await User.findByIdAndDelete(id)

    const usuario = await User.findByIdAndUpdate(id, {state: false})
    console.log(usuario)

    res.json({
        msg: "usuario borrado existosamente",
        usuario

    })
}


module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete

}
