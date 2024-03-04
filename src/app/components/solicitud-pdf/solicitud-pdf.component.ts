import { Component, OnInit } from '@angular/core';
import { Solicitud } from 'src/app/models/solicitud';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';

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
      setTimeout(() => {
        doc.save(`${new Date().toISOString()}solicitud_${this.solicitud.id}.pdf`);
        window.close();
      }, 10);
    });
    
  
  }
  PDFAfterDelay(): void {
    // Espera 3 segundos antes de ejecutar la función PDF()
    setTimeout(() => {
      this.PDF();
    },150);
  }
}
