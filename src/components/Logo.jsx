export default function Logo() {
  return (
    <div className='flex items-center p-6'>
      <img
        src='/images/logo.png'
        alt='logo'
        className='w-16 h-16 transition-transform rounded-lg shadow-lg hover:scale-105'
      />
      <h2 className='ml-4 text-2xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text'>
        포커 게임
      </h2>
    </div>
  );
}
