import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { AppComponent } from './app.component';
import { SidebarMenuComponent } from './components/layouts/sidebar-menu/sidebar-menu.component';
import { NavbarComponent } from './components/layouts/navbar/navbar.component';
import { ControlSidebarComponent } from './components/layouts/control-sidebar/control-sidebar.component';
import { NavbarSearchComponent } from './components/layouts/navbar-search/navbar-search.component';
import { NotificationDropdownComponent } from './components/layouts/notification-dropdown/notification-dropdown.component';
import { MessagesDropdownComponent } from './components/layouts/messages-dropdown/messages-dropdown.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { PageHeaderComponent } from './components/layouts/page-header/page-header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainComponent } from './pages/main/main.component';
import { CaseListComponent } from './components/case-list/case-list.component';
import { LoginComponent } from './pages/login/login.component';
import { FallbackPageComponent } from './pages/fallback-page/fallback-page.component';
import { CaseEntryComponent } from './components/case-entry/case-entry.component';
import { EvidenceListComponent } from './components/evidence-list/evidence-list.component';
import { PhotosListComponent } from './components/photos-list/photos-list.component';
import { CaseViewComponent } from './components/case-view/case-view.component';
import { DataService } from './services/data.service';
import { ControlMessagesComponent } from './components/control-messages/control-messages.component';
import { PartiesComponent } from './components/parties/parties.component';
import { PersonComponent } from './components/person/person.component';
import { SuspectComponent } from './components/suspect/suspect.component';
import { PhotoUploaderComponent } from './components/photo-uploader/photo-uploader.component';
import { FileViewerComponent } from './components/file-viewer/file-viewer.component';
import { CaseStatusComponent } from './components/case-status/case-status.component';
import { PersonEntryComponent } from './components/person-entry/person-entry.component';
import { RequesterEntryComponent } from './components/requester-entry/requester-entry.component';
import { CaseNaturesEntryComponent } from './components/case-natures-entry/case-natures-entry.component';
import { ModalRequestingPartiesComponent } from './components/modals/modal-requesting-parties/modal-requesting-parties.component';
import { ModalSelectPersonsComponent } from './components/modals/modal-select-persons/modal-select-persons.component';
import { DispositionFormComponent } from './components/disposition-form/disposition-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ModalUserRegistrationComponent } from './components/modals/modal-user-registration/modal-user-registration.component';
import { DatabaseBackupComponent } from './components/database-backup/database-backup.component';
import { FirearmsListComponent } from './components/firearms-list/firearms-list.component';
import { FirearmsEntryComponent } from './components/firearms-entry/firearms-entry.component';
import { CriminalDrugTestListComponent } from './components/criminal-drug-test-list/criminal-drug-test-list.component';
import { CriminalDrugTestEntryComponent } from './components/criminal-drug-test-entry/criminal-drug-test-entry.component';
import { DangerousDrugsListComponent } from './components/dangerous-drugs-list/dangerous-drugs-list.component';
import { DangerousDrugsEntryComponent } from './components/dangerous-drugs-entry/dangerous-drugs-entry.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { RequiredMarkerComponent } from './components/validations/required-marker/required-marker.component';
import { UserUpdatePasswordComponent } from './components/user-update-password/user-update-password.component';
import { CriminalDrugTestViewComponent } from './components/criminal-drug-test-view/criminal-drug-test-view.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { CaseReportsComponent } from './components/case-reports/case-reports.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarMenuComponent,
    NavbarComponent,
    ControlSidebarComponent,
    NavbarSearchComponent,
    NotificationDropdownComponent,
    MessagesDropdownComponent,
    FooterComponent,
    PageHeaderComponent,
    DashboardComponent,
    MainComponent,
    CaseListComponent,
    LoginComponent,
    FallbackPageComponent,
    CaseEntryComponent,
    EvidenceListComponent,
    PhotosListComponent,
    CaseViewComponent,
    ControlMessagesComponent,
    PartiesComponent,
    PersonComponent,
    SuspectComponent,
    PhotoUploaderComponent,
    FileViewerComponent,
    CaseStatusComponent,
    PersonEntryComponent,
    RequesterEntryComponent,
    CaseNaturesEntryComponent,
    ModalRequestingPartiesComponent,
    ModalSelectPersonsComponent,
    DispositionFormComponent,
    UserListComponent,
    ModalUserRegistrationComponent,
    DatabaseBackupComponent,
    FirearmsListComponent,
    FirearmsEntryComponent,
    CriminalDrugTestListComponent,
    CriminalDrugTestEntryComponent,
    DangerousDrugsListComponent,
    DangerousDrugsEntryComponent,
    PageTitleComponent,
    RequiredMarkerComponent,
    UserUpdatePasswordComponent,
    CriminalDrugTestViewComponent,
    UserEditComponent,
    CaseReportsComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot()// ToastrModule added,
  ],
  providers: [authInterceptorProviders, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
