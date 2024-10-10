import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../clientes.service';
import { MatDialog } from '@angular/material/dialog';
import { AdicionarClientesComponent } from '../adicionar-clientes/adicionar-clientes.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientesComponent implements OnInit {
  clientes: any[] = [];
  loading: boolean = false; // Adiciona a variável de estado

  constructor(private clientesService: ClientesService, public dialog: MatDialog) {}

  async ngOnInit() {
    await this.loadClientes();  
  }

  async loadClientes() {
    this.loading = true; // Inicia o carregamento
    try {
      this.clientes = await this.clientesService.getClientes();
      
    } catch (error) {
      console.error('Erro ao carregar clientes: ', error);
    } finally {
      this.loading = false; // Finaliza o carregamento
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AdicionarClientesComponent, {
      width: 'auto',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // Verifica se há um resultado para carregar novamente
        this.loadClientes(); // Recarrega a lista de clientes após a adição
      }
    });
  }

  editarCliente(cliente: any) {
    const dialogRef = this.dialog.open(AdicionarClientesComponent, {
      data: { clienteId: cliente.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadClientes(); // Recarrega a lista de clientes após a edição
      }
    });
  }
}
