import LatestSection from './LatestSection'
import TrendingSection from './TrendingSection'

const LatestAndTrending = () => {
  return (
    <section className="px-6 md:px-16 py-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-20 max-w-375 mx-auto">
      <div className="lg:col-span-7">
        <LatestSection />
      </div>

      <div className="lg:col-span-5">
        <TrendingSection />
      </div>
    </section>
  )
}
export default LatestAndTrending