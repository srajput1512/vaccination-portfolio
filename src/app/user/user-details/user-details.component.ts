import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VaccinationService } from 'src/app/vaccination.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  isFirstDozeTaken: any = 'Yes';
  isSecondDozeTaken: any = 'Yes';
  emplyeeName: any;
  emplyeeId: string;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, private vaccineService: VaccinationService) {
    this.emplyeeName = this.route.snapshot.paramMap.get('userName');
    this.emplyeeId = this.route.snapshot.paramMap.get('empId');
  }

  dozesTaken = ['Yes', 'No'];
  userDetailForm: FormGroup;
  submitted = false;


  ngOnInit(): void {
    this.userDetailForm = this.formBuilder.group({
      vaccineName: ['', [Validators.required]],
      firstDoze: ['Yes', [Validators.required]],
      firstDozedate: ['', ''],
      secondDoze: ['Yes', [Validators.required]],
      secondDozedate: ['', '']
    });
  }

  get f() { return this.userDetailForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.userDetailForm.invalid) {
      return;
    }
    this.vaccinationDetails(this.userDetailForm.value)
  }

  vaccinationDetails(vaccineDetails) {
    let record = {};
    record['VACCINATION_NAME'] = vaccineDetails['vaccineName'];
    record['FIRST_DOZE'] = vaccineDetails['firstDoze'];
    record['FIRST_DOZE_DATE'] = vaccineDetails['firstDozedate'] ? vaccineDetails['firstDoze'] : null;
    record['SECOND_DOZE'] = vaccineDetails['secondDoze'];
    record['SECOND_DOZE_DATE'] = vaccineDetails['secondDoze'] ? vaccineDetails['secondDozedate'] : null;
    record['EMPLOYEE_ID'] = this.emplyeeId;
    record['EMPLOYEE_NAME'] = this.emplyeeName;
    record['VACCINATION_UNIQUE_ID'] = (new Date().getTime()).toString(36);
    
    this.vaccineService.createRecord(record, 'vaccine-details').then(resp => {
      this.onReset();
      alert('Your vaccine deatils are submitted successfully!!!')
    })
      .catch(error => {
        console.log(error);
      });
  }

  onReset() {
    this.submitted = false;
    this.userDetailForm.reset();
  }

  handleChangeFirstDoze(evt) {
    this.isFirstDozeTaken = String(evt);
  }

  handleChangeSecondDoze(evt) {
    this.isSecondDozeTaken = String(evt);
  }

  logOut() {
    localStorage.setItem('loggedInEmplyeeData', null);
    this.router.navigate(['login'])
  }


}
