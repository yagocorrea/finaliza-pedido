import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEscolhaTempoCarenciaComponent } from './page-escolha-tempo-carencia.component';

describe('PageEscolhaTempoCarenciaComponent', () => {
  let component: PageEscolhaTempoCarenciaComponent;
  let fixture: ComponentFixture<PageEscolhaTempoCarenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageEscolhaTempoCarenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageEscolhaTempoCarenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
