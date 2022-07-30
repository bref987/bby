const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");


router.get("/", authorize, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT name FROM users WHERE userId = $1",
      [req.user.id]
    );

    // const user = await pool.query(
    //   "SELECT u.user_name, t.todo_id, t.description FROM users AS u LEFT JOIN todos AS t ON u.user_id = t.user_id WHERE u.user_id = $1",
    //   [req.user.id]
    // );

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//create a todo

// router.post("/todos", authorize, async (req, res) => {
//   try {
//     console.log(req.body);
//     const { description } = req.body;
//     const newTodo = await pool.query(
//       "INSERT INTO todos (user_id, description) VALUES ($1, $2) RETURNING *",
//       [req.user.id, description]
//     );

//     res.json(newTodo.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// //update a todo

// router.put("/todos/:id", authorize, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { description } = req.body;
//     const updateTodo = await pool.query(
//       "UPDATE todos SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *",
//       [description, id, req.user.id]
//     );

//     if (updateTodo.rows.length === 0) {
//       return res.json("This todo is not yours");
//     }

//     res.json("Todo was updated");
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// //delete a todo

// router.delete("/todos/:id", authorize, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleteTodo = await pool.query(
//       "DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *",
//       [id, req.user.id]
//     );

//     if (deleteTodo.rows.length === 0) {
//       return res.json("This Todo is not yours");
//     }

//     res.json("Todo was deleted");
//   } catch (err) {
//     console.error(err.message);
//   }
// });

router.post('/addtraining', authorize, async (req, res) => {
    try{
        const {sportsman, exercise, session} = req.body;
        // pay attention to 'returning *' - should put it in request
        const newTrining = await pool.query("insert into train (sportsman, exercise, session) values ($1, $2, $3) returning *", [sportsman, exercise, session]);

        res.json(newTrining.rows);
        
        //res.send(req.body);
    } catch (err) {
        console.log(err.message);
    }
})

router.delete('/deltraining/:id', authorize, async (req, res) => {
    try{
        const {id} = req.params;
        const delTrining = await pool.query("delete from train where sportsman = $1", [id]);

        res.json('Training was successfully deleted');
      
    } catch (err) {
        console.log(err.message);
    }
})

router.get('/alltrainings', authorize, async(req, res) => {
    try{
        const allTrainings = await pool.query('select * from train');

        res.json(allTrainings.rows);
    } catch (err) {
        console.log(err.message);
    }
})


router.get('/allUsers', authorize, async(req, res) => {
    try{
        const allUsers = await pool.query('select * from users');

        res.json(allUsers.rows);

    } catch (err) {
        console.log(err.message);
    }
})

router.get('/programm/:prid', authorize, async(req, res) => {
    try{
        const spid = await pool.query(`select userId from users where userId = $1`, [req.user.id]);

        //res.json(spid.rows[0]);

        // const spid = parseInt(spidquery.rows[0].uid);
        const {prid} = req.params;
        //const programm = await pool.query('select get_programm($1, $2) as programm', [spid, prid]);
        //const programm = await pool.query('select ')

        res.json(programm.rows[0].programm[0]);

    } catch (err) {
        console.log(err.message);
    }
})

module.exports = router;
