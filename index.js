const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/user')
const bcrypt = require('bcryptjs')
mongoose.connect('mongodb://localhost:{PORT}/login', {
        useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
})

const app = express()
app.use('/', express.static(path.join(__dirname, 'views')))
app.use(bodyParser.json())
app.post('/api/login', async(req, res) => {
	const {user, pswd} = req.body
	
	const user = await User.findOne({user}).lean()
	if (!user){
		return res.json({status:'error', error:'invalid username or password'})
	}
	if (await bcrypt.compare(pswd, user.password)){
		
	}
	res.json({status:'ok'})
})
app.post('/api/register', async(req, res) => {
	const { user, pswd } = req.body
	console.log(req.body.user)
	const password = await bcrypt.hash(pswd, 2)
	try{
		const response = await User.create({
			username:user,
			password:password
		})
		console.log(response)
	} catch (error) {
		if (error.code==11000){
			console.log("usuario duplicado")
			/*
			 * Segue....
			 * */
		}else{
			console.log(error)
		}
		return res.json({status: 'error'})
	}
	res.json({status:'ok'})

})
app.listen(PORT, () =>{
	console.log("running now")
})
