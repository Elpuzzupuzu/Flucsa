// src/controllers/userController.js
import { UserService } from '../services/userService.js';

export const UserController = {
  register: async (req, res) => {
    try {
      const newUser = await UserService.registerUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const user = await UserService.loginUser(req.body.correo, req.body.contraseña);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getProfile: async (req, res) => {
    try {
      const userId = req.params.id;
      const profile = await UserService.getUserProfile(userId);
      res.status(200).json(profile);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
