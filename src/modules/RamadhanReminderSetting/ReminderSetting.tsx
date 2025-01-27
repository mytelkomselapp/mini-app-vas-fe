import { useState } from "react";
import Button from "../../components/Button";
import Unmute from "../../assets/ico-unmute.svg";
import Stop from "../../assets/ico-stop.svg";
import Notification from "../../assets/ico-notification-black.svg";

const ReminderSetting = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  return (
    <>
      <div className='text-center text-base font-semibold'>
        Pengingat Waktu Subuh
      </div>
      <div>
        <div className='flex flex-col'>
          <label className='flex items-center justify-between gap-4 cursor-pointer'>
            <div className='flex items-center gap-2'>
              <img src={Unmute} alt='Adzan' />
              <span className='text-base py-4'>Suara Adzan</span>
            </div>
            <input
              type='radio'
              name='reminder'
              value='adzan'
              checked={selectedOption === "adzan"}
              onChange={() => handleOptionChange("adzan")}
              className='form-radio accent-black w-5 h-5'
            />
          </label>
          <label className='flex items-center justify-between gap-4 cursor-pointer'>
            <div className='flex items-center gap-2'>
              <img src={Unmute} alt='Bedug' />
              <span className='text-base py-4'>Suara Bedug</span>
            </div>
            <input
              type='radio'
              name='reminder'
              value='bedug'
              checked={selectedOption === "bedug"}
              onChange={() => handleOptionChange("bedug")}
              className='form-radio accent-black w-5 h-5'
            />
          </label>
          <label className='flex items-center justify-between gap-4 cursor-pointer'>
            <div className='flex items-center gap-2'>
              <img src={Notification} alt='Notifikasi' />
              <span className='text-base py-4'>Notifikasi</span>
            </div>
            <input
              type='radio'
              name='reminder'
              value='notifikasi'
              checked={selectedOption === "notifikasi"}
              onChange={() => handleOptionChange("notifikasi")}
              className='form-radio accent-black w-5 h-5'
            />
          </label>
          <label className='flex items-center justify-between gap-4 cursor-pointer'>
            <div className='flex items-center gap-2'>
              <img src={Stop} alt='Tidak Aktif' />
              <span className='text-base py-4'>Tidak aktif</span>
            </div>
            <input
              type='radio'
              name='reminder'
              value='tidak-aktif'
              checked={selectedOption === "tidak-aktif"}
              onChange={() => handleOptionChange("tidak-aktif")}
              className='form-radio accent-black w-5 h-5'
            />
          </label>
        </div>
      </div>
      <div className='mt-4'>
        <div>
          <span className='text-base'>Pengingat Sebelum Subuh</span>
        </div>
        <div className='flex gap-2'>
          <span className='text-base'>5 Menit</span>
          <span className='text-base'>10 Menit</span>
          <span className='text-base'>15 Menit</span>
        </div>
      </div>
      <div className='mt-4'>
        <Button
          label='Simpan'
          className='border-0'
          onClick={() => alert(`Pilihan: ${selectedOption}`)}
        />
      </div>
    </>
  );
};

export default ReminderSetting;
