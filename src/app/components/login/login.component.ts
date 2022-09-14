import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup

  constructor(private formBuiler: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuiler.group({
      name:[''],
      password:['']
    })
  }

  login() {
    this.http.get<any>("http://localhost:3000/signupUsers").subscribe(res => {
      const user = res.find((a: any) => {
        return a.name === this.loginForm.value.name && a.password === this.loginForm.value.password
      })

      if (user) {
        //alert('inicio de sesión exitoso')
        this.loginForm.reset()
        this.router.navigate(['dashboard'])
      } else {
        alert('Usuario no encontrado')
      }

    }, err => {
      alert('Algo a sucedido')
    })
  }

}
