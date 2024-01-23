import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Impresora } from 'src/app/models/impresora';
import { ImpresoraService } from 'src/app/services/impresora.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-impresora',
  templateUrl: './impresora.component.html',
  styleUrls: ['./impresora.component.css']
})
export class ImpresoraComponent implements OnInit {
  title: string = "Gestión de Impresora";
  impresoras: any[];
  filterText: any;
  impresora: Impresora= new Impresora();
  constructor(private impresoraService: ImpresoraService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(): void {
    this.impresoraService.getAll().subscribe(res => this.impresoras = res);
  }

  delete(item: Impresora): void {
    Swal.fire({
      title: '¿Estás Seguro?',
      text: `Eliminar impresora: ${item.modelo}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: ', Sí, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.impresoraService.delete(item.id).subscribe(() => {
          this.impresoras = this.impresoras.filter(cat => cat != item);
          Swal.fire(
            'Eliminado!',
            'Su archivo ha sido eliminado',
            'success'
          )
        });}
    })}

    
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
        doc.save(`${new Date().toISOString()}solicitud_${this.impresora.id}.pdf`);
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
