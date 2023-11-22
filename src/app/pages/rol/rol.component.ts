import { Component, OnInit } from '@angular/core';
import { Rol } from 'src/app/models/rol';
import { RolService } from 'src/app/services/rol.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {
  title:string="Gestión de Roles"
  roles:Rol[]=[];
  constructor(private rolService:RolService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.rolService.getAll().subscribe(res=>this.roles=res);
  }
  delete(item: Rol): void {
    Swal.fire({
      title: 'Estas Seguro?',
      text: `Eliminar el rol: ${item.descripcion}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.rolService.delete(item.id).subscribe(() => {
          this.roles = this.roles.filter(cat => cat != item);
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
