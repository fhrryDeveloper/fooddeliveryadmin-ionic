import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  tempState = [];
  breadcrumbs: Array<Object>;
  constructor(private router: Router, private route: ActivatedRoute, private titleService: Title) {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(event => {  // note, we don't use event
        this.breadcrumbs = [];
        this.tempState = [];
        let currentRoute = this.route.root,
          url = '';
        do {
          const childrenRoutes = currentRoute.children;
          currentRoute = null;
          childrenRoutes.forEach(routes => {
            if (routes.outlet === 'primary') {
              const routeSnapshot = routes.snapshot;
              url += '/' + routeSnapshot.url.map(segment => segment.path).join('/');
              if (routes.snapshot.data.breadcrumb !== undefined) {
                let status = true;
                if (routes.snapshot.data.status !== undefined) {
                  status = routes.snapshot.data.status;
                }
                if (!this.tempState.includes(routes.snapshot.data.breadcrumb)) {
                  this.tempState.push(routes.snapshot.data.breadcrumb);
                  this.breadcrumbs.push({
                    label: routes.snapshot.data.breadcrumb,
                    status: status,
                    url: url
                  });
                }

              }
              currentRoute = routes;
            }
          });
        } while (currentRoute);
      });
  }

  ngOnInit() {
  }

}
