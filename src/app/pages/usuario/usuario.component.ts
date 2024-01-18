import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  title:string="Gestión de Usuarios"
  usuarios:User[]=[];
  filterText:any;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.getData();
  }
  
  getData(){
    this.userService.getAll().subscribe(res=>{
      this.usuarios=res
    });
  }
  delete(item:User):void{
    Swal.fire({
      title: '¿Estás Seguro?',
      text: `Eliminar al usuario: ${item.username}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
    if (confirm(`Eliminar ${item.username}`)) {
      this.userService.delete(item.id).subscribe(() => {
        this.usuarios = this.usuarios.filter(cat => cat !== item);
        Swal.fire('Eliminado!', 'El archivo ha sido eliminado', 'success');
      });
    }
  } 
 })
}

}