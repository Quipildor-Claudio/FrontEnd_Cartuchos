import { Component, OnInit } from '@angular/core';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  solicitudes:any[];
  constructor(private solicitudService:SolicitudService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.solicitudService.getAll().subscribe(res=>this.solicitudes=res);
  }

  delete(item):void{

  }

}
