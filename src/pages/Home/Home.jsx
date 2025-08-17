import { Helmet } from "react-helmet"
import Banner from "./Banner"
import LatestBlogs from "./LatestBlogs"
import NewsletterForm from "./NewsletterForm"
import PopularPolicies from "./PopularPolicies"
import ReviewsCarousel from "./ReviewsCarousel"
import FeaturedAgents from "./FeaturedAgents"
import InsurancePlans from "./InsurancePlans"
import WhyChooseUs from "./WhyChooseUs"
import Partners from "./Partners"
import SuccessStats from "./SuccessStats"
import FAQ from "./FAQ"


const Home = () => {
  return (
    <div>
        <Helmet>
        <title>Home | Secure Tomorrow</title>
      </Helmet>
      <Banner />
      <PopularPolicies />
      <ReviewsCarousel />
     <LatestBlogs />
     <InsurancePlans />
     <WhyChooseUs />
     <Partners />
     <SuccessStats />
     <FAQ />
     <NewsletterForm />
     <FeaturedAgents />
    </div>
  )
}

export default Home
