const Router = require('express')
const router = new Router()
const userRoleCotnroller = require('../controllers/userRoleController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware(1),userRoleCotnroller.create)
router.get('/', checkRoleMiddleware(1),userRoleCotnroller.getAll)
router.get('/:id', checkRoleMiddleware(1),userRoleCotnroller.getOne)
router.delete('/:id', checkRoleMiddleware(1), userRoleCotnroller.deleteOne)
router.put('/', checkRoleMiddleware(1), userRoleCotnroller.editOne)

module.exports = router