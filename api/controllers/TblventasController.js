/**
 * TblventasController
 *
 * @description :: Server-side actions for handling incoming requests.
 */

const _ = require('lodash');
const Procedures = {};

Procedures.querys = async (req, res) => {
  const params = req.allParams();
  console.log("*** Params Querys:", params);

  try {
    const resultado = await QuerysServices(Tblventas, params);
    for (let row of resultado.data) {
      row.usu_clave_int = await Tblusuario.findOne({ id: row.usu_clave_int });
      row.pro_clave_int = await Tblproductos.findOne({ id: row.pro_clave_int });
      row.ventasAndCount = await Tblventas.count({
        id: { "!=": row.id },
        ven_telefono_cliente: row.ven_telefono_cliente
      });
    }
    return res.ok(resultado);
  } catch (error) {
    console.error("❌ Error en querys:", error);
    return res.serverError({ error: 'Error consultando ventas' });
  }
};

Procedures.countVenta = async (req, res) => {
  const params = req.allParams();
  console.log("*** Params Count:", params);

  try {
    const ventas = await Tblventas.find(params).limit(100000000);
    return res.ok({ data: ventas.length });
  } catch (error) {
    console.error("❌ Error en countVenta:", error);
    return res.serverError({ error: 'Error contando ventas' });
  }
};

Procedures.create = async (req, res) => {
  const params = req.allParams();
  let result;

  try {
    result = await Tblventas.create(_.clone(params)).fetch();
    const empresaTxt = await Empresa.findOne({ id: params.empresa });

    // ✉️ Mensaje estructurado con íconos
    const mensaje = `${empresaTxt.txtCompra || '🛒 *Orden de compra recibida*'}

📦 *Orden ID:* #${result.id}
🏪 *Tienda:* ${empresaTxt.nombreTienda}
🙋‍♂️ *Cliente:* ${result.ven_nombre_cliente}
🗓️ *Fecha:* ${result.ven_fecha_venta}
🔢 *Cantidad:* ${params.ven_cantidad}
💰 *Total:* $${params.ven_precio}

📩 En breve recibirás más información.`;

    // Enviar por WhatsApp
    await HttpService.request(
      'http://localhost:3001/enviar-texto',
      JSON.stringify({
        tiendaId: `Tienda-${params.empresa}`,
        numero: result.ven_telefono_cliente,
        mensaje
      }),
      false,
      { 'Content-Type': 'application/json' },
      {},
      'POST'
    );

  } catch (error) {
    console.error("❌ Error en create:", error);
    return res.status(500).send({ error: 'No se pudo registrar la venta' });
  }

  return res.ok(result);
};

Procedures.enviarFacturaPdf = async (req, res) => {
  const { tiendaId, numeroCliente, url, nombreArchivo, tipo, mensaje } = req.body;

  try {
    await HttpService.request(
      'http://localhost:3001/api/enviar-archivo-desde-url',
      JSON.stringify({
        tiendaId,
        numero: numeroCliente,
        url,
        tipo, // 'imagen', 'pdf', 'video', 'audio'
        nombreArchivo,
        mensaje
      }),
      false,
      { 'Content-Type': 'application/json' },
      {},
      'POST'
    );

    return res.ok({ data: "📤 Archivo enviado correctamente" });
  } catch (error) {
    console.error("❌ Error al enviar archivo:", error);
    return res.serverError({ error: 'No se pudo enviar el archivo' });
  }
};

module.exports = Procedures;
