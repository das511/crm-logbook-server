const { Order } = require('../models/models')
const ApiError = require('../error/apiError')
const uuid = require('uuid')
const path = require('path')

class OrderController {
    async create(req,res,next){
        try {
            const { address, customer, phone, comment, dateAppointed, creator, nameZkId, locationId, postTypeId, statusId, contractor } = req.body
            
            let fileName = {
                photoBefore: null,
                photoAfter: null
            }
            if (req.files) {
                const { photoBefore, photoAfter } = req.files
                if (photoBefore){
                    fileName = {
                        photoBefore: uuid.v4() + ".jpg"
                    }
                    photoBefore.mv(path.resolve(__dirname, "..", "static", fileName.photoBefore))
                }
                if (photoAfter){
                    fileName = {
                        photoAfter: uuid.v4() + ".jpg"
                    }
                    photoAfter.mv(path.resolve(__dirname, "..", "static", fileName.photoAfter))
                }
            }
            
            const item = await Order.create({ address, 
                customer, 
                phone, 
                comment, 
                dateAppointed, 
                creator, 
                nameZkId, 
                locationId, 
                postTypeId, 
                statusId, 
                contractor,
                photoBefore: fileName.photoBefore,
                photoAfter: fileName.photoAfter
            })
            return res.json(item)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req,res){
        let { limit, page } = req.query
        page = page || 1 
        limit = limit || 2
        const offset = page * limit - limit
        if(!req.query){
            const items = await Order.findAndCountAll({limit, offset})
            return res.json(items)
        }

        const queryValues = [
            "statusId", "locationId", "nameZkId", "postTypeId", "creator", 
            "customer", "phone", "dateAppointed", "createdAt", "updatedAt",
            "contractor"
        ]
        const query = req.query
        const where = {}

        queryValues.forEach(el => {
            if(query[el]) where[el] = query[el];
        })
        const items = await Order.findAndCountAll({where, limit, offset})
        return res.json(items)
    }

    async getOne(req,res){
        const { id } = req.params
        const item = await Order.findOne({ where: { id } })
        res.json(item)
    }
    
    async deleteOne(req,res,next){
        const { id } = req.body
        if (!id)
            return next(ApiError.badRequest("Не указан id"))

        const item = await Order.findOne({ where: { id } })
        if (!item)
            return next(ApiError.badRequest("Отсутствуют данные для удаления!"))

        Order.destroy({ where: { id } })
        return res.json({message: "Удалено"})
    }
    
    async editOne(req,res,next){
        const body = req.body
        const { id } = req.body
        if (!id)
            return next(ApiError.badRequest("Не указан id"))
        const oldItem = await Order.findOne({ where: { id } })
        if (!oldItem)
            return next(ApiError.badRequest("Отсутствуют данные для редактирования!"))
        
        const newItem = await Order.update(body, { where: { id } })
        return res.json({"message":"Обновлено"})
    }
}

module.exports = new OrderController()