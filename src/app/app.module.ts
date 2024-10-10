import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http'; // Importa o HttpClientModule
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { AdicionarClientesComponent } from './clientes/adicionar-clientes/adicionar-clientes.component';
import { AppRoutingModule } from './app-routing.module';
import { ClientesModule } from './clientes/clientes.module';
import { NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask, provideNgxMask } from 'ngx-mask';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AdicionarProductsComponent } from './products/product-add/add-products.component';
import { ProductsComponent } from './products/product-list/product.component';
import { VendasComponent } from './vendas/vendas-list/vendas.component';
import { AdicionarVendasComponent } from './vendas/vendas-add/add-vendas.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core'; // Para mat-option
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    AdicionarClientesComponent,
    AdicionarProductsComponent,
    AdicionarVendasComponent,
    ProductsComponent,
    VendasComponent
    // Outros componentes...
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AppRoutingModule,
    ClientesModule,
    MatProgressSpinnerModule,
    NgxMaskDirective,
    ReactiveFormsModule,
    NgxMaskPipe,
    BrowserAnimationsModule, // Necessário para animações do Angular Material
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    HttpClientModule // Adiciona o HttpClientModule aqui
    // Outros módulos...
  ],
  providers: [provideEnvironmentNgxMask(), provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
