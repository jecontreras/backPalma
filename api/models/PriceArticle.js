/**
 * PriceArticle.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
let flagship = false;

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    article:{
      model: 'tblproductos',
      required:true
    },
    user:{
      model: 'tblusuario',
      required:true
    },
    price:{
      type: 'number',
      required:true
    },
    price2:{
      type: 'number',
      defaultsTo: 0,
      allowNull: true
    },
    envio:{
      type: 'number',
      defaultsTo: 0, // 0 no envio gratis 1 si envio gratis
      allowNull: true
    },
    state:{
      type: 'number',
      defaultsTo: 0,
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },
  beforeCreate:async(valuesToSet, proceed)=>{
    console.log("¨¨ËNTRE create")
    if( flagship === false ){
      flagship = true;
      //await Cache.loadDBS('priceArticle');
      flagship = false;
    }
    return proceed();
  },
  beforeUpdate:async(valuesToSet, proceed)=>{
    console.log("¨¨UPDATE")
    if( flagship === false ){
      flagship = true;
      //await Cache.loadDBS('priceArticle');
      flagship = false;
    }
    return proceed();
  },
  beforeDestroy:async(valuesToSet, proceed)=>{
    console.log("¨¨DESTROY")
    if( flagship === false ){
      flagship = true;
      await Cache.loadDBS('priceArticle');
      flagship = false;
    }
    return proceed();
  }

};

