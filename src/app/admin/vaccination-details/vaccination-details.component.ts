import { VaccinationService } from './../../vaccination.service';
import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-vaccination-details',
  templateUrl: './vaccination-details.component.html',
  styleUrls: ['./vaccination-details.component.css']
})
export class VaccinationDetailsComponent implements OnInit {
  public employeeData: any;
  public vaccineData: any;
  public vaccineDataFinal: any;
  constructor(private vaccineSerive: VaccinationService) { }

  ngOnInit(): void {
    this.vaccineSerive.readRecord('vaccine-details')
      .subscribe(vaccData => {
        this.vaccineData = vaccData.map(e => {
          return {
            ID: e.payload.doc.id,
            EMPLOYEE_NAME: e.payload.doc.data()['EMPLOYEE_NAME'],
            VACCINE_ID: e.payload.doc.data()['VACCINATION_UNIQUE_ID'],
            EMPLOYEE_ID: e.payload.doc.data()['EMPLOYEE_ID'],
            VACCINE_NAME: e.payload.doc.data()['VACCINATION_NAME'],
            FIRST_DOZE: e.payload.doc.data()['FIRST_DOZE'],
            FIRST_DOZE_DATE: e.payload.doc.data()['FIRST_DOZE_DATE'],
            SECOND_DOZE: e.payload.doc.data()['SECOND_DOZE'],
            SECOND_DOZE_DATE: e.payload.doc.data()['SECOND_DOZE_DATE'],
            IS_FULLY_VACCINATED: (e.payload.doc.data()['FIRST_DOZE'] == 'Yes' && e.payload.doc.data()['SECOND_DOZE']) == 'Yes' ? 'YES' : 'NO'
          };
        })

      });
  }

  deleteRecord(vaccID) {
    this.vaccineSerive.deleteRecord(vaccID,'vaccine-details');
  }



}
