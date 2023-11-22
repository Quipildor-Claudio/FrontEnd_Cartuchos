import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  title:string="Gestión de Personal"
  personas:Persona[]=[];
  constructor(private personaService:PersonaService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.personaService.getAll().subscribe(res=>{
      this.personas=res
      console.log(this.personas);
    });
  }
  delete(item: Persona): void {
    Swal.fire({
      title: 'Estas Seguro?',
      text: `Eliminar a: ${item.nombre} ${item.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.personaService.delete(item.id).subscribe(() => {
          this.personas = this.personas.filter(cat => cat != item);
          Swal.fire(
            'Eliminado!',
            'Su archivo ha sido eliminado',
            'success'
          )
        }
        );

      }
    })
  }


}
