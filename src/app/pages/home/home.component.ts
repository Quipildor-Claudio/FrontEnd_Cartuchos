import { Component, OnInit } from '@angular/core';
import { SolicitudService } from 'src/app/services/solicitud.service';
import Swal from 'sweetalert2';
import { Solicitud } from 'src/app/models/solicitud';
import { EstadoService } from 'src/app/services/estado.service';
import { Estado } from 'src/app/models/estado';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';




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
  page: number;
  paginador: any;
  url:string = '/home/page';

  constructor(
    private solicitudService: SolicitudService,
    private estadoService: EstadoService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.getUserServe();
    this.getPage();
    this.getEstados();
  }

  getPage(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.page = +params.get('page');
      if (!this.page) {
        this.page = 0;
      }
      this.getDataServer();
    });
  }

  getUserServe(): void {
    let user = this.authService.getUserSession();
    this.userService.getUserbyName(user.username).subscribe(res => {
      this.user = res;
    });
  }

  getDataServer(): void {
    let userr = this.authService.getUserSession();
    if (userr.role == "ADMINISTRADOR" || userr.role == "COMPUTO") {
      this.solicitudService.getAllPage(this.page).subscribe((res: any) => {
        this.solicitudes = res.content as Solicitud[];
        this.paginador = res;
      });
    } else {
      if (userr.role == "JEFE DE SERVICIO") {
        this.userService.getUserbyName(userr.username).subscribe(res => {
          this.solicitudService.getBusquedaServicoPage(this.user.persona.servicio.nombre, this.page).subscribe((ress: any) => {
            this.solicitudes = ress.content as Solicitud[];
            this.paginador = ress;
          }
          );
        });
      }else{
        this.solicitudService.getBusquedaUsername(userr.username,this.page).subscribe((data:any)=>{
          this.solicitudes = data.content as Solicitud[];
          this.paginador =data;
        });

      }

    }
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
      this.filterId = '';
      this.filterText = '';
      this.solicitudService.getBusquedaEstado(event).subscribe(res => {
        this.solicitudes = res
      });
    }
  }

  resetearBusqueda() {
    this.filterId = '';
    this.getEstados();
  }
  resetearAll() {
    this.filterId = '';
    this.getEstados();
    this.filterText = '';
    this.getDataServer();
  }

  searchId(id: any) {
    console.log(id);
    this.filterText = '';
    this.getEstados();

    if (id !== '') {
      this.solicitudService.getOne(id).subscribe(res => {
        this.solicitudes = [];
        this.solicitudes.push(res);
      }
      );
    } else {
      this.getDataServer();
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
