import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClaimsService } from 'src/app/services/claims.service';

@Component({
  selector: 'app-configuration-emails',
  templateUrl: './configuration-emails.component.html',
  styleUrls: ['./configuration-emails.component.scss']
})
export class ConfigurationEmailsComponent implements OnInit {
  
  emailTemplatesList: any[];
  emailTemplates: any[];
  emailBodyTemplate: any;

  constructor(private router: Router,  private claimsService: ClaimsService) { }
  
  ngOnInit(): void {
    this.getEmailTemplates();
  }

  conf_EmailbasedJobUpdate() {
    this.router.navigate(['/ClaimModule/conf_EmailbasedJobUpdate']);
  }

  addNewEmailTemplate() {
    this.router.navigate(['/ClaimModule/addNewEmailTemplate']);
  }

  currDiv: string = 'A';

  ShowDiv(divVal: string) {
    this.currDiv = divVal; 
  }
  
  getEmailTemplates() {
    this.emailTemplatesList = [];
    this.claimsService.getEmailTemplates()
    .subscribe((res) => {
      if (res["status"] == 1) {
        this.emailTemplates = res['jobs'];

        this.emailTemplates.forEach(element => {
          this.emailTemplatesList.push(element.Name)
        });

      }
    },
      (error: any) => console.log(error)
    );
  }

  showEmailTemplate(emailTemplateName) {
    var emailTemplate = this.emailTemplates.filter(e => e.Name === emailTemplateName);

    if(emailTemplate.length!=0) {
      this.emailBodyTemplate = emailTemplate[0]['Email Body'];

      console.log("emailTemplates", this.emailBodyTemplate);
    }
  }
}
