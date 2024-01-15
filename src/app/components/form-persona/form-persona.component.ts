import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/models/persona';
import { Servicio } from 'src/app/models/servicio';
import { PersonaService } from 'src/app/services/persona.service';
import { ServicioService } from 'src/app/services/servicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-persona',
  templateUrl: './form-persona.component.html',
  styleUrls: ['./form-persona.component.css']
})

export class FormPersonaComponent implements OnInit {
  titulo: string = "Formulario";
  persona:Persona=new Persona();
  servios:Servicio[]=[];
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private personaService:PersonaService,
    private servicioService:ServicioService
    ) { }

  ngOnInit(): void {
    this.cargar();
    this.getServicios();
  }

  cargar(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.personaService.getOne(id).subscribe(res=> this.persona= res);
      }
    }
    );
  }

  getServicios(): void {
    this.servicioService.getAll().subscribe(res => this.servios = res);
  }

  create(): void {
    console.log(this.persona);
    this.personaService.add(this.persona).subscribe(
      res => {
        Swal.fire(
          'Exito',
          `Categoria ${res.apellido +" "+ res.nombre}  Creada!`,
          'success'
        )
        this.route.navigate(['/personas']);
      }
    )
  }

  update(): void { 
    console.log(this.persona);
    this.personaService.update(this.persona,this.persona.id).subscribe(
      res => {
        Swal.fire(
          'Exito',
          ` ${res.nombre}  ${res.apellido}  actualizado!`,
          'success'
        )
        this.route.navigate(['/personas']);
      }
    )

  }
 
  comparar(o1: any, o2: any): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }

  Volver (): void {
    Swal.fire({
      title: 'Estas seguro de salir del formulario ?',
      text: `Se perderan todos los datos del formulario`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.route.navigate(['/personas']);
      }});}
}
