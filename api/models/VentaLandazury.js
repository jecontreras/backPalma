/**
 * VentaLandazury.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    nombre:{
      type: 'string',
      required: true
    },
    ciudad:{
      type: 'string',
      required: true
    },
    direccion:{
      type: 'string',
      required: true
    },
    barrio:{
      type: 'string',
      required: true
    },
    numero:{
      type: 'number',
      required: true
    },
    listProduct:{
      type: 'JSON',
      required: true
    },
    estado:{
      type: 'integer',
      defaultsTo: 0, // 0 Pendiente 1 Preparacion 2 Despachado 4 cliente aprobo 5 cancelados
    },
    code:{
      type: 'string'
    },
    stateWhatsapp:{
      type: 'integer',
      defaultsTo: 0, // 0 creado 1 completado informacion
    },
    countItem:{
      type: 'integer',
      defaultsTo: 0,
    },
    totalFlete:{
      type: 'integer',
      defaultsTo: 0,
    },
    totalAPagar:{
      type: 'integer',
      defaultsTo: 0,
    },
    codeCiudad:{
      type: 'integer'
    },
    transportadora:{
      type: 'string'
    },
    celL:{
      type: 'integer'
    },
    contraEntrega:{
      type: 'integer', // 0 si 1 no
      defaultsTo: 0,
    },
    paisCreado:{
      type: 'string'
    },
    numberCreado:{
      type: 'string'
    },
    departament:{
      type: 'string'
    },
    latitude:{
      type: 'string'
    },
    longitude:{
      type: 'string'
    },
    dataTridyCosto:{
      type: 'json'
    },
    notifiedWeb:{
      type: 'integer', // 0 si 1 no
      defaultsTo: 1,
    },
    email:{
      type: 'string'
    },
    user:{
      model: 'tblusuario'
    }

  },

};

