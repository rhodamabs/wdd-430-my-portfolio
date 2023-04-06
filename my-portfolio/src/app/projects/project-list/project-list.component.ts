import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Project } from "../project.model";
import { ProjectService } from "../project.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit , OnDestroy{
 projects: Project[] = [];
 private projectsSub : Subscription;


  constructor(public projectsService: ProjectService){}

  ngOnInit(){
     this.projectsService.getProjects();
     this.projectsSub = this.projectsService.getProjectUpdateListener().subscribe(
        (projects: Project[])=>{
          this.projects = projects;
        }
      );
  }

  onDeleteProject(projectId: string){
   this.projectsService.deleteProject(projectId);
  }

  ngOnDestroy(){
      this.projectsSub.unsubscribe();
  }
}
