import TiltMeIcon from '@/shared/icons/TiltMeIcon';
import { useEffect, useState } from 'react';

const OrientationWarning = () => {
  const [isLandscape, setLandscape] = useState(false);

  useEffect(() => {
    const OrientationChange = () => {
      if (window.innerWidth > window.innerHeight) {
        setLandscape(true);
      } else {
        setLandscape(false);
      }
    };

    window.addEventListener('resize', OrientationChange);
    OrientationChange();

    return () => {
      window.removeEventListener('resize', OrientationChange);
    };
  }, []);

  return (
    <>
      {isLandscape && (
        <div className='z-[999] fixed h-screen w-full bg-app_gray_light-100 dark:bg-app_gray_dark-300 justify-center flex flex-col items-center gap-y-[16px]'>
            <TiltMeIcon className='text-[#007AFF] size-[140px]' />
            <div className='flex flex-col items-center gap-y-[5px]'>
                <h1 className='text-[32px] font-bold'>Переверни меня</h1>
                <p className='text-[20px] text-center text-black/40 dark:text-white/40 font-medium'>
                Приложение 120Block работает <br />
                только в вертикальном режиме 
                </p>
            </div>
        </div>
      )}
    </>
  );
};

export default OrientationWarning;