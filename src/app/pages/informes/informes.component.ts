import { Component, OnInit } from '@angular/core';
import { Estado } from 'src/app/models/estado';
import { Solicitud } from 'src/app/models/solicitud';
import { EstadoService } from 'src/app/services/estado.service';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {
  title: string = "Informes";
  solicitudes: Solicitud[] = [];
  estados: Estado[] = [];
  estado: any;
  filteredSol: Solicitud[] = [];
  filterText: any;
  filterId: any;


  rangoFechas = {
    fechaInicio: null,
    fechaFinal: null,
  };

  constructor(private solicitudService: SolicitudService, private estadoService: EstadoService) { }

  ngOnInit(): void {
    this.getEstados();
  }

  getData() {
    this.solicitudService.getAll().subscribe(res => {
      this.solicitudes = res
      console.log(this.solicitudes);
    });
  }

  irALink(): void {
    window.location.href = 'http://localhost:8080/solicitudes/export-pdf';
  }

  buscar(): void {
     
    if(this.rangoFechas.fechaFinal&&this.rangoFechas.fechaFinal){
      this.solicitudService.getBuscarFecha(this.rangoFechas.fechaInicio, this.rangoFechas.fechaFinal).subscribe(res => this.solicitudes = res);
    }

  }
  getEstados(): void {
    this.estadoService.getAll().subscribe(res => this.estados = res);
  }

  onEstadoChange(event: any) {
    if (event) {
      this.solicitudService.getBusquedaEstado(event).subscribe(res => {
        this.solicitudes = res
      });
    }

  }

  searchId(id: any) {
    console.log(id);
    if (id !== '') {
      this.solicitudService.getOne(id).subscribe(res => {
        this.solicitudes = [];
        this.solicitudes.push(res);
      }
      );
    } else {
      this.getData();
    }

  }

  comparar(o1: any, o2: any): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }

}
