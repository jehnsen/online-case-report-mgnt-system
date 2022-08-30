import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
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
    ToastrModule.forRoot() // ToastrModule added,
    
  ],
  providers: [authInterceptorProviders, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
