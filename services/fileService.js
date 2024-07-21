const fs = require('fs');
const path = require('path');
const PedidoDTO = require('../dtos/PedidoDTO');

const processTextFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return reject(new Error('Failed to read the file'));
      }
      // Dividir o conteúdo em linhas e imprimir
      const lines = data.split('\n');
      lines.forEach(line => {
        var teste = parseStringToPedido(line)
        console.log(teste);
        parseStringToPedido(line)
      });

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

module.exports = {
  processTextFile,
};
