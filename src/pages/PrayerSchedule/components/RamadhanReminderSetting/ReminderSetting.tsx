import { useState, useEffect } from "react";
import Button from "../../../../components/Button";
import Unmute from "../../../../assets/ico-unmute.svg";
import Stop from "../../../../assets/ico-stop.svg";
import Notification from "../../../../assets/ico-notification-black.svg";
import { PrayerStatus, usePrayerNotification } from "../../../../store/ramadhan";
import Chips from "../../../../components/Chips";

interface ReminderSettingProps {
    id: number | undefined;
    currentStatus: PrayerStatus;
    toggleModal: () => void;
}

const ReminderSetting = ({ id, currentStatus, toggleModal }: ReminderSettingProps) => {
    const [selectedOption, setSelectedOption] = useState<PrayerStatus>(currentStatus);
    const { updatePrayerStatus } = usePrayerNotification();

    
    const handleOptionChange = (value: PrayerStatus) => {
        setSelectedOption(value);
    };
    
    const handleSubmit = () => {
        if (id !== undefined) {
            updatePrayerStatus(id, selectedOption);
            toggleModal();
        } 
    };
    
    useEffect(() => {
        setSelectedOption(currentStatus);
    }, [currentStatus]);

    return (
        <>
            <div className='text-center text-base font-semibold'>Pengingat Waktu Subuh</div>
            <div className='flex flex-col'>
                {[
                    { label: "Suara Adzan", value: "adzan", icon: Unmute },
                    { label: "Suara Bedug", value: "bedug", icon: Unmute },
                    { label: "Notifikasi", value: "notifikasi", icon: Notification },
                    { label: "Tidak Aktif", value: "tidak-aktif", icon: Stop },
                ].map((option) => (
                    <label
                      key={option.value}
                      className='flex items-center justify-between gap-4 cursor-pointer'
                    >
                        <div className='flex items-center gap-2'>
                            <img src={option.icon} alt={option.label} />
                            <span className='text-base py-4'>{option.label}</span>
                        </div>
                        <input
                          type='radio'
                          name='reminder'
                          value={option.value}
                          checked={selectedOption === option.value}
                          onChange={() => handleOptionChange(option.value as PrayerStatus)}
                          className='form-radio accent-black w-5 h-5'
                        />
                    </label>
                ))}
            </div>
            <div className='mt-4'>
                <div className='flex justify-between'>
                    <span className='text-sm font-semibold text-primaryBlack'>Pengingat Sebelum Subuh</span>
                    <label className='switch'>
                        <input
                          type='checkbox'
                        //   checked={!!isActive}
                        //   onChange={toggleNotification}
                        />
                        <span className='slider'></span>
                    </label>
                </div>
                <div className='flex gap-2'>
                    <Chips text='5 Menit' />
                    <Chips text='10 Menit' />
                    <Chips text='15 Menit' />
                </div>
            </div>
            <div className='mt-4'>
                <Button label='Simpan' onClick={handleSubmit} className='border-0' />
            </div>
        </>
    );
};

export default ReminderSetting;
