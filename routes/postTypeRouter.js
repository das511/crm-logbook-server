const Router = require('express')
const router = new Router()
const postTypeController = require('../controllers/postTypeController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware(1),postTypeController.create)
router.get('/', checkRoleMiddleware(1),postTypeController.getAll)
router.get('/:id', checkRoleMiddleware(1),postTypeController.getOne)
router.delete('/:id', checkRoleMiddleware(1), postTypeController.deleteOne)
router.put('/', checkRoleMiddleware(1), postTypeController.editOne)

module.exports = router