/**
 * TblestadisticasController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

let Procedures = Object();

Procedures.querys = async (req, res)=>{
	let params = req.allParams();
    let resultado = Object();
	resultado = await QuerysServices(Tblestadisticas, params);
	return res.ok(resultado);
}

Procedures.registrarVisita = async (req, res)=>{
    try {
      let { producto_id } = req.body;
      let cliente_ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      let fechaHoy = new Date().toISOString().split('T')[0]; // Solo la fecha YYYY-MM-DD

      // Verificar si ya existe una visita hoy para este producto y cliente
      let visitaExistente = await Tblestadisticas.findOne({
        where: { producto_id, cliente_ip, fecha: fechaHoy }
      });

      if (!visitaExistente) {
        // Guardar la nueva visita
        await Tblestadisticas.create({ producto_id, cliente_ip, fecha: fechaHoy });
      }

      return res.json({ success: true, message: "Visita registrada correctamente" });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Error en el servidor", error });
    }
},

Procedures.obtenerEstadisticas =async (req, res)=>{
    try {
        let estadisticas = await Tblproductos.findAll({
        include: [{
            model: Tblestadisticas,
            attributes: [[Sails.Sequelize.fn('COUNT', Sails.Sequelize.col('tblestadisticas.id')), 'total_visitas']],
            required: false
        }],
        group: ['tblproductos.id']
        });

        return res.json(estadisticas);
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error al obtener estadísticas", error });
    }
}

module.exports = Procedures;