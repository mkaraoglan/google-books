const db = require('../models');

const User = db.users;
const Bookmark = db.bookmarks;

User.hasMany(Bookmark);

const addUser = async (req, res) => {
  console.log('addUser');
  let UserObject = {
    name: req.body.name,
    email: req.body.email,
  };

  try {
    const user = await User.create(UserObject);
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

const getAllUsers = async (req, res) => {
  console.log('getAllUsers');
  let users = await User.findAll({});
  res.status(200).send(users);
};

const getUser = async (req, res) => {
  console.log('getUser');
  let id = req.params.id;
  let user = await User.findAll({
    where: { id: id },
  });
  res.status(200).send(user);
};

const updateUser = async (req, res) => {
  console.log('updateUser');
  let id = req.params.id;

  const user = await User.update(req.body, { where: { id: id } });

  res.status(200).send(user);
};

const deleteUser = async (req, res) => {
  let id = req.params.id;
  await User.destroy({
    where: { id: id },
  });
  res.status(200).send('User deleted');
};

// const userUser = async (req, res) => {
//   const user = await User.findAll({where: { user}})
//   let id = req.params.id;
//   await user.destroy({
//     where: { id: id }
//   });
//   res.status(200).send('User deleted');
// }

module.exports = {
  addUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
