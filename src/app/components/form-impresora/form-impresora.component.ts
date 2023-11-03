import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Impresora } from 'src/app/models/impresora';
import { Marca } from 'src/app/models/marca';
import { TipoImpresora } from 'src/app/models/tipo-impresora';
import { ImpresoraService } from 'src/app/services/impresora.service';
import { MarcaService } from 'src/app/services/marca.service';
import { TipoImpresoraService } from 'src/app/services/tipo-impresora.service';

@Component({
  selector: 'app-form-impresora',
  templateUrl: './form-impresora.component.html',
  styleUrls: ['./form-impresora.component.css']
})
export class FormImpresoraComponent implements OnInit {
   titulo:string= "Formulario";
   impresora:Impresora =  new Impresora(); 
   marcas:Marca[]=[];
   tipoImpresoras:TipoImpresora[]=[];
  constructor(private impresoraService:ImpresoraService,
     private router:Router,
     private activatedRoute:ActivatedRoute,
     private marcaService:MarcaService,
     private tipoImpresoraService:TipoImpresoraService
     
     ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      if (id) {
        this.impresoraService.getOne(id).subscribe((res) => this.impresora = res);
      }
    });

    this.getMarcas();
    this.getTipos();


  }

  getMarcas():void{
      this.marcaService.getAll().subscribe(res=>this.marcas=res);
  }
  getTipos():void{
    this.tipoImpresoraService.getAll().subscribe(res=>this.tipoImpresoras=res);
  }

  create():void{
      console.log(this.impresora);
  }

  update():void{

  }



}
