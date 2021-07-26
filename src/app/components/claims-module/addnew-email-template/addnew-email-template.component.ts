import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClaimsService } from 'src/app/services/claims.service';

@Component({
  selector: 'app-addnew-email-template',
  templateUrl: './addnew-email-template.component.html',
  styleUrls: ['./addnew-email-template.component.scss']
})
export class AddnewEmailTemplateComponent implements OnInit {
  val: number;
  activeState: boolean = false;
  emailTemplateForm: FormGroup;
  loginEmail: any = '';
  text1: string = '<div>Hello World!</div><div>PrimeNG <b>Editor</b> Rocks</div><div><br></div>';

  constructor(private formBuilder: FormBuilder, private claimsService: ClaimsService) { 
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loginEmail = localStorage.getItem('loginUserName');

    console.log("loginEmail:::", this.loginEmail)
  }

  initializeForm() {
    this.emailTemplateForm = this.formBuilder.group({
      EmailTemplateName: [null],
      FromEmail: [null],
      Subject: [null],
      EmailBody: [null]
    });
  }

  submitEmailTemplate(value) {
    console.log("value", JSON.stringify(value));
    
    var list = [];
  
    list.push(value);
  
    var input = {
      //userId: this.userId,
      clientEmail: this.loginEmail,
      subFormList: JSON.stringify(list),
      subFormName: 'EmailNotificationTemplates'
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
