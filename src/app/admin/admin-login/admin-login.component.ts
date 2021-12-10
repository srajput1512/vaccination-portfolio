import { VaccinationService } from './../../vaccination.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  adminData: any;

  constructor(private formBuilder: FormBuilder, private vaccineSerive:VaccinationService, public router: Router,private route: ActivatedRoute) { }
  loginForm: FormGroup;
  submitted = false;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required,Validators.minLength(6)]],
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.adminLogin(this.loginForm.value);
  }

  adminLogin(result) {
    this.vaccineSerive.readRecord('admin-login').subscribe(data => {
      this.adminData = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          USER_NAME: e.payload.doc.data()['USER_NAME'],
          PASSWORD: e.payload.doc.data()['PASSWORD'],
        };
      })

      var resultObj = this.adminData.filter(obj => {
        return obj.PASSWORD === result['password'] && obj.USER_NAME === result['userName']
      });

      this.submitted = false;
      this.loginForm.reset();

      if (resultObj.length === 0) {
        alert('Please enter valid credentials!!!')
      } else {
        localStorage.setItem('loggedInAdminData', JSON.stringify(resultObj));
        this.router.navigate(['admin/vaccination-details']);
      }
    });
  }
}
