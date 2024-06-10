import AsyncButton from "../../../components/AsyncButton/AsyncButton";
import { IoSaveOutline } from "react-icons/io5";
// import { FaKey, FaUser, FaUserTag } from "react-icons/fa";
import { useMemo, useState } from "react";
import { DeviceID } from "../../../models/device";
import { updateUserDevice } from "../../../api/api";
import { useAlert } from "../../../contexts/AlertContext";

export interface DialogUserDeviceList {
  user_id: string;
  device_id?: string[];
  master_device_id?: string[];
}

export interface OpenDialogDataDevice extends DialogUserDeviceList {
  username: string;
}

export interface DialogSetDeviceProps {
  openDialog: null | OpenDialogDataDevice;
  setOpenDialog: (value: null | OpenDialogDataDevice) => void;
}

const DialogSetDevice: React.FC<DialogSetDeviceProps> = ({
  openDialog,
  setOpenDialog,
}) => {
  const { showAlert } = useAlert();
  const [devicesSet, setDevicesSet] = useState<string[]>(openDialog?.device_id || []);

  const handleDevice01Change = (event) => {
    if (event.target.checked) {
      setDevicesSet((prev) => [
        ...prev,
        openDialog?.master_device_id?.[0] ?? DeviceID.DEVICE1,
      ]);
    } else {
      setDevicesSet((prev) =>
        prev.filter(
          (item) =>
            item !== openDialog?.master_device_id?.[0] ?? DeviceID.DEVICE1
        )
      );
    }
  };

  const handleDevice02Change = (event) => {
    if (event.target.checked) {
      setDevicesSet((prev) => [
        ...prev,
        openDialog?.master_device_id?.[1] ?? DeviceID.DEVICE2,
      ]);
    } else {
      setDevicesSet((prev) =>
        prev.filter(
          (item) =>
            item !== openDialog?.master_device_id?.[1] ?? DeviceID.DEVICE2
        )
      );
    }
  };

  const handleDevice03Change = (event) => {
    if (event.target.checked) {
      setDevicesSet((prev) => [
        ...prev,
        openDialog?.master_device_id?.[2] ?? DeviceID.DEVICE3,
      ]);
    } else {
      setDevicesSet((prev) =>
        prev.filter(
          (item) =>
            item !== openDialog?.master_device_id?.[2] ?? DeviceID.DEVICE3
        )
      );
    }
  };

  const handleSave = async () => {
    if (!openDialog?.user_id) return;

    const device_id = devicesSet;

    const dataUpdate: DialogUserDeviceList = {
      user_id: openDialog?.user_id ?? "",
      device_id,
    };

    try {
      const response = await updateUserDevice(dataUpdate);
      if (response?.success === true) {
        showAlert("Device updated successfully", "success");
        setOpenDialog(null);
      }
    } catch (error: any) {
      console.error(error);
      showAlert(
        `Failed to update device ${error?.response.data.message}`,
        "error"
      );
    }
  };

  const handleCancel = async () => {
    setOpenDialog(null);
  };

  const device01 = useMemo(
    () =>
      devicesSet.includes(
        openDialog?.master_device_id?.[0] ?? DeviceID.DEVICE1
      ),
    [devicesSet, openDialog]
  );

  const device02 = useMemo(
    () =>
      devicesSet.includes(
        openDialog?.master_device_id?.[1] ?? DeviceID.DEVICE2
      ),
    [devicesSet, openDialog]
  );

  const device03 = useMemo(
    () =>
      devicesSet.includes(
        openDialog?.master_device_id?.[2] ?? DeviceID.DEVICE3
      ),
    [devicesSet, openDialog]
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-base-200 bg-opacity-30 backdrop-blur-sm"></div>
      <div className="modal-box">
        <h3 className="font-bold text-lg text-center">Setting Device</h3>
        <p className="flex justify-center text-gray-400">
          Setting devices for username :
          <p className="font-bold text-gray-300">
            &nbsp;{openDialog?.username || "No Username"}
          </p>
        </p>

        <div className="m-4 flex flex-col items-center">
          <div className="form-control w-52">
            <label className="cursor-pointer label">
              <span className="label-text">DEVICE-01</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={device01}
                onChange={handleDevice01Change}
              />
            </label>
          </div>
          <div className="form-control w-52">
            <label className="cursor-pointer label">
              <span className="label-text">DEVICE-02</span>
              <input
                type="checkbox"
                className="toggle toggle-secondary"
                checked={device02}
                onChange={handleDevice02Change}
              />
            </label>
          </div>
          <div className="form-control w-52">
            <label className="cursor-pointer label">
              <span className="label-text">DEVICE-03</span>
              <input
                type="checkbox"
                className="toggle toggle-accent"
                checked={device03}
                onChange={handleDevice03Change}
              />
            </label>
          </div>
        </div>

        <div className="modal-action w-full">
          <AsyncButton
            className="mb-1 bg-gray-400 border-none shadow-none hover:bg-gray-500 w-28"
            title="Clear"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </AsyncButton>
          <AsyncButton
            className="mb-1 w-28"
            title="Search"
            type="button"
            onClick={handleSave}
          >
            <IoSaveOutline className="h-4 w-4" /> Save
          </AsyncButton>
        </div>
      </div>
    </div>
  );
};

export default DialogSetDevice;
