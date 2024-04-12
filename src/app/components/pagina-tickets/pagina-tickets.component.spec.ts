import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaTicketsComponent } from './pagina-tickets.component';

describe('PaginaTicketsComponent', () => {
  let component: PaginaTicketsComponent;
  let fixture: ComponentFixture<PaginaTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaTicketsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginaTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
