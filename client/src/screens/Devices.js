import React from "react";
import * as R from "ramda";

import { filter, reset, sort } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";

const DeviceRow = device => {
  const {
    // application_code,
    // asset_identifier,
    battery_level,
    date_device_available,
    device_id,
    firmware_version,
    id,
    internal_temperature
    // manufacturer,
    // status
  } = device.device;

  return (
    <tr>
      <td>{id}</td>
      <td>{device_id}</td>
      <td>{firmware_version}</td>
      <td>{date_device_available}</td>
      <td>{battery_level}</td>
      <td>{internal_temperature}</td>
    </tr>
  );
};

export const Devices = () => {
  const data = useSelector(state => state.dataReducer);
  const devices = useSelector(state => state.devicesReducer);
  const dispatch = useDispatch();

  if (devices.length === 0) return null;

  // get a list of all the device properties we want to filter by

  const firmwareVersions = R.uniq(
    devices.map(device => device.firmware_version)
  );

  const deviceIds = R.uniq(devices.map(device => device.device_id));

  const renderFilterButton = (key, value) => {
    return (
      <button
        key={value}
        onClick={() => {
          dispatch(filter(data, key, value));
        }}
      >
        {value}
      </button>
    );
  };

  return (
    <>
      <button
        onClick={() => {
          dispatch(reset(data));
        }}
      >
        RESET
      </button>
      {firmwareVersions.map(version =>
        renderFilterButton("firmware_version", version)
      )}
      {deviceIds.map(id => renderFilterButton("device_id", id))}

      {devices.length !== 0 && (
        <table>
          <thead>
            <tr>
              <th>
                <button
                  onClick={() => {
                    dispatch(sort(devices, "id"));
                  }}
                >
                  #
                </button>
              </th>
              <th>Device Id</th>
              <th>Firmware</th>
              <th>
                <button
                  onClick={() => {
                    dispatch(sort(devices, "date_device_available"));
                  }}
                >
                  Date Available
                </button>
              </th>
              <th>
                <button
                  onClick={() => {
                    dispatch(sort(devices, "battery_level"));
                  }}
                >
                  Battery Level
                </button>
              </th>
              <th>
                <button
                  onClick={() => {
                    dispatch(sort(devices, "internal_temperature"));
                  }}
                >
                  Temp
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {devices.map(device => (
              <DeviceRow key={device.id} device={device} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
