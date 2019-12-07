import {AbstractControl, ValidatorFn} from '@angular/forms';

export abstract class GraphValidators {
    static nodeNameValidator(nodes: string[]): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {

            if (control.value && nodes.indexOf(control.value) === -1) {
                return {'nodeDoesNodeExist': {value: control.value}};
            }
            return null;
        };
    }
}
