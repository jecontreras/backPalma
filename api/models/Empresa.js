/**
 * Empresa.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    logo:{
        type: 'string'
    },
    nombreTienda:{
        type: 'string',
        required: true
    },
    numeroCelular:{
        type: 'string'    
    },
    emailTienda:{
        type: 'string'      
    },
    direccionTienda:{
        type: 'string'        
    },
    decripcion:{
        type: 'string'          
    },
    foto1:{
        type: 'json'
    },
    foto2:{
        type: 'json'
    },
    portada1:{
        type: 'string'
    },
    comentario1:{
        type: 'string'
    },
    portada2:{
        type: 'string'
    },
    portada3:{
        type: 'string'
    },
    portada4:{
        type: 'string'
    },
    dominio:{
        type: 'string'
    },
    textTransfer:{
        type: 'string'
    },
    plantilla: { type: 'string', defaultsTo: 'plantilla1' }, // Plantilla seleccionada
    configuracion: { type: 'json', defaultsTo: {} }, // Configuración de apariencia
    urlSocket:{
        type: 'string'
    },
    urlBackend:{
        type: 'string'
    },
    urlBackendFile:{
        type: 'string'
    },
    userDropi:{
        type: 'string'
    },
    claveDropi:{
        type: 'string'
    },
    rolDropi:{
        type: 'string'
    },
    txtCompra:{
        type: 'string'
    }

  },
  datastore: 'default',
  charset: 'utf8mb4',
  collation: 'utf8mb4_unicode_ci'

};

