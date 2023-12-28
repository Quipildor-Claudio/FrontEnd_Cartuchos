import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  usuario:User=new User();

  constructor(private authService:AuthService,
              private router:Router){

  }

  ngOnInit(): void {
      
  }


  login():void{
    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null) {
      Swal.fire('Error Login', 'Username o password vacías!', 'error');
      return;
    }

    this.authService.login(this.usuario).subscribe(r=>{
      console.log(r);
      this.router.navigate(['/home']);
      Swal.fire('Login', `Hola ${r.username}, has iniciado sesión con éxito!`, 'success');
    });

  }

}
