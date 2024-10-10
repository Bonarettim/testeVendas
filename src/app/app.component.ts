import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdicionarClientesComponent } from './clientes/adicionar-clientes/adicionar-clientes.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AdicionarClientesComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
