import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { HttpParams } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ClaimsService {

    apiURL: string = 'http://raymond.mmcdevops.com:8081/';
    curdate = new Date().getTime()

    constructor(private httpClient: HttpClient) { }

    handleError(error: HttpErrorResponse) {
        return throwError(error.message || 'Server Error!');
    }

    getClaimTypes(): Observable<any> {
        return this.httpClient.get(this.apiURL + 'Services/getMasters?type=cClaimCategories&mallId=3' + '&cache_bust=' + this.curdate);
    }

    getMasterClaimTypes(input): Observable<any> {
        return this.httpClient.get(this.apiURL + 'Services/getMasters?type=' + input.label + '&mallId=3' + '&cache_bust=' + this.curdate);
    }

    findByCredentials(inputData) {
        return this.httpClient.get(this.apiURL + 'MobileAPIs/findByCredentials?username=' + inputData.email + '&password=' + inputData.password);
    }

    getAllMasterTypeJobsList(input) {
        return this.httpClient.get(this.apiURL + 'Services/getMasters?type=allJobTypes|' + input.label + '&mallId=3&dt=CAMPAIGNS' + '&cache_bust=' + this.curdate);
    }

    resetPassword(input) {
        return this.httpClient.get(this.apiURL + 'MobileAPIs/businessUserChangePwd?cPassword=' + input.currentPassword +
            '&nPassword=' + input.newPassword +
            '&nrPassword=' + input.confirmPassword +
            '&email=' + input.email +
            '&remail=' + input.remail);
    }

    updateConsumerJobMetaData(input) {
        return this.httpClient.get(this.apiURL + 'Services/updateConsumerJobMetaData?op=' + input.jobSeqNo +
            '&userId=' + input.userId +
            '&jobId=' + input.jobId);
    }

    getSingleMasterJob(input) {
        return this.httpClient.get(this.apiURL + 'Services/getMasters?jobId=' + input.claimId + '&cache_bust=' + this.curdate);
    }

    getDocumentsStatus(input) {
        var string = this.apiURL + 'api/v2/jobs/status?userId=3&jobTypeId=' + input.typeId
        console.log("string:::", string);
        return this.httpClient.get(this.apiURL + 'api/v2/jobs/status?userId=3&jobTypeId=' + input.typeId + '&cache_bust=' + this.curdate);
    }

    getSingleMallDetails() {
        return this.httpClient.get(this.apiURL + 'Services/getMasters?type=singleMall&mallId=3' + '&cache_bust=' + this.curdate);
    }

    saveSubJob(inputData) {
        var string = this.apiURL + 'MobileAPIs/postedJobs?userId=3' +
            '&consumerEmail=' + inputData.clientEmail +
            '&type=' + inputData.subFormName +
            '&json={"list":' + inputData.subFormList +
            '}&dt=CAMPAIGNS&category=Services&parentJobId=' + inputData.jobId;
        console.log("string::::", string);
        return this.httpClient.get(this.apiURL + 'MobileAPIs/postedJobs?userId=3' +
            '&consumerEmail=' + inputData.clientEmail +
            '&type=' + inputData.subFormName +
            '&json={"list":' + inputData.subFormList +
            '}&dt=CAMPAIGNS&category=Services&parentJobId=' + inputData.jobId);
    }

    saveMainJob(inputData) {
        var string = this.apiURL + 'MobileAPIs/postedJobs?userId=3' +
            '&consumerEmail=' + inputData.clientEmail +
            '&type=' + inputData.subFormName +
            '&json={"list":' + inputData.subFormList +
            '}&dt=CAMPAIGNS&category=Services';

        if (inputData.ItemCode) {
            string = string + '&ItemCode=' + inputData.ItemCode
        }
        console.log("string::::", string);
        return this.httpClient.get(string);
    }

    updateMainJob(inputData) {
        var string = this.apiURL + 'MobileAPIs/updateMultipleProperties?ownerId=3&jobId='+
         inputData.ItemCode +'&jsonString=' + inputData.subFormList;

         console.log("string::",string);

         return this.httpClient.get(this.apiURL + 'MobileAPIs/updateMultipleProperties?ownerId=3&jobId='+
         inputData.jobId +'&jsonString=' + inputData.subFormList);

    }

    getDashboardMenuItems() {
        return this.httpClient.get(this.apiURL + 'Services/getMasters?type=AllCMTabs&mallId=3' + '&cache_bust=' + this.curdate);
    }

    getEmailTemplates() {
        return this.httpClient.get(this.apiURL + 'Services/getMasters?type=EmailNotificationTemplates&mallId=3');
    }

    downloadPdf(inputData) {
        var string = this.apiURL + 'api/reports/jobs/status/download/pdf?jobTypeId=' + inputData.jobType;
        console.log("download pdf api::::", string);
        return this.httpClient.get(this.apiURL + 'api/reports/jobs/status/download/pdf?jobTypeId=' + inputData.jobType);
    }

    removeFileAttachments(inputData) {
        return this.httpClient.get(this.apiURL + 'api/jobs/remove/attachments', inputData);
    }

    addFileAttachments(inputData, headers) {
        return this.httpClient.put(this.apiURL + 'api/jobs/upload/attachments', inputData, headers);
    }

    saveEmailTemplates(inputData) {
        var string = this.apiURL + 'MobileAPIs/postedJobs?userId=3' +
            '&consumerEmail=' + inputData.clientEmail +
            '&type=EmailNotificationTemplates' +
            '&json=' + inputData.emailFormList +
            '&dt=CAMPAIGNS&category=Services';

        if (inputData.ItemCode) {
            string = string + '&ItemCode=' + inputData.ItemCode
        }
        console.log("string::::", string);
        return this.httpClient.get(this.apiURL + 'MobileAPIs/postedJobs?userId=3' +
        '&consumerEmail=' + inputData.clientEmail +
        '&type=EmailNotificationTemplates' +
        '&json=' + inputData.emailFormList +
        '&dt=CAMPAIGNS&category=Services');
    }

}