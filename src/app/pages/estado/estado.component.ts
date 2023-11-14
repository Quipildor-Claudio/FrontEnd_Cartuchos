import { Component, OnInit } from '@angular/core';
import { EstadoService } from 'src/app/services/estado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {
  title:string= "Gestion de Estados";
  estados: any[];
  constructor(private estadoService:EstadoService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.estadoService.getAll().subscribe(res=>this.estados=res);
  }

  delete(item):void{

  }


}
