class PedidoDTO {
    constructor(idUsuario, nome, idPedido, idProduto, valorProduto, dataCompra) {
        this.idUsuario = idUsuario;
        this.nome = nome;
        this.idPedido = idPedido;
        this.idProduto = idProduto;
        this.valorProduto = valorProduto;
        this.dataCompra = dataCompra;
    }
}

module.exports = PedidoDTO;
