import { Component, OnInit } from '@angular/core';
import { TipoImpresoraService } from 'src/app/services/tipo-impresora.service';

@Component({
  selector: 'app-tipo-impresora',
  templateUrl: './tipo-impresora.component.html',
  styleUrls: ['./tipo-impresora.component.css']
})
export class TipoImpresoraComponent implements OnInit {
  title:string= "Gestion de Tipos de Impresora";
  tipo_impresoras: any[];

  constructor(private tipoImpresoraService:TipoImpresoraService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(): void {
    this.tipoImpresoraService.getAll().subscribe(res => this.tipo_impresoras = res);
  }

  delete(item: any):void{

  }


}
