import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { PopupSolicitudComponent } from 'src/app/components/popup-solicitud/popup-solicitud.component';
import { SolicitudService } from 'src/app/services/solicitud.service';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  solicitudes: any[];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();


  constructor(private solicitudService: SolicitudService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.dtOptions = {
      language: {
        "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
      },
      pagingType: 'full_numbers'
    };
    this.getData();
  }
  getData() {
    this.solicitudService.getAll().subscribe(res => {
      this.solicitudes = res
      this.dtTrigger.next(this.solicitudes);
      console.log(this.solicitudes);
    });
  }

  mostrarTodo(): void {
    this.getData();
  }

  delete(item): void {

  }


  updateEstado(item:any){

  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


  openPopUp(item:any):void{
    this.dialog.open(PopupSolicitudComponent,{
      width:'60%',
      height:'400px',
      data:{
        title:'Atorizar Solicitudes',
        data:item,
      }
    });
  }

}
