const Role = require('../models/role.model')
const User = require('../models/user.model')

const esRoleValido = async (role = "") => {

    const rolExist = await Role.findOne({role})
    if(!rolExist){
        throw new Error(`No existe el rol: ${role}  en la BD`)
    }

}

const emailExist = async (email = "") => {

    const emailExist = await User.findOne({email});
    if(emailExist){
        throw new Error(`El correo: ${email} ya existe`)
    }

    return true

}

const passwordValidate = (password = "")=>{

    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

    if(!regex.test(password) || password.length < 8 ){
        console.log("paso por aqui")
        throw new Error("La contraseña debe tener 8 caracteres con al menos una mayuscula, una minuscula y un numero")
    }

    return true

}

const idExist = async (id)=>{

    console.log(id)
    const idExistInDB = await User.findById(id);

    console.log("el id existe en la BD: ", idExistInDB)

    if(!idExistInDB){
        throw new Error (` El id ${id} no existe en la BD`)
    }


}

module.exports = {
    esRoleValido,
    emailExist,
    passwordValidate,
    idExist
}