import CategoryPage from "@/components/CategoryPage";
import PastDevelopmentsSection from "@/components/PastDevelopmentsSection";

const SoldProjects = () => (
  <CategoryPage
    status="sold"
    eyebrow="Our Legacy"
    heading="Sold"
    seoTitle="Sold Portfolio — Ocean City Custom Homes"
    seoDescription="Completed and sold luxury custom homes built by Ocean City Development Group."
    path="/developments/sold"
    emptyMessage="No sold homes yet."
  >
    <PastDevelopmentsSection />
  </CategoryPage>
);

export default SoldProjects;
