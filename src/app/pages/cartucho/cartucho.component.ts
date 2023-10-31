import { Component, OnInit } from '@angular/core';
import { CartuchoService } from 'src/app/services/cartucho.service';

@Component({
  selector: 'app-cartucho',
  templateUrl: './cartucho.component.html',
  styleUrls: ['./cartucho.component.css']
})
export class CartuchoComponent implements OnInit {
  title:string= "Gestion de Cartuchos";
  cartuchos: any[];
  constructor(private cartuchoService:CartuchoService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(): void {
    this.cartuchoService.getAll().subscribe(res => this.cartuchos = res);
  }

  delete(item: any) {

  }

}
