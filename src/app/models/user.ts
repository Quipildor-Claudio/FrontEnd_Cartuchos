import { Persona } from "./persona";
import { Rol } from "./rol";

export class User {
    id:number;
    username:string;
    password:string;
    persona:Persona = new Persona();
    roles:Rol[]=[];
    enable:boolean;
    create_at:string;
}
