import { Component, OnInit } from '@angular/core';
import { TipoCartuchoService } from 'src/app/services/tipo-cartucho.service';

@Component({
  selector: 'app-tipo-cartucho',
  templateUrl: './tipo-cartucho.component.html',
  styleUrls: ['./tipo-cartucho.component.css']
})
export class TipoCartuchoComponent implements OnInit {
  title:string= "Gestion de Tipos de Cartuchos";
  tipo_cartuchos: any[];

  constructor(private tipoCartuchoService:TipoCartuchoService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(): void {
    this.tipoCartuchoService.getAll().subscribe(res => this.tipo_cartuchos = res);
  }

  delete(item: any) {

  }
}
