const Router = require('express')
const router = new Router()
const orderRouter = require('../controllers/orderController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware(1), orderRouter.create)
router.get('/', checkRoleMiddleware(1), orderRouter.getAll)
router.get('/:id', checkRoleMiddleware(1), orderRouter.getOne)
router.delete('/:id', checkRoleMiddleware(1), orderRouter.deleteOne)
router.put('/', checkRoleMiddleware(1), orderRouter.editOne)

module.exports = router