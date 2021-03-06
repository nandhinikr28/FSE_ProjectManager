import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { TaskServiceService } from '../../Services/Task/task-service.service'
declare var $: any;

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  item: User;
  _users: User[];
  UserID: number;
  AllUserList : User[];
  public sortFirstNameASC: boolean = true;
  public sortLastNameASC : boolean = true;
  public sortEmployeeIdASC : boolean = true;
  public title: string = "Add User";
  _UserLists: User[];
  _UserGrid: User[];

  constructor(private _UserService: TaskServiceService) {
    this.item = new User();
  }

  // Display the User Summary based on the input values

  set SearchUserName(value: string) {
    this._UserGrid = this.filteredTask(value);
  }

  // Sort the grid values based on the start date

  SortFirstName() {
    if (this.sortFirstNameASC) {
      this._UserGrid = this._UserGrid.sort(function (a, b) { return a.First_name < b.First_name ? -1 : 1 });
      this.sortFirstNameASC = false;
    }
    else {
      this._UserGrid = this._UserGrid.sort(function (a, b) { return b.First_name < a.First_name ? -1 : 1 });
      this.sortFirstNameASC = true;
    }
  }
  
  // Sort the grid values based on the end date

  SortLastName() {
    if (this.sortLastNameASC) {
      this._UserGrid = this._UserGrid.sort(
        function (a, b) { return a.Last_name < b.Last_name ? -1 : 1 });
      this.sortLastNameASC = false;
    }
    else {
      this._UserGrid = this._UserGrid.sort(
        function (a, b) { return b.Last_name < a.Last_name ? -1 : 1 });
      this.sortLastNameASC = true;
    }
  }

  // Sort the grid values based on the Priority

  SortEmployeeId() {
    console.log('Inside sorting emp id');
    if (this.sortEmployeeIdASC) {
      this._UserGrid = this._UserGrid.sort(
        function (a, b) { return a.Employee_ID - b.Employee_ID});
      this.sortEmployeeIdASC = false;
    }
    else {
      this._UserGrid = this._UserGrid.sort(
        function (a, b) { return b.Employee_ID - a.Employee_ID });
      this.sortEmployeeIdASC = true;
    }
  }

  // Filter and Display the values based on the input Username

  filteredTask(searchFilter) {
console.log(searchFilter.toLowerCase());
    return this._UserLists.filter(
      e => e.First_name.toLowerCase().startsWith(searchFilter.toLowerCase()));
  }

  ngOnInit() {

    $(document).ready(function () {

      $('#btnAdd').click(function () {

        //Required validation for all the mandatory fields

        if ($('#firstName').val() == "") {
          alert('First Name is required');
          return;
        }
        else if ($('#lastName').val() == "") {
          alert('Last Name is required');
          return;
        }
        else if ($('#employeeID').val() == "") {
          alert('Employee ID is required');
          return;
        }
      });
    });

    this.GetSummaryUsers();
  }

  // Get all the user details from database

  GetAllUsers() {
    this._UserService.GetAllUsers()
    .subscribe((data: User[]) => { this._users = data });
  }

  GetSummaryUsers() {
    this._UserService.GetSummaryUsers()
    .subscribe((data: User[]) => { this._UserLists = data, this._UserGrid = data });
  }

  
  //This method add the record into User table

  Insert(item: User) {
    console.log('Inside insert user');
    item.User_ID = item._id;
    if (item.First_name != "" && item.Last_name != "") {
      if (this.title == "Add User") {
        this._UserService.InsertUser(item)
        .subscribe((data) => { this.ngOnInit(), alert(data) });
      }
      else {
        this._UserService.UpdateUser(item).subscribe((data) => { this.ngOnInit(), alert(data) });
      }
    }
  }

  //Reset the some default value

  Reset() {
    this.title = "Add User";
  }

  //THis method is to update the values into User table

  Update(item: any) {

    console.log("update user");
    this._UserService.GetUser(item._id)
        .subscribe((data: User) => { this.item = data });
    this.title = "Update";
  }
  Suspend(id : any)
  {
    
    console.log("suspend user : " + id);
    var user = this._users;
    this._UserService.DeleteUser(id)
    .subscribe(data =>{
      if(data.n==1)
      {
        for (var i =0; i< user.length;i++)
        {
          if(user[i]._id == id)
          {
            user.splice(i,1);
          }
        }
      }
    });

  }



}
