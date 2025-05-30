import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { MemberCardComponent } from "../member-card/member-card.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MemberCardComponent
]
})
export class MemberListComponent implements OnInit {

  users: User[] = [];
  
  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'];
    })
  }

  // loadUsers(){
  //   this.userService.getUsers().subscribe((users:User[])=>{
  //     this.users = users;
  //   }, error => {
  //     this.alertify.error(error);
  //   })
  // }

}
