import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(
    private router: Router,
    private translate: TranslateService) {
    const lng = localStorage.getItem('lng');
    if (!lng || lng === null) {
      localStorage.setItem('lng', 'en');
    }
    this.translate.use(localStorage.getItem('lng'));
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
