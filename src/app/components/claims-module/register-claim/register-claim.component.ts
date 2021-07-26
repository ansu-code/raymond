import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ClaimsService } from 'src/app/services/claims.service';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-register-claim',
  templateUrl: './register-claim.component.html',
  styleUrls: ['./register-claim.component.scss']
})

export class RegisterClaimComponent implements OnInit {

  //@ViewChild("placesRef") placesRef : GooglePlaceDirective;
  @ViewChild('places') places: GooglePlaceDirective;
  apiURL: string = 'http://raymond.mmcdevops.com:8081/';
  selectedCity: any;
  cities: any;
  value: Date;
  activeState: boolean = false;
  activeState1: boolean = false;
  activeHistory: boolean = false;
  items: any[];
  claimDetails: any;
  claimsTitle: string = "";
  claimsSubTitle: string = "";
  nextJobStatus: any[];
  jobComments: any[];
  createdSubJobs: any[];
  jobId: number = 0;
  userId: number = 0;
  emptyClaim = {};
  subForm: any = [];
  subFormFlag: boolean = false;
  jobTypeName: any = "";
  claimId: any = "";
  loginEmail: any = "";
  subFormName: any = "";
  formId: any = "";
  fieldsList: any = [];
  selectedClaim: any = "";
  patternEmail: RegExp = /[a-z0-9._-]+@[a-z]+\.[a-z]{3}/;
  blockSpace: RegExp = /[^\s]/;
  email: any = "";
  tomorrow: any;
  uploadedFile: any;
  files: NgxFileDropEntry[] = [];
  jobStatus: any;
  itemsList: any[];
  itemCode: any ="";
  fileUploadForm: FormGroup;

  address: Object;
  establishmentAddress: Object;

  formattedAddress: string;
  formattedEstablishmentAddress: string;
  formSubmit = false;
  groupNamesList: any = [];
  fieldsList1: any = [];
  phone: string;
  userAddress: string = '';
  userLatitude: string = '';
  userLongitude: string = '';
  addMoreData:any=[];

  subfieldsList1: any[];
  subFormGroupNames: any = [];
  subFormFieldsInMainForm: any = [];
  fileAttachments: any = [];
  uploadFiles: any = [];
  subFormNamesInMainForm: any = [];
  fieldCount:any;
  addMoreGroupMap = {};

  constructor(private claimsService: ClaimsService, private activatedRoute: ActivatedRoute, 
    private fb: FormBuilder, private httpClient: HttpClient) {
    var today = new Date();
    this.tomorrow = new Date(today);
    this.tomorrow.setDate(today.getDate() + 1);

    this.initializeFileUploadForm();
  }

  ngOnInit(): void {

    this.claimId = this.activatedRoute.snapshot.paramMap.get('claimId');
    this.selectedClaim = this.activatedRoute.snapshot.paramMap.get('selectedClaim');

    this.getSelectedClaimsData();
    this.newGuid();

    this.itemsList = [
      {label: "Hyderabad", value: "Hyderabad"}
    ]

    this.subfieldsList1 = [];
    this.subFormGroupNames = [];
    this.uploadFiles = [];
  }

  initializeFileUploadForm() {
    this.fileUploadForm = this.fb.group({
      fileUpload: this.fb.array([]),
    });
  }

  newFileUploadForm(): FormGroup {
    return this.fb.group({
      documentType: [null],
      documentName: [null],
      documentDescription: [null],
      files: [null],      
    });
  }

  fileUpload() : FormArray {
    return this.fileUploadForm.get("fileUpload") as FormArray
  }

  addFileUpload() {    
    this.fileUpload().push(this.newFileUploadForm());
  }
   
  removeFileUpload(i:number) {
    this.fileUpload().removeAt(i);
  }

  getSelectedClaimsData() {
    this.items = [];
    this.claimDetails = [];
    console.log("claimId::::", this.claimId);
    console.log("selectedClaim::::", this.selectedClaim);

    this.loginEmail = localStorage.getItem('loginUserName');

    console.log("loginEmail:::", this.loginEmail)

    if (this.claimId && this.selectedClaim) {
      this.getSingleMasterJob(1);
    }
    else if (this.selectedClaim) {
      this.claimsTitle = "CLAIM - REGISTER CLAIM";
      this.claimsSubTitle = "Register a new claim.";

      console.log("claimsTitle:::", this.claimsTitle);

      this.getAllMasterTypeJobsList(2);
    }
  }

  getAllMasterTypeJobsList(type) {
    var input = {
      label: this.selectedClaim
    }

    this.claimsService.getAllMasterTypeJobsList(input)
      .subscribe((res) => {

        if (res["status"] == 1) {

          var result = res['orgs'];
          this.fieldsList = result[0].Fields

          console.log("fieldsList::::", JSON.stringify(this.fieldsList))
          

          this.fieldsList.map(row => {
            row.fieldName = row.name.replace(/_/g, " ")
          });


          if (this.fieldsList) {
            for (var i = 0; i < this.fieldsList.length; i++) {
              var ifContainsSlash = this.fieldsList[i].allowedValues.includes("|");
              var ifContainsQColon = this.fieldsList[i].allowedValues.includes("q:");
              var allowedValuesData: any = [];
              if (ifContainsSlash) {
                var allowedValues1 = this.fieldsList[i].allowedValues.split("|");

                for (var j = 0; j < allowedValues1.length; j++) {
                  var aObj = {
                    value: allowedValues1[j],
                    code: allowedValues1[j]
                  }
                  allowedValuesData.push(aObj);
                }
                console.log("allowedValuesData::", JSON.stringify(allowedValuesData));
              }
              if (ifContainsQColon) {
                var allowedValues2 = this.fieldsList[i].allowedValuesResults;
                console.log("allowedValues2::", JSON.stringify(allowedValues2));
                var result = Object.keys(allowedValues2).map((key) => [(key), allowedValues2[key]]);
                console.log("result", JSON.stringify(result));

                for (var k = 0; k < result.length; k++) {
                  var kObj = {
                    value: result[k][0],
                    code: result[k][1]
                  }
                  allowedValuesData.push(kObj)
                }

              }
              var obj = {
                name: this.fieldsList[i].name,
                fieldName: this.fieldsList[i].name.replace(/_/g, " "),
                type: this.fieldsList[i].type,
                mandatory: this.fieldsList[i].mandatory,
                groupName: this.fieldsList[i].groupName,
                multiselect: this.fieldsList[i].multiselect,
                addMore: this.fieldsList[i].addMore?true:false,
                mask: this.fieldsList[i].mask,
                options: allowedValuesData,
                value: "",
                id:i,
                parent:1
              }
              this.fieldsList1.push(obj)
            }
            console.log("obj123::", JSON.stringify(this.fieldsList1))
          }

          this.fieldsList1.forEach(ele => {
            this.addMoreGroupMap[ele.groupName] = this.addMoreGroupMap[ele.groupName] || ele.addMore;
          });

          this.fieldsList.forEach(element => {
            var duplicateNames = this.groupNamesList.filter(s => s === element.groupName)

            if (duplicateNames.length == 0) {
              this.groupNamesList.push(element.groupName)
            }
          });
          console.log("groupNamesList::::", this.groupNamesList);

          if(type == 1) {

            console.log("fieldsList1 AllMasterTypeJobsList::::", JSON.stringify(this.claimDetails))

            var claimKeys = [];
            claimKeys= Object.keys(this.claimDetails);

            console.log("claimKeys::", claimKeys);

            var key = "";
            for(var a = 0; a < this.fieldsList1.length; a++) {
              key = this.fieldsList1[a]['name'];

              

              if(claimKeys.indexOf(key) !== -1) {
                if(this.fieldsList1[a]['type'] === 'Date') {
                  this.fieldsList1[a].value = new Date(this.claimDetails[key]);
                } else {
                  this.fieldsList1[a].value = this.claimDetails[key];
                }                
              }              
            }

          }

        }
      },
        (error: any) => console.log(error)
      );
  }

  getSingleMasterJob(type) {
    var inputData = {
      claimId: this.claimId
    }

    this.claimsService.getSingleMasterJob(inputData)
      .subscribe(async (res) => {

        if (res["status"] == 1) {

          console.log("getSingleMasterJob res", JSON.stringify(res['jobs']))
          var claimData = res['jobs'];
          this.claimDetails = claimData[0];
          console.log("claimDetails:::", this.claimDetails);
          this.claimsTitle = "CLAIM DETAILS";
          this.claimsSubTitle = "";
          this.nextJobStatus = this.claimDetails.Next_Job_Statuses;
          this.createdSubJobs = this.claimDetails.CreatedSubJobs;
          this.jobComments = this.claimDetails.jobComments;
          this.jobId = this.claimDetails.id;
          this.userId = this.claimDetails.createdById;
          this.jobTypeName = this.claimDetails.jobTypeName;
          this.itemCode =  this.claimDetails.ItemCode;
          this.fileAttachments = this.claimDetails.Attachments;

          console.log("nextJobStatus:::", this.nextJobStatus);
          console.log("fileAttachments:::", this.fileAttachments);

          this.jobComments.sort(function (a, b) {
            return (a.commentId) - (b.commentId);
          });

          this.jobComments.forEach(element => {
            element.comment = element.comment.split("'")[1];
            var previousJobObj = {
              label: element.comment,
              status: 0
            }
            this.items.push(previousJobObj);
          })

          console.log("jobComments:::", this.jobComments);

          var index = this.items.length - 1;

          this.items.splice(index, 1);

          var currentJob = {
            label: this.claimDetails.Current_Job_Status,
            status: 1
          }
          this.items.push(currentJob);

          this.nextJobStatus.forEach(element => {
            var jobObj = {
              label: element.Status_Name,
              status: 2
            }
            this.items.push(jobObj);
          })

          console.log("this.items:::", this.items);

          if (this.createdSubJobs.length != 0) {
            for (var cs = 0; cs < this.createdSubJobs.length; cs++) {

              var apiUrl = this.apiURL + 'Services/getMasters?type=allJobTypes|' + this.createdSubJobs[cs].jobTypeName + '&mallId=3&dt=CAMPAIGNS'
              var result1 = await this.httpClient.get(apiUrl).toPromise();

              console.log("async result:::::", JSON.stringify(result1))

              var orgs = result1['orgs'];
              var subFormFields = orgs[0].Fields;

              console.log("subFormFields:::::", JSON.stringify(subFormFields))

              var subFormKeys = Object.keys(this.createdSubJobs[cs])

              for (var sf = 0; sf < subFormFields.length; sf++) {

                var ifContainsSlash = subFormFields[sf].allowedValues ? subFormFields[sf].allowedValues.includes("|") : null;
                var ifContainsQColon = subFormFields[sf].allowedValues ? subFormFields[sf].allowedValues.includes("q:") : null;
                var allowedValuesData: any = [];
                if (ifContainsSlash) {
                  var allowedValues1 = subFormFields[sf].allowedValues.split("|");

                  for (var j = 0; j < allowedValues1.length; j++) {
                    var aObj = {
                      value: allowedValues1[j],
                      code: allowedValues1[j]
                    }
                    allowedValuesData.push(aObj);
                  }
                  console.log("allowedValuesData::", JSON.stringify(allowedValuesData));
                }
                if (ifContainsQColon) {
                  var allowedValues2 = subFormFields[sf].allowedValuesResults;
                  console.log("allowedValues2::", JSON.stringify(allowedValues2));
                  var result = Object.keys(allowedValues2).map((key) => [(key), allowedValues2[key]]);
                  console.log("result", JSON.stringify(result));

                  for (var k = 0; k < result.length; k++) {
                    var kObj = {
                      value: result[k][0],
                      code: result[k][1]
                    }
                    allowedValuesData.push(kObj)
                  }

                }

                var subFormObj = {
                  name: subFormFields[sf]['name'],
                  fieldName: subFormFields[sf]['name'].replace(/_/g, " "),
                  type: subFormFields[sf].type,
                  mandatory: subFormFields[sf].mandatory,
                  groupName: subFormFields[sf].groupName,
                  multiselect: subFormFields[sf].multiselect,
                  addMore: subFormFields[sf].addMore,
                  mask: subFormFields[sf].mask,
                  options: allowedValuesData,
                  value: "",
                  subFormName: this.createdSubJobs[cs].jobTypeName,
                  parent: 1
                }
                var key = subFormFields[sf]['name'];

                if (subFormKeys.indexOf(key) !== -1) {
                  subFormObj.value = this.createdSubJobs[cs][key];
                }

                this.subFormFieldsInMainForm.push(subFormObj)
              }
              
            }

            this.subFormFieldsInMainForm.forEach(element => {
              var duplicateNames = this.subFormNamesInMainForm.filter(s => s === element.subFormName)
  
              if (duplicateNames.length == 0) {
                this.subFormNamesInMainForm.push(element.subFormName)
              }
            });
            
            console.log("subFormNamesInMainForm:::::", this.subFormNamesInMainForm)
            console.log("subFormFieldsInMainForm:::::", JSON.stringify(this.subFormFieldsInMainForm))
          }

          if(type == 1) {
            this.getAllMasterTypeJobsList(1);
          }         

        }
      },
        (error: any) => console.log(error)
      );
  }

  updateJobStatus(jobStatus, type) {
    this.jobStatus = jobStatus;
    console.log("jobStatus::", this.jobStatus);
    console.log("SeqNo:::", this.jobStatus.Status_Id)
    console.log("jobId:::", this.jobId)
    console.log("userId:::", this.userId)
    this.subfieldsList1 = [];
    this.subFormGroupNames = [];

    if (type == 2) {
      var inputData = {
        jobSeqNo: this.jobStatus.Status_Id,
        jobId: this.jobId,
        userId: this.userId
      }

      console.log("updateConsumerJobMetaData inputData", inputData)

      this.claimsService.updateConsumerJobMetaData(inputData)
        .subscribe((res) => {
          console.log("updatedjobstatus from type 2 res:::", res);
          if (res["status"] == 1) {
            alert(res["msg"]);
            this.getSelectedClaimsData();
            this.subfieldsList1 = [];
          } else {
            alert(res["msg"]);
          }
        },
          (error: any) => console.log(error)
        );
    }
    if (this.jobStatus.Sub_Jobtype_Forms.length != 0) {
      this.subFormName = jobStatus.Sub_Jobtype_Forms[0].Form_Name;
      this.formId = jobStatus.Sub_Jobtype_Forms[0].Form_Id;
      var input = {
        label: this.subFormName
      }

      this.claimsService.getAllMasterTypeJobsList(input)
        .subscribe((res) => {
          console.log("res:::", JSON.stringify(res));
          if (res["status"] == 1) {
            var orgs = res['orgs']
            this.subForm = orgs[0].Fields;

            this.subForm.map(row => {
              row.fieldName = row.name.replace(/_/g, " ")
            });


            if (this.subForm) {
              for (var i = 0; i < this.subForm.length; i++) {
                var ifContainsSlash = this.subForm[i].allowedValues.includes("|");
                var ifContainsQColon = this.subForm[i].allowedValues.includes("q:");
                var allowedValuesData: any = [];
                if (ifContainsSlash) {
                  var allowedValues1 = this.subForm[i].allowedValues.split("|");

                  for (var j = 0; j < allowedValues1.length; j++) {
                    var aObj = {
                      value: allowedValues1[j],
                      code: allowedValues1[j]
                    }
                    allowedValuesData.push(aObj);
                  }
                  console.log("allowedValuesData::", JSON.stringify(allowedValuesData));
                }
                if (ifContainsQColon) {
                  var allowedValues2 = this.subForm[i].allowedValuesResults;
                  console.log("allowedValues2::", JSON.stringify(allowedValues2));
                  var result = Object.keys(allowedValues2).map((key) => [(key), allowedValues2[key]]);
                  console.log("result", JSON.stringify(result));

                  for (var k = 0; k < result.length; k++) {
                    var kObj = {
                      value: result[k][0],
                      code: result[k][1]
                    }
                    allowedValuesData.push(kObj)
                  }

                }
                var obj = {
                  name: this.subForm[i].name,
                  fieldName: this.subForm[i].name.replace(/_/g, " "),
                  type: this.subForm[i].type,
                  mandatory: this.subForm[i].mandatory,
                  groupName: this.subForm[i].groupName,
                  multiselect: this.subForm[i].multiselect,
                  addMore: this.subForm[i].addMore,
                  mask: this.subForm[i].mask,
                  options: allowedValuesData,
                  value: "",
                  parent:1
                }
                this.subfieldsList1.push(obj)
              }
              console.log("obj123::", JSON.stringify(this.subfieldsList1))
            }

            this.subForm.forEach(element => {
              var duplicateNames = this.subFormGroupNames.filter(s => s === element.groupName)

              console.log("duplicateNames", duplicateNames);
              if (duplicateNames.length == 0) {
                this.subFormGroupNames.push(element.groupName)
              }
            });
          }
        },
          (error: any) => console.log(error)
        );
    } else {
      var inputData = {
        jobSeqNo: jobStatus.Status_Id,
        jobId: this.jobId,
        userId: this.userId
      }

      console.log("updateConsumerJobMetaData inputData", inputData)

      this.claimsService.updateConsumerJobMetaData(inputData)
        .subscribe((res) => {
          console.log("updatedjobstatus from else res:::", res);
          if (res["status"] == 1) {
            alert(res["msg"]);
            this.subfieldsList1 = [];
            this.getSelectedClaimsData();
          } else {
            alert(res["msg"]);
          }
        },
          (error: any) => console.log(error)
        );
    }

  }

  subFormSave(value) {

    console.log("valuess::::::", JSON.stringify(value))

    var list = [];
    var key = "";
    var vValue: any;

    var listObj = {};

    value.forEach(element => {

      key = element['name'];
      console.log("key:::::", key);
      vValue = element.value;

      if (typeof (vValue) === "object") {
        vValue = vValue.toString()
      }

      listObj[key] = vValue;

    });

    list.push(listObj);

    console.log("list::", listObj);

    var inputData = {
      userId: this.userId,
      jobId: this.jobId,
      clientEmail: this.loginEmail,
      subFormList: JSON.stringify(list),
      subFormName: this.subFormName
    }

    console.log("valuess::::::", JSON.stringify(inputData))

    this.claimsService.saveSubJob(inputData)
      .subscribe((res) => {
        var result = res['myHashMap'];

        console.log("savesubform res:::", JSON.stringify(res));
        if (result["status"] == 1) {
          alert(result["message"]);
          this.subfieldsList1 = [];
          this.updateJobStatus(this.jobStatus, 2);

        } else {
          alert(res["message"]);
        }
      },
        (error: any) => console.log(error)
      );
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }

  }
  public fileDropInUploadFiles1(files, i) {
    this.uploadFiles[i].files = files.item(0);

  }
  public fileDropInUploadFiles(files: NgxFileDropEntry[], i) {
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }

    this.uploadFiles[i].files = this.files;

  }


  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  finalUploadFiles() {
    console.log("this.uploadFiles:::", JSON.stringify(this.uploadFiles));

    if(this.uploadFiles.length == 0) {
      alert("upload atlease one file");
      return;
    }
    const srcFiles = this.uploadFiles.map(file => {
      return file.files;
    });
    const attachmentFields = this.uploadFiles.map(file => {
      return {
        "documentName": file.documentDescription,
        "documentType": file.documentType,
        "description": file.documentDescription,
        "remarks": ""
        };
    });

    let inputData = {
      jobid: this.jobId,
      orgId: 3,
      srcFile: srcFiles,
      attachmentFields: attachmentFields
    }

    let headers = new HttpHeaders().set('content-type', 'multipart/form-data').set('Access-Control-Allow-Origin', '*');
    
    this.claimsService.addFileAttachments(inputData, { headers: headers })
      .subscribe((res) => {
        console.log("savesubform res:::", res);
      },
        (error: any) => console.log(error)
      );
  }

  handleAddressChange(address: any) {    
    this.userAddress = address.formatted_address;
    console.log("this.userAddress", this.userAddress);
    this.userLatitude = address.geometry.location.lat();
    this.userLongitude = address.geometry.location.lng();
  }
  // onSubmit(registerClamData) {
  //   this.formSubmit = true;
  // }

     newGuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

AddingDetails(data){
if (this.fieldsList1) {
  var id = this.newGuid();
  console.log("id::", id);
 var sameGroupNameData:any=[];
  for (var i = 0; i < this.fieldsList1.length; i++) {
    var ifgroupName = this.fieldsList1[i].groupName==data;
    if(ifgroupName){
      var obj = {
        name: this.fieldsList1[i].name,
        fieldName : this.fieldsList1[i].fieldName,
        type: this.fieldsList1[i].type,
        mandatory: this.fieldsList1[i].mandatory,
        groupName: this.fieldsList1[i].groupName,
        multiselect:this.fieldsList1[i].multiselect,
        addMore: this.fieldsList1[i].addMore,
        mask:this.fieldsList1[i].mask,
        options:this.fieldsList1[i].options,
        id:this.fieldsList1[i].id,
      }
      sameGroupNameData.push(obj);
  
    }
    
  }
  console.log("groupNamesList123::::", JSON.stringify(sameGroupNameData));
  if(sameGroupNameData){

    let showRemove = false;

    sameGroupNameData = sameGroupNameData.filter(
      (data) =>
        (data['addMore'] != null &&
          data['addMore']
            == true )
    );

    let addFielCount = sameGroupNameData.length - 1;
   
    for (var j = 0; j < sameGroupNameData.length; j++) {
     
      // var ifAddMoreName = sameGroupNameData[j].addMore==true;

      // if(ifAddMoreName){

        if(j == addFielCount){
          showRemove = true;
        }
        var aobj = {
          name:sameGroupNameData[j].name,
          fieldName :sameGroupNameData[j].fieldName,
          type:sameGroupNameData[j].type,
          mandatory:sameGroupNameData[j].mandatory,
          groupName:sameGroupNameData[j].groupName,
          addMore: false,
          multiselect:sameGroupNameData[j].multiselect,
          mask:sameGroupNameData[j].mask,
          options:sameGroupNameData[j].options,
          id:id,
          parent:0,
          showRemove:showRemove
          
        }
        this.fieldsList1.push(aobj); 

        this.fieldCount = addFielCount + 1;
       // this.fieldCount = 3;

     // }

    }
    console.log("groupNamesList12345::::", JSON.stringify(this.fieldsList1));
  }
}

}
removeDetails(key){
  this.fieldsList1.forEach((value, index) => {
    if (value.id == key){
      this.fieldsList1.splice(index,this.fieldCount);
      }
  });
}

saveOrUpdateMainForm(mainForm) {

  var list = [];
  var key = "";
  var vValue: any;

  var listObj = {};

  console.log("mainForm::", JSON.stringify(mainForm));

  if(this.itemCode) {
    mainForm.forEach(element => {

      key = element['name'];

      vValue = element.value;

      if (vValue.length != 0 && element.type === "Selection" && element.multiselect === "true") {

        vValue = vValue.toString();
      } 
      listObj[key] = vValue;

    });

    list.push(listObj);

    console.log("list::", JSON.stringify(listObj));

    var inputData = {
      ItemCode: this.itemCode,
      userId: this.userId,
      clientEmail: this.loginEmail,
      subFormList: JSON.stringify(listObj),
      subFormName: this.selectedClaim
    }


    console.log("valuess::::::", JSON.stringify(inputData))

    this.claimsService.updateMainJob(inputData)
      .subscribe((res) => {

        console.log("savesubform res:::", res);


      },
        (error: any) => console.log(error)
      );
  } else {
       
  mainForm.forEach(element => {

    key = element['name'];

    vValue = element.value;

    if (vValue.length != 0 && element.type === "Selection" && element.multiselect === "true") {
      vValue = vValue.toString();
    } 
    listObj[key] = vValue;

  });

  list.push(listObj);

  console.log("list::", JSON.stringify(listObj));

  var input = {
    ItemCode: this.itemCode,
    userId: this.userId,
    clientEmail: this.loginEmail,
    subFormList: JSON.stringify(list),
    subFormName: this.selectedClaim
  }


  console.log("valuess::::::", JSON.stringify(input))

  this.claimsService.saveMainJob(input)
    .subscribe((res) => {

      console.log("savesubform res:::", res);

      var result = res['myHashMap'];

      console.log("savesubform res:::", JSON.stringify(res));
      if (result["status"] == 1) {
        alert(result["message"]);
      } else {
        alert(res["message"]);
      }

    },
      (error: any) => console.log(error)
    );
  }


}

  dateFormat(date) {
    var d = new Date(date);

    var datestring = d.getDate()  + "/" + (d.getMonth()+1) + "/" + d.getFullYear();

    return datestring;
  }

  download(resume_file_path) {
    window.open(
      resume_file_path,
      '_blank' // <- This is what makes it open in a new window.
    );
  }

  removeFile(file) {
    var inputData = {
      attachmentId: Number(file.Id)
    }

    console.log("inputData:::",inputData)

    this.claimsService.removeFileAttachments(inputData)
      .subscribe((res) => {

        console.log("fileDelete res",JSON.stringify(res))

      },
        (error: any) => console.log(error)
      );


  }

  addFiles() {
    this.uploadFiles.push({
      documentType: "", documentName: "", documentDescription: "", files: []
    });
  }

}
