import { Component, OnInit } from '@angular/core';
import { VaccinationService } from 'src/app/vaccination.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employeeData: any;

  constructor(private vaccineSerive: VaccinationService) { }

  emp_name = "";
  aa: boolean = false;
  public users;
  public accessRight = ['Admin', 'Employee'];
  GENDER: string;

  ngOnInit(): void {
    this.vaccineSerive.readRecord('employee-registration')
      .subscribe(vaccData => {
        this.employeeData = vaccData.map(e => {
          return {
            ID: e.payload.doc.id,
            EMPLOYEE_NAME: e.payload.doc.data()['EMPLOYEE_NAME'],
            GENDER: e.payload.doc.data()['GENDER'],
            EMPLOYEE_ID: e.payload.doc.data()['EMPLOYEE_ID'],
            ACCESS_RIGHT: e.payload.doc.data()['ACCESS_RIGHT'] ? e.payload.doc.data()['ACCESS_RIGHT'] : '',
          };
        })

      });
  }

  updateAccessRight(evnt,id) {
    let record = {};
    record['ACCESS_RIGHT'] = evnt;
    this.vaccineSerive.updateRecord(id, record, 'employee-registration');
  }

  setIndex(ii) {
    this.aa = ii;
    // console.log
  }

}
