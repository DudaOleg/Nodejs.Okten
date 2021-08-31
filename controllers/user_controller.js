const {
  userService,
  passwordService
} = require('../services');
const { code } = require('../errors');

module.exports = {
  createUser: async (req, res, next) => {
    try {
      const { password } = req.body;
      const hashedPassword = await passwordService.hash(password);
      const newUser = await userService.createUser({ ...req.body, password: hashedPassword });
      const withoutPass = newUser.toObject({ getters: true });
      delete withoutPass.password;
      res.json(withoutPass);
    } catch (e) {
      next(e);
    }
  },

  getSingleUser: (req, res, next) => {
    try {
      res.json(req.user);
    } catch (e) {
      next(e);
    }
  },

  getAllUsers: async (req, res, next) => {
    try {
      const allUsers = await userService.getAllItems();
      res.json(allUsers);
    } catch (e) {
      next(e);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      await userService.updateOneItem({ _id: user_id }, req.body);
      res.status(code.OK)
        .json('OK-UPDATE');
    } catch (e) {
      next(e);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      await userService.deleteOneItem({ _id: user_id });
      res.status(code.CREATE)
        .json('OK-delete');
    } catch (e) {
      next(e);
    }
  }
};
