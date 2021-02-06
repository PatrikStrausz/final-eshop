import { Router } from '@angular/router';
import { SnackbarService } from './../../../services/snackbar.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { User } from 'src/app/models/user.model';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements AfterViewInit {


  usersDataSource = new MatTableDataSource<User>();


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;

  columns = ['id', 'username', 'email', 'role', 'actions'];

  constructor(
    private userService: UserServiceService,
    private snackbarService: SnackbarService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {

    this.usersDataSource.sort = this.sort;
    this.usersDataSource.paginator = this.paginator


    this.userService.getAllUsers().subscribe((users) => {
      this.usersDataSource.data = users;
    });

  }

  deleteUser(user: User) {
    this.userService.deleteUser(user).subscribe((_) => {
      this.snackbarService.successMessage(user.username + ' has been deleted'),
        this.router.navigateByUrl('/admin/users');
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.usersDataSource.filter = filterValue.trim().toLowerCase();
  }




}
