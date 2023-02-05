const router = require('express').Router();
const validateToken = require('./verifyToken');

router.get('/', validateToken, (req, res) => {
    res.send('All posts');
});


module.exports = router;