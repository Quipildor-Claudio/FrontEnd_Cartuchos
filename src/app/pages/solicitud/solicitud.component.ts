import { Component, OnInit } from '@angular/core';
import { Cartucho } from 'src/app/models/cartucho';
import { Color } from 'src/app/models/color';
import { Estado } from 'src/app/models/estado';
import { Impresora } from 'src/app/models/impresora';
import { Marca } from 'src/app/models/marca';
import { Solicitud } from 'src/app/models/solicitud';
import { TipoCarga } from 'src/app/models/tipo-carga';
import { TipoCartucho } from 'src/app/models/tipo-cartucho';
import { ColorService } from 'src/app/services/color.service';
import { EstadoService } from 'src/app/services/estado.service';
import { ImpresoraService } from 'src/app/services/impresora.service';
import { MarcaService } from 'src/app/services/marca.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { TipoCargaService } from 'src/app/services/tipo-carga.service';
import { TipoCartuchoService } from 'src/app/services/tipo-cartucho.service';

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


  constructor(
    private solicitudService: SolicitudService,
    private marcaService: MarcaService,
    private impresoraService: ImpresoraService,
    private colorService: ColorService,
    private tipoService: TipoCartuchoService,
    private cargaService: TipoCargaService,
    private estadoService: EstadoService) { }

  ngOnInit(): void {
    this.getMarcas();
    this.getColores();
    this.getTipos();
    this.getCarga();
    this.getEstados();
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
    console.log(this.cartucho);
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
}
