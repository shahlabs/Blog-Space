import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  /*animations:[
    trigger('blogAnimation',[
      state('small',style({
        transform: 'scale(1)',
      })),
      state('large',style({
        transform: 'scale(1.2)',
      })),
      transition('small => large', animate('300ms ease-in'))
    ])
  ]*/

  animations: [
    trigger('flyIn', [
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(1200)
      ]),
    ]),
    trigger('flyIn2', [
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(2200)
      ]),
    ]),
    trigger('flyIn3', [
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(3300)
      ]),
    ])
  ]
  
})
export class HomeComponent implements OnInit {

  items: Array<any> = []

  constructor(private authService: AuthService)
  {
    this.items = [
      { name: 'assets/img1.jpg', title: 'Healthy Breakfast', caption: 'Have a healthy breakfast everyday!' },
      { name: 'assets/img2.jpg', title: 'Travel', caption: 'Enjoy your Travel time!' },
      { name: 'assets/img3.jpg', title: 'World', caption: 'Chicago Downtown!' },
      { name: 'assets/img8.jpg', title: 'Technology', caption: 'Technology, an exercise of the human brain' },
      { name: 'assets/img16.jpg', title: 'Beach', caption: 'Happiness comes in waves' },
    ]
  }

  ngOnInit() {
  }
}
