import devices from '../../devices_dummy.json';
import DeviceTable from './DevicesTable';
import SearchInput from '../general/SearchInput';
import { MdOutlineRefresh, MdSwapVert } from 'react-icons/md';
import { useState } from 'react';

type Props = {};

export default function Devices({}: Props) {
  const [searchWord, setSearchWord] = useState('');

  return (
    <div className="grid h-min max-h-full">
      <h1 className="text-4xl">Devices</h1>

      <p className="mt-3 mb-6">
        Here is the list of available devices showing how many are available
        along with their supported Qt versions. Use the filters to find the
        device you need, and select it from the list below. To reserve a device,
        simply complete the reservation process and check the availability
        status to ensure the device is ready for use.
      </p>

      <div className="grid bg-gray-100 border-2 p-4 md:px-8 rounded-md">
        <p className="font-semibold text-xl">Available Device</p>

        <div className="flex gap-x-1.5 my-2 flex-col md:flex-row">
          <SearchInput
            onChange={(e) => setSearchWord(e.target.value.toLowerCase())}
          />

          <div className="flex gap-x-1.5 mt-1 md:mt-0 self-end md:self-auto">
            <button className="cursor-not-allowed bg-white rounded-md border-gray-200 border-2 flex gap-x-2 items-center p-2">
              <MdSwapVert size={20} />
              <span>Update</span>
            </button>

            <button className="cursor-not-allowed bg-white rounded-md border-gray-200 border-2 flex gap-x-2 items-center p-2">
              <MdOutlineRefresh size={20} />
              <span>Update</span>
            </button>
          </div>
        </div>

        <DeviceTable
          devices={devices.filter((dev) =>
            dev.type.toLowerCase().includes(searchWord),
          )}
        />
      </div>
    </div>
  );
}
