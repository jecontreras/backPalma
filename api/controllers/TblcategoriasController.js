/**
 * TblcategoriasController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

let Procedures = Object();
Procedures.querys = async (req, res)=>{
	let params = req.allParams();
    let resultado = Object();
    console.log("***", params);
	resultado = await QuerysServices(Tblcategorias, params);
	for(let row of resultado.data){
		row.cat_padre = await Tblcategorias.findOne( { where:{ id: row.cat_padre }} );
		row.cat_usu_actualiz = await Tblusuario.findOne( { where:{ id: row.cat_usu_actualiz }} )
	}
	return res.ok(resultado);
}

Procedures.querysProduct = async (req, res)=>{
	let params = req.allParams();
    let resultado = Object();
    console.log("***", params);
	resultado = await QuerysServices(Tblcategorias, params);
	let dataEnd = Array();
	for(let row of resultado.data){
		let articleData = await Tblproductos.find( { where: { pro_categoria: row.id, pro_estado: 0, empresa: params.empresa }, sort: "position DESC" } );
		if( articleData.length ) {
			dataEnd.push( {
				articleData: articleData,
				category: row
			});
		}
	}
	// Ordenamos `dataEnd` de mayor a menor según la longitud de `articleData`
	dataEnd.sort((a, b) => b.articleData.length - a.articleData.length);
	return res.ok( { data: dataEnd, count: dataEnd.length } );
}

module.exports = Procedures;
