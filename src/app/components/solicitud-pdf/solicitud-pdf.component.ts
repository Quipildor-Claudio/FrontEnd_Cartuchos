import { Component, OnInit } from '@angular/core';
import { Solicitud } from 'src/app/models/solicitud';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';
import * as printJS from 'print-js';
import { style } from '@angular/animations';
import { fontStyle } from 'html2canvas/dist/types/css/property-descriptors/font-style';

@Component({
  selector: 'app-solicitud-pdf',
  templateUrl: './solicitud-pdf.component.html',
  styleUrl: './solicitud-pdf.component.css'
})
export class SolicitudPdfComponent implements OnInit {
  
  title:string=" Solicitud";
  solicitud:Solicitud = new Solicitud();

  constructor(
    private solicitudService:SolicitudService,
    private route: Router,
    public activateRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.cargar();
    // this.PDFAfterDelay();
  }

  formatoFecha(fecha: string) {
    const partesFecha = fecha.split('-');
    const [año, mes, dia] = partesFecha;
    return `${dia.padStart(2, '0')}/${mes.padStart(2, '0')}/${año}`;
  }
  
  cargar(): void {
    this.activateRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.solicitudService.getOne(id).subscribe(res=>this.solicitud=res);
        console.log(this.solicitud);
      }
    }
    );
  } 
  Volver (): void {
    Swal.fire({
      title: 'Estas seguro de salir?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.route.navigate(['/home']);
      }});}

      PDF(): void {
        printJS({
          printable: 'body', 
          type: 'html', 
          documentTitle: `${new Date().toISOString()}solicitud_${this.solicitud.id}.pdf`, // Título del documento
          showModal: true, // Mostrar un modal de carga
          modalMessage: 'Imprimiendo, por favor espere...', // Mensaje del modal
          style:'table thead tr th{text-align: start};',
          onError: (error) => {
            console.error('Error al imprimir:', error);
            alert('Ocurrió un error al imprimir el documento');
          }
        });
      }
    }