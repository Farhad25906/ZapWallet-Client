import { useEffect, useState } from "react";

const ZapWalletLoader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
      {/* Animated Logo */}
      <div className="relative">
        <div className="animate-pulse">
          <svg
            viewBox="0 0 1024 1024"
            className="h-24 w-24 md:h-32 md:w-32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M798.7 501.1h-598c-17.7 0-32-14.3-32-32s14.3-32 32-32h598v64z"
                fill="#FFE0B6"
              ></path>
              <path
                d="M718.7 471.1h-470v-148c0-8.8 7.2-16 16-16h438c8.8 0 16 7.2 16 16v148z"
                fill="#009689"
              ></path>
              <path d="M248.7 405.1h470v32h-470z" fill="#FFFFFF"></path>
              <path
                d="M848.7 501.1h-648c-17.7 0-32-14.3-32-32v388c0 35.3 28.7 64 64 64h552c35.3 0 64-28.7 64-64v-356z"
                fill="#009689"
              ></path>
              <path
                d="M421.4 634.5l-15.1 14.7c-6.9-7.1-13.7-10.6-20.4-10.6-4 0-7.2 1.1-9.6 3.2-2.5 2.1-3.7 4.5-3.7 7.3 0 2.3 1.1 4.7 3.3 7 2.1 2.3 6.5 4.8 13 7.5 11.6 4.8 19.5 8.9 23.8 12.3 4.3 3.4 7.6 7.4 9.8 12.2 2.3 4.7 3.4 10.1 3.4 15.9 0 5.9-1.2 11.3-3.7 16.3-2.4 5-5.6 9-9.5 11.9-3.9 2.9-9.4 5.1-16.6 6.6v20.9h-14.7v-20.4c-6.8-0.8-12.6-2.5-17.4-5.2-6.6-3.6-12.7-8.5-18.3-14.5l14.8-15.2c9.5 10.2 18.8 15.2 27.7 15.2 4.5 0 8.4-1.6 11.7-4.7 3.3-3.2 4.9-6.9 4.9-11.1 0-3.6-1-6.7-3.1-9.5-2.1-2.7-6.2-5.5-12.3-8.3-12.4-5.7-20.8-10.3-25.2-13.6s-7.6-7.1-9.8-11.3c-2.2-4.2-3.2-8.7-3.2-13.4 0-7.9 2.9-14.6 8.6-20.2 5.7-5.6 13-8.6 21.7-9v-7.8H396v8.8c5.1 1.2 9.3 2.8 12.9 4.8s7.7 5.4 12.5 10.2z"
                fill="#009689"
              ></path>
              <path
                d="M848.7 756.1h-154c-35.3 0-64-28.7-64-64s28.7-64 64-64h154v128z"
                fill="#DAE5FF"
              ></path>
              <path
                d="M693.7 724.1c-17.6 0-32-14.4-32-32s14.4-32 32-32 32 14.4 32 32-14.4 32-32 32z"
                fill="#FFFFFF"
              ></path>
              <path
                d="M693.7 732.1c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-18 40-40 40z m0-64c-13.2 0-24 10.8-24 24s10.8 24 24 24 24-10.8 24-24-10.8-24-24-24z"
                fill="#009689"
              ></path>
            </g>
          </svg>
        </div>
        
        {/* Pulsing Ring Effect */}
        <div className="absolute inset-0 border-4 border-[#009689]/30 rounded-full animate-ping"></div>
      </div>

      {/* Site Name with Animation */}
      <div className="mt-6 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-[#009689] animate-bounce">
          ZapWallet
        </h1>
        <p className="text-gray-500 mt-2 animate-pulse">Loading your financial world...</p>
      </div>

      {/* Loading Bar */}
      <div className="w-64 h-2 bg-gray-200 rounded-full mt-8 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#009689] to-[#FFE0B6] animate-loadingBar"></div>
      </div>
    </div>
  );
};

export default ZapWalletLoader;