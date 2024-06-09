export enum DeviceID {
  DEVICE1 = "DEVICE-01",
  DEVICE2 = "DEVICE-02",
  DEVICE3 = "DEVICE-03",
}

export interface DeviceOption {
  id: DeviceID;
  name: string;
}

export interface ReportDeviceRequest {
  device_id: string;
  date_from: string;
  date_to: string;
}
