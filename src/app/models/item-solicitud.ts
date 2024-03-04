import { Cartucho } from "./cartucho";
import { TipoCarga } from "./tipo-carga";

export class ItemSolicitud {
    id:number;
    cantidad:number; 
    cartucho:Cartucho;
    tipoCarga:TipoCarga;
}
