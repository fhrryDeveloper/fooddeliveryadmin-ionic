import {Component, Inject, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Spinkit} from './spinkits';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: [
    './spinner.component.scss',
    './spinkit-css/sk-double-bounce.scss',
    './spinkit-css/sk-chasing-dots.scss',
    './spinkit-css/sk-cube-grid.scss',
    './spinkit-css/sk-rotating-plane.scss',
    './spinkit-css/sk-spinner-pulse.scss',
    './spinkit-css/sk-three-bounce.scss',
    './spinkit-css/sk-wandering-cubes.scss',
    './spinkit-css/sk-wave.scss',
    './spinkit-css/sk-line-material.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class SpinnerComponent implements OnInit, OnDestroy {
  public isSpinnerVisible = true;
  public Spinkit = Spinkit;
  @Input() public backgroundColor = 'rgba(0, 115, 170, 0.69)';
  @Input() public spinner = Spinkit.skLine;
  private sub: any;
  constructor(private router: Router, @Inject(DOCUMENT) private document: Document) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isSpinnerVisible = true;
      } else if ( event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.isSpinnerVisible = false;
      }
    }, (error: any) => {
      this.isSpinnerVisible = false;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.isSpinnerVisible = false;
  }

}
