import { Component } from "@angular/core";
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector:'home-app',
    templateUrl:'./home.component.html',
    styleUrls:['./home.component.css']
})


export class HomeComponent{
    faChevronRight = faChevronRight;
    faChevronLeft = faChevronLeft;
    
}


