import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { ApiService } from 'src/app/shared/api.service';
import { EmployModel } from './dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  formValue !: FormGroup
  employModelObj: EmployModel = new EmployModel()
  employData!: any
  showAdd!: boolean
  showUpdate!: boolean

  constructor(private formBuiler: FormBuilder, private api: ApiService) {

  }

  ngOnInit(): void {
    this.formValue = this.formBuiler.group({
      name: [''],
      category: [''],
      company: [''],
      levelOfHappiness: ['']
    })
    this.getAllEmploy();
  }

  clickAddEmploy() {
    this.formValue.reset();
    this.showAdd = true
    this.showUpdate = false 
  }

  postEmployDetails() {
    this.employModelObj.name = this.formValue.value.name
    this.employModelObj.category = this.formValue.value.category
    this.employModelObj.company = this.formValue.value.company
    this.employModelObj.levelOfHappiness = this.formValue.value.levelOfHappiness

    this.api.postEmploy(this.employModelObj).subscribe(res => {
      console.log(res);
      alert("empleado añadido")
      let ref = document.getElementById('cancel')
      ref?.click()
      this.formValue.reset()
      this.getAllEmploy()
    })
  }

  getAllEmploy() {
    this.api.getEmploy().subscribe(res => {
      this.employData = res;
    })
  }

  deleteEmploy(row: any) {
    this.api.deleteEmploy(row.id).subscribe(res => {
      alert("Empleado borrado")
      this.getAllEmploy()
    })
  }

  onEdit(row: any) {
    this.showAdd = false
    this.showUpdate = true
    this.employModelObj.id = row.id
    this.formValue.controls['name'].setValue(row.name)
    this.formValue.controls['category'].setValue(row.category)
    this.formValue.controls['company'].setValue(row.company)
    this.formValue.controls['levelOfHappiness'].setValue(row.levelOfHappiness)
    this.getAllEmploy()
  }

  updateEmployDetails() {
    this.employModelObj.name = this.formValue.value.name
    this.employModelObj.category = this.formValue.value.category
    this.employModelObj.company = this.formValue.value.company
    this.employModelObj.levelOfHappiness = this.formValue.value.levelOfHappiness

    this.api.updateEmploy(this.employModelObj, this.employModelObj.id).subscribe(res => {
      alert("empleado actualizado")
      let ref = document.getElementById('cancel')
      ref?.click()
      this.formValue.reset()
      this.getAllEmploy()
    }, err => {
      alert("algo a sucedido")
    })
  }

}

