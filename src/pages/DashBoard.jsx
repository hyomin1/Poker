import Button from '../components/Button';
import FormInput from '../components/FormInput';
import ProfileImage from '../components/ProfileImage';
import useUser from '../hooks/useUser';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { useEffect } from 'react';
import useAuthStore from '../stores/useAuthStore';
import useBoard from '../hooks/useBoard';

export default function DashBoard() {
  const {
    userQuery: { isLoading: userLoading, error: userError, data: user },
    imageQuery: { isLoading: imgLoading, error: imgError, data: image },
    updateImage,
  } = useUser();
  const { userId, password, subId } = useAuthStore();
  const {
    boardContextQuery: { isLoading, error, data: boardContext },
  } = useBoard();

  useEffect(() => {
    if (
      boardContext?.length > 0 &&
      window.confirm('진행중이던 게임이 있습니다. 이동하시겠습니까?')
    ) {
      boardContext.forEach((board) => {
        const url = `/board/${board.id}`;
        const game = window.open('about:blank', '_blank');
        if (game) {
          game.name = JSON.stringify({ userId, password, subId });
          game.location = url;
        }
      });
    }
  }, [boardContext]);

  if (userLoading || imgLoading || isLoading) {
    return <Loading />;
  }
  if (userError || imgError || error) {
    return <Error />;
  }

  return (
    <div className='min-h-screen px-4 py-12 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto'>
        <div className='mb-8 text-center'>
          <h1 className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500'>
            프로필
          </h1>
        </div>

        <div className='p-8 shadow-xl bg-gray-800/50 backdrop-blur-sm rounded-3xl ring-1 ring-white/10'>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
            {/* 왼쪽 프로필 이미지 섹션 */}
            <div className='flex flex-col items-center space-y-4'>
              <div className='relative group'>
                <div className='absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full opacity-50 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200'></div>
                <div className='relative'>
                  <ProfileImage
                    image={image}
                    updateImage={updateImage}
                    className='object-cover w-40 h-40 rounded-full ring-4 ring-gray-800'
                  />
                </div>
              </div>

              <div className='font-medium text-emerald-400'>
                {user.userName}님 환영합니다
              </div>
            </div>

            {/* 오른쪽 정보 섹션 */}
            <div className='space-y-6'>
              <div className='space-y-4'>
                <FormInput
                  type='text'
                  name='userId'
                  text='아이디'
                  disabled={true}
                  value={user.userId}
                  className='text-gray-300 border-gray-600 bg-gray-700/50'
                />
                <FormInput
                  type='text'
                  name='username'
                  text='유저명'
                  disabled={true}
                  value={user.userName}
                  className='text-gray-300 border-gray-600 bg-gray-700/50'
                />
                <FormInput
                  type='text'
                  name='money'
                  text='보유 금액'
                  disabled={true}
                  value={`${user.money.toLocaleString()}`}
                  className='text-gray-300 border-gray-600 bg-gray-700/50'
                />
              </div>
            </div>
          </div>

          {/* 버튼 섹션 */}
          <div className='grid grid-cols-2 gap-4 mt-8'>
            <Button
              text='플레이'
              path='/lobby'
              className='py-3 font-bold text-white transition-all transform bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 rounded-xl hover:scale-105'
            />
            <Button
              text='핸드히스토리'
              path='/handHistory'
              className='py-3 font-bold text-white transition-all transform bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 rounded-xl hover:scale-105'
            />
          </div>
        </div>

        {/* 데코레이션 효과 */}
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl max-h-[600px] blur-3xl opacity-20 bg-gradient-to-r from-emerald-500 to-blue-500 -z-10' />
      </div>
    </div>
  );
}
