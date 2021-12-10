import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'employeeNameSearch'
})
export class SearchPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (!args) {
            return value;
        }
        return value.filter((val) => {
            let rVal =  (val.EMPLOYEE_NAME.toLocaleLowerCase().includes(args));
            return rVal;
        })

    }

}