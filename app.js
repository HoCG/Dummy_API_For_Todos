const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

dotenv.config();

const todoRouter = require('./routes/todos');

const { sequelize } = require('./models');

const app = express();
app.set('port', process.env.PORT || 3030);
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:5173'], // 출처 허용 옵션
  credentials: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
  exposedHeaders: ["Authorization"],
}));
sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/todo', todoRouter);

app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
