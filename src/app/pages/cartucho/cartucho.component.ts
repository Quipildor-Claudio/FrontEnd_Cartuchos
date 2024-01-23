import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Cartucho } from 'src/app/models/cartucho';
import { CartuchoService } from 'src/app/services/cartucho.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cartucho',
  templateUrl: './cartucho.component.html',
  styleUrls: ['./cartucho.component.css']
})
export class CartuchoComponent implements OnInit {
  title:string= "Gestión de Cartuchos y Toner";
  cartuchos: any[];
  cartucho: Cartucho = new Cartucho();
  filterText: any;

  constructor(private cartuchoService:CartuchoService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(): void {
    this.cartuchoService.getAll().subscribe(res => this.cartuchos = res.reverse());
  }

  delete(item:Cartucho):void {
    Swal.fire({
      title: `${item.tipoCartucho.descripcion +' '+ item.modelo}`,
      text: `¿Estás Seguro?, Eliminar`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartuchoService.delete(item.id).subscribe(() => {
          this.cartuchos = this.cartuchos.filter(cat => cat != item);
          Swal.fire(
            'Eliminado!',
            'El cartucho ha sido eliminado',
            'success'
          )});
      }})}

      
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
            doc.save(`${new Date().toISOString()}colores_.pdf`);
            window.close();
          }, 10);
          });
        
        }  
            
  }    