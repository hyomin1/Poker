export default function VictoryMessage({ winners }) {
  return (
    <div className='fixed inset-x-0 top-0 z-50 p-4 '>
      <div className='w-full max-w-2xl mx-auto transform scale-100 animate-fade-in'>
        {/* Header */}
        <div className='mb-4 text-center'>
          <h2 className='text-3xl font-bold text-transparent bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text animate-pulse'>
            🏆 게임 결과 🏆
          </h2>
        </div>

        {/* Winners List */}
        <div className='space-y-3'>
          {winners.map((winner, index) => (
            <div
              key={winner.userId}
              className='bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl overflow-hidden border border-slate-700/50 shadow-[0_0_15px_rgba(255,215,0,0.3)] animate-slide-up'
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className='p-4'>
                <div className='flex items-center justify-between gap-4'>
                  <div className='space-y-2'>
                    <h3 className='text-xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text'>
                      {winner.playerName}
                    </h3>

                    <p className='text-base font-medium text-slate-300'>
                      {winner.gameResult.handContext}
                    </p>
                  </div>

                  <div className='px-4 py-2 border bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 rounded-xl border-emerald-500/30'>
                    <span className='text-lg font-bold text-emerald-400'>
                      +
                      {typeof winner.gameResult.earnedMoney === 'number'
                        ? winner.gameResult.earnedMoney.toLocaleString()
                        : winner.gameResult.earnedMoney}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }

        .animate-slide-up {
          opacity: 0;
          animation: slide-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
