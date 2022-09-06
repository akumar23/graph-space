import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { LaunchDetailsGQL } from '../services/spacexGraphql.service';

@Component({
  selector: 'app-launch-details',
  templateUrl: './launch-details.component.html',
  styleUrls: ['./launch-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaunchDetailsComponent implements OnInit {

  constructor(private readonly route: ActivatedRoute, 
    private readonly launchDetailsService: LaunchDetailsGQL) { }

    launchDetails$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id !== null) {
          return this.launchDetailsService.fetch({ id });
        } else {
          return this.launchDetailsService.fetch();
        }
      }),
      map (res => res.data.launch)
    );

  ngOnInit(): void {
  }

}
