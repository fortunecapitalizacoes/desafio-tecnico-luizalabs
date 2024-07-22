import { expect } from 'chai';
import sinon from 'sinon';
import fs from 'fs';
import path from 'path';
import pkg from '../../services/fileService.js'; // Importação padrão para módulos CommonJS

const { processTextFile, convertToDate, parseStringToPedido, groupPedidosByUser } = pkg;

describe('Process Text File', () => {
  let readFileStub;
  let createUserStub;

  beforeEach(() => {
    readFileStub = sinon.stub(fs, 'readFile');
    createUserStub = sinon.stub(UserService, 'createUser');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should process the text file and call UserService.createUser', async () => {
    const filePath = 'test.txt';
    const fileContent = `0000000001John Doe                         0000000001000000001000000000100000000000000000000012345678901234`;
    readFileStub.callsFake((path, encoding, callback) => callback(null, fileContent));

    const expectedUser = {
      user_id: 1,
      name: 'John Doe',
      orders: [
        {
          order_id: 1000000001,
          total: '10.00',
          date: new Date(2023, 6, 24), // Ajuste a data conforme necessário
          products: [
            { product_id: 1000000001, value: '10.00' }
          ]
        }
      ]
    };

    createUserStub.resolves(expectedUser);

    await processTextFile(filePath);

    expect(createUserStub.calledOnceWith(expectedUser)).to.be.true;
  });

  // Adicione outros testes para verificar a manipulação de erros, etc.
});

describe('convertToDate', () => {
  it('should convert string to Date object', () => {
    const dateString = '20230724';
    const result = convertToDate(dateString);
    const expectedDate = new Date(2023, 6, 24);
    expect(result).to.eql(expectedDate);
  });

  it('should throw an error for invalid date string', () => {
    expect(() => convertToDate('2023-07-24')).to.throw('Data inválida. O formato deve ser aaaammdd.');
    expect(() => convertToDate('202307')).to.throw('Data inválida. O formato deve ser aaaammdd.');
  });
});

describe('parseStringToPedido', () => {
  it('should parse string to pedido object', () => {
    const input = '0000000001John Doe                         0000000001000000001000000000100000000000000000000012345678901234';
    const expected = {
      idUsuario: 1,
      nome: 'John Doe',
      idPedido: 1000000001,
      idProduto: 1000000001,
      valorProduto: 10.00,
      dataCompra: '20230724'
    };

    const result = parseStringToPedido(input);
    expect(result).to.eql(expected);
  });

  it('should return an empty object for invalid input length', () => {
    const input = 'invalid_length_input';
    const result = parseStringToPedido(input);
    expect(result).to.eql({});
  });
});

describe('groupPedidosByUser', () => {
  it('should group pedidos by user and calculate totals', () => {
    const pedidos = [
      {
        idUsuario: 1,
        nome: 'John Doe',
        idPedido: 1000000001,
        idProduto: 1000000001,
        valorProduto: 10.00,
        dataCompra: '20230724'
      }
    ];

    const expected = [
      {
        user_id: 1,
        name: 'John Doe',
        orders: [
          {
            order_id: 1000000001,
            total: '10.00',
            date: new Date(2023, 6, 24),
            products: [
              { product_id: 1000000001, value: '10.00' }
            ]
          }
        ]
      }
    ];

    const result = groupPedidosByUser(pedidos);
    expect(result).to.eql(expected);
  });
});
