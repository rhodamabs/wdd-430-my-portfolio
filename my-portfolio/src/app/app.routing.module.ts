import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectCreateComponent } from './projects/project-create/project-create.component';

const routes : Routes = [
  {path : '', component: ProjectListComponent},
  {path: 'create', component: ProjectCreateComponent},
  {path: 'edit/:projectId', component: ProjectCreateComponent}
]

@NgModule ({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}