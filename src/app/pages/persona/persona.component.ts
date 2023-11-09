import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  title:string="persona"
  personas:Persona[]=[];
  constructor(private personaService:PersonaService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.personaService.getAll().subscribe(res=>{
      this.personas=res
      console.log(this.personas);
    });
  }
  delete(item:any):void{

  }

}
