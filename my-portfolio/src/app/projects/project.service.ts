import { Project } from './project.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class ProjectService  {
  private projects : Project[] = [];
  private projectUpdated = new Subject<Project[]>();

  constructor( private http: HttpClient, private route: Router) {}

  getProjects() {
    this.http.get<{message: string; projects: any;}>
    ('http://localhost:3000/api/projects')
    .pipe(map((projectData) =>{
      return projectData.projects.map(project => {
          return {
            title:project.title,
            content: project.content,
            id: project._id
          };
        });
    }))
    .subscribe((transformedProjects) => {
      this.projects = transformedProjects;
      this.projectUpdated.next([...this.projects]);
    });
  }

  getProjectUpdateListener(){
    return this.projectUpdated.asObservable();
  }

  getProject(id: string) {
    return this.http.get<{_id:string,title:string,content:string}>
    ('http://localhost:3000/api/projects/' + id,);
  }

  addProject(id: string, title: string, content:string) {
    const project: Project = {id: null,title: title, content: content};
    this.http.post<{message: string, projectId: string}>('http://localhost:3000/api/projects',project)
    .subscribe(responseData => {
      const id = responseData.projectId;
      project.id = id;
      this.projects.push(project);
      this.projectUpdated.next([...this.projects]);
      this.route.navigate(['/']);
    });
  }

  updateProject(id:string, title: string, content:string) {
    const project: Project = {id:id, title:title, content:content};
    this.http.patch('http://localhost:3000/api/projects/' + id, project)
    .subscribe(response => {
      const updatedProjects = [...this.projects];
      const oldProjectIndex = updatedProjects.findIndex(p => p.id === project.id);
      updatedProjects[oldProjectIndex] = project;
      this.projects = updatedProjects;
      this.projectUpdated.next([...this.projects]);
      this.route.navigate(['/']);
    });
  }

  deleteProject(projectId: string){
    this.http.delete('http://localhost:3000/api/projects/' + projectId)
    .subscribe(() => {
      const updatedProjects = this.projects.
      filter(project => project.id !== projectId);
      this.projects = updatedProjects;
      this.projectUpdated.next([...this.projects]);
    });
  }
}
