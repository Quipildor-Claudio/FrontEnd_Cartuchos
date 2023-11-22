import { Component, OnInit } from '@angular/core';
import { Cartucho } from 'src/app/models/cartucho';
import { Color } from 'src/app/models/color';
import { Estado } from 'src/app/models/estado';
import { Impresora } from 'src/app/models/impresora';
import { Marca } from 'src/app/models/marca';
import { Solicitud } from 'src/app/models/solicitud';
import { TipoCarga } from 'src/app/models/tipo-carga';
import { TipoCartucho } from 'src/app/models/tipo-cartucho';
import { CartuchoService } from 'src/app/services/cartucho.service';
import { ColorService } from 'src/app/services/color.service';
import { EstadoService } from 'src/app/services/estado.service';
import { ImpresoraService } from 'src/app/services/impresora.service';
import { MarcaService } from 'src/app/services/marca.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { TipoCargaService } from 'src/app/services/tipo-carga.service';
import { TipoCartuchoService } from 'src/app/services/tipo-cartucho.service';

import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { flatMap, map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {
  title: string = "Solicitudes"
  solicitudes: any[];
  cartucho: Cartucho = new Cartucho();
  impresora: Impresora = new Impresora();
  colores: Color[] = [];
  marcas: Marca[] = [];
  solicitud: Solicitud = new Solicitud();
  tipoCartuchos: TipoCartucho[] = [];
  tipoCargas: TipoCarga[] = [];
  estados: Estado[] = [];
  cartuchos: Cartucho[] = [];

  myCartuchoControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  cartuchosFiltrados: Observable<Cartucho[]>;

  constructor(
    private solicitudService: SolicitudService,
    private cartuchoService: CartuchoService
  ) { }

  ngOnInit(): void {

    this.getData();  

    this.cartuchosFiltrados = this.myCartuchoControl.valueChanges.pipe(
      map(value => typeof value === 'string' ? value : value.modelo),
      flatMap(value => value ? this._filter(value) : [])
    );

  }
  getData(): void{
    this.solicitudService.getAll().subscribe(res=>this.solicitudes=res);
  }

  private _filter(value: string): Observable<Cartucho[]> {
    const filterValue = value.toLowerCase();
    let nombre = this.cartucho.marca.nombre;
    return this.cartuchoService.getCartuchoMarcaAndModelo(nombre, filterValue);
  }
  viewCartucho(cartucho?: Cartucho): string | undefined {
    return cartucho ? cartucho.modelo+" "+cartucho.color.nombre+" "+cartucho.tipoCartucho.descripcion: undefined;
  }

  selectedCartucho(event:MatAutocompleteSelectedEvent):void{
    this.cartucho = event.option.value as Cartucho;
    console.log(this.cartucho);
  }




  agregarCartucho(): void {
    let nombre = this.cartucho.marca.nombre;
    let modelo = this.cartucho.modelo;

    console.log(nombre);
    console.log(modelo);
    this.cartuchoService.getCartuchoMarcaAndModelo(nombre, modelo).subscribe(
      res => this.cartuchos = res
    );

    console.log(this.cartuchos);
  }

  agregarImpresora(): void {
    console.log(this.impresora);
  }

  enviarSolicitud(): void {
    const est = this.estados.filter((res) => res.descripcion == "Aprobada");
    this.solicitud.estado = est[0];

    console.log(this.solicitud);

  }

  comparar(o1: any, o2: any): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }

    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }
  delete(item: Solicitud): void {
    Swal.fire({
      title: 'Estas Seguro?',
      text: `Eliminar la solicitud número: ${item.id} `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.solicitudService.delete(item.id).subscribe(() => {
          this.solicitudes = this.solicitudes.filter(cat => cat != item);
          Swal.fire(
            'Eliminado!',
            'Su archivo ha sido eliminado',
            'success'
          )
        }
        );

      }
    })
  }


}
