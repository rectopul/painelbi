import { Header } from "@/components/Header/Header";
import { Sidebar } from "@/components/Header/Sidebar";
import FacebookProvider from "@/providers/FacebookProvider";
import { AsanaMain } from "./main";

export default function Pedidos() {

    return (
      <FacebookProvider>
          <Header />
          <Sidebar />
          <AsanaMain />
      </FacebookProvider>
    )
  }
  