import FormatList from "@/components/FormatList";
import SubmitForm from "@/components/SubmitForm";
import VideoDetail from "@/components/VideoDetail";

export default function Home() {
  return (
    <>
      <header className=" bg-slate-900 text-white flex">
        <a className="w-56 flex items-center justify-center m-2 p-2" href="/">
          <h1 className="font-bold text-xl">Youtube Downloader</h1>
        </a>
      </header>
      <main>
        <SubmitForm />
        <VideoDetail />
        <FormatList />
      </main>
    </>
  );
}
