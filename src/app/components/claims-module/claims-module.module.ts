import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaimsModuleRoutingModule } from './claims-module-routing.module';
import { MasterComponent } from './master/master.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { PrimengImportsModule } from 'src/app/shared/primeng-imports/primeng-imports.module';
import { RegisterClaimComponent } from './register-claim/register-claim.component';
import { ViewClaimComponent } from './view-claim/view-claim.component';
import { MastersCompanyComponent } from './masters-company/masters-company.component';
import { MastersDivisionComponent } from './masters-division/masters-division.component';
import { MastersBusinessunitComponent } from './masters-businessunit/masters-businessunit.component';
import { PolicymastersRepositoryComponent } from './policymasters-repository/policymasters-repository.component';
import { PolicymastersNumbersComponent } from './policymasters-numbers/policymasters-numbers.component';
import { PolicymastersTypesComponent } from './policymasters-types/policymasters-types.component';
import { PolicymastersCodesComponent } from './policymasters-codes/policymasters-codes.component';
import { ConfigurationEmailsComponent } from './configuration-emails/configuration-emails.component';
import { PolicymastersYearsComponent } from './policymasters-years/policymasters-years.component';
import { MastersBrokersComponent } from './masters-brokers/masters-brokers.component';
import { UsersRolesComponent } from './users-roles/users-roles.component';
import { MastersInsurerComponent } from './masters-insurer/masters-insurer.component';
import { MastersCoinsurerpatternComponent } from './masters-coinsurerpattern/masters-coinsurerpattern.component';
import { MastersUserComponent } from './masters-user/masters-user.component';
import { ReportsComponent } from './reports/reports.component';
import { SupportFaqComponent } from './support-faq/support-faq.component';
import { ConfEmailbasedjobupdateComponent } from './conf-emailbasedjobupdate/conf-emailbasedjobupdate.component';
import { AddRowDirective } from './add-row.directive';
import { SupportChatComponent } from './support-chat/support-chat.component';
import { UsersRolesauthorizationComponent } from './users-rolesauthorization/users-rolesauthorization.component';
import { AddnewEmailTemplateComponent } from './addnew-email-template/addnew-email-template.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [MasterComponent, AddRowDirective, DashboardComponent, RegisterClaimComponent, ViewClaimComponent, MastersCompanyComponent, MastersDivisionComponent, MastersBusinessunitComponent, PolicymastersRepositoryComponent, PolicymastersNumbersComponent, PolicymastersTypesComponent, PolicymastersCodesComponent, ConfigurationEmailsComponent, PolicymastersYearsComponent, MastersBrokersComponent, UsersRolesComponent, MastersInsurerComponent, MastersCoinsurerpatternComponent, MastersUserComponent, ReportsComponent, SupportFaqComponent, ConfEmailbasedjobupdateComponent, SupportChatComponent, UsersRolesauthorizationComponent, AddnewEmailTemplateComponent],
  imports: [
    CommonModule,
    ClaimsModuleRoutingModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    PrimengImportsModule,
    NgxFileDropModule,
    GooglePlaceModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  exports: [MasterComponent, AddRowDirective, DashboardComponent, RegisterClaimComponent, ViewClaimComponent, MastersCompanyComponent, MastersDivisionComponent, MastersBusinessunitComponent, PolicymastersRepositoryComponent, PolicymastersNumbersComponent, PolicymastersTypesComponent, PolicymastersCodesComponent, ConfigurationEmailsComponent, PolicymastersYearsComponent, MastersBrokersComponent, UsersRolesComponent, MastersInsurerComponent, MastersCoinsurerpatternComponent, MastersUserComponent, ReportsComponent, SupportFaqComponent, ConfEmailbasedjobupdateComponent],
})
export class ClaimsModuleModule { }
