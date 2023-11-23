import { Header } from "@/components/Header/Header";
import { Sidebar } from "@/components/Header/Sidebar";
import { FacebookMain } from "./main";
import FacebookProvider from "@/providers/FacebookProvider";
import AsanaProvider from "@/providers/AsanaProvider";

export default function Pedidos() {

    return (
      <FacebookProvider>
          <Header />
          <Sidebar />
          <FacebookMain />
      </FacebookProvider>
    )
  }
  