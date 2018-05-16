const express = require('express')
const Router = express.Router()
const utils = require('utility')

const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')

// Chat.remove({},function(e,d){})
// User.remove({},function(e,d){})


const _filter = { 'pwd': 0, '__v':0 }

Router.get('/list',function(req, res){
	const { type } = req.query
	User.find({type}, _filter, function(err, doc){
		return res.json({code:0,data:doc})
	})
})

Router.post('/register',function(req, res){
	const {user, pwd, type} = req.body
	User.findOne({user},function(err,doc){
		if(doc){
			return res.json({code:1,msg: '用户名重复'})
		}
		const userModel = new User({user, type, pwd: md5Pwd(pwd)})

		userModel.save(function(e, d){
			if(e){
				return res.json({code: 1, msg:'后端出错了'})
			}
			const {user, type, _id} = d
			res.cookie('userId', _id)
			return res.json({
				code: 0,
				data: {user, type, _id}
			})
		})
	})
})

Router.post('/login', function(req, res){
	const {user, pwd} = req.body
	User.findOne({user,pwd: md5Pwd(pwd)},_filter, function(err, doc){
		if(!doc){
			return res.json({
				code:1,
				msg: '用户名或密码错误'
			})
		}
		res.cookie('userId', doc._id)
		return res.json({
			code: 0,
			data: doc
		})
	})
})

Router.post('/update', function(req, res){
	const userId = req.cookies.userId
	if(!userId){
		return res.json({code: 1})
	}
	const body = req.body
	User.findByIdAndUpdate(userId, body, function(err, doc){
		const data = Object.assign({},{
			user: doc.user,
			type: doc.type
		},body)
		return res.json({code:0, data})
	})
})

Router.get('/info',function(req, res){
	const { userId } = req.cookies
	if(!userId) {
		return res.json({
			code: 1
		})
	}
	User.findOne({_id: userId}, _filter, function(err, doc){
		if(err){
			return res.json({code: 1, msg: '后端有问题'})
		}

		if(doc){
			return res.json({
				code: 0,
				data: doc
			})
		}
	})
})

Router.get('/getMsgList', function(req,res){
	const user = req.cookies.userId
	User.find({},function(e,userdoc){
		let users = {}
		userdoc.forEach(v=>{
			users[v._id] = {name:v.user, avatar:v.avatar}
		})
		Chat.find({'$or':[{from:user},{to:user}]},function(err,doc){
			if (!err) {
				return res.json({code:0,msgs:doc, users:users})
			}
		})
	})
})

Router.post('/readmsg', function(req, res){
	const userId = req.cookies.userId
	const { from } = req.body
	Chat.update(
		{from, to: userId},
		{'$set':{read: true}},
		{'multi': true},
		function(err, doc){
			if(!err){
				return res.json({code: 0, num: doc.nModified})
			}
			return res.json({code: 1,msg:'修改失败'})
	})
})

function md5Pwd(pwd){
	const salt = 'lvYanBin_0309_pwd!!!'
	return utils.md5(utils.md5(pwd+salt));
}

module.exports =  Router