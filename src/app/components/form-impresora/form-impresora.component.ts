import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cartucho } from 'src/app/models/cartucho';
import { Impresora } from 'src/app/models/impresora';
import { Marca } from 'src/app/models/marca';
import { TipoImpresora } from 'src/app/models/tipo-impresora';
import { CartuchoService } from 'src/app/services/cartucho.service';
import { ImpresoraService } from 'src/app/services/impresora.service';
import { MarcaService } from 'src/app/services/marca.service';
import { TipoImpresoraService } from 'src/app/services/tipo-impresora.service';
import { flatMap, map, startWith } from 'rxjs/operators';

import Swal from 'sweetalert2';

Cartucho
@Component({
  selector: 'app-form-impresora',
  templateUrl: './form-impresora.component.html',
  styleUrls: ['./form-impresora.component.css']
})
export class FormImpresoraComponent implements OnInit {
  titulo: string = "Formulario";
  impresora: Impresora = new Impresora();
  marcas: Marca[] = [];
  tipoImpresoras: TipoImpresora[] = [];
  cartucho: Cartucho = new Cartucho();
  myCartuchoControl = new FormControl();
  cartuchosFiltrados: Observable<Cartucho[]>;

  constructor(private impresoraService: ImpresoraService,
    private activatedRoute: ActivatedRoute,
    private marcaService: MarcaService,
    private tipoImpresoraService: TipoImpresoraService,
    private cartuchoService: CartuchoService,
    private route: Router

  ) { }

  ngOnInit(): void {
    this.getData();

    this.cartuchosFiltrados = this.myCartuchoControl.valueChanges.pipe(
      map(value => typeof value === 'string' ? value : value.modelo),
      flatMap(value => value ? this._filter(value) : [])
    );

    this.getMarcas();
    this.getTipos();


  }
  getData(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      if (id) {
        this.impresoraService.getOne(id).subscribe((res) => this.impresora = res);
      }
    });
  }

  private _filter(value: string): Observable<Cartucho[]> {
    const filterValue = value.toLowerCase();
    return this.cartuchoService.getCartuchoModelo(filterValue);
  }
  viewCartucho(cartucho?: Cartucho): string | undefined {
    return cartucho ? cartucho.modelo + " " + cartucho.color.nombre + " " + cartucho.tipoCartucho.descripcion : undefined;
  }

  selectedCartucho(event: MatAutocompleteSelectedEvent): void {
    this.cartucho = event.option.value as Cartucho;
    this.impresora.cartuchos.push(this.cartucho);
    console.log(this.cartucho);
  }
  getMarcas(): void {
    this.marcaService.getAll().subscribe(res => this.marcas = res);
  }
  getTipos(): void {
    this.tipoImpresoraService.getAll().subscribe(res => this.tipoImpresoras = res);
  }

  create(): void {
    console.log(this.impresora);
    this.impresoraService.add(this.impresora).subscribe(
      res => {
        Swal.fire(
          'Exito',
          `Categoria ${res.modelo}  Creada!`,
          'success'
        )
        this.route.navigate(['/impresoras']);
      }
    )
  }

  update(): void {
    console.log(this.impresora);
    this.impresoraService.update(this.impresora, this.impresora.id).subscribe(
      res => {
        Swal.fire(
          'Exito',
          `Categoria ${res.modelo}  Actulizada!`,
          'success'
        )
        this.route.navigate(['/impresoras']);
      }
    )

  }

  cDelete(cSol: Cartucho): void {
    this.impresora.cartuchos = this.impresora.cartuchos.filter(res => res != cSol);
  }

  comparar(o1: any, o2: any): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }

}
