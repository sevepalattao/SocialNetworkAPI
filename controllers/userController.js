const User = require('../models/user');

module.exports = {
    getUsers(req, res) {
        User.find()
          .populate({ path: 'thoughts', select: '-__v' })
          .select('-__v')
          .then((users) => res.json(users))
          .catch((err) => res.status(500).json(err));
    },
}