const { User } = require('../models/models')
const ApiError = require('../error/apiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') 

const generateJwt = (id,login,role,surname) => {
    return jwt.sign(
        { id, login, role, surname }, 
        process.env.SECRET_KEY, 
        {expiresIn: '72h'}
    )
}

class UserController {
    async registration(req,res,next){
        const { login, password, surname, firstName, lastName, userRoleId } = req.body
        if (!login || !password) {
            return next(ApiError.badRequest("Некорректный login или пароль"))
        }

        const item = await User.findOne({ where: { login } })
        if (item) {
            return next(ApiError.badRequest("Пользователь с таким login уже существует!"))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({login, password: hashPassword, surname, firstName, lastName, userRoleId})
        const token = generateJwt(user.id, login, userRoleId, surname)
        return res.json({token})
    }

    async login(req,res, next){
        const { login, password } = req.body
        const item = await User.findOne({where: {login}})
        if(!item) {
            return next(ApiError.internal("Пользователь не найден!"))
        }
        const comparePassword = bcrypt.compareSync(password, item.password)
        if (!comparePassword) {
            return next(ApiError.internal("Пароль указан неверно!"))
        }
        
        const token = generateJwt(item.id, item.login, item.userRoleId, item.surname)
        return res.json({token})
    }

    async check(req,res, next){
        const token = generateJwt(req.user.id, req.user.login, req.user.role, req.user.surname)
        res.json({token})
    }
    
    async getAll(req,res){
        if(!req.query){
            const items = await User.findAll()
            return res.json(items)
        }
        
        const queryValues = [
            "userRoleId", "login", "surname", "firstName", "lastName"
        ]
        const query = req.query
        const where = {}

        queryValues.forEach(el => {
            if(query[el]) where[el] = query[el];
        })
        const items = await User.findAll({where})
        return res.json(items)
    }

    async getOne(req,res){
        const { id } = req.params
        const item = await User.findOne({ where: { id } })
        res.json(item)
    }
    
    async deleteOne(req,res,next){
        const { id } = req.body
        if (!id)
            return next(ApiError.badRequest("Не указан id"))

        const item = await User.findOne({ where: { id } })
        if (!item)
            return next(ApiError.badRequest("Отсутствуют данные для удаления!"))
        User.destroy({ where: { id } })
        return res.json({message: "Удалено"})
    }
    
    async editOne(req,res,next){
        const body = req.body
        const { id } = req.body
        if (!id)
            return next(ApiError.badRequest("Не указан id"))
        const oldItem = await User.findOne({ where: { id } })
        if (!oldItem)
            return next(ApiError.badRequest("Отсутствуют данные для редактирования!"))
        
        if(body.password)
            body.password = await bcrypt.hash(body.password, 5)
        const newItem = await User.update(body, { where: { id } })
        return res.json({"message":"Обновлено"})
    }
}

module.exports = new UserController()