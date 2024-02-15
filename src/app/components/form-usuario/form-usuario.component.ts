import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Persona } from 'src/app/models/persona';
import { Rol } from 'src/app/models/rol';
import { User } from 'src/app/models/user';
import { PersonaService } from 'src/app/services/persona.service';
import { RolService } from 'src/app/services/rol.service';
import { UserService } from 'src/app/services/user.service';
import { flatMap, map } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})


export class FormUsuarioComponent implements OnInit {
  titulo: string = "Formulario de Usuario";
  roles: Rol[] = [];
  persona: Persona = new Persona();
  selectedRoleId: number; 
  myPersonaControl = new FormControl();
  personasFiltrados: Observable<Persona[]>;
  user: User = new User();
  constructor(
    public activatedRoute: ActivatedRoute,
    public route: Router,
    private userService: UserService,
    private rolService: RolService,
    private personaService: PersonaService

  ) { }

  ngOnInit(): void {
    this.cargar();
    this.getRoles();

    this.personasFiltrados = this.myPersonaControl.valueChanges.pipe(
      map(value => typeof value === 'string' ? value : value.dni),
      flatMap(value => value ? this._filter(value) : [])
    );

  }

  cargar(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.userService.getOne(id).subscribe(res => this.user = res);
        if (this.user.persona) {
          //this.myPersonaControl.patchValue(this.viewPersona(this.user.persona));

        }
      }
    }
    );
  }
  private _filter(value: string): Observable<Persona[]> {
    const filterValue = value.toLowerCase();
    return this.personaService.getListaDni(filterValue);
  }

  viewPersona(persona?: Persona): string | undefined {
    return persona ? persona.apellido + " " + persona.nombre + " " + persona.dni : undefined;
  }

  selectedPersona(event: MatAutocompleteSelectedEvent): void {
    this.user.persona = event.option.value as Persona;
  }

  getRoles(): void {
    this.rolService.getAll().subscribe(res => {
      this.roles = res
    });
  }

  getPersonaDni() {
    this.personaService.getDni(this.user.persona.dni).subscribe(res => {
      this.user.persona = res;
    });
  }

  create() {
    if (this.user.persona.id != null) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Se agregará un nuevo usuario.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí'
        }).then((result) => {
            if (result.isConfirmed) {
                this.userService.add(this.user).subscribe(res => {
                    Swal.fire(
                        'Éxito',
                        `Usuario: ${res.username}, creada!`,
                        'success'
                    )
                    this.route.navigate(['/usuarios']);
                });
            }
        });
    }
}

  update() {
    if (this.user.persona.id != null) {
      Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se modificarán los datos del usuario',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.update(this.user, this.user.id).subscribe(res => {
          Swal.fire(
            'Éxito',
            `Usuario: ${res.username}, actualizada!`,
            'success'
          );
          this.route.navigate(['/usuarios']);
        });
      }
    });

  }
  }
  result(): Rol[] {
    return this.roles.filter(item => item.checked);
  }

  Volver(): void {
    Swal.fire({
      title: '¿Estás seguro de salir del formulario?',
      text: `Se perderán todos los datos del formulario`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí'
    }).then((result) => {
      if (result.isConfirmed) {
        this.route.navigate(['/usuarios']);
      }
    });
  }


isSelectedRole(roleId: number): boolean {
    return this.selectedRoleId === roleId;
}

selectRole(roleId: number): void {
  this.selectedRoleId = roleId;
  const selectedRole: Rol = this.roles.find(role => role.id === roleId);
  this.user.roles = selectedRole ? [selectedRole] : [];
}



}
