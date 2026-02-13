import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEscolhaFormaPagamentoComponent } from './page-escolha-forma-pagamento.component';

describe('PageEscolhaFormaPagamentoComponent', () => {
  let component: PageEscolhaFormaPagamentoComponent;
  let fixture: ComponentFixture<PageEscolhaFormaPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageEscolhaFormaPagamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageEscolhaFormaPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
