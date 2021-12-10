import { VaccinationService } from './../../vaccination.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  genders = ['Male', 'Female'];
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private vaccineService: VaccinationService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['male', [Validators.required]],
      age: ['', [Validators.required]],
      contactNumber: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    this.registerEmployee(this.registerForm.value)
  }

  registerEmployee(employeeDetails: any) {
    let record = {};
    record['EMPLOYEE_NAME'] = employeeDetails['userName'];
    record['AGE'] = employeeDetails['age'];
    record['CONTACT'] = employeeDetails['contactNumber'];
    record['EMAIL'] = employeeDetails['email'];
    record['GENDER'] = employeeDetails['gender'];
    record['PASSWORD'] = employeeDetails['password'];
    record['EMPLOYEE_ID'] = (new Date().getTime()).toString(36);
    record['ACCESS_RIGHT'] = '';
    this.vaccineService.createRecord(record, 'employee-registration').then(resp => {
      this.onReset();
      alert('You have registered successfully!!!')
    })
      .catch(error => {
        console.log(error);
      });
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }


}
