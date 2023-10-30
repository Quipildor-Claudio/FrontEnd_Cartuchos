import { Component, OnInit } from '@angular/core';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-colores',
  templateUrl: './colores.component.html',
  styleUrls: ['./colores.component.css']
})
export class ColoresComponent implements OnInit {
  title:string="Gestion de Colores"
  colores:any[];

  constructor(private colorService:ColorService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.colorService.getAll().subscribe(res=>this.colores=res);
  }

  delete(item):void{

  }

}
