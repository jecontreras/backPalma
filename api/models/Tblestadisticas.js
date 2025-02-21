/**
 * Tblestadisticas.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    producto_id:{
      model: 'tblproductos',
      required: true
    },
    cliente_ip:{
      type: 'string',
      required: true
    },
    fecha:{
      type: 'string'
    }
  },

};

