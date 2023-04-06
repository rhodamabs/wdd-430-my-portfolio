
import {Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProjectService } from '../project.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Project } from '../project.model';



 @Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
 })
 export class ProjectCreateComponent implements OnInit{
  enteredTitle ='';
  enteredContent = '';
  private mode = 'create';
  private projectId : string;
  project: Project;

  constructor(public projectsService: ProjectService, public route: ActivatedRoute){}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('projectId')) {
        this.mode ='edit';
        this.projectId = paramMap.get('projectId');
        this.projectsService.getProject(this.projectId)
        .subscribe(project => {
          this.project = {id: project._id, title: project.title, content: project.content};
        })      }else {
        this.mode = 'create';
        this.projectId = null;
      }
    });
  }

  onSaveProject(form: NgForm) {
    if (form.invalid) {
      return ;
    }
    if (this.mode === 'create') {
      this.projectsService.addProject(form.value.id,form.value.title, form.value.content);
    }else { this.projectsService.updateProject(
        this.projectId,
        form.value.title, 
        form.value.content
      );
    }
    form.resetForm();
  }

  
 }

