import { Header } from "@/components/Header/Header";
import { Sidebar } from "@/components/Header/Sidebar";
import MainCampanhas from "./main";
import FacebookProvider from "@/providers/FacebookProvider";

export default function Campanhas() {

    return (
        <FacebookProvider>
          <Header />
          <Sidebar />
          <MainCampanhas />
        </FacebookProvider>
    )
  }
  