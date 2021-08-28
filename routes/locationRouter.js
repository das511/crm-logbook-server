const Router = require('express')
const router = new Router()
const locationController = require('../controllers/locationController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware(1), locationController.create)
router.get('/', checkRoleMiddleware(1), locationController.getAll)
router.get('/:id', checkRoleMiddleware(1), locationController.getOne)
router.delete('/:id', checkRoleMiddleware(1), locationController.deleteOne)
router.put('/', checkRoleMiddleware(1), locationController.editOne)

module.exports = router