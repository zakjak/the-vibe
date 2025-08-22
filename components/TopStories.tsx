import TopCategoryBusiness from "./TopCategoryBusiness";
import TopCategoryCulture from "./TopCategoryCulture";
import TopCategoryEntertainment from "./TopCategoryEntertainment";
import TopCategoryPolitics from "./TopCategoryPolitics";
import data from "@/data.json";
import TopCategoryTechnology from "./TopCategoryTechnology";
import TopCategoryInnovation from "./TopCategoryInnovation";

const TopStories = () => {
  const politics = data.filter((cat) => cat.category === "politics");
  const entertainment = data.filter((cat) => cat.category === "entertainment");
  const business = data.filter((cat) => cat.category === "business");
  const culture = data.filter((cat) => cat.category === "culture");
  const technology = data.filter((cat) => cat.category === "technology");
  const innovation = data.filter((cat) => cat.category === "innovation");

  return (
    <div className="mt-10">
      <h1>Top Stories</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-6">
        <TopCategoryPolitics politics={politics} />
        <TopCategoryEntertainment entertainment={entertainment} />
        <TopCategoryBusiness business={business} />
        <TopCategoryCulture culture={culture} />
        <TopCategoryTechnology technology={technology} />
        <TopCategoryInnovation innovation={innovation} />
      </div>
    </div>
  );
};

export default TopStories;
