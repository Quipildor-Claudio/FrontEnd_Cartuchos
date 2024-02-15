import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import { event } from 'jquery';
import jsPDF from 'jspdf';
import { AuthService } from 'src/app/auth/auth.service';
import { Estado } from 'src/app/models/estado';
import { Solicitud } from 'src/app/models/solicitud';
import { User } from 'src/app/models/user';
import { EstadoService } from 'src/app/services/estado.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { UserService } from 'src/app/services/user.service';
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
  mostrarInformeDatos: boolean = false;
  user: User = new User();
  rangoFechas = {
    fechaInicio: null,
    fechaFinal: null,
  };

  constructor(private solicitudService: SolicitudService,
    private estadoService: EstadoService,
    private authService: AuthService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.getEstados();
    this.getUser();
  }
  getDataReset() {
    this.solicitudes = [];
  }


  getData() {
    this.solicitudService.getAll().subscribe(res => {
      this.solicitudes = res
      console.log(this.solicitudes);
    });
  }
  getUser() {
    this.userService.getUserbyName(this.authService.getUserSession().username).subscribe(res => this.user = res);
  }

  /*irALink(): void {
    window.location.href = 'http://localhost:8086/solicitudes/export-pdf';
  }*/

  buscar(): void {

    if (this.user.roles[0].descripcion == "JEFE DE SERVICIO") {
      if (this.validarFechas()) {
        if (this.rangoFechas.fechaFinal && this.rangoFechas.fechaFinal) {
          this.solicitudService.getBuscarFechaAndServico(this.rangoFechas.fechaInicio, this.rangoFechas.fechaFinal, this.user.persona.servicio.nombre).subscribe(res => this.solicitudes = res);
        }
      } else {
        Swal.fire({
          title: 'Fechas Invalidas',
          text: `Error al ingresar las fechas de busqueda`,
          icon: 'error',
        })
      }
    }
    else {
      if (this.validarFechas()) {
        if (this.rangoFechas.fechaFinal && this.rangoFechas.fechaFinal) {
          this.solicitudService.getBuscarFecha(this.rangoFechas.fechaInicio, this.rangoFechas.fechaFinal).subscribe(res => this.solicitudes = res);
        }
      }
      else {
        Swal.fire({
          title: 'Fechas Invalidas',
          text: `Error al ingresar las fechas de busqueda`,
          icon: 'error',
        })
      }
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
      this.filterId = '';
      this.filterText = '';

      if (this.user.roles[0].descripcion == "JEFE DE SERVICIO") {
        this.solicitudService.getBusquedaEstadoAndServicio(event, this.user.persona.servicio.nombre).subscribe(res => this.solicitudes = res);
      } else {
        this.solicitudService.getBusquedaEstado(event).subscribe(res => {
          this.solicitudes = res
        });
      }

    }
  }

  resetearBusqueda() {
    this.filterId = '';
    this.getEstados();
  }

  resetearAll() {
    this.filterId = '';
    this.getEstados();
    this.filterText = '';
    this.resetearfechas();
    this.getDataReset();
  }

  searchId(id: any) {
    console.log(id);
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
    this.mostrarInformeDatos = true;
    setTimeout(() => {
      const DATA = document.getElementById('tabla');
      const doc = new jsPDF('p', 'pt', 'a4');
      const options = {
        background: 'white',
        scale: 3
      }

      html2canvas(DATA, options).then((canvas) => {
        const img = canvas.toDataURL('image/PNG');

        const bufferX = 15;
        const bufferY = 15;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
        setTimeout(() => {
          doc.save(`${new Date().toISOString()}informe.pdf`);
          window.close();
        }, 5);

        this.mostrarInformeDatos = false;
      }
      );
    }, 20);
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

  resetearfechas() {
    this.rangoFechas.fechaFinal = new Date();
    this.rangoFechas.fechaInicio = new Date();
  }



  formatoFecha(fecha: string) {
    if (fecha != null) {
      const partesFecha = fecha.split('-');
      const [año, mes, dia] = partesFecha;
      return `${dia.padStart(2, '0')}/${mes.padStart(2, '0')}/${año}`;
    }
    else {
      return fecha = '';
    }
  }
}
