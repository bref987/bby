const router = require('express').Router();
const authorize = require('../middleware/authorize');
const pool = require('../db');


router.get('/', authorize, async (req, res) => {
  try {
    const user = await pool.query('SELECT name FROM users WHERE userId = $1', [req.user.id]);

    res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/addtraining/:tid', authorize, async (req, res) => {
    try {
        const {tid} = req.params;
        const {session} = req.body;
        // pay attention to 'returning *' - have to put it in request
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

router.get('/statistics', authorize, async(req, res) => {
    try {
        const exercisesDay = 
        await pool.query('select * from get_all_statistics($1)', [req.user.id]);

        res.json(exercisesDay.rows);
    
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
})


router.get('/program/:id', authorize, async(req, res) => {
    try {
        const {id} = req.params;
        const programs = await pool.query('select * from get_p($1, $2)', [req.user.id, id]);

        res.json(programs.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
})

router.get('/statistics/:id', authorize, async(req, res) => {
    try {
        const {id} = req.params;
        const programs = await pool.query(
            'select get_sum(session) as training, traindate as date from train where sportsman = $1 and exercise = $2 order by trainId asc', 
            [req.user.id, id]);

        res.json(programs.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
})

module.exports = router;
