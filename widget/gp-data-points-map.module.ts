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
import { NgModule } from '@angular/core';
import { CoreModule, HOOK_COMPONENTS } from '@c8y/ngx-components';
import { GpDataPointsMapConfigComponent } from './config/gp-data-point-map-config-component';
import { GpDataPointsMapComponent } from './components/gp-data-points-map.component';
import { AngularResizedEventModule } from 'angular-resize-event';
import * as preview from './preview-image';
import { GPDataPointMapPopupComponent } from './components/gp-data-points-map-popup.component';

@NgModule({
  declarations: [
    GpDataPointsMapComponent,
    GpDataPointsMapConfigComponent,
    GPDataPointMapPopupComponent
  ],
  imports: [
    CoreModule,
    AngularResizedEventModule,
  ],
  exports: [
    GpDataPointsMapComponent,
    GpDataPointsMapConfigComponent,
    GPDataPointMapPopupComponent
  ],
  entryComponents: [
    GpDataPointsMapComponent,
    GpDataPointsMapConfigComponent,
    GPDataPointMapPopupComponent
  ],
  providers: [
    {
      provide: HOOK_COMPONENTS,
      multi: true,
      useValue: {
        id: 'datapoints-map-widget',
        label: 'Data points Map',
        previewImage: preview.previewImage,
        description:
          'The Data points Map widget help you to display measurements and device locations on map.',
        component: GpDataPointsMapComponent,
        configComponent: GpDataPointsMapConfigComponent,
        data: {
          ng1: {
            options: {
              noDeviceTarget: false,
              noNewWidgets: false,
              deviceTargetNotRequired: false,
              groupsSelectable: true,
            },
          },
        },
      },
    },
  ],
})
export class GpDataPointsMapModule {
}
