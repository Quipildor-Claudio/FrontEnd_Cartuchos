import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-colores',
  templateUrl: './colores.component.html',
  styleUrls: ['./colores.component.css']
})
export class ColoresComponent implements OnInit {
  title:string="Gestión de Colores"
  colores:any[];

  constructor(private colorService:ColorService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.colorService.getAll().subscribe(res=>this.colores=res);
  }

  
  delete(item: Color): void {
    Swal.fire({
      title: 'Estas Seguro?',
      text: `Eliminar el color ${item.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.colorService.delete(item.id).subscribe(() => {
          this.colores = this.colores.filter(cat => cat != item);
          Swal.fire(
            'Eliminado!',
            'Su archivo a sido eliminado',
            'success'
          )
        }
        );

      }
    })
  }

}
