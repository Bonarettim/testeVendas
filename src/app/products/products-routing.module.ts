import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarClientesComponent } from './listar-clientes/listar-clientes.component';
import { AdicionarClientesComponent } from './adicionar-clientes/adicionar-clientes.component';

const routes: Routes = [
  { path: '', component: ListarClientesComponent }, // Rota para listar clientes
  { path: 'adicionar', component: AdicionarClientesComponent } // Rota para adicionar clientes
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
