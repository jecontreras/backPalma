/**
 * TblproductosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
let Procedures = Object();
const _ = require('lodash');
const moment = require('moment');

Procedures.getSimply = async (req, res )=>{
  let params = req.allParams();
	let resultado = Object();
	console.log("***", params);
	resultado = await QuerysServices(Tblproductos, params);
  return res.ok(resultado);
}

Procedures.querys = async (req, res) => {
	let params = req.allParams();
	let resultado = Object();
	console.log("***", params);
	resultado = await QuerysServices(Tblproductos, params);
	for (let row of resultado.data) {
		row.listComentarios = _.orderBy( await Procedures.comentarios( row.id ), ['posicion', 'age'] );
		if (row.cat_clave_int) row.cat_clave_int = await Tblcategorias.findOne({ where: { id: row.cat_clave_int } });
		if (row.pro_categoria) row.pro_categoria = await Tblcategorias.findOne({ where: { id: row.pro_categoria } });
		if (row.pro_usu_creacion) row.pro_usu_creacion = await Tblproveedor.findOne({ where: { id: row.pro_usu_creacion } });
		if( row.pro_sw_tallas && !row.listaTallas ) {
			row.listTallas = await Tbltallas.find({ tal_tipo: row.pro_sw_tallas });
			row.listTallas = _.orderBy( row.listTallas, ['tal_descripcion'], ['asc'] );
		}
		if( row.listaTallas ) row.listTallas = _.orderBy( row.listaTallas, ['tal_descripcion'], ['asc'] );
		row.galeria = [];
		//row.galeria = ( await Tblproductosimagen.find( { where: { producto: row.id } } ) ) || [];
		let ids = await Tblproductos.find({ where: { pro_codigo: row.pro_codigo } } );
		ids = _.map( ids, 'id');
		ids.push( row.id );
		//console.log("31*************************", ids )
		row.galeria = await Tblproductosimagen.find( { where: { producto: ids } } ).limit(6);
		try {
			if( row.listaTallas[0].tal_descripcion === 'Unica' ) row.talla = 'Unica';
		} catch (error) {
			
		}
		/*if( !row.galeria.length ) row.galeria = _.map( row.listColor, (key)=>{
			return {
				pri_imagen: key.foto,
				id: key.id
			}
		});*/
	}
	return res.ok(resultado);
}

Procedures.updateVideoToken = async(req,res)=>{ console.log("Procedures.updateVideoToken",req)
 let params = req.allParams();
  resultado = await Tblusuario.update({id: params.id},{pro_video_token: params.pro_video_token}).fetch();
  res.status(200).ok({"msg": "toekn de video actualizado"})
}

Procedures.comentarios = async ( id )=>{
	let resultado = await Tbltestimonio.find( { productos: id, estado: 0 } );
	let dataFinix = [];
	// dataFinix =  [
	// 	{
	// 		nombre: "Andrea",
	// 		fecha: new moment().format("DD/MM/YYYY"),
	// 		descripcion: "Los compré y me encantaron tienen una horma levanta cola los recomiendo mucho🤩👏",
	// 		posicion: _.random(0, 10),
	// 		foto: "./assets/noimagen.jpg"
	// 	},
	// 	{
	// 		nombre: "Camila",
	// 		fecha: new moment().format("DD/MM/YYYY"),
	// 		descripcion: "Me gustaron demasiado la tela es muy cómoda y suave ✅",
	// 		posicion: _.random(0, 10),
	// 		foto: "./assets/noimagen.jpg"
	// 	},
	// 	{
	// 		nombre: "Natalia",
	// 		fecha: new moment().format("DD/MM/YYYY"),
	// 		descripcion: "Yo los compré y me encantaron la tela es Strech levanta cola los recomiendo ",
	// 		posicion: _.random(0, 10),
	// 		foto: "./assets/noimagen.jpg"
	// 	},
	// 	{
	// 		nombre: "Andreína",
	// 		fecha: new moment().format("DD/MM/YYYY"),
	// 		descripcion: "Cumplieron con todas mis expectativas son hermosos esos jeans👌😍",
	// 		posicion: _.random(0, 10),
	// 		foto: "./assets/noimagen.jpg"
	// 	},
	// 	{
	// 		nombre: "Alexandra",
	// 		fecha: new moment().format("DD/MM/YYYY"),
	// 		descripcion: "Gracias me gustaron demasiado 👏👏👏",
	// 		posicion: _.random(0, 10),
	// 		foto: "./assets/noimagen.jpg"
	// 	},
	// 	{
	// 		nombre: "Paola",
	// 		fecha: new moment().format("DD/MM/YYYY"),
	// 		descripcion: "Me parecieron hermosos esta semana les voy a volver a comprar🙌🤩",
	// 		posicion: _.random(0, 10),
	// 		foto: "./assets/noimagen.jpg"
	// 	},
	// 	{
	// 		nombre: "Estefany",
	// 		fecha: (new moment().add(-3, 'days')).format("DD/MM/YYYY"),
	// 		descripcion: "A mi me gustaron saludos.",
	// 		posicion: _.random(0, 10),
	// 		foto: "./assets/noimagen.jpg"
	// 	},
	// 	{
	// 		nombre: "Ester",
	// 		fecha: (new moment().add(-4, 'days')).format("DD/MM/YYYY"),
	// 		descripcion: "Es Muy Genial Gracias.",
	// 		posicion: _.random(0, 10),
	// 		foto: "./assets/noimagen.jpg"
	// 	},

	// 	{
	// 		nombre: "Olga",
	// 		fecha: (new moment().add(-6, 'days')).format("DD/MM/YYYY"),
	// 		descripcion: "Tenia Miedo al comprar pero me llego bien gracias.",
	// 		posicion: _.random(0, 10),
	// 		foto: "./assets/noimagen.jpg"
	// 	},

	// ];
	// dataFinix =  [
	// 	{
	// 		nombre: "Antonio",
	// 		fecha: new moment().format("DD/MM/YYYY"),
	// 		descripcion: "Producto genial muy util y facil de usar.",
	// 		posicion: _.random(0, 10),
	// 		foto: "./assets/noimagen.jpg"
	// 	},
	// 	{
	// 		nombre: "Carlos montaño",
	// 		fecha: (new moment().add(-1, 'days')).format("DD/MM/YYYY"),
	// 		descripcion: "Me Encanto en Todas Formas Recomendado.",
	// 		posicion: _.random(0, 10),
	// 		foto: "./assets/noimagen.jpg"
	// 	},
	// 	{
	// 		nombre: "Rafael",
	// 		fecha: (new moment().add(-2, 'days')).format("DD/MM/YYYY"),
	// 		descripcion: "LLego muy rapido y me encanto.",
	// 		posicion: _.random(0, 10),
	// 		foto: "./assets/noimagen.jpg"
	// 	},
	// 	{
	// 		nombre: "Estafany",
	// 		fecha: (new moment().add(-3, 'days')).format("DD/MM/YYYY"),
	// 		descripcion: "A mi esposo le gusto saludos.",
	// 		posicion: _.random(0, 10),
	// 		foto: "./assets/noimagen.jpg"
	// 	},
	// 	{
	// 		nombre: "Ester",
	// 		fecha: (new moment().add(-4, 'days')).format("DD/MM/YYYY"),
	// 		descripcion: "Es Muy Genial Gracias.",
	// 		posicion: _.random(0, 10),
	// 		foto: "./assets/noimagen.jpg"
	// 	},
	// 	{
	// 		nombre: "Jose",
	// 		fecha: (new moment().add(-5, 'days')).format("DD/MM/YYYY"),
	// 		descripcion: "Gracias Tienda Recomendado.",
	// 		posicion: _.random(0, 10),
	// 		foto: "./assets/noimagen.jpg"
	// 	},
	// 	{
	// 		nombre: "Olga",
	// 		fecha: (new moment().add(-6, 'days')).format("DD/MM/YYYY"),
	// 		descripcion: "Tenia Miedo alcomprar pero me llego bien gracias.",
	// 		posicion: _.random(0, 10),
	// 		foto: "./assets/noimagen.jpg"
	// 	},
	// 	{
	// 		nombre: "Cristian",
	// 		fecha: (new moment().add(-7, 'days')).format("DD/MM/YYYY"),
	// 		descripcion: "Gracias tienda recomendad.",
	// 		posicion: _.random(0, 10),
	// 		foto: "./assets/noimagen.jpg"
	// 	},
	// 	{
	// 		nombre: "Miguel",
	// 		fecha: (new moment().add(-8, 'days')).format("DD/MM/YYYY"),
	// 		descripcion: "Gracias me encanto.",
	// 		posicion: _.random(0, 10),
	// 		foto: "./assets/noimagen.jpg"
	// 	}
	// ];
	let result = _.map( resultado, ( key )=>{
		return {
			nombre: key.nombre,
			fecha: new moment( key.createdAt ).format("DD/MM/YYYY"),
			descripcion: key.descripcion,
			posicion: _.random(0, 10),
      ...key
		}
	});
	dataFinix.push( ...result );
	return dataFinix;
}

Procedures.tridy = async (req, res) => {
//Procedures.querys = async (req, res) => {
	let params = req.allParams();
  console.log("****127")
	res.status(200).send({ status: 200, data: "ok" });
	await TblproductosServices.ProLokompro()
	return false;
	await TblproductosServices.procesoCategoria();
	await TblproductosServices.procesoProvedor();
	await TblproductosServices.nextTridy();
  return res.status(200).send( {data: "ok"})

}

Procedures.filtroStore = async( req, res )=>{
	let resultado = Object();
  let params = req.allParams();
  if( params.where.idPrice ) {
	params.where.user = params.where.idPrice;
  delete params.where.idPrice;
  }
  if( params.where.pro_activo >= 0  ) {
	params.where.state = params.where.pro_activo;
	delete params.where.pro_activo;
  }
  if( params.where.pro_categoria ) {
	delete params.where.pro_categoria;
  }
  let cacheManA = [];
  if( !params.where.or ) cacheManA = [] || _.cloneWith( await Cache.leer('priceArticle') );
  if( cacheManA.length === 0 ) {
	console.log("**********CONSULTADO DBS PRICE ARTICLE***************");
	if( params.where.or ){
	  let ids = await Procedures.idRecordsPro( params );
	  resultado = await QuerysServices( PriceArticle, { where: { article: ids, /*user: params.where.user*/ } } );
	}else{
	  resultado = await QuerysServices( PriceArticle, params );
	}
  }
  else {
	let finix = cacheManA.filter( item => /*item.user === params.where.user && */item.state === params.where.state );
	console.log("**251", finix)
	resultado = { count: finix.length, data: [] };
	if( params.where.position ) {
	  finix = _.orderBy( finix, ['position'], ['asc'])
	  //finix = finix.filter( item => item.position >= params.where.position );
	  //console.log("**ENTRE 291", finix.length )
	}
	finix = _.clone( Cache.paginate( finix, params.limit, ( ( params.page || params.skip ) + 1 ) ) );
	//console.log("***293", params )
	resultado.data = finix;
  }
  let dataEnd = Array();
  for( let row of resultado.data ){
	row.idAleatorio = getRandomInt(1000000000000);
	try {
	  if( !row.article.id ) {
		let cacheManAr = [] || _.cloneWith( await Cache.leer('products') );
		if( cacheManAr.length === 0 ) {
		  row.article = await Tblproductos.find( { id: row.article, pro_activo: 0 } );
		  row.article = row.article[0];
		  //console.log("******521", row)
		}
		else row.article = cacheManAr.find( off => off.id === row.article && off.pro_activo === 0 );
	  }
	} catch (error) {
	  if( !row.article ) {
		let cacheManAr = [] || _.cloneWith( await Cache.leer('products') );
		//console.log("*****525", row)
		if( cacheManAr.length === 0 ) row.article = await Tblproductos.findOne( { id: row.article, pro_activo: 0 } );
		else row.article = cacheManAr.find( off => off.id === row.article && off.pro_activo === 0 );
	  }
	}
	row.pro_uni_venta = row.price || row.pro_uni_venta;
	row.cobreEnvio = row.envio || 0; // 0 si 1 no
	try {
	  row.pro_vendedor = row.price2 != null ? row.price2 : row.article.pro_vendedor;
	  //console.log("****532", row)
	  if( row.article.id ) dataEnd.push( {...row.article,pro_uni_venta: row.price, cobreEnvio: row.cobreEnvio, pro_vendedor:row.pro_vendedor, idAleatorio: row.idAleatorio } );
	} catch (error) { /*console.error("EEEEROR CONTROLADO", error ) */}
  }
  if( ( params.where.pro_categoria ) ) {
	if( ( params.where.pro_categoria !==0 && params.where.pro_categoria !==800 ) ) dataEnd = dataEnd.filter( item => item.pro_categoria === params.where.pro_categoria )
  }
  if( !params.where.position ) dataEnd = _.orderBy( dataEnd, ['idAleatorio'], ['desc'])
  return res.ok({ status:200, data: dataEnd, count: dataEnd.length } );
}

Procedures.idRecordsPro = async( params )=>{
  return new Promise( async ( resolve ) =>{
	let result = await Tblproductos.find( { where: { or: params.where.or } } );
	result = _.map( result, 'id');
	resolve( result );
  });
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
  }

module.exports = Procedures;

