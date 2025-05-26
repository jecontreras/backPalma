/**
 * PriceArticleController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


let Procedures = Object();

Procedures.querys = async (req, res)=>{
	let params = req.allParams();
    let resultado = Object();
    // console.log("***", params);
	resultado = await QuerysServices(PriceArticle, params);
	return res.ok(resultado);
}

Procedures.querysProducts = async( req, res )=>{
  let params = req.allParams();
  let result = Object();
  resultado = await QuerysServices(PriceArticle, params);
  for( let row of resultado.data ){
    if( row.article ) row.article = await Tblproductos.findOne( { id: row.article } );
  }
  return res.ok(resultado);
}

Procedures.create = async ( req, res )=>{
	let params = req.allParams();
	let result = Object();
	if( !params.user ) return res.status( 400 ).send( {status:400, data: "Error userId no indeficate" } );
	result = await PriceArticle.findOne( { article: params.article, user: params.user } );
	if( result ) {
		result = await PriceArticle.update( { id: result.id }, { price: params.price, price2: params.price2, state: 0, envio: params.envio } );
	}else{
		result = await PriceArticle.create( {
			article: params.article,
			user: params.user,
			price: params.price,
      price2: params.price2,
      envio: params.envio
		});
	}
  //Cache.loadDBS('priceArticle');
	return res.ok({ data: "Creado exitoso" } );

}

Procedures.createTotalProduct = async ( req, res )=>{
  let params = req.allParams();
  let result = Object();
  if( !params.user  || !params.create ) return res.status( 400 ).send( {status:400, data: "Error userId no indeficate" } );
  result = await Tblproductos.find( { where:{ pro_usu_creacion: 100000, pro_estado:0, pro_activo:0, pro_mp_venta: 0 } } );
  for( let row of result ){
    let validate = await PriceArticle.findOne( { article: row.id, user: params.user } );
    if( validate ) continue;
    let dataEnd = await PriceArticle.create({
      article: row.id,
			user: params.user,
			price: row.pro_uni_venta || row.pro_vendedor,
      price2: row.pro_uni_venta,
      envio: 0
    });
  }
  Cache.loadDBS('priceArticle');
  return res.ok({ data: "Creado exitoso" } );
}

Procedures.automatico = async( req, res )=>{
  let params = req.allParams();
    let result = Object();
    result = await Tblproductos.find( { where:{ pro_usu_creacion: 100000, pro_categoria: 84, pro_estado:0, pro_activo:0, pro_mp_venta: 0 } } );
    //console.log("*****68", result)
    let user = await Tblusuario.find( { where: { /*usu_email: "jhonyherrera1130@gmail.com",*/ usu_confirmar: 0 } } );
    for( let item of user ){
      for( let row of result ){
        let validate = await PriceArticle.findOne( { article: row.id, user: item.id } );
        if( validate ) continue;
        let dataEnd = await PriceArticle.create({
          article: row.id,
          user: item.id,
          price: row.pro_uni_venta || row.pro_vendedor
        });
      }
    }
    Cache.loadDBS('priceArticle');
    return res.ok({ data: "Creado exitoso" } );
}
Procedures.update = async( req, res )=>{
  let params = req.allParams();
  let result = Object();
  result = await PriceArticle.update( { id: params.id }, { state: params.state, price: params.price } ).fetch();
  Cache.loadDBS('priceArticle');
  return res.ok(result);
}

module.exports = Procedures;
