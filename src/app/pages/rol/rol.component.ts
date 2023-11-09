import { Component, OnInit } from '@angular/core';
import { Rol } from 'src/app/models/rol';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {
  title:string="roles"
  roles:Rol[]=[];
  constructor(private rolService:RolService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.rolService.getAll().subscribe(res=>this.roles=res);
  }
  delete(item:any):void{

  }

}
