const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/', checkRoleMiddleware(1), userController.getAll) //? Пример разграничения ролей
router.get('/:id', checkRoleMiddleware(1),userController.getOne)
router.delete('/:id', checkRoleMiddleware(1), userController.deleteOne)
router.put('/', checkRoleMiddleware(1), userController.editOne)

module.exports = router