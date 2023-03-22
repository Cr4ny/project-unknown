import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Enduser} from "../../interfaces/enduser";
import {Game} from "../../interfaces/game";
import {HttpClient} from "@angular/common/http";
import {LocalStorageService} from "ngx-webstorage";
import {TimerService} from "../../services/timer.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']

})
export class NavbarComponent implements OnInit{
  isLoggedIn: boolean | undefined;
  username: string|any;
  role?:string;

  enduser?:Enduser;
  fileInput: any;
  timerValue: number=60;

  isPlaying: boolean = false;
  constructor(
    private authService: AuthService,
    private timerService: TimerService,
    private router: Router,
    private http:HttpClient,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit() {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.authService.role.subscribe((data: string) => this.role = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUsername();
    this.role = this.authService.getRole();
    this.authService.getUserByUsername(this.username).subscribe((user: Enduser) => {
      this.enduser = user;
      console.log(this.enduser?.username);});
    this.timerService.timer$.subscribe((value: number) => {
      this.timerValue = value;
    });
    this.timerService.isPlaying$.subscribe((value: boolean) => {
      this.isPlaying = value;
    });
  }

  goToUserProfile() {
    this.router.navigateByUrl('/user-profile/' + this.username);
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('userImage', this.fileInput);
    this.http.post("http://localhost:8081/users/" + this.username + "/image",formData);
  }

  updateRole() {
    this.role = this.localStorage.retrieve('role');
  }
}
