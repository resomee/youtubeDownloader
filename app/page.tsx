import FormatList from "@/components/FormatList";
import SubmitForm from "@/components/SubmitForm";
import VideoDetail from "@/components/VideoDetail";

export default function Home() {
  return (
    <>
      <header className=" bg-slate-900 text-white p-4">
        <h1 className="font-bold text-xl">Youtube Downloader</h1>
      </header>
      <main>
        <SubmitForm />
        <VideoDetail />
        <FormatList />
      </main>
    </>
  );
}
