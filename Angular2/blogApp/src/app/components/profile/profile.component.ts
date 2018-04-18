import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    username = '';
    email = '';
    aboutUser = '';
    profile;
    messageClass;
    message;
    constructor(
      private authService: AuthService,
      private blogService: BlogService
    ) { }

    ngOnInit() {
      // Once component loads, get user's data to display on profile
        this.authService.getProfile().subscribe(profile => {
        this.profile = profile;
        this.username = profile.user.username; // Set username
        this.email = profile.user.email;
        this.aboutUser = profile.user.aboutUser;
        console.log("Inside ProfileComponent Init - aboutUser -- " + this.aboutUser)// Set e-mail
      });
    }

    saveAboutUser(aboutUser){
      this.profile.user.aboutUser = aboutUser;
      console.log('Checking profile   ' + this.profile.user.aboutUser + "   " + this.profile.user.username);
      this.blogService.saveAboutUser(aboutUser).subscribe(data => {
       console.log("Response in component");
       if (!data.success) {
         this.messageClass = 'alert alert-danger'; // Return error class
         this.message = data.message; // Return error message
         
       } else {
         this.messageClass = 'alert alert-success'; // Return success class
         this.message = data.message; // Return success message

       }
      });
    }

}
