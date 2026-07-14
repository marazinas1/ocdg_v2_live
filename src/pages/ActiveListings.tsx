import CategoryPage from "@/components/CategoryPage";

const ActiveListings = () => (
  <CategoryPage
    status="active"
    eyebrow="Our Portfolio"
    heading="Active Listings"
    seoTitle="Active Listings — Ocean City Luxury Homes"
    seoDescription="Custom luxury homes currently for sale in Ocean City, NJ by OCDG."
    path="/developments/active-listings"
    emptyMessage="No active listings at this time."
  />
);

export default ActiveListings;
