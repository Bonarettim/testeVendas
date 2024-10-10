import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { MatDialog } from '@angular/material/dialog';
import { AdicionarProductsComponent } from '../product-add/add-products.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductsComponent implements OnInit {
  produtos: any[] = [];
  loading: boolean = false; // Adiciona a variável de estado

  constructor(private ProductsService: ProductsService, public dialog: MatDialog) {}

  async ngOnInit() {
    await this.loadprodutos();  
  }

  async loadprodutos() {
    this.loading = true; // Inicia o carregamento
    try {
      this.produtos = await this.ProductsService.getProducts();
      console.log(this.produtos)
      
    } catch (error) {
      console.error('Erro ao carregar produtos: ', error);
    } finally {
      this.loading = false; // Finaliza o carregamento
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AdicionarProductsComponent, {
      width: 'auto',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // Verifica se há um resultado para carregar novamente
        this.loadprodutos(); // Recarrega a lista de produtos após a adição
      }
    });
  }

  editarproduto(produto: any) {
    const dialogRef = this.dialog.open(AdicionarProductsComponent, {
      data: { produtoId: produto.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadprodutos(); // Recarrega a lista de produtos após a edição
      }
    });
  }
}
