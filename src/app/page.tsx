import Search from "#/components/home/Search";
import JobCard from "#/components/home/JobCard";

export default function Page() {
  return (
    <div className="mx-[7vw] flex flex-col">
      <Search />

      <div className="mt-40 grid grid-cols-2 gap-5">
        <JobCard />
        <JobCard />
      </div>
    </div>
  );
}
