const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");


router.get("/", authorize, async (req, res) => {
  try {
    const user = await pool.query('SELECT name FROM users WHERE userId = $1', [req.user.id]);

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

router.post('/addtraining/:tid', authorize, async (req, res) => {
    try {
        const {tid} = req.params;
        const {session} = req.body;
        // pay attention to 'returning *' - should put it in request
        const newTrining = await pool.query('insert into train (sportsman, exercise, session) values ($1, $2, $3) returning *', [req.user.id, tid, session]);

        res.json(newTrining.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
})

router.get('/program', authorize, async(req, res) => {
    try {
        const programs = await pool.query('select * from exercises order by exerciseid asc');

        res.json(programs.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
})

router.get('/program/:pid', authorize, async(req, res) => {
    try {
        const {pid} = req.params;
        const programs = await pool.query('select * from get_programm($1, $2)', [req.user.id, pid]);

        res.json(programs.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }

    // try {
    //     const {pid} = req.params;
    //     const programs = await pool.query('select programm from exercises where exerciseId = $1', [pid]);

    //     res.json(programs.rows);
    // } catch (err) {
    //     console.log(err.message);
    //     res.status(500).send('Server error');
    // }
})

// router.delete('/deltraining/:id', authorize, async (req, res) => {
//     try{
//         const {id} = req.params;
//         const delTrining = await pool.query("delete from train where sportsman = $1", [id]);

//         res.json('Training was successfully deleted');
      
//     } catch (err) {
//         console.log(err.message);
//     }
// })

// router.get('/alltrainings', authorize, async(req, res) => {
//     try{
//         const allTrainings = await pool.query('select * from train');

//         res.json(allTrainings.rows);
//     } catch (err) {
//         console.log(err.message);
//     }
// })


// router.get('/allUsers', authorize, async(req, res) => {
//     try{
//         const allUsers = await pool.query('select * from users');

//         res.json(allUsers.rows);

//     } catch (err) {
//         console.log(err.message);
//     }
// })



module.exports = router;
