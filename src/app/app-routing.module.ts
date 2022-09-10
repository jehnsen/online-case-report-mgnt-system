import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './helpers/admin.guard';
import { CaseEntryComponent } from './components/case-entry/case-entry.component';
import { CaseListComponent } from './components/case-list/case-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FallbackPageComponent } from './pages/fallback-page/fallback-page.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { CaseViewComponent } from './components/case-view/case-view.component';
import { CaseNaturesEntryComponent } from './components/case-natures-entry/case-natures-entry.component';
import { RequesterEntryComponent } from './components/requester-entry/requester-entry.component';
import { PersonEntryComponent } from './components/person-entry/person-entry.component';
import { DispositionFormComponent } from './components/disposition-form/disposition-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { DatabaseBackupComponent } from './components/database-backup/database-backup.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'main', canActivate: [AdminGuard], component: MainComponent, children: [
    { path: 'dashboard', component: DashboardComponent},
    { path: 'cases', component: CaseListComponent },
    { path: 'cases/entry', component: CaseEntryComponent },
    { path: 'cases/entry/:id', component: CaseEntryComponent },
    { path: 'cases/view/:id', component: CaseViewComponent },
    { path: 'cases/manage/categories', component: CaseNaturesEntryComponent },
    { path: 'cases/manage/requesting-parties', component: RequesterEntryComponent },
    { path: 'manage/persons', component: PersonEntryComponent },
    { path: 'manage/dispositions', component: DispositionFormComponent },
    { path: 'users', component: UserListComponent },
    { path: 'manage/database', component: DatabaseBackupComponent },
  ]},
  { path: '**', component: FallbackPageComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
