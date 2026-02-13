import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockResumoTitularComponent } from './block-resumo-titular.component';

describe('BlockResumoTitularComponent', () => {
  let component: BlockResumoTitularComponent;
  let fixture: ComponentFixture<BlockResumoTitularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockResumoTitularComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockResumoTitularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
