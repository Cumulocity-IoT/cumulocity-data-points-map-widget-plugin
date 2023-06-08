# Cumulocity Data Points Map Widget Plugin [<img width="35" src="https://user-images.githubusercontent.com/32765455/211497905-561e9197-18b9-43d5-a023-071d3635f4eb.png"/>](https://github.com/SoftwareAG/cumulocity-data-points-map-widget-plugin/releases/download/1.0.3/sag-ps-pkg-datapoints-map-1.0.3.zip)

This Data Point Map Widget Plugin is the Cumulocity module federation plugin created using c8ycli. This plugin can be used in Application Builder or Cockpit. This plugin help you to display measurements and device locations on map.


### Please choose Data Point Map Widget Plugin release based on Cumulocity/Application builder version:

|APPLICATION BUILDER | CUMULOCITY | DATA Points Map WIDGET PLUGIN  |
|--------------------|------------|--------------------------------|
| 2.0.x              | >= 1016.x.x| 1.x.x                          |

![](https://user-images.githubusercontent.com/32765455/102481039-2cb8c000-4087-11eb-8000-8fb956bd9294.jpg)

## Features

  
*  **Data Points:** Display measurements in terms of data points on map across geographical location.

*  **Cluster Map:** Configurable switch to show cluster map for large set of devices.

*  **Configurable Color:** Select custom color for your device markers on map.

*  **Configurable Zoom:**  Select and configurable zoom which is best fit for your map.  

*  **Support single device and group devices:** Based on configuration during widget configuration. 


## Prerequisite:
   Cumulocity c8ycli >=1016.x.x
   
## Installation

  
### Runtime Deployment?

* This plugin support runtime deployment. Download [Runtime Binary](https://github.com/SoftwareAG/cumulocity-data-points-map-widget-plugin/releases/download/1.0.3/sag-ps-pkg-datapoints-map-1.0.3.zip) and install via Administrations --> Ecosystems --> Applications --> Packages 


## QuickStart
  

This guide will teach you how to add widget in your existing or new dashboard.

  



1. Open you application from App Switcher
  

2. Add new dashboard or navigate to existing dashboard
  

3. Click `Add Widget`
  

4. Search for `Data Points Map`


5. Select `Target Assets or Devices`


6. Select `Measurement from dropdown`

7. Click `Save`


Congratulations! Data Points Map Plugin is configured.

  

## User Guide

 

*  **Target assets or devices:** User can select a device or a group. Based on device/group, list of devices will be display on Map. Only those devices are visible on map where position attributes are configured. 

  

*  **Cluster Map:** User can switch to cluster map.


*  **Select Measurements:**  Based on selected assets or devices, this field will be populated with available measurements/data points. User can select any one measurement which is applicable for selected device or group of devices.

  

*  **Dashboard Field(Application Builder only):** User has ability to provide device object field which represent dashboard Id. Based on this field, data points map will display navigation link for particular device(optional).

  

*  **TabGroup Field(Application Builder only):** User has ability to provide device object field which represent dashboard tab group name. Based on this field, data points map will display navigation link for particular device(optional).


*  **Default Zoom:** User has ability to change outdoor zoom level. Default is Auto


*  **Marker Color:** User can select maker color from color picker or enter manually. If more than one color selected from color picker, only first color will be applied. This is optional field.
  

*  **Marker Font Color:** User can select maker color from color picker or enter manually. If more than one color selected from color picker, only first color will be applied. This is optional field.



**Data Points Map On Screen Options:**

 

*  **Realtime**: Realtime measurements are activated by default. Use can click on it to on/off real time measurements.

   

*  **Reload**: Useful for force reload/refresh map.



------------------------------

These tools are provided as-is and without warranty or support. They do not constitute part of the Software AG product suite. Users are free to use, fork and modify them, subject to the license agreement. While Software AG welcomes contributions, we cannot guarantee to include every contribution in the master project.
_____________________
For more information you can Ask a Question in the [TECH Community Forums](https://tech.forums.softwareag.com/tag/Cumulocity-IoT).
