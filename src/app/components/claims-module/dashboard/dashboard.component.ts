import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClaimsService } from 'src/app/services/claims.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  Claims: any[];
  selectedClaim: any;
  activeState: boolean = false;
  selectedClaimType: string = "";
  claims: any[];
  jobStatusList: any = [];
  subJobsList: any = [];
  selectedClaimTypeId: any = "";
  fieldsList: any[];
  conditionsList: any[];
  searchForm: FormGroup;
  datesFlag: boolean = false;
  jobTypeId: number = 0;
  claimsTypeList: any[];

  constructor(private claimsService: ClaimsService, private router: Router, private fb: FormBuilder) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.getClaimTypes();
    this.conditionsList = [
      { label: "is", value: "is" },
      { label: "is less than", value: "is less than" },
      { label: "is greater than", value: "is greater than" },
      { label: "is between", value: "is between" },
      { label: "contains", value: "contains" },
      { label: "between", value: "between" }
    ];
  }

  initializeForm() {
    this.searchForm = this.fb.group({
      quantities: this.fb.array([]),
    });
  }

  quantities() : FormArray {
    return this.searchForm.get("quantities") as FormArray
  }

  newSearchForm(): FormGroup {
    return this.fb.group({
      fieldName: [null],
      condition: [null],
      comparision: [null],
      startDate: [null],
      endDate: [null]
    });
  }

  addQuantity() {
    this.quantities().push(this.newSearchForm());
  }
   
  removeQuantity(i:number) {
    this.quantities().removeAt(i);
    this.datesFlag = false;
  }

  getClaimTypes() {
    this.claimsService.getClaimTypes()
      .subscribe((res) => {

        if (res["status"] == 1) {

          this.claimsTypeList = res.jobs;
          console.log("claimtypeslist:::", JSON.stringify(this.claimsTypeList))

          var claimsArray = [];

          for (var i = 0; i < this.claimsTypeList.length; i++) {

            this.selectedClaim = { label: this.claimsTypeList[0].Name, value: this.claimsTypeList[0].typeID };

            this.selectedClaimType = this.claimsTypeList[0].Name;
            this.selectedClaimTypeId = this.claimsTypeList[0].typeID;
            this.jobTypeId = this.claimsTypeList[0].jobTypeId;

            var claimObj = {
              label: this.claimsTypeList[i].Name, value: this.claimsTypeList[i].typeID
            }

            claimsArray.push(claimObj);
          }

          this.claims = claimsArray;

          this.getDocumentsStatus();
          this.getAllMasterTypeJobsList();

        }
      },
        (error: any) => console.log(error)
      );

  }

  getDocumentsStatus() {
    var input = {
      typeId: this.selectedClaimTypeId
    }

    this.claimsService.getDocumentsStatus(input)
      .subscribe((res) => {

        this.jobStatusList = res['jobStatus'];
        this.subJobsList = res['subJobs'];

      },
        (error: any) => console.log(error)
      );
  }

  onClaimsChange(event) {
    this.selectedClaimType = this.selectedClaim.label;
    this.selectedClaimTypeId = this.selectedClaim.value;

    var claimType = this.claimsTypeList.filter(j => j.Name === this.selectedClaimType);
    this.jobTypeId = claimType[0].jobTypeId;

    this.getDocumentsStatus();
  }

  redirectToViewClaim(formName, jobType, jobStatus) {
    var claimStatus = {
      formName: formName,
      jobType: jobType,
      jobStatus: jobStatus,
      claimType: this.selectedClaimType
    }

    localStorage.setItem('claimStatus', JSON.stringify(claimStatus));

    this.router.navigate(['/ClaimModule/viewClaim']);

  }

  getAllMasterTypeJobsList() {
    var inputData = {
      label: this.selectedClaimType
    }


    this.claimsService.getAllMasterTypeJobsList(inputData)
      .subscribe((res) => {

        if (res["status"] == 1) {

          var result = res['orgs'];
          this.fieldsList = result[0].Fields



        }
      },
        (error: any) => console.log(error)
      );
  }

  onChange(event, quantity) {
    var fieldDate = quantity.value.fieldName.name;

    if (event.value.label === "is between") {
      if (fieldDate.toLowerCase().indexOf('date') !== -1) {
        this.datesFlag = true;
      } else {
        this.datesFlag = false;
      }
    } else {
      this.datesFlag = false;
    }
  }

  downloadPdf() {

    var input = {
      jobType: this.selectedClaimTypeId
    }

    this.claimsService.downloadPdf(input)
      .subscribe((res) => {
        console.log("res downloadpdf",res);
        if (res["status"] == 1) {

        }
      },
        (error: any) => console.log(error)
      );
  }
}
