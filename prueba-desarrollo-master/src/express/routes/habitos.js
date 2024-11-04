const express = require('express');
const router = express.Router();
const { Habito } = require('../../sequelize');
const { manejarError } = require('../helpers');

router.get('/', async (req, res) => {
  try {
    const usuarioId = req.user ? req.user.id : 1;

    const habitos = await Habito.findAll({ where: { usuarioId } });
    
    if (habitos.length === 0) {
      return res.json({ message: 'No hay hábitos para este usuario', habitos: [] });
    }

    res.json(habitos);
  } catch (error) {
    manejarError(res, error, 'Error al obtener los hábitos');
  }
});


router.post('/', async (req, res) => {
  try {
    const usuarioId = req.user ? req.user.id : 1;
    const nuevoHabito = await Habito.create({ ...req.body, usuarioId });
    res.status(201).json(nuevoHabito);
  } catch (error) {
    manejarError(res, error, 'Error al crear el hábito');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const habito = await Habito.findByPk(req.params.id);
    if (habito) {
      await habito.update(req.body);
      res.json(habito);
    } else {
      res.status(404).json({ error: 'Hábito no encontrado' });
    }
  } catch (error) {
    manejarError(res, error, 'Error al actualizar el hábito');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const habito = await Habito.findByPk(req.params.id);
    if (habito) {
      await habito.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Hábito no encontrado' });
    }
  } catch (error) {
    manejarError(res, error, 'Error al eliminar el hábito');
  }
});

module.exports = router;
