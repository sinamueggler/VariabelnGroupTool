import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DesignComponent } from './design/design.component';
import { OrganizationComponent } from './stepper/organization/organization.component';
import { ProjectsComponent } from './stepper/projects/projects.component';
import { VariablesComponent } from './stepper/variables/variables.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import { AccessTokenComponent } from './stepper/access-token/access-token.component';
import {MatSelectModule} from '@angular/material/select';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { VariableListComponent } from './stepper/variables/variable-list/variable-list.component';
import { ProjectListComponent } from './stepper/projects/project-list/project-list.component';
import { OrganizationListComponent } from './stepper/organization/organization-list/organization-list.component';








@NgModule({
  declarations: [
    AppComponent,
    DesignComponent,
    OrganizationComponent,
    AccessTokenComponent,
    ProjectsComponent,
    VariablesComponent,
    VariableListComponent,
    ProjectListComponent,
    OrganizationListComponent,
 
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule
  ],

  
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
