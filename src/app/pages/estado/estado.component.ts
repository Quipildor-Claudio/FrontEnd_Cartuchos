import { Component, OnInit } from '@angular/core';
import { Estado } from 'src/app/models/estado';
import { EstadoService } from 'src/app/services/estado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {
  title:string= "Gestión de Estados";
  estados: any[];
  constructor(private estadoService:EstadoService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.estadoService.getAll().subscribe(res=>this.estados=res);
  }

  delete(item: Estado): void {
    Swal.fire({
      title: 'Estas Seguro?',
      text: `Eliminar el estado: ${item.descripcion}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.estadoService.delete(item.id).subscribe(() => {
          this.estados = this.estados.filter(cat => cat != item);
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
