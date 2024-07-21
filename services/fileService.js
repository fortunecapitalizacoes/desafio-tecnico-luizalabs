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
      });

      const usuarios = groupPedidosByUser(pedidos);
      usuarios.forEach(usuario => {
       console.log(usuario)
      })
      resolve();
    });
  });
};

function convertToDate(dateString) {
  if (typeof dateString !== 'string' || dateString.length !== 8) {
    throw new Error('Data inválida. O formato deve ser aaaammdd.');
  }

  const year = parseInt(dateString.substring(0, 4), 10);
  const month = parseInt(dateString.substring(4, 6), 10) - 1; // Meses começam do 0 em JavaScript
  const day = parseInt(dateString.substring(6, 8), 10);

  return new Date(year, month, day);
}

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
              date: convertToDate(pedidoDTO.dataCompra), // Use a função convertToDate aqui
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
