import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClaimsService } from 'src/app/services/claims.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  cities: any[];
  selectedCity: any;
  loginForm: FormGroup;
  errorMessage: string = '';
  submitted1 = false;
  imageLogo: any = "";
  organizationDetails: any = [];
  
  constructor(private router: Router, private fb: FormBuilder, private claimsService: ClaimsService) {
    this.initializeContractorLoginForm();
  }

  ngOnInit(): void {
    this.cities = [
      { name: 'Claim Management', code: 'claim' },
      // { name: 'Portfolio Management', code: 'portfolio' },
      // { name: 'Certificate Management', code: 'certificate' },
    ];
    this.getSingleMallDetails();
  }

  login() {
    this.router.navigate(['/ClaimModule/dashboard']);
  }

  initializeContractorLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      selectedCity: [{ name: 'Claim Management', code: 'claim' }, Validators.required]
    });
  }

  get p() { return this.loginForm.controls; }

  tryLogin(value) {

    this.submitted1 = true;
    this.errorMessage = "";

    if (this.loginForm.invalid) {
      return;
    }

    var inputData = {
      "email": value.email.toLowerCase(),
      "password": value.password
    };

    this.claimsService.findByCredentials(inputData)
      .subscribe((res) => {
        console.log("login res:::",JSON.stringify(res));
        if (res['status'] == "1") {
          console.log("res.username",res['username']);
          localStorage.setItem('loginUserName', res['username']);
          this.router.navigate(['/ClaimModule/dashboard']);
        } else {
          this.errorMessage = res['message'];
        }
      },
        (error: any) => console.log(error)
      );
  }

  getSingleMallDetails() {
    this.claimsService.getSingleMallDetails()
    .subscribe((res) => {
      console.log("res organizationDetails", JSON.stringify(res));

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