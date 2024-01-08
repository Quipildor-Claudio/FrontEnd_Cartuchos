import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
        title: 'Estas Seguro?',
        text: `Eliminar a: ${item.nombre} ${item.apellido}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
      if (confirm(`Eliminar ${item.nombre}`)) {
        this.personaService.delete(item.id).subscribe(() => {
          this.personas = this.personas.filter(cat => cat !== item);
          Swal.fire('Eliminado!', 'Su archivo a sido eliminado', 'success');
        });
      }
      this.route.navigate(['/peronas']);
    } 
   })
  }

}
