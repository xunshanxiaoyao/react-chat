const mongoose = require('mongoose')

// 链接mongo 使用imooc集合
const DB_URL = 'mongodb://localhost:27017/imooc';
mongoose.connect(DB_URL)