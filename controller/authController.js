const User = require("../model/User")
const Role = require("../model/Role")
const bcrypt = require("bcryptjs")
const {validationResult} = require("express-validator")


class authController {

    async registration(req, res){

        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Errors", errors})
            }

            const {username, password} = req.body
            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({message: "User exists..."})
            }

            const hashPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({value: "USER"})

            const user = new User({username, password: hashPassword, role: [userRole.value]})
            await user.save()
            res.json({message: "user successfully created"})



        } catch (error) {
            
        }

    }




}

module.exports = authController