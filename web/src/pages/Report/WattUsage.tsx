import { getDeviceByUserID } from "../../api/api";
import { useEffect, useState } from "react";
import { useAlert } from "../../contexts/AlertContext";
import WattLineChart from "../../components/LineChart/WattLineChart";

interface Device {
  user_id: string;
  device_id: string;
}

const WattUsage = () => {
  const { showAlert } = useAlert();
  const [listDevices, setListDevices] = useState<Device[]>([]); // [{}

  useEffect(() => {
    getDeviceByUserID()
      .then((response) => {
        if (response.success === true) {
          setListDevices(response.data.data_list ?? []);
        }
      })
      .catch((error) => {
        showAlert(error.response.data.message, "error");
      });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-center">Watt Usage</h2>
      <p className="text-center text-gray-400">
        Report of your electricity usage in watts
      </p>

      {listDevices.map((device) => (
        <WattLineChart key={device.device_id} DeviceUuid={device.device_id} />
      ))}
    </div>
  );
};

export default WattUsage;
