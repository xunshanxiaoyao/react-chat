const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express();

const server = require('http').Server(app)
const io = require('socket.io')(server)

const model = require('./model')
const Chat = model.getModel('chat')

io.on('connection',function(socker){
	socker.on('sendMsg', function(data){

		const {from, to, msg} = data
		console.log({from, to, msg})
		const chatId = [from,to].sort().join('_')

		Chat.create({chatId,from,to,content:msg},function(err, doc){
			io.emit('recvMsg',Object.assign({},doc._doc))
		})

		console.log(data)
	})
})

const userRouter = require('./user')

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)

server.listen(9093,function(){
	console.log('Node app start at port 9093');
})