import { Persona } from "./persona";
import { Rol } from "./rol";

export class User {
    id:number;
    username:string;
    password:string;
    email:string;
    persona:Persona = new Persona();
    roles:Rol[]=[];
    enabled:boolean;
    create_at:string;

    activo():string{
        return this.enabled?"Activo":"Descativado";
    }
}

