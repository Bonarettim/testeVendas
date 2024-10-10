import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getDatabase, ref, set, push, get } from 'firebase/database';
import { database } from '../../firebase-config'; // Ajuste o caminho conforme necessário
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid'; // Importa a função para gerar UUIDs
import { ViaCepService } from 'src/app/services/via-cep.service';
import { cpfValidator } from 'src/app/validators/cpf-validator'; // Importa o validador

@Component({
  selector: 'app-adicionar-clientes',
  templateUrl: './adicionar-clientes.component.html',
  styleUrls: ['./adicionar-clientes.component.scss']
})
export class AdicionarClientesComponent {
  clienteForm: FormGroup;
  isEditMode: boolean; // Indica se estamos em modo de edição
  clienteId: string = ""; // Armazena o ID do cliente a ser editado

  constructor(
    private fb: FormBuilder, 
    private viaCepService: ViaCepService, // Injete o serviço aqui
    public dialogRef: MatDialogRef<AdicionarClientesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { clienteId?: string } // Recebe o ID do cliente se estiver editando
  ) {
    this.clienteForm = this.fb.group({
      codCliente: ['', Validators.required],
      nome: ['', Validators.required],
      cpf: ['', [Validators.required,cpfValidator()]],
      email: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      logradouro: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      complemento: ['', []],
      cidade: ['', [Validators.required]],
    });

    // Se um ID de cliente for fornecido, estamos em modo de edição
    if (data?.clienteId) {
      this.clienteId = data.clienteId;
      this.isEditMode = true;
      this.loadClienteData(); // Carrega os dados do cliente
    } else {
      this.isEditMode = false; // Modo de adição
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private async loadClienteData() {
    const db = getDatabase(); // Obtém a referência do banco de dados

    try {
      const clienteRef = ref(db, `client/${this.clienteId}`); // Referência para o cliente específico
      const snapshot = await get(clienteRef);

      if (snapshot.exists()) {
        const clienteData = snapshot.val();
        this.clienteForm.patchValue(clienteData); // Preenche o formulário com os dados do cliente
      } else {
        console.error('Cliente não encontrado');
      }
    } catch (error) {
      console.error('Erro ao carregar os dados do cliente: ', error);
    }
  }

  buscarEndereco() {
    const cep = this.clienteForm.get('cep')?.value;
    if (cep && cep.length === 8) {
      this.viaCepService.buscarEndereco(cep).subscribe(data => {
        if (!data.erro) {
          this.clienteForm.patchValue({
            logradouro: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            complemento: data.complemento,
            estado: data.estado
          });
        } else {
          // Trate o caso em que o CEP não é encontrado
          console.error('CEP não encontrado.');
        }
      }, error => {
        console.error('Erro ao buscar o endereço:', error);
      });
    }
  }



  validateField(field: string) {
    return this.clienteForm.get(field)?.invalid && (this.clienteForm.get(field)?.dirty || this.clienteForm.get(field)?.touched);
  }

  async onSubmit() {
    // Marca todos os campos como tocados para exibir as mensagens de erro
    this.clienteForm.markAllAsTouched();
  
  
    if (this.clienteForm.valid) {
      const db = database; // Use a referência do banco de dados já inicializado
  
      try {
        if (this.isEditMode) {
          // Atualiza o cliente existente
          const clienteRef = ref(db, `client/${this.clienteId}`);
          await set(clienteRef, { 
            id: this.clienteId, // Mantém o ID do cliente existente
            ...this.clienteForm.value 
          });
        } else {
          // Adiciona um novo cliente
          const clienteRef = ref(db, 'client'); // Referência para a coleção de clientes
          const newClienteId = uuidv4(); // Gera um ID aleatório
          const newClienteRef = ref(db, `client/${newClienteId}`); // Cria uma nova referência usando o ID gerado
  
          // Adiciona o ID aleatório aos dados do cliente
          await set(newClienteRef, {
            id: newClienteId, // Adiciona o ID ao objeto cliente
            ...this.clienteForm.value // Adiciona os dados do formulário
          });
        }
  
        this.clienteForm.reset(); // Resetando o formulário
        this.dialogRef.close(true); // Fecha o modal após adicionar ou atualizar, retornando true
      } catch (error) {
        console.error('Erro ao adicionar ou atualizar cliente: ', error);
      }
    } else {
      console.error('Formulário inválido!');
      const invalidFields = Object.keys(this.clienteForm.controls).filter(key => this.clienteForm.controls[key].invalid);
      console.error('Campos inválidos:', invalidFields); // Exibe os campos inválidos
    }
  }
  
}
