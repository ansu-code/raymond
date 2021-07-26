import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddnewEmailTemplateComponent } from './addnew-email-template/addnew-email-template.component';
import { ConfEmailbasedjobupdateComponent } from './conf-emailbasedjobupdate/conf-emailbasedjobupdate.component';
import { ConfigurationEmailsComponent } from './configuration-emails/configuration-emails.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MasterComponent } from './master/master.component';
import { MastersBrokersComponent } from './masters-brokers/masters-brokers.component';
import { MastersBusinessunitComponent } from './masters-businessunit/masters-businessunit.component';
import { MastersCoinsurerpatternComponent } from './masters-coinsurerpattern/masters-coinsurerpattern.component';
import { MastersCompanyComponent } from './masters-company/masters-company.component';
import { MastersDivisionComponent } from './masters-division/masters-division.component';
import { MastersInsurerComponent } from './masters-insurer/masters-insurer.component';
import { MastersUserComponent } from './masters-user/masters-user.component';
import { PolicymastersCodesComponent } from './policymasters-codes/policymasters-codes.component';
import { PolicymastersNumbersComponent } from './policymasters-numbers/policymasters-numbers.component';
import { PolicymastersRepositoryComponent } from './policymasters-repository/policymasters-repository.component';
import { PolicymastersTypesComponent } from './policymasters-types/policymasters-types.component';
import { PolicymastersYearsComponent } from './policymasters-years/policymasters-years.component';
import { RegisterClaimComponent } from './register-claim/register-claim.component';
import { ReportsComponent } from './reports/reports.component';
import { SupportChatComponent } from './support-chat/support-chat.component';
import { SupportFaqComponent } from './support-faq/support-faq.component';
import { UsersRolesComponent } from './users-roles/users-roles.component';
import { UsersRolesauthorizationComponent } from './users-rolesauthorization/users-rolesauthorization.component';
import { ViewClaimComponent } from './view-claim/view-claim.component';


const routes: Routes = [
  { path: 'ClaimModule',
    component: MasterComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'registerClaim/:selectedClaim', component: RegisterClaimComponent },
      { path: 'editClaim/:selectedClaim/:claimId', component: RegisterClaimComponent },
      { path: 'viewClaim', component: ViewClaimComponent },
      { path: 'masterCompany', component: MastersCompanyComponent },
      { path: 'masterDivision', component: MastersDivisionComponent },
      { path: 'mastersBusinessunit', component: MastersBusinessunitComponent },
      { path: 'policymastersRepository', component: PolicymastersRepositoryComponent },
      { path: 'policymastersNumbers', component: PolicymastersNumbersComponent },
      { path: 'policymastersTypes', component: PolicymastersTypesComponent },
      { path: 'policymastersCodes', component: PolicymastersCodesComponent },
      { path: 'configurationEmails', component: ConfigurationEmailsComponent },
      { path: 'policymastersYears', component: PolicymastersYearsComponent },
      { path: 'mastersBrokers', component: MastersBrokersComponent },
      { path: 'usersRoles', component: UsersRolesComponent },
      { path: 'mastersInsurer', component: MastersInsurerComponent },
      { path: 'mastersCoinsurerpattern', component: MastersCoinsurerpatternComponent },
      { path: 'mastersUser', component: MastersUserComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'supportFaq', component: SupportFaqComponent },
      { path: 'conf_EmailbasedJobUpdate', component: ConfEmailbasedjobupdateComponent },
      { path: 'supportChat', component: SupportChatComponent },
      { path: 'usersRolesAuthorization', component: UsersRolesauthorizationComponent },
      { path: 'addNewEmailTemplate', component: AddnewEmailTemplateComponent },
      
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimsModuleRoutingModule { }
