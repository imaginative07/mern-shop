import { Helmet } from "react-helmet-async";

function Meta({ title, description, keywords }) {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keyword" content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
    title: "Welcome to MERN-Shop",
    description: "We sell the best products for cheap",
    keywords: "electronics, buy electronics, cheap electronics"
}

export default Meta