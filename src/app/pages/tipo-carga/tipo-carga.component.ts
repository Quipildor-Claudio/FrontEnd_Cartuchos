import { Component, OnInit } from '@angular/core';
import { TipoCargaService } from 'src/app/services/tipo-carga.service';

@Component({
  selector: 'app-tipo-carga',
  templateUrl: './tipo-carga.component.html',
  styleUrls: ['./tipo-carga.component.css']
})
export class TipoCargaComponent implements OnInit {
  title:string= "Gestion de Tipos de Cargas";
  tipo_cargas: any[];

  constructor(private tipoService: TipoCargaService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(): void {
    this.tipoService.getAll().subscribe(res => this.tipo_cargas = res);
  }

  delete(item: any) {

  }


}
