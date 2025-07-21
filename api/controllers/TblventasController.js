/**
 * TblventasController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
let Procedures = Object();
const _ = require('lodash');

Procedures.querys = async (req, res)=>{
	let params = req.allParams();
    let resultado = Object();
    console.log("***", params);
	resultado = await QuerysServices(Tblventas, params);
	for(let row of resultado.data){
		row.usu_clave_int = await Tblusuario.findOne({ id: row.usu_clave_int });
		row.pro_clave_int = await Tblproductos.findOne({ id: row.pro_clave_int });
		row.ventasAndCount = await Tblventas.count( { id :  { "!=" : row.id }, ven_telefono_cliente: row.ven_telefono_cliente } )
	}
	return res.ok(resultado);
}

Procedures.countVenta = async (req, res)=>{
	let params = req.allParams();
    let resultado = Array();
    console.log("***", params);
	  resultado = await Tblventas.find( params ).limit(100000000)
	return res.ok({ data: resultado.length });
}

// Procedures.update = async ( req, res)=>{
// 	let  params = req.allParams();
// 	let resultado = Object();
// 	params = _.omit(params, ['id', 'createdAt', 'updatedAt']);
// 	params.usu_clave_int = await Tblusuario.findOne({ usu_email: params.ven_usu_creacion });
// 	params.usu_clave_int = params.usu_clave_int.id;
// 	resultado = await Tblventas.create( params );
// 	return res.ok(resultado);
// }

Procedures.create = async (req, res )=>{
	let params = req.allParams();
	let result = Object();
	try {
		result = await Tblventas.create( _.clone( params ) ).fetch();
		let empresaTxt = await Empresa.findOne( { where: { id: params.empresa } } );
		try {
			MensajeService.envioWhatsapp(
				{
				  to: "57"+params.ven_telefono_cliente,
				  body: empresaTxt.txtCompra + ` Orden Pendiente recibida #${ result.id }
					Nombre del Cliente: ${ result.ven_nombre_cliente }
					fecha Notificado: ${ result.ven_fecha_venta }
					En espera de tu Comprobante de pago...
					${ result.ven_tipo === 'PAGO ADELANTADO' ? 'link de pago: https://payco.link/4f895b36-416f-4db8-a547-ca8022f23d6d' : '' } `,
				  urlMedios: "",
				  type: "txt"
				} );	
		} catch (error) {
			result = result;
		}
	} catch (error) {
		console.log("***59", error )
		result = { data: "Error"}
	}
	return res.status( 200 ).send( result );
}



module.exports = Procedures;
