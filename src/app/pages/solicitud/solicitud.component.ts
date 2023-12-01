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
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';


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
  impresoras: Impresora[] = [];
  tipoCarga: TipoCarga = new TipoCarga();
  user: User = new User();

  myCartuchoControl = new FormControl();
  myImpresoraControl = new FormControl();

  cartuchosFiltrados: Observable<Cartucho[]>;
  impresorasFiltrados: Observable<Impresora[]>;


  constructor(
    private solicitudService: SolicitudService,
    private marcaService: MarcaService,
    private impresoraService: ImpresoraService,
    private colorService: ColorService,
    private tipoService: TipoCartuchoService,
    private cargaService: TipoCargaService,
    private estadoService: EstadoService,
    private cartuchoService: CartuchoService,
    private userService: UserService,
    private route: Router,
    public activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getMarcas();
    this.getColores();
    this.getTipos();
    this.getCarga();
    this.getEstados();
    this.getUsuario();
    this.cartuchosFiltrados = this.myCartuchoControl.valueChanges.pipe(
      map(value => typeof value === 'string' ? value : value.modelo),
      flatMap(value => value ? this._filter(value) : [])
    );

    this.impresorasFiltrados = this.myImpresoraControl.valueChanges.pipe(
      map(value => typeof value === 'string' ? value : value.modelo),
      flatMap(value => value ? this._filterr(value) : [])
    );
  }

  private _filter(value: string): Observable<Cartucho[]> {
    const filterValue = value.toLowerCase();
    let nombre = this.cartucho.marca.nombre;
    return this.cartuchoService.getCartuchoMarcaAndModelo(nombre, filterValue);
  }
  viewCartucho(cartucho?: Cartucho): string | undefined {
    return cartucho ? cartucho.modelo + " " + cartucho.color.nombre + " " + cartucho.tipoCartucho.descripcion : undefined;
  }

  selectedCartucho(event: MatAutocompleteSelectedEvent): void {
    this.cartucho = event.option.value as Cartucho;
    console.log(this.cartucho);
  }

  private _filterr(value: string): Observable<Impresora[]> {
    const filterValuee = value.toLowerCase();
    let nombree = this.impresora.marca.nombre;
    return this.impresoraService.getImpresoraMarcaAndModelo(nombree, filterValuee);
  }
  viewImpresora(impresora?: Impresora): string | undefined {
    return impresora ? impresora.modelo + " " + impresora.tipoImpresora.descripcion : undefined;
  }

  selectedImpresora(event: MatAutocompleteSelectedEvent): void {
    this.impresora = event.option.value as Impresora;
    console.log(this.impresora);
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

  getUsuario(): void{
       this.userService.getOne(4).subscribe(res=>this.user=res);
  }

  enviarSolicitud(): void {

    this.solicitud.usuario=this.user;

    this.solicitud.cartuchos.push(this.cartucho);
    this.solicitud.impresoras.push(this.impresora);
    const est = this.estados.filter((res) => res.descripcion == "SOLICITADA");
    this.solicitud.estado = est[0];

    console.log(this.solicitud);

     this.solicitudService.add(this.solicitud).subscribe(res => {
      Swal.fire(
        'Exito',
        `Categoria ${res.id}  Creada!`,
        'success'
      )
      this.route.navigate(['/home']);
    });  


  }

  comparar(o1: any, o2: any): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }

    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }

}
