const { Address } = require('../models/models')
const ApiError = require('../error/apiError')

class AddressController {
    async create(req,res){
        const { value,house,liter,nameZkId } = req.body
        const item = await Address.create({value,house,liter,nameZkId})
        return res.json(item)
    }

    async getAll(req,res){
        const items = await Address.findAll()
        return res.json(items)
    }

    async getOne(req,res){
        const { id } = req.params
        const item = await Address.findOne({ where: { id } })
        res.json(item)
    }

    async deleteOne(req,res, next){
        const { id } = req.body
        if (!id)
            return next(ApiError.badRequest("Не указан id"))

        const item = await Address.findOne({ where: { id } })
        if (!item)
            return next(ApiError.badRequest("Отсутствуют данные для удаления!"))
        Address.destroy({ where: { id } })
        return res.json({message: "Удалено"})
    }

    async editOne(req,res,next){
        const { value, id,house,liter,nameZkId } = req.body
        if (!id)
            return next(ApiError.badRequest("Не указан id"))

        const oldItem = await Address.findOne({ where: { id } })
        if (!oldItem)
            return next(ApiError.badRequest("Отсутствуют данные для редактирования!"))
        const newItem = await Address.update({ value,house,liter,nameZkId }, { where: { id } })
        return res.json({"message":"Обновлено"})
    }
}

module.exports = new AddressController()