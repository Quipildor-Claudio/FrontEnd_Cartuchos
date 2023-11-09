import { Component, OnInit } from '@angular/core';
import { Servicio } from 'src/app/models/servicio';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {
  title:string="servicios";
  servicios:Servicio[]=[];
  constructor(private servicioService:ServicioService) { 
    
  }

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.servicioService.getAll().subscribe(res=>this.servicios=res);
  }

  delete(item):void{

  }

}
