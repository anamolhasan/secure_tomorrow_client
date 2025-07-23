import { Helmet } from "react-helmet"
import Banner from "./Banner"
import LatestBlogs from "./LatestBlogs"
import NewsletterForm from "./NewsletterForm"
import PopularPolicies from "./PopularPolicies"
import ReviewsCarousel from "./ReviewsCarousel"


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
    </div>
  )
}

export default Home
