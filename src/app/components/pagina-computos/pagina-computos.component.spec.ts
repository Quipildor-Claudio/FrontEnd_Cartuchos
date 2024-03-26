import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaComputosComponent } from './pagina-computos.component';

describe('PaginaComputosComponent', () => {
  let component: PaginaComputosComponent;
  let fixture: ComponentFixture<PaginaComputosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaComputosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginaComputosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
