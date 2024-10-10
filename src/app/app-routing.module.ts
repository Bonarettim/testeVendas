import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdicionarClientesComponent } from './clientes/adicionar-clientes/adicionar-clientes.component'; // Certifique-se de que o caminho está correto
import { ClientesComponent } from './clientes/clients-list/clients.component';
import { ProductsComponent } from './products/product-list/product.component';
import { VendasComponent } from './vendas/vendas-list/vendas.component';


const routes: Routes = [
  { path: '', redirectTo: '/clientes', pathMatch: 'full' }, // Redireciona para '/clientes' se a rota estiver vazia
  { path: 'clientes', component: ClientesComponent },// Rota para o módulo de clientes
  { path: 'produtos', component:  ProductsComponent},// Rota para o módulo de produtos
  { path: 'vendas', component:  VendasComponent},// Rota para o módulo de vendas
  { path: '**', redirectTo: '/clientes' } // Redireciona qualquer rota não encontrada para '/clientes'
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
