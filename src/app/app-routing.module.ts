import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdicionarClientesComponent } from './clientes/adicionar-clientes/adicionar-clientes.component'; // Certifique-se de que o caminho está correto
import { ClientesComponent } from './clientes/clients-list/clients.component';
import { ProductsComponent } from './products/product-list/product.component';
import { VendasComponent } from './vendas/vendas-list/vendas.component';


const routes: Routes = [
  { path: 'clientes', component: ClientesComponent },// Rota para o módulo de clientes
  { path: 'produtos', component:  ProductsComponent},// Rota para o módulo de clientes
  { path: 'vendas', component:  VendasComponent},// Rota para o módulo de clientes
  { path: 'adicionar-clientes', component: AdicionarClientesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
