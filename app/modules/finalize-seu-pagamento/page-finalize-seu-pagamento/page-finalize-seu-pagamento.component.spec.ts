import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageFinalizeSeuPagamentoComponent } from './page-finalize-seu-pagamento.component';



describe('PageFinalizeSeuPagamentoComponent', () => {
  let component: PageFinalizeSeuPagamentoComponent;
  let fixture: ComponentFixture<PageFinalizeSeuPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageFinalizeSeuPagamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageFinalizeSeuPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
