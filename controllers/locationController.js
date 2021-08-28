const { Location } = require('../models/models')
const ApiError = require('../error/apiError')

class LocationController {
    async create(req,res){
        const { value } = req.body
        const item = await Location.create({value})
        return res.json(item)
    }

    async getAll(req,res){
        const items = await Location.findAll()
        return res.json(items)
    }

    async getOne(req,res){
        const { id } = req.params
        const item = await Location.findOne({ where: { id } })
        res.json(item)
    }

    async deleteOne(req,res, next){
        const { id } = req.body
        if (!id)
            return next(ApiError.badRequest("Не указан id"))

        const item = await Location.findOne({ where: { id } })
        if (!item)
            return next(ApiError.badRequest("Отсутствуют данные для удаления!"))
        Location.destroy({ where: { id } })
        return res.json({message: "Удалено"})
    }

    async editOne(req,res,next){
        const { value, id } = req.body
        if (!id)
            return next(ApiError.badRequest("Не указан id"))

        const oldItem = await Location.findOne({ where: { id } })
        if (!oldItem)
            return next(ApiError.badRequest("Отсутствуют данные для редактирования!"))
        const newItem = await Location.update({ value }, { where: { id } })
        return res.json({"message":"Обновлено"})
    }
}

module.exports = new LocationController()