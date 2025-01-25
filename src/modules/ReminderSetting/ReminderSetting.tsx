import Button from '../../components/Button'

const ReminderSetting = () => {
    return (
        <>
            <div className='text-center text-base font-semibold'>
                Pengingat Waktu Subuh
            </div>
            <div>
                <div className='flex flex-col'>
                    <span className='text-base'>Suara Adzan</span>
                    <span className='text-base'>Suara Bedug</span>
                    <span className='text-base'>Notifikasi</span>
                    <span className='text-base'>Tidak aktif</span>
                </div>
            </div>
            <div>
                <div>
                    <span className='text-base'>Pengingat Sebelum Subuh</span>
                </div>
                <div className='flex gap-2'>
                    <span className='text-base'>5 Menit</span>
                    <span className='text-base'>10 Menit</span>
                    <span className='text-base'>15 Menit</span>
                </div>
            </div>
            <div>
                <Button label='Simpan' className='border-0'/>
            </div>
        </>
    )
}

export default ReminderSetting