import { Component, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { ClaimsService } from 'src/app/services/claims.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

  items: MegaMenuItem[];
  opened: boolean = true;
  mobileItems: MenuItem[];
  settingsMenu: MenuItem[];
  organizationDetails: any[];
  imageLogo: any = "";

  constructor(private claimsService: ClaimsService) { }

  ngOnInit(): void {

    this.items = [
      {
        label: "Dashboard", icon: 'pi pi-fw pi-desktop', routerLink: '/ClaimModule/dashboard',       
      },
      {
        label: "Claims", routerLink: '/ClaimModule/viewClaim', icon: 'pi pi-fw pi-th-large', routerLinkActiveOptions: 'true',
      },
      // {
      //   label: "Configuration and Settings", routerLink: '', icon: 'pi pi-fw pi-sitemap',
      //   items: [
      //     [{
      //       label: 'Organization',
      //       items: [
      //         { label: 'Company', routerLink: '/ClaimModule/masterCompany' },
      //         { label: 'Division', routerLink: '/ClaimModule/masterDivision' },
      //         { label: 'Business Unit', routerLink: '/ClaimModule/mastersBusinessunit' },
      //       ]
      //     },
      //     {
      //       label: 'User Administration',
      //       items: [
      //         { label: 'Users', routerLink: '/ClaimModule/mastersUser' },
      //         { label: 'Roles', routerLink: '/ClaimModule/usersRoles' },
      //       ]
      //     },
      //     ],
      //     [
      //       {
      //         label: 'Policy',
      //         items: [
      //           { label: 'Policy Repository', routerLink: '/ClaimModule/policymastersRepository' },
      //           { label: 'Policy Numbers', routerLink: '/ClaimModule/policymastersNumbers' },
      //           { label: 'Policy Types', routerLink: '/ClaimModule/policymastersTypes' },
      //           { label: 'Policy Codes', routerLink: '/ClaimModule/policymastersCodes' },
      //           { label: 'Policy Years', routerLink: '/ClaimModule/policymastersYears' },
      //         ]
      //       },],
      //     [
      //       {
      //         label: 'Insurer',
      //         items: [
      //           { label: 'Insurer', routerLink: '/ClaimModule/mastersInsurer' },
      //           { label: 'Co-Insurance Pattern', routerLink: '/ClaimModule/mastersCoinsurerpattern' },
      //         ]
      //       },],
      //     [
      //       {
      //         label: 'Broker',
      //         items: [
      //           { label: 'Broker', routerLink: '/ClaimModule/mastersBrokers' },
      //         ]
      //       }]

      //   ],
      // },
      {
        label: "Reports", routerLink: '/ClaimModule/reports', icon: 'pi pi-fw pi-chart-line',
      },
       {
         label: "Happy to help", icon: 'pi pi-fw pi-map', styleClass: 'menuHeading',
         items: [
          [{
            label: 'Support',
            items: [
             /*  { label: 'Chat', routerLink: '' },
              { label: 'User Manual', routerLink: '' },
              { label: 'Raise Ticket', routerLink: '' }, */
              { label: 'FAQs', routerLink: '/ClaimModule/supportFaq' },
            ]
          },
          ], [
            {
              label: 'Configuration',
              items: [
                { label: 'Emails', routerLink: '/ClaimModule/configurationEmails' },
                // { label: 'Alerts', routerLink: '' },
                // { label: 'Claim Workflow', routerLink: '' },
                // { label: 'Claim Forms', routerLink: '' }, 
              ]
            },]
        ]
      }

    ];

    this.mobileItems = [
      {
        label: "Dashboard", icon: 'pi pi-fw pi-desktop', routerLink: '/ClaimModule/dashboard', routerLinkActiveOptions: 'true',  
      },
      {
        label: "Claims", routerLink: '/ClaimModule/viewClaim', icon: 'pi pi-fw pi-th-large', routerLinkActiveOptions: 'true',
      },
      // {
      //   label: "Configuration and Settings", routerLink: '', icon: 'pi pi-fw pi-sitemap',
      //   items: [
      //     {
      //       label: 'Organization',
      //       items: [
      //         { label: 'Company', routerLink: '/ClaimModule/masterCompany' },
      //         { label: 'Division', routerLink: '/ClaimModule/masterDivision' },
      //         { label: 'Business Unit', routerLink: '/ClaimModule/mastersBusinessunit' },
      //       ]
      //     },
      //     {
      //       label: 'User Administration',
      //       items: [
      //         { label: 'Users', routerLink: '/ClaimModule/mastersBrokers' },
      //         { label: 'Roles', routerLink: '/ClaimModule/usersRoles' },
      //       ]
      //     },

      //     {
      //       label: 'Policy',
      //       items: [
      //         { label: 'Policy Repository', routerLink: '/ClaimModule/policymastersRepository' },
      //         { label: 'Policy Numbers', routerLink: '/ClaimModule/policymastersNumbers' },
      //         { label: 'Policy Types', routerLink: '/ClaimModule/policymastersTypes' },
      //         { label: 'Policy Codes', routerLink: '/ClaimModule/policymastersCodes' },
      //         { label: 'Policy Years', routerLink: '/ClaimModule/policymastersYears' },
      //       ]
      //     },
      //     {
      //       label: 'Insurer',
      //       items: [
      //         { label: 'Insurer', routerLink: '/ClaimModule/mastersInsurer' },
      //         { label: 'Co-Insurance Pattern', routerLink: '/ClaimModule/mastersCoinsurerpattern' },
      //       ]
      //     },
      //     {
      //       label: 'Broker',
      //       items: [
      //         { label: 'Broker', routerLink: '/ClaimModule/mastersBrokers' },
      //       ]
      //     }],
      // },
      {
        label: "Reports", routerLink: '/ClaimModule/reports', icon: 'pi pi-fw pi-chart-line',
      },
      {
        label: "Happy to help", icon: 'pi pi-fw pi-map', routerLink: '',
        items: [
          {
            label: 'Support',
            items: [
             /*  { label: 'Chat', routerLink: '' },
              { label: 'User Manual', routerLink: '' },
              { label: 'Raise Ticket', routerLink: '' }, */
              { label: 'FAQs', routerLink: '/ClaimModule/supportFaq' },
            ]
          },

          {
            label: 'Configuration',
            items: [
              { label: 'Emails', routerLink: '/configurationEmails' },
              /* { label: 'Alerts', routerLink: '' },
              { label: 'Claim Workflow', routerLink: '' },
              { label: 'Claim Forms', routerLink: '' }, */
            ]
          },
        ]
      }

    ];

    this.settingsMenu = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
      },

    ];

    this.getSingleMallDetails();
    this.getDashboardMenuItems();
  }

  logoutUser() {

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

  getDashboardMenuItems() {    
    this.claimsService.getDashboardMenuItems()
    .subscribe((res) => {
      console.log("dashboard res",JSON.stringify(res));

      if (res["status"] == 1) {

        var dashboardIcons = res['jobs'];

        console.log("dashboardIcons", JSON.stringify(dashboardIcons));

        var iconItems = [];

        dashboardIcons.forEach(element => {
          var items = [];
          items['label'] = element.ParentSubTab

          if(element.ParentTab !== "" || element.ParentTab !== undefined || element.ParentTab !== null) {
            var parentItems = {};

            parentItems['label'] = element.ParentTab

            items.push(parentItems);
          }
          
          iconItems.push(items);
        });

        console.log("iconItems", JSON.stringify(iconItems));

      }
    },
      (error: any) => console.log(error)
    );
  }

}
