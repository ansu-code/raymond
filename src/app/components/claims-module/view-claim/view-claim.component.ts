import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClaimsService } from '../../../services/claims.service';

@Component({
  selector: 'app-view-claim',
  templateUrl: './view-claim.component.html',
  styleUrls: ['./view-claim.component.scss']
})

export class ViewClaimComponent implements OnInit {
  displayBasic: boolean;
  activeState: boolean = false;
  claims: any[];
  selectedClaim: any;
  claimsList: any[];
  value: Date;
  fields: any;
  selectedField: any;
  clonedClaimsLst: any;
  columns: any[];
  selectedColumn: any[];
  first: number = 0;
  globalFilters: any = [];
  selectedColumnsList: any[];
  columnsList: any[];
  selectedClaimType: string = "";
  claimTypeLabel: string = "";
  jobType: any = "";
  jobStatus: any = "";
  claimStatusObj: any;
  fieldsList: any[];
  conditionsList: any[];
  searchForm: FormGroup;
  columnsForTable: any = [];
  exportName = 'Claims';

  constructor(private router: Router, private claimsService: ClaimsService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.fields = [
      { name: 'Dates', code: 'dt' },
      { name: 'Claim No', code: 'nm' },
      { name: 'Net Premium', code: 'np' },
    ];

    this.columnsForTable = [
      {
        field: 'Claim_no',
        header: 'Claim No.'
      },
      {
        field: 'Insurer_name',
        header: 'Insured'
      },
      {
        field: 'Date_of_loss',
        header: 'Date of Loss'
      },
      {
        field: '',
        header: 'Intimation from Insured'
      },
      {
        field: 'Brief Description Of loss',
        header: 'Cause of Loss'
      },
      {
        field: 'Claim Type',
        header: 'Claim Type'
      },
      {
        field: 'Loss_estimate_Or_Claim_amount',
        header: 'Intimated Loss Amount(INR)'
      },
      {
        field: 'Claim_status',
        header: 'Claim Status'
      },
    ]

    this.getClaimTypes();

    this.claimStatusObj = {};

    this.conditionsList= [
      {label: "is", value:"is"},
      {label: "is less than", value:"is less than"},
      {label: "is greater than", value:"is greater than"},
      {label: "is between", value:"is between"},
      {label: "contains", value:"contains"},
      {label: "between", value:"between"}
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
      comparision: [null]
    });
  }

  addQuantity() {
    this.quantities().push(this.newSearchForm());
  }
   
  removeQuantity(i:number) {
    this.quantities().removeAt(i);
  }

  showBasicDialog() {
    this.displayBasic = true;
  }

  registerClaim() {
    var selectedClaim = this.selectedClaimType
    this.router.navigate(['/ClaimModule/registerClaim', selectedClaim]);
  }

  onRowEditInit(claimsrow: any) {
    if (this.claimsList.filter(row => row.isEditable && row.isUpdate == false).length > 0) {
      this.claimsList.splice(0, 1);
    }

    if (this.claimsList.filter(row => row.isEditable).length > 0) {
      const index = this.claimsList.findIndex(data => data['id'] == this.clonedClaimsLst.id);
      this.claimsList[index] = this.clonedClaimsLst;
    }

    this.claimsList.filter(row => row.isEditable).map(r => { r.isEditable = false; return r })
    claimsrow.isEditable = true;

    this.clonedClaimsLst = { ...claimsrow };
  }

  onRowEditCancel(claims: any, index: number) {
    if (!claims.isUpdate) {
      this.claimsList.splice(index, 1);
    } else {

      let clndCGA = this.clonedClaimsLst;
      clndCGA.isEditable = false;
      this.claimsList[index] = clndCGA;
    }
  }

  onRowEditSave(claims: any) {
  }

  getClaimTypes() {
    this.claimsService.getClaimTypes()
      .subscribe((res) => {

        if (res["status"] == 1) {

          var jobs = res.jobs;

          var claimsArray = [];

          console.log("jobs:::", jobs);

          for (var i = 0; i < jobs.length; i++) {           

            this.claimStatusObj = localStorage.getItem('claimStatus');

            console.log("claimStatusObj before:::",this.claimStatusObj)
        
            if (this.claimStatusObj) {
              this.claimStatusObj = JSON.parse(this.claimStatusObj);
              this.selectedClaimType = this.claimStatusObj['claimType'];
              this.claimTypeLabel = this.claimStatusObj['jobType'];
              this.jobType = this.claimStatusObj['jobType'];
              this.jobStatus = this.claimStatusObj['jobStatus'];
        
              console.log("claimStatusObj selectedClaimType:::",this.selectedClaimType)
              console.log("claimStatusObj jobType:::",this.jobType)
              console.log("claimStatusObj jobStatus:::",this.jobStatus)

              if(this.jobStatus == 1) {
                var jobsArray = jobs.filter(j => j.Name === this.selectedClaimType);
                var jobTypeValue = jobsArray[0].jobTypeId;
                this.selectedClaim = { label: this.selectedClaimType, value: jobTypeValue };
              } else if(this.jobStatus == 2) {
                // var jobsArray = jobs.filter(j => j.Name === this.selectedClaimType);
                // var jobTypeValue = jobsArray[0].jobTypeId;
                // this.selectedClaim = { label: this.selectedClaimType, value: jobTypeValue };
              }


        
            } else {
              this.selectedClaimType = jobs[0].Name;
              this.selectedClaim = { label: jobs[0].Name, value: jobs[0].jobTypeId };
            }

            console.log("this.selectedClaimType", this.selectedClaimType);

            var claimObj = {
              label: jobs[i].Name, value: jobs[i].jobTypeId
            }

            claimsArray.push(claimObj);
          }

          this.claims = claimsArray;
          
          console.log("this.claims", this.claims);

          this.getAllMasterTypeJobsList(1);

        }
      },
        (error: any) => console.log(error)
      );

  }

  getAllMasterTypeJobsList(type) {
    this.columns = [];
    console.log("getAllMasterTypeJobsList input::::", this.selectedClaimType)
    var inputData = {
      label: this.selectedClaimType
    }

   
    this.claimsService.getAllMasterTypeJobsList(inputData)
      .subscribe((res) => {

        if (res["status"] == 1) {

          var result = res['orgs'];
          this.fieldsList = result[0].Fields

          this.fieldsList.forEach(element => {
            var fieldObj = {
              field: element.name,
              header: element.name.replace(/_/g, " ")
            }
            
            this.globalFilters.push(element.name);
            this.columns.push(fieldObj);
            this.selectedColumnsList = this.columns;
            this.columnsList = this.columns
          });
          console.log("columns", JSON.stringify(this.columns));

          if(type == 1) {
            this.getMasterClaimTypes();
          }
          
        }
      },
        (error: any) => console.log(error)
      );
  }

  onClaimsChange() {
    this.claimsList = [];
    this.selectedClaimType = this.selectedClaim.label;
    var inputData = {
      label: this.selectedClaimType
    }
    this.claimsService.getMasterClaimTypes(inputData)
      .subscribe((res) => {

        if (res["status"] == 1) {

          this.claimsList = res.jobs;

          console.log("claimsList", JSON.stringify(this.claimsList));

          this.getAllMasterTypeJobsList(2);
        }
      },
        (error: any) => console.log(error)
      );
  }

  getMasterClaimTypes() {
    this.claimsList = [];
    var inputData = {
      label: this.selectedClaimType
    }
    this.claimsService.getMasterClaimTypes(inputData)
      .subscribe((res) => {

        if (res["status"] == 1) {

          console.log("claimsList", JSON.stringify(this.claimsList));

          if(this.jobStatus && this.jobType) {
            var claimList = res.jobs;

            this.claimsList = claimList.filter(c => c.Current_Job_Status === this.jobType)


          } else {
            this.claimsList = res.jobs;
          }

          this.getAllMasterTypeJobsList(2);
        }
      },
        (error: any) => console.log(error)
      );
  }

  goToRegisterClaim(claimId) {
    if(claimId) {
      this.router.navigate(['/ClaimModule/editClaim', this.selectedClaimType, claimId]);      
    } 
  }


}