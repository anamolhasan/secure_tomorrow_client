import { Helmet } from "react-helmet"
import Banner from "./Banner"
import LatestBlogs from "./LatestBlogs"
import NewsletterForm from "./NewsletterForm"
import PopularPolicies from "./PopularPolicies"
import ReviewsCarousel from "./ReviewsCarousel"
import FeaturedAgents from "./FeaturedAgents"


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
     <NewsletterForm />
     <FeaturedAgents />
    </div>
  )
}

export default Home
