'use client'

import { CampaignPayload } from "@/components/Types"
import { CampaignItem } from "./CampaignItem"

interface ListCampanhasProps { 
    campanhas: CampaignPayload
}

export default function ListCampanhas({ campanhas }: ListCampanhasProps) {

    return (
      <table className="w-full table-auto text-xs">
        <thead className="text-slate-500 dark:text-slate-400 border-t border-b border-slate-200 uppercase font-[0.75rem] bg-grayLight-200">
          <tr>
            <th className="pl-4 pr-2 py-3 text-left">
              <span>
                ID
              </span>
            </th>

            <th className="px-2 py-3 text-left">
              <span>
                Impressoes
              </span>
            </th>

            <th className="px-2 py-3 text-left">
              <span>
                Cliques
              </span>
            </th>

            <th className="px-2 py-3 text-left">
              <span>
                Nome
              </span>
            </th>

            <th className="px-2 py-3 text-left">
              <span>
                Ações
              </span>
            </th>
          </tr>
        </thead>

        {campanhas.data.map((c, k) => (
            <CampaignItem campaign={c} key={k} />
        ))}
      </table>
    )
  }
  