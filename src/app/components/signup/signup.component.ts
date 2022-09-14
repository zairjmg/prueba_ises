import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupFrom!: FormGroup

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signupFrom = this.formBuilder.group({
      name: [''],
      category: [''],
      company: [''],
      password: ['']
    })
  }

  signUp() {
    this.http.post<any>("http://localhost:3000/signupUsers", this.signupFrom.value).subscribe(res => {
      alert("Signup successfull")
      this.signupFrom.reset()
      this.router.navigate(['login'])
    }, err => {
      alert("sucesio algo")
    })
  }

}
