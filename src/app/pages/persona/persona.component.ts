import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  title:string="Gestión de Personas"
  personas:Persona[]=[];
  persona: Persona = new Persona();
  filterText:any;
  constructor(private personaService:PersonaService, private route: Router) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.personaService.getAll().subscribe(res=>{
      this.personas=res
      console.log(this.personas);
    });
  }
  delete(item:Persona):void{
      Swal.fire({
        title: '¿Estás Seguro?',
        text: `Eliminar a: ${item.nombre} ${item.apellido}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, Eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
      if (confirm(`Eliminar ${item.nombre}`)) {
        this.personaService.delete(item.id).subscribe(() => {
          this.personas = this.personas.filter(cat => cat !== item);
          Swal.fire('Eliminado!', 'Su archivo ha sido eliminado', 'success');
        });
      }
      this.route.navigate(['/peronas']);
    } 
   })
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
      setTimeout(() => {
        doc.save(`${new Date().toISOString()}personas.pdf`);
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
