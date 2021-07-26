import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaimsService } from 'src/app/services/claims.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  email: string = "";
  resetPasswordForm: FormGroup;
  checkUserSubmit: boolean = false;
  imageLogo: any = "";
  organizationDetails: any = [];

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,
    private claimsService: ClaimsService, private router: Router) {
    this.initializeRPForm();
  }

  ngOnInit(): void {
    this.email = this.activatedRoute.snapshot.paramMap.get('email');
    this.getSingleMallDetails();
  }

  initializeRPForm() {
    this.resetPasswordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  resetPassword(value) {
    this.checkUserSubmit = true;

    if (this.resetPasswordForm.invalid) {
      return;
    }

    var inputData = {
      currentPassword: value.currentPassword,
      newPassword: value.newPassword,
      confirmPassword: value.confirmPassword,
      email: this.email,
      remail: this.email
    }

    this.claimsService.resetPassword(inputData)
      .subscribe((res) => {
        console.log("res::::", res);
        var res = res['myHashMap'];
        if (res["status"] == 1) {
          alert("Password changed successfully.");
          console.log("hello success")
          this.router.navigate(['/login']);
        } else {
          alert("Password could not be changed. Please try later.");
          console.log("hello success")
        }
      },
        (error: any) => console.log(error)
      );

  }

  getSingleMallDetails() {
    this.claimsService.getSingleMallDetails()
    .subscribe((res) => {
      console.log("res organizationDetails",res);

      if (res["status"] == 1) {

        this.organizationDetails = res['orgs'];

        this.imageLogo = this.organizationDetails[0].logo;

        console.log("organizationDetails", this.organizationDetails);

      }
    },
      (error: any) => console.log(error)
    );
  }


}
