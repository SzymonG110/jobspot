import Search from "#/features/job/components/Search";
import JobCard from "#/features/job/components/JobCard";

export default function Page() {
  return (
    <div className="xl:mx-[7vw] flex flex-col">
      <Search />

      <div className="mt-12 lg:mt-28 grid lg:grid-cols-2 gap-5">
        <JobCard />
        <JobCard />
      </div>
    </div>
  );
}
