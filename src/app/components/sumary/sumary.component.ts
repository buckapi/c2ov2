import { Component, OnInit } from '@angular/core';
import { Butler } from '@app/services/butler.service';
import { ScriptService } from '@services/script.service';
import { virtualRouter } from '@app/services/virtualRouter.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { GlobalService } from '@app/services/global.service';

@Component({
  selector: 'app-sumary',
  templateUrl: './sumary.component.html',
  styleUrls: ['./sumary.component.css']
})
export class SumaryComponent implements OnInit {

  constructor(
    public script:ScriptService,
    public _butler: Butler,
    public global:GlobalService,
    public virtualRouter: virtualRouter,
    private deviceService: DeviceDetectorService,
  ) {

    this.script.load(
      'swiper',
      'custom-swiper',
      'feather',
      'custom-feather',
      'iconsax',
      'bootstrap',
      'homescreen-popup',
      'offcanvas-popup',
      'script',
    )
      .then(() => {
        console.log('Todos los scripts se cargaron correctamente');
      })
      .catch(error => console.log(error));
   }

  ngOnInit(): void {
  }
 

}
