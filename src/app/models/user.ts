import { Persona } from "./persona";
import { Rol } from "./rol";
import { Solicitud } from "./solicitud";

export class User {
    id:number;
    username:string;
    password:string;
    email:string;
    persona:Persona = new Persona();
    roles:Rol[]=[];
    enabled:boolean;
    create_at:string;
    solicitudes:Solicitud[]=[];
    
    activo():string{
        if(this.enabled){
            return "Activo"
        }else{
            return "Descativado";
        }
    }
}

