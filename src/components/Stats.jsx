import Reveal from './Reveal.jsx'
import Counter from './Counter.jsx'

function Stats() {
  return (
    <section className="py-12 bg-black border-y border-gray-900/40" id="statistics">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <Reveal delay={0.1} variant="fade-up">
            <div className="relative overflow-hidden rounded-xl border border-gray-800/80 bg-gray-900/10 backdrop-blur-md p-6 md:p-8 flex flex-col items-center text-center transition-all duration-300 hover:border-amber-500/40 hover:bg-gray-900/20 group shadow-xl">
              {/* Soft glow behind card content */}
              <div className="absolute -right-12 -bottom-12 w-28 h-28 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all duration-300 pointer-events-none" />
              
              <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2 select-none">
                <Counter target={20} suffix="+" />
              </div>
              <div className="text-xs md:text-sm font-semibold text-white/45 group-hover:text-white/70 transition-colors duration-300 uppercase tracking-widest">
                Developer Network
              </div>
            </div>
          </Reveal>

          {/* Card 2 */}
          <Reveal delay={0.2} variant="fade-up">
            <div className="relative overflow-hidden rounded-xl border border-gray-800/80 bg-gray-900/10 backdrop-blur-md p-6 md:p-8 flex flex-col items-center text-center transition-all duration-300 hover:border-amber-500/40 hover:bg-gray-900/20 group shadow-xl">
              <div className="absolute -right-12 -bottom-12 w-28 h-28 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all duration-300 pointer-events-none" />
              
              <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2 select-none">
                <Counter target={10} suffix="+" />
              </div>
              <div className="text-xs md:text-sm font-semibold text-white/45 group-hover:text-white/70 transition-colors duration-300 uppercase tracking-widest">
                Projects Shipped
              </div>
            </div>
          </Reveal>

          {/* Card 3 */}
          <Reveal delay={0.3} variant="fade-up">
            <div className="relative overflow-hidden rounded-xl border border-gray-800/80 bg-gray-900/10 backdrop-blur-md p-6 md:p-8 flex flex-col items-center text-center transition-all duration-300 hover:border-amber-500/40 hover:bg-gray-900/20 group shadow-xl">
              <div className="absolute -right-12 -bottom-12 w-28 h-28 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all duration-300 pointer-events-none" />
              
              <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2 select-none">
                <Counter target={3} suffix="+" />
              </div>
              <div className="text-xs md:text-sm font-semibold text-white/45 group-hover:text-white/70 transition-colors duration-300 uppercase tracking-widest">
                Core Engineers
              </div>
            </div>
          </Reveal>

          {/* Card 4 */}
          <Reveal delay={0.4} variant="fade-up">
            <div className="relative overflow-hidden rounded-xl border border-gray-800/80 bg-gray-900/10 backdrop-blur-md p-6 md:p-8 flex flex-col items-center text-center transition-all duration-300 hover:border-amber-500/40 hover:bg-gray-900/20 group shadow-xl">
              <div className="absolute -right-12 -bottom-12 w-28 h-28 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all duration-300 pointer-events-none" />
              
              <div className="text-xl md:text-2xl font-extrabold text-white tracking-tight mb-3 mt-1 select-none leading-none">
                <span className="bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">End-to-End</span>
              </div>
              <div className="text-xs md:text-sm font-semibold text-white/45 group-hover:text-white/70 transition-colors duration-300 uppercase tracking-widest">
                Product Development
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  )
}

export default Stats
