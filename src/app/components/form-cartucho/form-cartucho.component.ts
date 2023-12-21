import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cartucho } from 'src/app/models/cartucho';
import { Color } from 'src/app/models/color';
import { Marca } from 'src/app/models/marca';
import { TipoCarga } from 'src/app/models/tipo-carga';
import { TipoCartucho } from 'src/app/models/tipo-cartucho';
import { CartuchoService } from 'src/app/services/cartucho.service';
import { ColorService } from 'src/app/services/color.service';
import { MarcaService } from 'src/app/services/marca.service';
import { TipoCargaService } from 'src/app/services/tipo-carga.service';
import { TipoCartuchoService } from 'src/app/services/tipo-cartucho.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-cartucho',
  templateUrl: './form-cartucho.component.html',
  styleUrls: ['./form-cartucho.component.css']
})

export class FormCartuchoComponent implements OnInit {
  titulo: string = "Formulario";
  cartucho:Cartucho= new Cartucho();
  colores:Color[]=[];
  marcas:Marca[]=[];
  tipoCartuchos:TipoCartucho[]=[];


  constructor(
    private cartuchoService:CartuchoService,
    private colorService:ColorService,
    private marcaService:MarcaService,
    private tipoService:TipoCartuchoService,
    private route: Router,
    public activateRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cargar();
    this.getMarcas();
    this.getColores();
    this.getTipos();
  }

  cargar(): void {
    this.activateRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.cartuchoService.getOne(id).subscribe(res=> this.cartucho= res);
      }
    }
    );
  }

  getMarcas(): void {
    this.marcaService.getAll().subscribe(res => this.marcas = res);
  }
  getColores(): void {
    this.colorService.getAll().subscribe(res => this.colores = res);
  }
  getTipos(): void {
    this.tipoService.getAll().subscribe(res => this.tipoCartuchos = res);
  }




  create():void {
    console.log(this.cartucho);
    this.cartuchoService.add(this.cartucho).subscribe(res => {
      Swal.fire(
        'Exito',
        `Categoria ${res.modelo}  Creada!`,
        'success'
      )
      this.route.navigate(['/cartuchos']);
    });

  };
  update(): void {
    console.log(this.cartucho);
    this.cartuchoService.update(this.cartucho,this.cartucho.id).subscribe(() => {
      Swal.fire(
        'Exito',
        `${this.cartucho.modelo}  Actualizada!`,
        'success'
      )

      this.route.navigate(['/cartuchos']);
    }
    );
  };




  comparar(o1: any, o2: any): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }

    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }

  Volver (): void {
    Swal.fire({
      title: 'Estas seguro de salir del formulario ?',
      text: `Se perderan todos los datos del formulario`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.route.navigate(['/cartuchos']);
      }});}
  }



