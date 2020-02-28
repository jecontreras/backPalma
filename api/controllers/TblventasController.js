/**
 * TblventasController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions 
 */
let Procedures = Object();

Procedures.querys = async (req, res)=>{
	let params = req.allParams();
    let resultado = Object();
    console.log("***", params);
	resultado = await QuerysServices(Tblventas, params);
	for(let row of resultado.data){
		row.usu_clave_int = await Tblusuario.findOne({ id: row.usu_clave_int });
		row.pro_clave_int = await Tblproductos.findOne({ id: row.pro_clave_int });
	}
	return res.ok(resultado);
}

module.exports = Procedures;