import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Persona } from 'src/app/models/persona';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  usuario: User = new User();
  persona: Persona = new Persona();
  name: string = "";
  constructor(private authService: AuthService,
    private router: Router) {

  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.name = this.authService.getUserSession().username;
      Swal.fire(`Hola ${this.name} ya estas logueado !`);
      this.router.navigate(['/home']);

    }
  }


  login(): void {
    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null) {
      Swal.fire('Error Login', 'Username o password vacías!', 'error');
      return;
    }

    this.authService.login(this.usuario).subscribe(u => {
      this.authService.saveToken(u.token);
      this.authService.saveUser(u.token);
      this.router.navigate(['/home']);


      Swal.fire('Login', `Hola ${u.persona.nombre} ${u.persona.apellido}, has iniciado sesión con éxito!`, 'success');
    },err=>{
      if(err.status==401){
        Swal.fire('Error Login', 'Username o password Incorrectos', 'error');

      }
    });

  }

}
