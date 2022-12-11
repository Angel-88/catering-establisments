import { Component, OnInit } from '@angular/core';
import { EstablishmentDto } from 'src/app/rest/establishments/establishment.dto';
import { EstablishmentsService } from '../../../rest/establishments/establishment.service';
import { debounceTime, Subject } from 'rxjs';
import { MainService } from '../main.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.css' ],
})

export class HeaderComponent implements OnInit {
  name = '';
  establishmentSearchChanged: Subject<void> = new Subject<void>();

  constructor(
    private readonly establishmentsService: EstablishmentsService,
    private readonly mainService: MainService,
  ) { }

  ngOnInit(): void {
    this.establishmentSearchChanged.pipe(debounceTime(500))
      .subscribe(() => {
        this.onSearchNameChanged();
      });
  }

  onSearchNameChanged(): void {
    this.mainService.onEstablishmentsParamsChanged({name: this.name});
  }

  onEstablishmentSearchChanged() {
    this.establishmentSearchChanged.next();
  }
}
