import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Estado } from 'src/app/models/estado';
import { Solicitud } from 'src/app/models/solicitud';
import { EstadoService } from 'src/app/services/estado.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import Swal from 'sweetalert2';

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
  getDataReset(){
    this.solicitudes = [];
  }

  getData() {
    this.solicitudService.getAll().subscribe(res => {
      this.solicitudes = res
      console.log(this.solicitudes);
    });
  }

  /*irALink(): void {
    window.location.href = 'http://localhost:8086/solicitudes/export-pdf';
  }*/

  buscar(): void {
    if (this.validarFechas()) {
    if(this.rangoFechas.fechaFinal&&this.rangoFechas.fechaFinal){
      this.solicitudService.getBuscarFecha(this.rangoFechas.fechaInicio, this.rangoFechas.fechaFinal).subscribe(res => this.solicitudes = res);
    }}
    else{
      Swal.fire({
        title: 'Fechas Invalidas',
        text: `Error al ingresar las fechas de busqueda`,
        icon: 'error',
      })
      
    }
  }

  getCurrentDate(): Date {
    return new Date();
  }

  getEstados(): void {
    this.estadoService.getAll().subscribe(res => this.estados = res);
  }

  onEstadoChange(event: any) {
    if (event) {
      this.resetearfechas();      
      this.filterId='';
      this.filterText='';
      this.solicitudService.getBusquedaEstado(event).subscribe(res => {
        this.solicitudes = res
      });
    }
  }

  resetearBusqueda(){
    this.filterId='';
    this.getEstados();
    this.resetearfechas();
  }

  resetearAll(){
    this.filterId='';
    this.getEstados();
    this.filterText = '';
    this.resetearfechas();
    this.getDataReset();
  }

  searchId(id: any) {
    console.log(id);
    this.resetearfechas();
    this.filterText = '';
    this.getEstados();
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

  PDF() {
  
    const DATA = document.getElementById('tabla');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}informe.pdf`);
     
    });
  }

  validarFechas() {
    if (new Date(this.rangoFechas.fechaInicio) > new Date(this.rangoFechas.fechaFinal)) {
      return false;
    }

    const fechaActual = new Date();
    if (new Date(this.rangoFechas.fechaFinal) > fechaActual) {
      return false;
    }

    const fechaMinima = new Date('2024-01-01');
    if (new Date(this.rangoFechas.fechaInicio) < fechaMinima) {
      console.log('La fecha de inicio debe ser mayor o igual a 01/01/2024');
      return false;
    }   
    return true;
  }

  resetearfechas(){
    this.rangoFechas.fechaFinal=new Date();
    this.rangoFechas.fechaInicio=new Date();
  }

}
