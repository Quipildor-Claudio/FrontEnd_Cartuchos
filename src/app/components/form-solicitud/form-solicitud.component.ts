import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cartucho } from 'src/app/models/cartucho';
import { Color } from 'src/app/models/color';
import { Marca } from 'src/app/models/marca';
import { Solicitud } from 'src/app/models/solicitud';
import { TipoCarga } from 'src/app/models/tipo-carga';
import { TipoCartucho } from 'src/app/models/tipo-cartucho';
import { CartuchoService } from 'src/app/services/cartucho.service';
import { ColorService } from 'src/app/services/color.service';
import { MarcaService } from 'src/app/services/marca.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { TipoCargaService } from 'src/app/services/tipo-carga.service';
import { TipoCartuchoService } from 'src/app/services/tipo-cartucho.service';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AsyncPipe} from '@angular/common';
import Swal from 'sweetalert2';
import { Observable, flatMap, map, startWith } from 'rxjs';
import { Impresora } from 'src/app/models/impresora';
import { EstadoService } from 'src/app/services/estado.service';
import { ImpresoraService } from 'src/app/services/impresora.service';
import { Estado } from 'src/app/models/estado';
 


@Component({
  selector: 'app-form-solicitud',
  templateUrl: './form-solicitud.component.html',
  styleUrls: ['./form-solicitud.component.css'],

})

export class FormSolicitudComponent implements OnInit {
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
      private marcaService: MarcaService,
      private impresoraService: ImpresoraService,
      private colorService: ColorService,
      private tipoService: TipoCartuchoService,
      private cargaService: TipoCargaService,
      private estadoService: EstadoService,
      private cartuchoService: CartuchoService
    ) { }
  
    ngOnInit(): void {
      this.getMarcas();
      this.getColores();
      this.getTipos();
      this.getCarga();
      this.getEstados();
  
      this.cartuchosFiltrados = this.myCartuchoControl.valueChanges.pipe(
        map(value => typeof value === 'string' ? value : value.modelo),
        flatMap(value => value ? this._filter(value) : [])
      );
  
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
  
  
    getMarcas(): void {
      this.marcaService.getAll().subscribe(res => this.marcas = res);
    }
    getColores(): void {
      this.colorService.getAll().subscribe(res => this.colores = res);
    }
    getTipos(): void {
      this.tipoService.getAll().subscribe(res => this.tipoCartuchos = res);
    }
    getCarga(): void {
      this.cargaService.getAll().subscribe(res => this.tipoCargas = res);
    }
  
    getEstados(): void {
      this.estadoService.getAll().subscribe(res => this.estados = res);
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
  