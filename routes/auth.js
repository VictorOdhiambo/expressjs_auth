const router = require("express").Router();
const User = require("../model/User");
const bycrypt = require("bcryptjs");

// register
router.post("/register", async (req, res, next) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  // hash password
  const salt = await bycrypt.genSalt(10);
  const hashedPassword = await bycrypt.hash(user.password, salt);
  user.password = hashedPassword;

  // validate user
  User.findOne({ email: user.email })
    .then((data) => {
      if (data) return res.send("Email already exists");
      user
        .save()
        .then(res.status(200).json({ user }))
        .catch((err) => res.status(400).send(err));
    })
    .catch((err) => {
      console.log(err);
    });
});

// login
router.post("/login", async (req, res, next) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  // validate user
  User.findOne({ email: user.email })
    .then((data) => {
      if (data) {
        // validate password
        bycrypt
          .compare(user.password, data.password)
          .then((match) => {
            if (!match)
              return res.send("Login failed: Incorrect username or password");
            res.send("Login successful");
          })
          .catch((err) => res.send(err));
      } else {
        return res.send(`Login failed: Incorrect username or password`);
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
