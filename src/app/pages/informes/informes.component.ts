import { Component, OnInit } from '@angular/core';
import { Solicitud } from 'src/app/models/solicitud';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {
  title:string="Informes";
  solicitudes:Solicitud[]=[];

  rangoFechas = {
    fechaInicio: null,
    fechaFinal: null,
  };

  constructor(private solicitudService:SolicitudService) { }

  ngOnInit(): void {
  
  }

  getData(){
    this.solicitudService.getAll().subscribe(res=>{
      this.solicitudes=res
      console.log(this.solicitudes);
    });
  }

  irALink():void{
    window.location.href = 'http://localhost:8080/solicitudes/export-pdf';
  }

  buscar():void{
    this.solicitudService.getBuscarFecha(this.rangoFechas.fechaInicio,this.rangoFechas.fechaFinal).subscribe(res=>this.solicitudes=res);

  }

}
