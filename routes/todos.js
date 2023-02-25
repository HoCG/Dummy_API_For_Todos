const express = require('express');
const Todo = require('../models/todo');

const router = express.Router();

/*
✔SELECT * FROM nodejs.users;
    User.findAll()


✔만약에 SELECT name, married FROM nodejs.users;이거 하고싶으면
    findAll({attributes: ['name', 'married']})이렇게.


✔조건문의 경우는
    WHERE married = 1 AND age > 30;
    where: {
      married: true,
      age: {[Op.gt]: 30},
    }
    혹은 OR의 경우
    WHERE married = 0 OR age > 30;
    where: {
      [Op.or]: [{ married: false }, { age: { [Op.gt]: 30 } }],
    }
    이렇게 작성하면 된다.]


✔오퍼레이터 객체안에 동적 프로퍼티들
    gt >
    lt <
    gte >=
    lte <=
    in [1,2,3]
    ne Not Equal
    참고로  where내에서 조건을 따로 안걸면 AND임.


✔ORDER BY의 경우는 
    ORDER BY age DESC
    order: [['age', 'DESC']]


✔UPDATE의 경우는
    UPDATE nodejs.users SET comment = '바꿀 내용' WHERE id = 2;
    User.update({
      comment: '바꿀 내용'
    }, {
      where: { id: 2 },
    })


✔DELETE의 경우는
    User.destroy({
      where: { id: { [Op.in]: [1,3,5] }}
    })


✔결괏값이 자바스크립트 객체가 되게끔 할수도 있는데 그때에는 
    findOne({}); 사용


✔include를 통해 Join과 비슷한 기능을 수행할 수 있다.
    include: [{
      model: Comment,
    }]


✔get+모델명으로 관계 있는 데이터 로딩이 가능함.
    const user = await User.findOne({});
    const comments = await user.getComments();
*/

router.route('/')
  .get(async (req, res, next) => {
    try {
      const todos = await Todo.findAll();
      res.json(todos);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      //INSERT INTO nodejs.users (name, age, married) VALUES (req.body.name, req.body.age, req.body.married);
      //얘네 다 Promise임. await 붙여줘야함.
      console.log(req.body);
      const todo = await Todo.create({
        title: req.body.todo.title,
        description: req.body.todo.description
      });
      console.log(todo);
      res.status(201).json(todo);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

router.get('/:id', async (req, res, next) => {
  try {
    const todo = await Todo.findAll({
      where: { id: req.params.id },
    });
    console.log(todo);
    res.json(todo);
  } catch (err) {
    console.error(err);
    next(err);
  }
})  
.delete('/:id', async (req, res, next) => {
  try {
    const todo = await Todo.destroy({
      where: { id : req.params.id }
    });
    console.log(todo);
    res.status(201).json(todo);
  } catch(err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
