/**
 * EstadoDespacho.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {
  attributes: {
    fecha: {
      type: 'ref',
      columnType: 'datetime',
      required: true,
    },

    descripcion: {
      type: 'string',
      required: true,
    },

    transporte: {
      type: 'string',
      allowNull: true,
    },
    idVenta:{
      model: 'tblventas',
      required: true
    }
  },
};