import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  title:string="Gestion de Usuarios"
  usuarios:User[]=[];
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.getData();
  }
  
  getData(){
    this.userService.getAll().subscribe(res=>{
      this.usuarios=res
    });
  }
  delete(item:any):void{

  }

}