import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-title',
  template: ''
})
export class TitleComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute, private titleService: Title) {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(event => {
        let currentRoute = this.route.root;
        let title = '';
        do {
          const childrenRoutes = currentRoute.children;
          currentRoute = null;
          childrenRoutes.forEach(routes => {
            if (routes.outlet === 'primary') {
              title = routes.snapshot.data.breadcrumb;
              currentRoute = routes;
            }
          });
        } while (currentRoute);
        this.titleService.setTitle(title + ' | Food App Admin');
      });
  }

  ngOnInit() {
  }

}
