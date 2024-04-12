import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-computos',
  standalone: false,
  templateUrl: './pagina-computos.component.html',
  styleUrl: './pagina-computos.component.css'
})
export class PaginaComputosComponent implements OnInit{
  
  
  constructor(private router:Router){}

  ngOnInit(): void {
      
  }

  action1():void{
    this.router.navigate(['/home']);

  }

  action2():void{
    this.router.navigate(['/tickets']);

  }

}
