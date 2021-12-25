const router = require('express').Router()
const auth = require('../app/middleware/auth')
const userControl =  require('../app/controller/user.controller') 
const upload = require('../app/middleware/fileUpload')
router.post('/register', userControl.register)
router.post('/login', userControl.login)
router.get('/me', auth, userControl.me)
router.post('/logout', auth, userControl.logout)
router.post('/logoutAll', auth, userControl.logoutAll)

router.post('/profile', auth, upload.single('profile'),userControl.updateProfileImage )

module.exports= router