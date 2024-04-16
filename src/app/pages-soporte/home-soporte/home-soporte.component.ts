import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-soporte',
  standalone: false,
  templateUrl: './home-soporte.component.html',
  styleUrl: './home-soporte.component.css'
})
export class HomeSoporteComponent {
  title:string="Bienvenido al sistema de soporte hospital pablo soria.";

  constructor(private router:Router){}


  redit():void{
    this.router.navigateByUrl('');
  }

  redit2():void{
    this.router.navigateByUrl('soportes');

  }

}
