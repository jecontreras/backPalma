/**
 * EstadoDespachoError.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'estado_despacho_error',
  attributes: {
    fecha: {
      type: 'string',
      required: true
    },
    descripcion: {
      type: 'string',
      required: true
    },
    idVenta: {
      type: 'number',
      required: true
    },
    empresa: {
      type: 'number',
      required: true
    }
  }
};

