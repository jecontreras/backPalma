module.exports = {
    createEstado: async function (req, res) {
      try {
        const { fecha, descripcion, transporte ,idVenta} = req.body;
  
        const nuevoEstado = await EstadoDespacho.create({
          fecha,
          descripcion,
          transporte,
          idVenta
        }).fetch();
  
        return res.json(nuevoEstado);
      } catch (err) {
        return res.serverError(err);
      }
    },
  
    listar: async function (req, res) {
      try {
        let params = req.allParams();
        const estados = await EstadoDespacho.find( params ).sort('fecha DESC');
        return res.json(estados);
      } catch (err) {
        return res.serverError(err);
      }
    }
  };