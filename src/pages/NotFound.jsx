import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className='flex items-center justify-center h-screen p-4 bg-gradient-to-br from-gray-50 to-gray-100'>
      <div className='space-y-6 text-center'>
        <h1 className='font-bold text-transparent text-9xl bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text'>
          404
        </h1>
        <h2 className='text-3xl font-semibold text-gray-700'>
          페이지를 찾을 수 없습니다
        </h2>
        <p className='max-w-md text-gray-500'>
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <button
          onClick={() => navigate(-1)}
          className='px-6 py-3 text-white transition-all duration-200 rounded-lg shadow-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600'
        >
          이전 페이지로 돌아가기
        </button>
      </div>
    </div>
  );
}
