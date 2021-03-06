import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectSummary } from '../../models/projectsummary';
import { User } from '../../models/user';
import {HttpModule} from '@angular/http'
import { TaskServiceService } from '../../Services/Task/task-service.service'
declare var $: any;

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  //Local variable 
  
  item: Project;
  projects: Project[];
  _users: User[];
  UserID: number;
  AllProjectList : Project[];
  
  public sortStartDateASC: boolean = true;
  public sortEndDateASC : boolean = true;
  public sortPriorityASC : boolean = true;
  public sortCompletedASC : boolean = true;
  public title: string = "Add";
  private msg : string;
  
  _ProjectLists: ProjectSummary[];
  _projectGrid: ProjectSummary[];
  constructor(private _ProjectService: TaskServiceService) {
    this.item = new Project();
  }

  // Display the Project Summary based on the input values

  set SearchProjectName(value: string) {
    this._projectGrid = this.filteredTask(value);
  }

  // Sort the grid values based on the start date

  SortStartDate() {
    if (this.sortStartDateASC) {
      this._projectGrid = this._projectGrid.sort(function (a, b) { return a.Start_date < b.Start_date ? -1 : 1 });
      this.sortStartDateASC = false;
    }
    else {
      this._projectGrid = this._projectGrid.sort(function (a, b) { return b.Start_date < a.Start_date ? -1 : 1 });
      this.sortStartDateASC = true;
    }
  }
  
  // Sort the grid values based on the end date

  SortEndDate() {
    if (this.sortEndDateASC) {
      this._projectGrid = this._projectGrid.sort(function (a, b) { return a.End_date < b.End_date ? -1 : 1 });
      this.sortEndDateASC = false;
    }
    else {
      this._projectGrid = this._projectGrid.sort(function (a, b) { return b.End_date < a.End_date ? -1 : 1 });
      this.sortEndDateASC = true;
    }
  }

  // Sort the grid values based on the Priority

  SortPriority() {
    if (this.sortPriorityASC) {
      this._projectGrid = this._projectGrid.sort(
        function (a, b) { return a.Priority - b.Priority });
      this.sortPriorityASC = false;
    }
    else {
      this._projectGrid = this._projectGrid.sort(
        function (a, b) { return b.Priority - a.Priority });
      this.sortPriorityASC = true;
    }
  }

  // Sort the grid values based on the Status

  SortCompleted() {
    if (this.sortCompletedASC) {
      this._projectGrid = this._projectGrid.sort(function (a, b) { return a.CompletedCount - b.CompletedCount });
      this.sortCompletedASC = false;
    }
    else {
      this._projectGrid = this._projectGrid.sort(function (a, b) { return b.CompletedCount - a.CompletedCount });
      this.sortCompletedASC = true;
    }
  }

  // Filter and Display the values based on the input projectname

  filteredTask(searchFilter) {

    return this._ProjectLists.filter(
      e => e.Project_Name.toLowerCase().startsWith(searchFilter.toLowerCase()));
  }

  ngOnInit() {

    $(document).ready(function () {
      $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#userTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
      });
    });

    $(document).ready(function () {

    //Start Date
    var date = new Date();
    var mm = date.getMonth() + 1;
    var dd = date.getDate();
    var year = date.getFullYear();
    var mm1;
    var dd1;

    if (mm < 10) mm1 = ('0' + mm);
    else
      mm1 = mm;

    if (dd < 10) dd1 = '0' + dd;
    else
      dd1 = dd;

    var startDate = year + "-" + mm1 + "-" + dd1;
    $("#txtStartDate").val(startDate);

    //End date
    var newdate = new Date();
    newdate.setDate(date.getDate() + 1);

    var mm = newdate.getMonth() + 1;
    var dd = newdate.getDate();
    var year = newdate.getFullYear();
    var mm1;
    var dd1;

    if (mm < 10) mm1 = ('0' + mm);
    else
      mm1 = mm;

    if (dd < 10) dd1 = '0' + dd;
    else
      dd1 = dd;

    var endDate = year + "-" + mm1 + "-" + dd1;
    $("#txtEndDate").val(endDate);
    this.item.End_date = endDate;
    this.item.Start_date = startDate;

  });

  $('form input[type=checkbox]').change(function()
  {
    //Start Date
    var date = new Date();
    var mm = date.getMonth() + 1;
    var dd = date.getDate();
    var year = date.getFullYear();
    var mm1;
    var dd1;

    if (mm < 10) mm1 = ('0' + mm);
    else
      mm1 = mm;

    if (dd < 10) dd1 = '0' + dd;
    else
      dd1 = dd;

    var startDate = year + "-" + mm1 + "-" + dd1;
    $("#txtStartDate").val(startDate);

    //End date
    var newdate = new Date();
    newdate.setDate(date.getDate() + 1);

    var mm = newdate.getMonth() + 1;
    var dd = newdate.getDate();
    var year = newdate.getFullYear();
    var mm1;
    var dd1;

    if (mm < 10) mm1 = ('0' + mm);
    else
      mm1 = mm;

    if (dd < 10) dd1 = '0' + dd;
    else
      dd1 = dd;

    var endDate = year + "-" + mm1 + "-" + dd1;
    //var endDate = dd1 + "-" + mm1 + "-" + year;
    $("#txtEndDate").val(endDate);
    this.item.End_date = endDate;
    this.item.Start_date = startDate;
    
  });

    $(document).ready(function () {

      $('#btnAdd').click(function () {

        //Required validation for all the mandatory fields

      var isChecked = $('#chkDate').is(":checked");
      //Start date and End date validations
      if (isChecked == true) {
        if ($('#txtEndDate').val() < $('#txtStartDate').val()) {
          alert('Start Date should be less than End Date');
          return;
        }
      }

        if ($('#txtProject').val() == "") {
          alert('Project is required');
          return;
        }
        else if ($('#txtManager').val() == "") {
          alert('Manager Name is required');
          return;
        }      

      });
    });
    
    this.GetSummaryProjects();
  }

 // Get all the user details from database

  GetAllProjects() {
    this._ProjectService.GetAllUsers()
    .subscribe((data: User[]) => { this._users = data });
  }

  // Get the summary of Projects

  GetSummaryProjects() {
    this._ProjectService.GetSummaryProjects()
    .subscribe((data: ProjectSummary[]) => 
    { this._ProjectLists = data, this._projectGrid = data });
  }

  // Get the User Name based on the model pop up window

  GetNames(item: any) {
    this.item.ManagerName = item.First_name;
    this.item.UserID = item.User_ID;
    console.log("names"+this.item.ManagerName);
  }

  //This method add the record into Project table

  Insert(item: Project) {
    if (item.Project_Name != "") {
      if (this.title == "Add") {
        console.log('INSERT IN');
        this._ProjectService.InsertProject(item)
        .subscribe((data) => { this.ngOnInit(), alert(data) });
      }
      else {
        console.log('into update project')
        this._ProjectService.UpdateProject(item)
        .subscribe((data) => { this.ngOnInit(), alert(data) });
      }
    }
  }

  //Reset the some default value

  Reset() {
    this.title = "Add";
  }

  //THis method is update the values into Project table

  Update(item: any) {

    this._ProjectService.GetProject(item._id)
        .subscribe((data: Project) => { this.item = data });
    this.title = "Update";
  }

  Suspend(id : any)
  {
    //var data = this.AllProjectList;
    console.log("suspend" + id);
    var project = this.projects;
    this._ProjectService.DeleteProject(id)
    .subscribe(data =>{
      if(data.n==1)
      {
        for (var i =0; i< project.length;i++)
        {
          if(project[i]._id == id)
          {
            project.splice(i,1);
          }
        }
      }
    });

   /*this._ProjectService.DeleteProject(_id)
      .subscribe(data => {
        if(data.n==1)
        {
          for (var i =0; i< project.length;i++)
          {
            if(project[i]._id == projectid)
            {
              project.splice(i,1);
            }
          };*/
 
  }

  
}
