import React, { Suspense } from "react";
import Navbar from "./Navbar";
import AllBusiness from "./AllBusiness";
import AllCulture from "./AllCulture";
import AllEntertainment from "./AllEntertainment";
import AllInnovation from "./AllInnovation";
import AllPolitics from "./AllPolitics";
import AllSearch from "./AllSearch";
import AllSports from "./AllSports";
import AllTechnology from "./AllTechnology";

const PageWrapper = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading Navbar...</div>}>
        <Navbar />
      </Suspense>

      <Suspense fallback={<div>Loading Business Section...</div>}>
        <AllBusiness />
      </Suspense>

      <Suspense fallback={<div>Loading Culture Section...</div>}>
        <AllCulture />
      </Suspense>

      <Suspense fallback={<div>Loading Entertainment Section...</div>}>
        <AllEntertainment />
      </Suspense>

      <Suspense fallback={<div>Loading Innovation Section...</div>}>
        <AllInnovation />
      </Suspense>

      <Suspense fallback={<div>Loading Politics Section...</div>}>
        <AllPolitics />
      </Suspense>

      <Suspense fallback={<div>Loading Search Section...</div>}>
        <AllSearch />
      </Suspense>

      <Suspense fallback={<div>Loading Sports Section...</div>}>
        <AllSports />
      </Suspense>

      <Suspense fallback={<div>Loading Technology Section...</div>}>
        <AllTechnology />
      </Suspense>
    </div>
  );
};

export default PageWrapper;
