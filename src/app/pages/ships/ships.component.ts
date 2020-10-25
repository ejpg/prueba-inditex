import { Component, OnInit } from '@angular/core';
import { ShipsService } from 'src/app/services/ships.service';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss']
})
export class ShipsComponent implements OnInit {

  public ships: any;

  constructor(
    private shipsService: ShipsService
  ) { }

  ngOnInit() {
    this.shipsService.getShips().subscribe(ships => {
      this.ships = ships;

      console.log('ships', ships);
    });
  }

}
