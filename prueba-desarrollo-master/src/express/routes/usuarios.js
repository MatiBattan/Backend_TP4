const express = require('express');
const router = express.Router();
const { Usuario } = require('../../sequelize');
const { manejarError } = require('../helpers');

router.post('/', async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    manejarError(res, error, 'Error al registrar el usuario');
  }
});

router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    manejarError(res, error, 'Error al obtener la lista de usuarios');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (usuario) {
      console.log("Ruta de usuarios alcanzada");
      res.json(usuario);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    manejarError(res, error, 'Error al obtener el usuario');
  }
});


module.exports = router;
