import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


import { ProductsComponent } from './product-list/product.component'; // Ajuste o caminho conforme necessário

@NgModule({
  declarations: [
    ProductsComponent, // Declare o componente aqui
    // Outros componentes relacionados, se houver
  ],
  imports: [
    CommonModule, // Importante para usar *ngFor e outras diretivas comuns
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  exports: [
    ProductsComponent // Se você precisar usar esse componente em outros módulos
  ]
})
export class ClientesModule { }
