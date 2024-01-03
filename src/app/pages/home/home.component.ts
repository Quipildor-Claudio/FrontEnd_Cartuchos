import { Component, OnInit } from '@angular/core';
import { SolicitudService } from 'src/app/services/solicitud.service';
import Swal from 'sweetalert2';
import { Solicitud } from 'src/app/models/solicitud';
import { EstadoService } from 'src/app/services/estado.service';
import { Estado } from 'src/app/models/estado';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title: string = "Solicitudes"
  solicitudes: Solicitud[] = [];
  estados: Estado[] = [];
  estado: any;
  filteredSol: Solicitud[] = [];
  filterText: any;
  filterId: any;
  user: User = new User();

  constructor(
    private solicitudService: SolicitudService,
    private estadoService: EstadoService,
    private authService: AuthService,
    private userService: UserService


  ) {
  }

  ngOnInit(): void {

    this.getData();
    this.getEstados();
  }

  getData() {
    let name = this.authService.getUserSession().username;
    this.userService.getUserbyName(name).subscribe(res => {
      this.user = res;
      console.log(this.user);
      if (this.user.roles[0].descripcion == "ADMINISTRADOR" || this.user.roles[0].descripcion == "COMPUTO") {
        this.solicitudService.getAll().subscribe(res => this.solicitudes = res);
      } else {
       this.solicitudes = this.user.solicitudes;
      }

    });


  }
  getEstados(): void {
    this.estadoService.getAll().subscribe(res => this.estados = res);
  }



  delete(item): void {
    Swal.fire({
      title: 'Estas Seguro?',
      text: `Eliminar ${item.id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.solicitudService.delete(item.id).subscribe(() => {
          this.solicitudes = this.solicitudes.filter(sol => sol != item);
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
  onEstadoChange(event: any) {
    if (event) {
      this.solicitudService.getBusquedaEstado(event).subscribe(res => {
        this.solicitudes = res
      });
    }

  }



  searchId(id: any) {
    console.log(id);
    if (id !== '') {
      this.solicitudService.getOne(id).subscribe(res => {
        this.solicitudes = [];
        this.solicitudes.push(res);
      }
      );
    } else {
      this.getData();
    }

  }

  comparar(o1: any, o2: any): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }

  openPDFInNewTab(solicitudId: number): void {
    const url = this.router.createUrlTree(['/solicitud-pdf', solicitudId]).toString();
    const newTab = window.open('', '_blank');
    newTab.location.href = url;
  }
}
