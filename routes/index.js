const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const orderRouter = require('./orderRouter')
const userRoleRouter = require('./userRoleRouter')
const nameZkRouter = require('./nameZkRouter')
const locationRouter = require('./locationRouter')
const postTypeRouter = require('./postTypeRouter')
const statusRouter = require('./statusRouter')
const addressRouter = require('./addressRouter')



router.use('/user', userRouter);
router.use('/order', orderRouter);
router.use('/userRole', userRoleRouter);
router.use('/nameZk', nameZkRouter);
router.use('/postType', postTypeRouter);
router.use('/location', locationRouter);
router.use('/status', statusRouter);
router.use('/address', addressRouter);

module.exports = router