import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserResponse } from '../type/UserResponse';
import { UserDataService } from '../services/user-data.service';
import { EMPTY, catchError, finalize } from 'rxjs';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent implements OnInit{
  userResponse: UserResponse | null = null;
  loading = true;
  error: string | null = null;
  showMore = false;

  constructor(private userService: UserService, private userDataService: UserDataService) {}

  ngOnInit() {
    const username = localStorage.getItem("username");

    if (username) {
      this.userService.getUserbyUsername(username).pipe(
        catchError((error) => {
          this.error = 'Error fetching user data';
          return EMPTY; // Return an empty observable to continue the stream
        }),
        finalize(() => {
          this.loading = false;
        })
      ).subscribe({
        next: (value: UserResponse) => {
          this.userResponse = value;
        }
      });
    }
  }

  toggleShowMore() {
    this.showMore = !this.showMore;
  }
}