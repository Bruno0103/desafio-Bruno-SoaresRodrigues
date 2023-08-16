class CaixaDaLanchonete {
    cardapio = {
        cafe: { descricao: 'Café', valor: 3.00 },
        chantily: { descricao: 'Chantily (extra do Café)', valor: 1.50 },
        suco: { descricao: 'Suco Natural', valor: 6.20 },
        sanduiche: { descricao: 'Sanduíche', valor: 6.50 },
        queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
        salgado: { descricao: 'Salgado', valor: 7.25 },
        combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
        combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.50 }
    };

    formasPagamento = ['dinheiro', 'debito', 'credito'];

    calcularValorDaCompra(metodoDePagamento, itens) {
        let validacaoMetodo = this.validacaoMetodoDePagamento(metodoDePagamento);
        if (validacaoMetodo != "ok") {
            return validacaoMetodo;
        }

        let validacaoItensMsg = this.validacaoItens(itens);
        if (validacaoItensMsg != "ok") {
            return validacaoItensMsg;
        }

        let total = this.totalDaCompra(itens, metodoDePagamento);
        if(total == 0){
            return 'Não há itens no carrinho de compra!';
        }
        else
        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }

    validacaoMetodoDePagamento(metodoDePagamento) {
        if (this.formasPagamento.includes(metodoDePagamento)) {
            return "ok";
        }
        return "Forma de pagamento inválida!";
    }

    validacaoItens(itens) {
        let temCafe = false;
        let temSanduiche = false;
    
        for (let item of itens) {
            let partes = item.split(',');
            let codigo = partes[0];
            let quantidade = parseInt(partes[1]);
    
            if (quantidade <= 0) {
                return 'Quantidade inválida!';
            }
    
            if (!this.cardapio[codigo]) {
                return 'Item inválido!';
            }
    
            if (codigo === 'cafe') {
                temCafe = true;
            }
            if (codigo === 'sanduiche') {
                temSanduiche = true;
            }
        }
    
        for (let item of itens) {
            let partes = item.split(',');
            let codigo = partes[0];
    
            if (this.cardapio[codigo].descricao === 'Chantily (extra do Café)' && !temCafe) {
                return 'Item extra não pode ser pedido sem o principal';
            }
            if (this.cardapio[codigo].descricao === 'Queijo (extra do Sanduíche)' && !temSanduiche) {
                return 'Item extra não pode ser pedido sem o principal';
            }
        }
    
        return "ok";
    }

    totalDaCompra(itens, metodoDePagamento) {
        let total = 0;

        for (let item of itens) {
            let [codigo, quantidade] = item.split(',');
            total += this.cardapio[codigo].valor * parseInt(quantidade);
        }

        if (metodoDePagamento === 'dinheiro') {
            total *= 0.95; // Aplica desconto de 5% para pagamento em dinheiro
        } else if (metodoDePagamento === 'credito') {
            total *= 1.03; // Aplica acréscimo de 3% para pagamento a crédito
        }

        return total;
    }
}

export { CaixaDaLanchonete };
