const fs = require('fs');
const path = require('path');
const PedidoDTO = require('../dtos/PedidoDTO');

const processTextFile = (filePath) => {

  const pedidos = [];

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return reject(new Error('Failed to read the file'));
      }

      const lines = data.split('\n');

      lines.forEach(linha => {
        var pedido = parseStringToPedido(linha)
        pedidos.push(pedido)
      //  console.log(pedido);
      });

      const usuarios = groupPedidosByUser(pedidos);
      usuarios.forEach(usuario => console.log(usuario))
      resolve();
    });
  });
};

function parseStringToPedido(input) {
  if (input.length !== 95) {
      return {};
  }

  const idUsuario = parseInt(input.slice(0, 10).trim(), 10);
  const nome = input.slice(10, 55).trim();
  const idPedido = parseInt(input.slice(55, 65).trim(), 10);
  const idProduto = parseInt(input.slice(65, 75).trim(), 10);
  const valorProduto = parseFloat(input.slice(75, 87).trim());
  const dataCompra = input.slice(87, 95).trim();

  return {
      idUsuario,
      nome,
      idPedido,
      idProduto,
      valorProduto,
      dataCompra,
  };
}

const groupPedidosByUser = (pedidos) => {
  const usersMap = new Map();

  pedidos.forEach(pedido => {
      // Cria uma instância de PedidoDTO
      const pedidoDTO = new PedidoDTO(
          pedido.idUsuario,
          pedido.nome,
          pedido.idPedido,
          pedido.idProduto,
          pedido.valorProduto,
          pedido.dataCompra
      );

      if (!usersMap.has(pedidoDTO.idUsuario)) {
          usersMap.set(pedidoDTO.idUsuario, {
              user_id: pedidoDTO.idUsuario,
              name: pedidoDTO.nome,
              orders: [],
          });
      }

      const user = usersMap.get(pedidoDTO.idUsuario);

      let order = user.orders.find(o => o.order_id === pedidoDTO.idPedido);

      if (!order) {
          order = {
              order_id: pedidoDTO.idPedido,
              total: 0, // Total será calculado posteriormente
              date: new Date(pedidoDTO.dataCompra),
              products: [],
          };
          user.orders.push(order);
      }

      order.products.push({
          product_id: pedidoDTO.idProduto,
          value: pedidoDTO.valorProduto.toString(),
      });

      // Atualizando o total do pedido
      order.total = (parseFloat(order.total) + pedidoDTO.valorProduto).toFixed(2).toString();
  });

  return Array.from(usersMap.values());
};



module.exports = {
  processTextFile,
};
