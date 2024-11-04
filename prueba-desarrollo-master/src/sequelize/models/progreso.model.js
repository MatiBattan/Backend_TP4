module.exports = (sequelize, DataTypes) => {
	const Progreso = sequelize.define('Progreso', {
	  fecha: {
		type: DataTypes.DATE,
		allowNull: false,
	  },
	  cumplido: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
	  },
	});
  
	Progreso.associate = (models) => {
	  Progreso.belongsTo(models.Habito, {
		foreignKey: 'idHabito',
		as: 'habito',
	  });
	};
  
	return Progreso;
  };
  