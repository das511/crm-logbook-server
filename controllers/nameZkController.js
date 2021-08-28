const { NameZk } = require('../models/models')
const ApiError = require('../error/apiError')

class NameZkController {
    async create(req,res){
        const { value } = req.body
        const item = await NameZk.create({value})
        return res.json(item)
    }

    async getAll(req,res){
        const items = await NameZk.findAll()
        return res.json(items)
    }

    async getOne(req,res){
        const { id } = req.params
        const item = await NameZk.findOne({ where: { id } })
        res.json(item)
    }

    async deleteOne(req,res, next){
        const { id } = req.body
        if (!id)
            return next(ApiError.badRequest("Не указан id"))

        const item = await NameZk.findOne({ where: { id } })
        if (!item)
            return next(ApiError.badRequest("Отсутствуют данные для удаления!"))
        NameZk.destroy({ where: { id } })
        return res.json({message: "Удалено"})
    }

    async editOne(req,res,next){
        const { value, id } = req.body
        if (!id)
            return next(ApiError.badRequest("Не указан id"))

        const oldItem = await NameZk.findOne({ where: { id } })
        if (!oldItem)
            return next(ApiError.badRequest("Отсутствуют данные для редактирования!"))
        const newItem = await NameZk.update({ value }, { where: { id } })
        return res.json({"message":"Обновлено"})
    }
}

module.exports = new NameZkController()