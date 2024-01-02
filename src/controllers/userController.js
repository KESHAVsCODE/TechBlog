const signup = (req, res) => {
  res.send("This is a signup page");
};

const login = (req, res) => {
  res.send("This is a login page");
};

const getProfile = (req, res) => {
  res.send("This is a profile page");
};

module.exports = { signup, login, getProfile };
