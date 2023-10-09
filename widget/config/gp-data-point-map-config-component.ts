/**
 * Copyright (c) 2020 Software AG, Darmstadt, Germany and/or its licensors
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {
  Component,
  DoCheck,
  Input,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GpDataPointsMapService } from './../services/gp-data-points-map.service';
import {
  DatapointAttributesFormConfig,
  DatapointSelectorModalOptions,
  KPIDetails,
} from '@c8y/ngx-components/datapoint-selector';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, ControlContainer, FormBuilder, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { OnBeforeSave } from '@c8y/ngx-components';

export function exactlyASingleDatapointActive(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const datapoints: any[] = control.value;
    if (!datapoints || !datapoints.length) {
      return null;
    }
    const activeDatapoints = datapoints.filter(datapoint => datapoint.__active);
    if (activeDatapoints.length === 1) {
      return null;
    }
    return { exactlyOneDatapointNeedsToBeActive: true };
  };
}
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'gp-data-points-map-config',
  templateUrl: './gp-data-point-map-config-component.html',
  styleUrls: ['./gp-data-point-map-config-component.css'],
  encapsulation: ViewEncapsulation.None,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class GpDataPointsMapConfigComponent implements OnInit, DoCheck, OnDestroy, OnBeforeSave {
  @Input() config: any = {};
  isOpenCP = false;
  isOpenFontCP = false;
  configDevice = null;
  defaultOutdoorZoom = 14;
  observableDevice$ = null;
  appId = null;
  iconColorCode ='#000000';
  fontColorCode ='#000000'
  datapointSelectDefaultFormOptions: Partial<DatapointAttributesFormConfig> = {
    showRange: false,
    showChart: false,
    
  };
  datapointSelectionConfig: Partial<DatapointSelectorModalOptions> = {};
  formGroup: ReturnType<GpDataPointsMapConfigComponent['createForm']>;
  private destroy$ = new Subject<void>();
  activeDatapointsExists: boolean;

  constructor(
    private commonService: GpDataPointsMapService,
    private route: ActivatedRoute,
    private form: NgForm,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.config.device && this.config.device.id) {
      this.configDevice = this.config.device.id;
      this.datapointSelectionConfig.contextAsset = this.config.device;
      this.datapointSelectionConfig.assetSelectorConfig
    }
    if (!this.config.outdoorZoom) {
      this.config.isOutdoorAutoZoom = true;
      this.config.outdoorZoom = this.defaultOutdoorZoom;
    }

    this.appId = this.commonService.getAppId();
  
      if(this.config.markerColor){
        this.colorUpdateByTyping(this.config.markerColor);
      }

      if(this.config.markerFontColor){
        this.fontColorUpdateByTyping(this.config.markerFontColor);
      }

      this.initForm();
      this.formGroup.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.config.datapoints = [ ...value.datapoints ];
      });
  }

  /**
   * Check and reload measuerements if device is changed
   */
  ngDoCheck(): void {
    if (this.config.device && this.config.device.id !== this.configDevice) {
      this.configDevice = this.config.device.id;
      const context = this.config.device;
      if (context?.id) {
        this.datapointSelectionConfig.contextAsset = context;
        this.datapointSelectionConfig.assetSelectorConfig
      }
    }
  }

  onBeforeSave(): boolean | Promise<boolean> | Observable<boolean> {
    if (this.formGroup.valid) {
   //   Object.assign(config, this.formGroup.value);
      return true;
    }
    return false;
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initForm(): void {
    this.formGroup = this.createForm();
    this.form.form.addControl('config', this.formGroup);
    if (this.config?.datapoints) {
      this.formGroup.patchValue({ datapoints: this.config.datapoints });
    }
  }

  private createForm() {
    return this.formBuilder.group({
      
      datapoints: this.formBuilder.control(new Array<KPIDetails>(), [
        Validators.required,
        Validators.minLength(1),
        exactlyASingleDatapointActive()
      ])
    });
  }

  // Set outdoor zoom to default
  outdoorAutoChanges(event) {
    this.config.outdoorZoom = this.defaultOutdoorZoom;
  }

  openColorPicker() {
    if (!this.isOpenCP) {
      this.isOpenCP = true;
    }
  }

  closeColorPicker() {
    if (this.isOpenCP) {
      this.isOpenCP = false;
    }
  }
  setSelectedColor(value) {
    if (this.config.markerColor) {
      this.config.markerColor = this.config.markerColor + ';' + value;
    } else {
      this.config.markerColor = value;
    }
  }

  openFontColorPicker() {
    if (!this.isOpenFontCP) {
      this.isOpenFontCP = true;
    }
  }

  closeFontColorPicker() {
    if (this.isOpenFontCP) {
      this.isOpenFontCP = false;
    }
  }
  setSelectedFontColor(value) {
    if (this.config.markerFontColor) {
      this.config.markerFontColor = this.config.markerFontColor + ';' + value;
    } else {
      this.config.markerFontColor = value;
    }
  }

  // Update the icon colors input from color picker
    colorUpdate(colorSelected): void {
    this.config.markerColor = colorSelected;
  }

  colorUpdateByTyping(colorTyped): void {
    this.iconColorCode = colorTyped;
  }

   // Update the font colors input from color picker
   fontColorUpdate(colorSelected): void {
    this.config.markerFontColor = colorSelected;
  }

  // Update the font colors input from color input box
  fontColorUpdateByTyping(colorTyped): void {
    this.fontColorCode = colorTyped;
  }

  
}
