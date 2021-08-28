const Router = require('express')
const router = new Router()
const statusRouter = require('../controllers/statusController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware(1),statusRouter.create)
router.get('/', checkRoleMiddleware(1),statusRouter.getAll)
router.get('/:id', checkRoleMiddleware(1),statusRouter.getOne)
router.delete('/:id', checkRoleMiddleware(1), statusRouter.deleteOne)
router.put('/', checkRoleMiddleware(1), statusRouter.editOne)

module.exports = router