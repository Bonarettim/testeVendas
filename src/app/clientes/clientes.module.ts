import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ListarClientesComponent } from './listar-clientes/listar-clientes.component';
import { AdicionarClientesComponent } from './adicionar-clientes/adicionar-clientes.component';

@NgModule({
  declarations: [
    ListarClientesComponent,
    AdicionarClientesComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule
  ]
})
export class ClientesModule { }
