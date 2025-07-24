/**
 * EstadoDespachoErrorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async function (req, res) {
    try {
      const { fecha, descripcion, idVenta, empresa } = req.body;
      const nuevo = await EstadoDespachoError.create({
        fecha,
        descripcion,
        idVenta,
        empresa
      }).fetch();
      return res.json(nuevo);
    } catch (err) {
      return res.status(500).json({ error: 'Error al guardar el estado de error', detalle: err.message });
    }
  }
};
