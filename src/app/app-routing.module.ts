import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OpenPositionComponent } from './open-position/open-position.component';
import { OperationComponent } from './operation/operation.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './shared/sevices/auth-service/auth-guard.service';
import { EmployeeFeedbackComponent } from './employee-feedback/employee-feedback.component';
// import { SharedModule } from './shared/shared.module';

const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'login'},
  {path:'login', component: LoginComponent},
  {path:'sign-up', component: SignUpComponent},
  {path:'open-position', component: OpenPositionComponent, canActivate: [AuthGuard] },
  {path:'operation-account', component: OperationComponent, canActivate: [AuthGuard] },
  {path:'dashboard', component: DashboardComponent, canActivate: [AuthGuard]}, 
  {path:'employeeFeedback', component: EmployeeFeedbackComponent, canActivate: [AuthGuard]}, 
  {path:'**', redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
