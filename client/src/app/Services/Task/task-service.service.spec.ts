import { TaskServiceService } from './task-service.service';
import { TestBed,inject } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import {HttpClient} from '@angular/common/http'
import {MockBackend} from '@angular/http/testing'
import { Http } from '@angular/http';
import { HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

import { Task } from '../../models/task';
import { Project } from '../../models/project';
import {ProjectSummary} from '../../models/projectsummary';
import {User} from '../../models/user';

import { HttpModule,Response } from '@angular/http';

describe('TaskServiceService', () => {

  let service: TaskServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,HttpModule, 
      RouterModule, RouterTestingModule],
      providers: [TaskServiceService,{provide:HttpClientModule,deps:MockBackend}]
    });
    service = TestBed.get(TaskServiceService);
    httpMock = TestBed.get(HttpTestingController);
    });

  it('should be created', () => {
    const service: TaskServiceService = TestBed.get(TaskServiceService);
    expect(service).toBeTruthy();
  }); 

 /* it('Service should check with Dummy post from api via get method', ()=>{
    var date = new Date('2019-04-02');
    const dummyPost: Task[] = [
        {
          _id:"5ca2f4bdd7d6b8044c1037eb",
          Project_Id:1,
          Project_Name:'abc',
          TaskName:'task1',
          Priority:22,
          IsParent:true,
          Parent_Task:'Task',
          Start_date:date,
          End_date:date,
          User_ID:1,
          User:'nandhini',
          Deleted:false,
          Status:'Completed'
        }
    ];

service.GetTask("_id").subscribe(post => {
  expect(post.TaskName).toBe(dummyPost.find(i=>i.TaskName == 'task1').TaskName);

  });
  }); */

});
