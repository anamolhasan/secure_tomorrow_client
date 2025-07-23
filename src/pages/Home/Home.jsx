import { Helmet } from "react-helmet"
import Banner from "./Banner"
import LatestBlogs from "./LatestBlogs"
import NewsletterForm from "./NewsletterForm"


const Home = () => {
  return (
    <div>
        <Helmet>
        <title>Home | Secure Tomorrow</title>
      </Helmet>
      <Banner />
     <LatestBlogs />
     <NewsletterForm />
    </div>
  )
}

export default Home
