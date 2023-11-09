import { Servicio } from "./servicio";

export class Persona {
    id:number;
    apellido:string;
    nombre:string;
    dni:number;
    servicio:Servicio= new Servicio();
}
