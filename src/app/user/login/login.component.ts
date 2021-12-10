import { ActivatedRoute, Router } from '@angular/router';
import { VaccinationService } from './../../vaccination.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public employeeData: any

  constructor(private formBuilder: FormBuilder, private vaccineSerive: VaccinationService, public router: Router,private route: ActivatedRoute) { }
  loginForm: FormGroup;
  submitted = false;
  emp_id: any

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      employee_id: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.loginEmployee(this.loginForm.value)

  }

  loginEmployee(result) {
    this.vaccineSerive.readRecord('employee-registration').subscribe(data => {
      this.employeeData = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          EMPLOYEE_NAME: e.payload.doc.data()['EMPLOYEE_NAME'],
          AGE: e.payload.doc.data()['AGE'],
          GENDER: e.payload.doc.data()['GENDER'],
          PASSWORD: e.payload.doc.data()['PASSWORD'],
          CONTACT: e.payload.doc.data()['CONTACT'],
          EMAIL: e.payload.doc.data()['EMAIL'],
          EMPLOYEE_ID: e.payload.doc.data()['EMPLOYEE_ID']
        };
      })
      var resultObj = this.employeeData.filter(obj => {
        return obj.PASSWORD === result['password'] && obj.EMPLOYEE_NAME === result['employee_id']
      })

    
      this.submitted = false;
      this.loginForm.reset();
        if (resultObj.length === 0) {
        alert('Please enter valid credentials!!!')
      } else {
        localStorage.setItem('loggedInEmplyeeData', JSON.stringify(resultObj));
        this.router.navigate(['user-details',{userName: result['employee_id'],empId: resultObj[0]['EMPLOYEE_ID']}]);
      }
    });
  }



}
