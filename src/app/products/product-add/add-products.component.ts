import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getDatabase, ref, set, push, get } from 'firebase/database';
import { database } from '../../firebase-config'; // Ajuste o caminho conforme necessário
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid'; // Importa a função para gerar UUIDs
import { ViaCepService } from 'src/app/services/via-cep.service';
import { cpfValidator } from 'src/app/validators/cpf-validator'; // Importa o validador

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AdicionarProductsComponent {
  produtoForm: FormGroup;
  isEditMode: boolean; // Indica se estamos em modo de edição
  produtoId: string = ""; // Armazena o ID do produto a ser editado

  constructor(
    private fb: FormBuilder, 
    private viaCepService: ViaCepService, // Injete o serviço aqui
    public dialogRef: MatDialogRef<AdicionarProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { produtoId?: string } // Recebe o ID do produto se estiver editando
  ) {
    this.produtoForm = this.fb.group({
      nome: ['', Validators.required],
      valor: ['', [Validators.required]],
    });

    // Se um ID de produto for fornecido, estamos em modo de edição
    if (data?.produtoId) {
      this.produtoId = data.produtoId;
      this.isEditMode = true;
      this.loadProdutoData(); // Carrega os dados do produto
    } else {
      this.isEditMode = false; // Modo de adição
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private async loadProdutoData() {
    const db = getDatabase(); // Obtém a referência do banco de dados

    try {
      const produtoRef = ref(db, `product/${this.produtoId}`); // Referência para o produto específico
      const snapshot = await get(produtoRef);

      if (snapshot.exists()) {
        const produtoData = snapshot.val();
        this.produtoForm.patchValue(produtoData); // Preenche o formulário com os dados do produto
      } else {
        console.error('Produto não encontrado');
      }
    } catch (error) {
      console.error('Erro ao carregar os dados do produto: ', error);
    }
  }


  validateField(field: string) {
    return this.produtoForm.get(field)?.invalid && (this.produtoForm.get(field)?.dirty || this.produtoForm.get(field)?.touched);
  }

  async onSubmit() {
    // Marca todos os campos como tocados para exibir as mensagens de erro
    this.produtoForm.markAllAsTouched();
  
    if (this.produtoForm.valid) {
      const db = database; // Use a referência do banco de dados já inicializado
  
      try {
        if (this.isEditMode) {
          // Atualiza o produto existente
          const produtoRef = ref(db, `product/${this.produtoId}`);
          await set(produtoRef, { 
            id: this.produtoId, // Mantém o ID do produto existente
            ...this.produtoForm.value 
          });
        } else {
          // Adiciona um novo produto
          const produtoRef = ref(db, 'product'); // Referência para a coleção de produtos
          const newProdutoId = uuidv4(); // Gera um ID aleatório
          const newProdutoRef = ref(db, `product/${newProdutoId}`); // Cria uma nova referência usando o ID gerado
  
          // Adiciona o ID aleatório aos dados do produto
          await set(newProdutoRef, {
            id: newProdutoId, // Adiciona o ID ao objeto produto
            ...this.produtoForm.value // Adiciona os dados do formulário
          });
        }
  
        this.produtoForm.reset(); // Resetando o formulário
        this.dialogRef.close(true); // Fecha o modal após adicionar ou atualizar, retornando true
      } catch (error) {
        console.error('Erro ao adicionar ou atualizar produto: ', error);
      }
    } else {
      console.error('Formulário inválido!');
      const invalidFields = Object.keys(this.produtoForm.controls).filter(key => this.produtoForm.controls[key].invalid);
      console.error('Campos inválidos:', invalidFields); // Exibe os campos inválidos
    }
  }
  
}
