import Chip from './Chip';

export default function Profile({
  isTimer,
  isPlaying,
  timer,
  calculateProgress,
  open,
  chip,
  image,
}) {
  const handleHud = (e) => {
    e.stopPropagation();
    open();
  };
  return (
    <div className='relative '>
      {isTimer && isPlaying && (
        <svg className='absolute -top-1 -left-1' width='84' height='84'>
          <circle
            cx='42'
            cy='42'
            r='40'
            fill='none'
            stroke='#ddd'
            strokeWidth='4'
          />
          <circle
            cx='42'
            cy='42'
            r='40'
            fill='none'
            stroke={timer <= 5 ? '#ef4444' : '#3b82f6'}
            strokeWidth='4'
            strokeDasharray={`${2 * Math.PI * 40}`}
            strokeDashoffset={calculateProgress()}
            transform='rotate(-90 42 42)'
            className='transition-all duration-1000 ease-linear'
          />
        </svg>
      )}
      <div
        onClick={handleHud}
        className='flex items-center justify-center w-20 h-20 bg-gray-700 rounded-full shadow-lg'
      >
        <img
          src={image}
          alt='profileImg'
          className='w-16 h-16 bg-gray-600 border-2 border-gray-500 rounded-full'
        />
      </div>
      {isTimer && (
        <div className='absolute transform -translate-x-1/2 -top-8 left-1/2'>
          <span
            className={`font-bold ${
              timer <= 5 ? 'text-red-500' : 'text-blue-500'
            }`}
          >
            {timer}s
          </span>
        </div>
      )}
      {/* 칩 표시 - 아바타 우측 상단에 위치 */}
      {isPlaying && (
        <div className='absolute -top-2 -right-4'>
          <Chip amount={chip} />
        </div>
      )}
    </div>
  );
}
