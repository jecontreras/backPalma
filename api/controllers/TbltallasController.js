/**
 * TbltallasController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

let Procedures = Object();
Procedures.querys = async (req, res)=>{
	let params = req.allParams();
    let resultado = Object();
    console.log("***", params);
	resultado = await QuerysServices(Tbltallas, params);
	try {
		for( let item of resultado.data ) item.tal_descripcion = Number( item.tal_descripcion ) || String( item.tal_descripcion )
		resultado.data = _.orderBy( resultado.data , ['tal_descripcion'], ['DEC'] );
		resultado.data = _.orderBy( resultado.data , ['ordenar'], ['ASC'] );
	} catch (error) { console.log("CONTROLADO ERROR", error)}
	return res.ok(resultado);
}
module.exports = Procedures;