import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseEntryComponent } from './components/case-entry/case-entry.component';
import { CaseListComponent } from './components/case-list/case-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FallbackPageComponent } from './pages/fallback-page/fallback-page.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: MainComponent, children: [
    { path: 'dashboard', component: DashboardComponent},
    { path: 'cases', component: CaseListComponent },
    { path: 'cases/entry', component: CaseEntryComponent }
  ]},
  { path: '**', component: FallbackPageComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
