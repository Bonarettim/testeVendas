import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarClientesComponent } from './adicionar-clientes.component';

describe('AdicionarClientesComponent', () => {
  let component: AdicionarClientesComponent;
  let fixture: ComponentFixture<AdicionarClientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdicionarClientesComponent]
    });
    fixture = TestBed.createComponent(AdicionarClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
