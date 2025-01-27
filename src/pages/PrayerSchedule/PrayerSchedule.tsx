import { PropsWithChildren, useState } from 'react';
import { View } from '@tarojs/components';
import bgLanding from "../../assets/bg/bg-prayer-schedule.png";
import Mosque from "../../assets/ico_mosque.svg"
import Compass from "../../assets/ico-compass-ramadhan.svg"
import Notification from "../../assets/ico-notification-black.svg"
import Pin from "../../assets/icon-map-pin-fill.svg"
import RenderVerticalList from '../../components/RenderVerticalList/RenderVerticalList';
import BottomSheet from '../../components/BottomSheet';
import ReminderSetting from '../../modules/RamadhanReminderSetting';
import Unmute from "../../assets/ico-unmute.svg";
import Stop from "../../assets/ico-stop.svg";
import { usePrayerNotification } from '../../store/ramadhan';
import Show from '../../components/Show';
import "./PrayerSchedule.scss"

interface Prayer {
    name: string;
    time: string;
    status?: string

}

const prayerSchedule: Prayer[] = [
    { name: "Imsak", time: "04:16", status: "adzan" },
    { name: "Subuh", time: "04:16" , status: "adzan"},
    { name: "Zuhur", time: "11:40", status: "tidak-aktif" },
    { name: "Ashar", time: "15:10", status: "notifikasi"},
    { name: "Maghrib", time: "17:50", status: "adzan" },
    { name: "Isya", time: "19:05", status: "bedug" },
];

const PrayerSchedule = () => {
    const [open, setOpen] = useState(false)
    const { isActive, setIsActive } = usePrayerNotification()

    const openReminderSetting = () => {
        setOpen(true)
    }

    const closeReminderSetting = () => {
        setOpen(false)
    }

    const toggleNotification = () => {
        setIsActive(!isActive)
    }

    const renderPrayerIconFromStatus = (status: string | undefined) => {
        switch (status) {
            case "adzan":
            case "bedug":
                return <img src={Unmute} alt='Unmute Icon' />;
            case "notifikasi":
                return <img src={Notification} alt='Notification Icon' />;
            case "tidak-aktif":
            default:
                return <img src={Stop} alt='Mute Icon' />;
        }
    };

    const ContainerPrayer = ({ children }: PropsWithChildren) => {
        return (
            <View className='!bg-inactiveGrey min-h-screen relative'>
                <View style={{ backgroundImage: `url(${bgLanding})` }} className='bg-cover bg-top h-full bg-no-repeat rounded-b-2xl relative'>
                    <View className='flex flex-col gap-4 px-4 pt-14'>
                        <View className='flex items-center gap-2'>
                            <img src={Pin} />
                            <span className='text-white text-[12px] line-clamp-1'>Pancoran</span>
                        </View>
                        <View className='flex flex-col'>
                            <span className='text-white font-semibold'>Sholat Zuhur - 11:40</span>
                            <span className='text-[12px] text-white font-normal'>1 Jam 59 Menit lagi menuju zuhur</span>
                        </View>
                        <View className='flex gap-2'>
                            <div
                              style={{ border: `1px solid white` }}
                              className='flex gap-1 border-2 border-white rounded-full px-4 py-2'
                            >
                                <span className='text-white font-semibold border-2 border-white text-[12px]'>Cari Masjid</span>
                                <img src={Mosque} />
                            </div>
                            <div
                              style={{ border: `1px solid white` }}
                              className='flex items-center gap-1  border-2 border-white rounded-full px-4 py-2'
                            >
                                <span className='text-white font-semibold border-2 border-white text-[12px]'>Kiblat</span>
                                <img src={Compass} />
                            </div>
                        </View>
                    </View>
                    <div
                      className='py-4'
                      style={{
                            background:
                                "linear-gradient(180deg, rgba(239, 241, 244, 0.00) 30%, #EFF1F4 30%)",
                        }}
                    >
                        <div>
                            {children}
                        </div>
                    </div>
                </View>
            </View>
        )
    }
    return (
        <View className='!bg-inactiveGrey min-h-screen'>
            {/* <View style={{ backgroundImage: `url(${bgLanding})` }} className='bg-cover bg-no-repeat bg-center rounded-b-2xl'>
                <View className='flex flex-col gap-4 px-4 py-14'>
                    <View className='flex items-center gap-2'>
                        <img src={Pin} />
                        <span className='text-white text-[12px] line-clamp-1'>Pancoran</span>
                    </View>
                    <View className='flex flex-col'>
                        <span className='text-white font-semibold'>Sholat Zuhur - 11:40</span>
                        <span className='text-[12px] text-white font-normal'>1 Jam 59 Menit lagi menuju zuhur</span>
                    </View>
                    <View className='flex gap-2'>
                        <div
                            style={{ border: `1px solid white` }}
                            className='flex gap-1 border-2 border-white rounded-full px-4 py-2'
                        >
                            <span className='text-white font-semibold border-2 border-white text-[12px]'>Cari Masjid</span>
                            <img src={Mosque} />
                        </div>
                        <div
                            style={{ border: `1px solid white` }}
                            className='flex items-center gap-1  border-2 border-white rounded-full px-4 py-2'
                        >
                            <span className='text-white font-semibold border-2 border-white text-[12px]'>Kiblat</span>
                            <img src={Compass} />
                        </div>
                    </View>
                </View>
            </View> */}
            <ContainerPrayer>
                <View className='py-4 px-4'>
                    <View className='bg-white py-[22px] px-4 flex items-center justify-between rounded-2xl'>
                        <div className='flex items-center gap-2'>
                            <span className='text-[14px] font-semibold'>
                                Notifikasi
                            </span>
                            <Show when={!!isActive} fallbackComponent={
                                <>
                                    <span className='text-[10px] bg-[#EFF1F4] px-3 py-[6px] rounded-lg'>
                                        Tidak Aktif
                                    </span>
                                </>
                            }
                            >
                                <span className='text-[10px] text-[#008E53] bg-[#008E531A] px-3 py-[6px] rounded-lg'>
                                    Aktif
                                </span>
                            </Show>
                        </div>
                        <label className='switch'>
                            <input
                              type='checkbox'
                              checked={!!isActive}
                              onChange={toggleNotification}
                            />
                            <span className={`slider ${isActive ? 'slider-active' : ''}`}></span>
                        </label>
                    </View>
                </View>
                <View className='py-4 px-4'>
                    <View className='bg-blueNavy rounded-t-2xl flex flex-col items-center py-2'>
                        <span className='text-white font-semibold text-[12px]'>Rabu, 11 Desember 2024</span>
                        <span className='text-white font-semibold text-[12px]'>9 Jumadil Akhir 1446</span>
                    </View>
                    <View className='bg-white flex flex-col rounded-b-2xl'>
                        <RenderVerticalList data={prayerSchedule} keyIndex='id' pageSize={6}>
                            {(data: Prayer, index) => (
                                <View key={index} className='py-2 px-4'>
                                    <View
                                      className='flex items-center justify-between w-full py-2'
                                      style={{
                                            borderBottom: index === prayerSchedule.length - 1 ? 'none' : '1px solid #EFF1F4',
                                        }}
                                    >
                                        <View className='flex items-center gap-2'>
                                        {renderPrayerIconFromStatus(data.status)}
                                            <span className='text-[14px]'>{data.name}</span>
                                        </View>
                                        <View className='flex items-center gap-1'>
                                            <span className='text-[14px]'>{data.time}</span>
                                            {isActive ? (

                                                <span onClick={openReminderSetting} className='text-[12px] text-primaryRed'>Atur</span>
                                            ): (
                                                <span  className='text-[12px] text-[#9CA9B9]'>Atur</span>
                                            )}
                                        </View>
                                    </View>
                                </View>
                            )}
                        </RenderVerticalList>
                    </View>
                    <View className='w-full py-2 flex justify-center'>
                        <span className='text-[10px] text-center text-[#757F90]'>Sumber Data: Kementrian Agama Republik Indonesia</span>
                    </View>
                </View>
            </ContainerPrayer>
            <BottomSheet showHeader={false} open={open} onClose={closeReminderSetting}>
                <ReminderSetting />
            </BottomSheet>
        </View>
    )
}

export default PrayerSchedule