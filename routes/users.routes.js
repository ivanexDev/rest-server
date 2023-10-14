const {Router} = require('express')
const { esRoleValido, emailExist, passwordValidate, idExist } = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/validar-campos')
const router = Router()
const {    
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete } = require('../controllers/users.controller')
const { check } = require('express-validator')



router.get('/',usersGet)

router.post('/',
[
    check("name", "El nombre es obligatorio").not().isEmpty(),
    // check("password", "El password debe tener 6 caractereses").isLength({min : 6}),
    check("password").custom(passwordValidate),
    check("email", "No tiene formato de correo").isEmail(),
    check("email").custom(emailExist),
    check("role").custom(esRoleValido),
    validarCampos
] 
,usersPost)

router.put('/:id',[
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(idExist),
    check("role").custom(esRoleValido),
    validarCampos
],usersPut)

router.patch('/',usersPatch)

router.delete('/:id',[
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(idExist),
    validarCampos
],usersDelete)


module.exports = router