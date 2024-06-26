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
  titulo: string = "Formulario de Persona";
  persona:Persona=new Persona();
  servios:Servicio[]=[];
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private personaService:PersonaService,
    private servicioService:ServicioService,
    public route: Router
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
    Swal.fire({
      title: '¿Estás seguro?',
      text:'Se agregará un nuevo persona.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí'
    }).then((result) => {
      if (result.isConfirmed) {
    this.personaService.add(this.persona).subscribe(
      res => {
        Swal.fire(
          'Éxito',
          `Persona: ${res.apellido +" "+ res.nombre}, creada!`,
          'success'
        )
        this.route.navigate(['/personas']);
      });
    }});
  }

  update(): void { 
    console.log(this.persona);
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se modificarán todos los datos de la persona.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí'
    }).then((result) => {
      if (result.isConfirmed) {
    this.personaService.update(this.persona,this.persona.id).subscribe(
      res => {
        Swal.fire(
          'Éxito',
          `Persona: ${res.nombre}  ${res.apellido}, actualizada!`,
          'success'
        )
        this.route.navigate(['/personas']);
      });
    }});
  }
 
  comparar(o1: any, o2: any): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }

  Volver (): void {
    Swal.fire({
      title: '¿Estás seguro de salir del formulario?',
      text: `Se perderán todos los datos del formulario.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.route.navigate(['/personas']);
      }});}
}
