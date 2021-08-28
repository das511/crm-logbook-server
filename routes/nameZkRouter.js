const Router = require('express')
const router = new Router()
const nameZkRouter = require('../controllers/nameZkController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware(1), nameZkRouter.create)
router.get('/', checkRoleMiddleware(1), nameZkRouter.getAll)
router.get('/:id', checkRoleMiddleware(1), nameZkRouter.getOne)
router.delete('/:id', checkRoleMiddleware(1), nameZkRouter.deleteOne)
router.put('/', checkRoleMiddleware(1), nameZkRouter.editOne)

module.exports = router