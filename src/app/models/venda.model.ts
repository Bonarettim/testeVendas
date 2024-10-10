import { Cliente } from './cliente.model';
import { Produto } from './produto.model'; 

// Modelo para os itens de venda (relacionando produtos)
export class ItemVenda {
  constructor(
    public produto: Produto,
    public quantidade: number
  ) {}
}

// Modelo da Venda
export class Venda {
  constructor(
    public id: string,
    public idCliente: string,
    public dataHora: Date,
    public cliente: Cliente,
    public itens: ItemVenda[],
    public total: number
  ) {}
}
