import { Color } from "./color";
import { Marca } from "./marca";
import { TipoCarga } from "./tipo-carga";
import { TipoCartucho } from "./tipo-cartucho";

export class Cartucho {
    id:number;
    modelo:string;
    capacidad:string;
    descripcion:string;
    color:Color;
    marca:Marca;
    tipoCartucho:TipoCartucho;
    tipoCarga:TipoCarga;

    fecha_creacion:string;
}
