import { HttpErrorResponse } from "@angular/common/http";
import { AbstractControl, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

import { InjectorInstance } from "../services/auth.service";
import { take } from "rxjs/operators";


let emailCheckApiResp: boolean;

export function emailExistValidator(): ValidatorFn {
    return async (control: AbstractControl) : Promise<ValidationErrors | null> => {
        const value = control.value;
        if(!value) {
            return null;
        }

        // Validate validate at endpoint
    
        let emailTaken = emailExist(value).subscribe(
            (result) => {
                console.log(result);
                


            }
        )

        return !emailTaken ? {emailTaken:true} : null;
    }
}





// Helper functions

async function updateVar(result: any) {
    emailCheckApiResp = result;
}

function getVariable() {
    return emailCheckApiResp;
}


function emailExist(email: string) {

    const httpClient =  InjectorInstance.get<HttpClient>(HttpClient);
    const baseUrl = environment.restApi.uri;

    let formData = new FormData();
    formData.append('email', email);

    return httpClient.post(
      baseUrl + '/validator/email', formData,
    )
  }