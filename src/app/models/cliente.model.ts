// Definindo a estrutura do endereço como uma classe separada
export class Endereco {
    constructor(
      public cep: string,
      public logradouro: string,
      public numero: string,
      public bairro: string,
      public complemento: string,
      public cidade: string
    ) {}
  }
  
  // Definindo o modelo do Cliente
  export class Cliente {
    constructor(
      public codCliente: string,
      public id: string,
      public nome: string,
      public cpf: string,
      public endereco: Endereco,
      public email: string,
      public dataNascimento: Date
    ) {}
  }
  