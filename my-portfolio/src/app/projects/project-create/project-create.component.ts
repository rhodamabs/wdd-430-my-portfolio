
import {Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm , Validators} from '@angular/forms';
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
  project: Project;
  form: FormGroup;
  private mode = 'create';
  private projectId : string;
  

  constructor(public projectsService: ProjectService, public route: ActivatedRoute){}

  ngOnInit() {
    this.form = new FormGroup({
      'title' : new FormControl(null,{validators: 
        [Validators.required, Validators.minLength(5)]}),
        'content' : new FormControl(null,{validators:[Validators.required,]})
      });
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('projectId')) {
        this.mode ='edit';
        this.projectId = paramMap.get('projectId');
        this.projectsService.getProject(this.projectId)
        .subscribe(project => {
          this.project = {id: project._id, 
            title: project.title,
             content: project.content
            };
            this.form.setValue({title: this.project.title,
               content:this. project.content
              });
        });  
         }else {
        this.mode = 'create';
        this.projectId = null;
      }
    });
  }

  onSaveProject() {
    if (this.form.invalid) {
      return ;
    }
    if (this.mode === 'create') {
      this.projectsService.addProject(this.form.value.id, this.form.value.title, this.form.value.content);
    }else { this.projectsService.updateProject(
        this.projectId,
        this.form.value.title, 
        this.form.value.content
      );
    }
    this.form.reset();
  }

  
 }

