import { Component, OnInit } from '@angular/core';
import { Servicio } from 'src/app/models/servicio';
import { ServicioService } from 'src/app/services/servicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {
  title:string="Gestión de Servicios";
  servicios:Servicio[]=[];
  constructor(private servicioService:ServicioService) { 
    
  }

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.servicioService.getAll().subscribe(res=>this.servicios=res);
  }

  delete(item: Servicio): void {
    Swal.fire({
      title: 'Estas Seguro?',
      text: `Eliminar el servicio: ${item.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioService.delete(item.id).subscribe(() => {
          this.servicios = this.servicios.filter(cat => cat != item);
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
