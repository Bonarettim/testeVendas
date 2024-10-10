import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getDatabase, ref, set, push, get } from 'firebase/database';
import { database } from '../../firebase-config'; // Ajuste o caminho conforme necessário
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid'; // Importa a função para gerar UUIDs
import { ViaCepService } from 'src/app/services/via-cep.service';
import { cpfValidator } from 'src/app/validators/cpf-validator'; // Importa o validador
import { Venda } from '../../models/venda.model'; // Ajuste o caminho conforme necessário

@Component({
  selector: 'app-add-vendas',
  templateUrl: './add-vendas.component.html',
  styleUrls: ['./add-vendas.component.scss']
})
export class AdicionarVendasComponent {
  vendaForm: FormGroup;
  isEditMode: boolean; // Indica se estamos em modo de edição
  vendaId: string = ""; // Armazena o ID do venda a ser editado
  clientes: any[] = [];  // Array para armazenar a lista de clientes
  produtos: any[] = [];  // Array para armazenar a lista de produtos
  quantidade: number = 0; // Inicializa a quantidade
  isTotalValorDisabled = true; 

  constructor(
    private fb: FormBuilder, 
    private viaCepService: ViaCepService, // Injete o serviço aqui
    public dialogRef: MatDialogRef<AdicionarVendasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vendaId?: string } // Recebe o ID do venda se estiver editando
  ) {
    this.vendaForm = this.fb.group({
      idCliente: ['', Validators.required],
      idProduto: ['', Validators.required],
      dataHora: ['', Validators.required],
      nomeCliente: [''],
      nomeProduto: [''],
      totalValor: ['', []],
    });
    this.loadClientes();
    this.loadPrdutos();

        // Adiciona listeners para atualizar nomeCliente e nomeProduto
        this.vendaForm.get('idCliente')?.valueChanges.subscribe(idCliente => {
          this.atualizarNomeCliente(idCliente);
        });
    
        this.vendaForm.get('idProduto')?.valueChanges.subscribe(idProduto => {
          this.atualizarNomeProduto(idProduto);
          this.atualizarValorTotal(); // Atualiza o valor total ao selecionar o produto
        });

    // Se um ID de venda for fornecido, estamos em modo de edição
    if (data?.vendaId) {
      this.vendaId = data.vendaId;
      this.isEditMode = true;
      this.loadVendaData(); // Carrega os dados do venda
    } else {
      this.isEditMode = false; // Modo de adição
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private async loadVendaData() {
    const db = getDatabase(); // Obtém a referência do banco de dados

    try {
      const vendaRef = ref(db, `venda/${this.vendaId}`); // Referência para o venda específico
      const snapshot = await get(vendaRef);

      if (snapshot.exists()) {
        const vendaData = snapshot.val();
        this.vendaForm.patchValue(vendaData); // Preenche o formulário com os dados do venda
        this.quantidade = vendaData.quantidade || 0; // Atualiza a quantidade se existir
      } else {
        console.error('Venda não encontrado');
      }
    } catch (error) {
      console.error('Erro ao carregar os dados do venda: ', error);
    }
  }

  validateField(field: string) {
    return this.vendaForm.get(field)?.invalid && (this.vendaForm.get(field)?.dirty || this.vendaForm.get(field)?.touched);
  }

  private async loadClientes() {
    const db = getDatabase();
    const clientesRef = ref(db, 'client');  // Referência para a tabela de clientes

    try {
      const snapshot = await get(clientesRef);
      if (snapshot.exists()) {
        this.clientes = Object.values(snapshot.val());  // Pega todos os clientes
      } else {
        console.error('Nenhum cliente encontrado');
      }
    } catch (error) {
      console.error('Erro ao carregar os clientes: ', error);
    }
  }
  

  private async loadPrdutos() {
    const db = getDatabase();
    const produtosRef = ref(db, 'product');  // Referência para a tabela de produtos

    try {
      const snapshot = await get(produtosRef);
      if (snapshot.exists()) {
        this.produtos = Object.values(snapshot.val());  // Pega todos os produtos
      } else {
        console.error('Nenhum produto encontrado');
      }
    } catch (error) {
      console.error('Erro ao carregar os produtos: ', error);
    }
  }

  atualizarValorTotal() {
    const idProdutoSelecionado = this.vendaForm.get('idProduto')?.value;
    
    // Encontrar o produto correspondente ao ID selecionado
    const produtoSelecionado = this.produtos.find(produto => produto.id === idProdutoSelecionado);
    
    // Se o produto foi encontrado, atualize o campo totalValor
    if (produtoSelecionado) {
      this.vendaForm.patchValue({
        totalValor: produtoSelecionado.valor // Supondo que o produto tenha uma propriedade 'preco'
      });
    }
  }
  

  private atualizarNomeCliente(idCliente: string) {
    const clienteSelecionado = this.clientes.find(cliente => cliente.id === idCliente);
    if (clienteSelecionado) {
      this.vendaForm.patchValue({
        nomeCliente: clienteSelecionado.nome // Supondo que o cliente tenha uma propriedade 'nome'
      });
    } else {
      this.vendaForm.patchValue({
        nomeCliente: '' // Limpa o nome se o cliente não for encontrado
      });
    }
  }

  private atualizarNomeProduto(idProduto: string) {
    const produtoSelecionado = this.produtos.find(produto => produto.id === idProduto);
    if (produtoSelecionado) {
      this.vendaForm.patchValue({
        nomeProduto: produtoSelecionado.nome // Supondo que o produto tenha uma propriedade 'nome'
      });
    } else {
      this.vendaForm.patchValue({
        nomeProduto: '' // Limpa o nome se o produto não for encontrado
      });
    }
  }



  async onSubmit() {
    // Marca todos os campos como tocados para exibir as mensagens de erro
    this.vendaForm.markAllAsTouched();

    if (this.vendaForm.valid) {
        const db = database; // Use a referência do banco de dados já inicializado

        // Cria um objeto venda a partir dos valores do formulário
        const venda: Venda = {
            id: this.isEditMode ? this.vendaId : uuidv4(), // Gera um novo ID se não estiver em modo de edição
            ...this.vendaForm.value, // Desestrutura os valores do formulário
            quantidade: this.quantidade, // Adiciona a quantidade
            clienteId: this.vendaForm.get('idCliente')?.value, // Obtém o ID do cliente
            produtoId: this.vendaForm.get('idProduto')?.value, // Obtém o ID do produto
        };

        try {
            if (this.isEditMode) {
                // Atualiza a venda existente
                const vendaRef = ref(db, `venda/${this.vendaId}`);
                await set(vendaRef, venda); // Atualiza os dados da venda
            } else {
                // Adiciona uma nova venda
                const newVendaRef = ref(db, `venda/${venda.id}`); // Cria uma nova referência usando o ID gerado
                await set(newVendaRef, venda); // Armazena a venda no Firebase
            }

            this.vendaForm.reset(); // Resetando o formulário
            this.quantidade = 0; // Reseta a quantidade
            this.dialogRef.close(true); // Fecha o modal após adicionar ou atualizar, retornando true
        } catch (error) {
            console.error('Erro ao adicionar ou atualizar venda: ', error);
        }
    } else {
        console.error('Formulário inválido!');
        const invalidFields = Object.keys(this.vendaForm.controls).filter(key => this.vendaForm.controls[key].invalid);
        console.error('Campos inválidos:', invalidFields); // Exibe os campos inválidos
    }
}


}
