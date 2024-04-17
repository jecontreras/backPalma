/**
 * Tbltestimonio.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    usuario:{
      model: 'tblusuario'
    },
    descripcion:{
      type: 'string'
    },
    estado:{
      type: 'integer',
      defaultsTo: 0 // 0 activa, 1 eliminado // 1 aprobando,
    },
    foto:{
      type: 'string'
    },
    nombre:{
      type: 'string'
    },
    email:{
      type: 'string'
    },
    productos:{
      model: 'tblproductos'
    }

  },

};

