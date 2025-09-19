import TopCategoryBusiness from "./TopCategoryBusiness";
import TopCategoryCulture from "./TopCategoryCulture";
import TopCategoryEntertainment from "./TopCategoryEntertainment";
import TopCategoryPolitics from "./TopCategoryPolitics";
import data from "@/data.json";
import TopCategoryTechnology from "./TopCategoryTechnology";
import TopCategoryInnovation from "./TopCategoryInnovation";

const TopStories = async () => {
  const politics = await (
    await fetch("http://localhost:3000/api/articles/politics")
  ).json();
  const entertainment = await (
    await fetch("http://localhost:3000/api/articles/entertainment")
  ).json();
  const business = await (
    await fetch("http://localhost:3000/api/articles/business")
  ).json();
  const culture = await (
    await fetch("http://localhost:3000/api/articles/culture")
  ).json();
  const technology = await (
    await fetch("http://localhost:3000/api/articles/technology")
  ).json();
  const sports = await (
    await fetch("http://localhost:3000/api/articles/sports")
  ).json();

  return (
    <div className="mt-10">
      <h1>Top Stories</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-6">
        <TopCategoryPolitics politics={politics} />
        <TopCategoryEntertainment entertainment={entertainment} />
        <TopCategoryBusiness business={business} />
        <TopCategoryCulture culture={culture} />
        <TopCategoryTechnology technology={technology} />
        <TopCategoryInnovation sports={sports} />
      </div>
    </div>
  );
};

export default TopStories;
