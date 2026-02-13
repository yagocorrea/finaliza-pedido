import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageConclusaoComponent } from './page-conclusao.component';

describe('PageConclusaoComponent', () => {
  let component: PageConclusaoComponent;
  let fixture: ComponentFixture<PageConclusaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageConclusaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageConclusaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
