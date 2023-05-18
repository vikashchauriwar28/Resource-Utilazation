import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './commonComponent/header/header.component';
import { LoginComponent } from './login/login.component';
import { OpenPositionComponent } from './open-position/open-position.component';
import { InputComponent } from './commonComponent/input/input.component';
import { OperationComponent } from './operation/operation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './shared/auth-guard.service';
import { AuthService } from './shared/sevices/auth.service';
import { EmployeeFeedbackComponent, PizzaPartyAnnotatedComponent } from './employee-feedback/employee-feedback.component';
import {MatTableModule} from '@angular/material/table';
import { MatTableComponent } from './shared/mat-table/mat-table.component';
import { CapitalizeNameDirective } from './shared/capitalize-name.directive';
import { FooterComponent } from './commonComponent/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    OpenPositionComponent,
    InputComponent,
    OperationComponent,
    SignUpComponent,
    DashboardComponent,
    EmployeeFeedbackComponent,
    PizzaPartyAnnotatedComponent,
    MatTableComponent,
    CapitalizeNameDirective,
    FooterComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
