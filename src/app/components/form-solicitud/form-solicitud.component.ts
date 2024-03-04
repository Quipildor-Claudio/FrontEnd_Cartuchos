import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estado } from 'src/app/models/estado';
import { Solicitud } from 'src/app/models/solicitud';
import { EstadoService } from 'src/app/services/estado.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import 'jspdf';
import 'jspdf-autotable';
import jsPDF from 'jspdf';
import { AuthService } from 'src/app/auth/auth.service';



@Component({
  selector: 'app-form-solicitud',
  templateUrl: './form-solicitud.component.html',
  styleUrls: ['./form-solicitud.component.css']
})
export class FormSolicitudComponent implements OnInit{
  
  title:string=" Solicitud de Cartuchos";
  estados:Estado[];
  EstadosDes:string;
  solicitud:Solicitud = new Solicitud();

  constructor(
    private solicitudService: SolicitudService,
    private estadoService: EstadoService,
    private route: Router,
    public activateRoute: ActivatedRoute,
    private authService:AuthService

  ) { }

  ngOnInit(): void {
    this.cargar();
    this.getEstados();
  }

  cargar(): void {
    this.activateRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.solicitudService.getOne(id).subscribe(res => this.solicitud = res);
        console.log(this.solicitud);
      }
    }
    );
  }
  getEstados(): void {

    this.estadoService.getAll().subscribe(res => this.estados = res);
  }

  create(): void {
    this.solicitud.aprobado = this.authService.getUserSession().username;
    this.solicitudService.update(this.solicitud, this.solicitud.id).subscribe(res => {
      Swal.fire(
        'Exito',
        `Solicitud ${res.id}  Actualizada !`,
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

  PDF() {
    $("#duplicado").removeAttr('hidden');
    $("#estados").attr('hidden', 'hidden');
    $("#estados1").attr('hidden', 'hidden');
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
      docResult.save(`${new Date().toISOString()}solicitud_${this.solicitud.id}.pdf`);
      $("#duplicado").attr('hidden', 'hidden');
      $("#estados").removeAttr('hidden');
    });
  }

  Volver(): void {
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
      }
    });
  }




}
