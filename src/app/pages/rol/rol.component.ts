import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Rol } from 'src/app/models/rol';
import { RolService } from 'src/app/services/rol.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {
  title:string="Gestión de Roles"
  roles:Rol[]=[];
  rol: Rol= new Rol();
  agregandoNuevoRol = false;
  filterText:any
  @ViewChild('rolesContainer') rolesContainer: ElementRef;
  editarIndex = -1;
  edicionEnProgreso = false;
  
  ngAfterViewInit(): void {
    if (this.agregandoNuevoRol) {
      this.scrollToAddColor();
    }
  }

  constructor(private rolService:RolService, private route: Router) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.rolService.getAll().subscribe(res=>this.roles=res);
  }
  delete(item:any):void{

  }

  update(item: Rol): void {
    Swal.fire({
      title: '¿Estás Seguro?',
      text: `Modificar el rol: ${item.descripcion}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Modificar!'
    }).then((result) => {
      if (result.isConfirmed) {
      this.rolService.update(item, item.id).subscribe(() => {
      Swal.fire('Éxito', `${item.descripcion} modificada!`, 'success');
      this.route.navigate(['/roles']);
      this.editarIndex = -1;
      this.edicionEnProgreso = false;
    })};
});
}

confirmarAgregar(): void {
  Swal.fire({
    title: '¿Estás Seguro?',
    text: `Agregar la rol: ${this.rol.descripcion}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, Agregar!'
  }).then((result) => {
    if (result.isConfirmed) {
    this.rolService.add(this.rol).subscribe(() => {
    Swal.fire('Éxito', `Rol: ${this.rol.descripcion}, creada!`, 'success');
    this.agregandoNuevoRol = false;
    this.getData();
    })
    }
  })
}

cancelarAgregar(): void {
  this.agregandoNuevoRol= false;
  this.rol = new  Rol();
}

getNextId(): number {
  return Math.max(...this.roles.map(c => c.id), 0) + 1;
}
/* Modificar */  

  habilitarModificacion(index: number): void {
    this.editarIndex = index;
    this.edicionEnProgreso = true;
  }

  cancelarModificacion(): void {
    this.editarIndex = -1;
    this.edicionEnProgreso = false;
  }

  agregar(): void {
    this.agregandoNuevoRol = true;
    this.rol = new Rol();
    setTimeout(() => {
      this.scrollToAddColor();
    },15);
  }

  scrollToAddColor(): void {
    if (this.rolesContainer && this.rolesContainer.nativeElement) {
      this.rolesContainer.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }
  }

}
