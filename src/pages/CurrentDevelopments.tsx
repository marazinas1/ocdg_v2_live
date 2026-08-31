import CategoryPage from "@/components/CategoryPage";

const CurrentDevelopments = () => (
  <CategoryPage
    status={["active", "under_contract"]}
    eyebrow="Our Portfolio"
    heading="Current Developments"
    seoTitle="Current Developments — Ocean City Custom Homes"
    seoDescription="Active and under-contract luxury custom homes by Ocean City Development Group."
    path="/developments/current"
    emptyMessage="No current developments at this time."
  />
);

export default CurrentDevelopments;
