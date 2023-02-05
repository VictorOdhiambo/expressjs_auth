const router = require("express").Router();
const User = require('../model/User');

// register
router.post("/register", async (req, res, next) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  // validate user
  User.findOne({email: user.email}).then(
    (data) => {
        if (data) return res.send('Email already exists');
        user.save().then(
            res.status(200).json({user})
        ).catch(err => res.status(400).send(err))
    }
  ).catch(err => {
    console.log(err);
  })

});

// login
router.post("/login", (req, res, next) => {
  res.send("login");
});

module.exports = router;
