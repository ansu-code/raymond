import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClaimsService } from 'src/app/services/claims.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  email: string = "";
  resetPasswordForm: FormGroup;
  checkUserSubmit = false;
  organizationDetails: any[];
  imageLogo: any = "";

  constructor(private router: Router, private formBuilder: FormBuilder,private claimsService: ClaimsService) { 
    this.initializeRPForm();
    this.getSingleMallDetails();
  }

  ngOnInit(): void {
    
  }

  initializeRPForm() {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,10}$')]],
    });
  }

  get rpf() { return this.resetPasswordForm.controls; }

  redirectToResetPassword(value) {
    this.checkUserSubmit = true;
    
    if (this.resetPasswordForm.invalid) {
      return;
    }

    var email = value.email;
    
    this.router.navigate(['/resetPassword', email]);
  }

  getSingleMallDetails() {
    this.claimsService.getSingleMallDetails()
    .subscribe((res) => {
      console.log("res organizationDetails",res);

      if (res["status"] == 1) {

        this.organizationDetails = res['orgs'];

        this.imageLogo = this.organizationDetails[0].logo;

        console.log("imageLogo", this.imageLogo);
        console.log("organizationDetails", this.organizationDetails);


      }
    },
      (error: any) => console.log(error)
    );
  }
}
