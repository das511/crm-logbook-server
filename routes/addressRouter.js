const Router = require('express')
const router = new Router()
const addressController = require('../controllers/addressController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware(1), addressController.create)
router.get('/', checkRoleMiddleware(1), addressController.getAll)
router.get('/:id', checkRoleMiddleware(1), addressController.getOne)
router.delete('/:id', checkRoleMiddleware(1), addressController.deleteOne)
router.put('/', checkRoleMiddleware(1), addressController.editOne)

module.exports = router