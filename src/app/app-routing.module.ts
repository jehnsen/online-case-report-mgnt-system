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
import { FirearmsListComponent } from './components/firearms-list/firearms-list.component';
import { FirearmsEntryComponent } from './components/firearms-entry/firearms-entry.component';
import { CriminalDrugTestListComponent } from './components/criminal-drug-test-list/criminal-drug-test-list.component';
import { CriminalDrugTestEntryComponent } from './components/criminal-drug-test-entry/criminal-drug-test-entry.component';
import { DangerousDrugsListComponent } from './components/dangerous-drugs-list/dangerous-drugs-list.component';
import { DangerousDrugsEntryComponent } from './components/dangerous-drugs-entry/dangerous-drugs-entry.component';
import { UserUpdatePasswordComponent } from './components/user-update-password/user-update-password.component';
import { CriminalDrugTestViewComponent } from './components/criminal-drug-test-view/criminal-drug-test-view.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'main', canActivate: [AdminGuard], component: MainComponent, children: [
    { path: 'dashboard', component: DashboardComponent},
    { path: 'records', component: CaseListComponent },
    { path: 'records/entry', component: CaseEntryComponent },
    { path: 'records/entry/:id', component: CaseEntryComponent },
    { path: 'records/view/:id', component: CaseViewComponent },
    { path: 'records/manage/categories', component: CaseNaturesEntryComponent },
    { path: 'records/manage/requesting-parties', component: RequesterEntryComponent },
    { path: 'firearms', component: FirearmsListComponent },
    { path: 'firearms/entry', component: FirearmsEntryComponent },
    { path: 'drugtest', component: CriminalDrugTestListComponent },
    { path: 'drugtest/entry', component: CriminalDrugTestEntryComponent },
    { path: 'drugtest/entry/:id', component: CriminalDrugTestEntryComponent },
    { path: 'drugtest/view/:id', component: CriminalDrugTestViewComponent },
    { path: 'drugs', component: DangerousDrugsListComponent },
    { path: 'manage/persons', component: PersonEntryComponent },
    { path: 'manage/dispositions', component: DispositionFormComponent },
    { path: 'users', component: UserListComponent },
    { path: 'users/update-password', component: UserUpdatePasswordComponent },
    { path: 'manage/database', component: DatabaseBackupComponent },
  ]},
  { path: '**', component: FallbackPageComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }