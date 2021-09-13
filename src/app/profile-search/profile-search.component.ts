import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { ProfileService } from '../_services/profile.service';
import { Profile } from '../profile';

@Component({
  selector: 'app-profile-search',
  templateUrl: './profile-search.component.html',
  styleUrls: ['./profile-search.component.css']
})
export class ProfileSearchComponent implements OnInit {

 
  //Tour of heroes
  profiles$!: Observable<Profile[]>;
private searchTerms = new Subject<string>();
 
  constructor(
    private ProfileService: ProfileService) { }

    searchByUsername(term: string): void {
      this.searchTerms.next(term);
    }
    

  ngOnInit(): void {
 
 //Tour of heroes
    this.profiles$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      //это промежуток времени нужен, чтобы понять какой именно запрос мы вводим "a" или "ab"
      debounceTime(300),

      // ignore new term if same as previous term
      //eсли поисковый запрос не изменился, то новый поиск не осуществляется
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.ProfileService.searchProfile(term)),
    );
  }

}
