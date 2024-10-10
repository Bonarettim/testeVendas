import { Component, OnInit } from '@angular/core';
import { VendasService } from '../vendas.service';
import { MatDialog } from '@angular/material/dialog';
import { AdicionarVendasComponent } from '../vendas-add/add-vendas.component';

@Component({
  selector: 'app-venda',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.scss']
})
export class VendasComponent implements OnInit {
  vendas: any[] = [];
  loading: boolean = false; // Adiciona a variável de estado

  constructor(private VendasService: VendasService, public dialog: MatDialog) {}

  async ngOnInit() {
    await this.loadvendas();  
  }

  async loadvendas() {
    this.loading = true; // Inicia o carregamento
    try {
      this.vendas = await this.VendasService.getVendas();
      console.log(this.vendas)
      
    } catch (error) {
      console.error('Erro ao carregar vendas: ', error);
    } finally {
      this.loading = false; // Finaliza o carregamento
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AdicionarVendasComponent, {
      width: 'auto',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // Verifica se há um resultado para carregar novamente
        this.loadvendas(); // Recarrega a lista de vendas após a adição
      }
    });
  }

  editarvenda(venda: any) {
    const dialogRef = this.dialog.open(AdicionarVendasComponent, {
      data: { vendaId: venda.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadvendas(); // Recarrega a lista de vendas após a edição
      }
    });
  }
}
