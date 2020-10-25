import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ship } from 'src/app/models/ship.model';
import { ShipsService } from 'src/app/services/ships.service';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.scss']
})
export class ShipComponent implements OnInit {
  public id: number;
  public ship: Ship;

  constructor(
    private route: ActivatedRoute,
    private shipsService: ShipsService
  ) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('idShip'), 10);

    this.shipsService.getShip(this.id).subscribe(ship => {
      this.ship = ship;
    });
  }

}
