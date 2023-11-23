import { PlanilhasDTO } from "@/@types/types";

// Função para verificar se uma data é válida
function normalizeDate(dateString: string): string {
    // Verifica se a data está no formato "DD/MM/AAAA"
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
      return dateString; // A data já está no formato correto
    }
  
    // Outros formatos de data (adapte conforme necessário)
    // Por exemplo, considerando que 11-10-2023 é equivalente a 11/10/2023:
    if (/^\d{2}-\d{2}-\d{4}$/.test(dateString)) {
      return dateString.replace(/-/g, '/');
    }
  
    // Adicione mais formatos de data, se necessário
  
    return ""; // Retorne uma string vazia se a data não for válida
}

function parseDate(dateString: string) {
    const parts = dateString.split("/");
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Lembre-se de subtrair 1 do mês
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }
    return null; // Retorna nulo se a data não puder ser analisada
  }

const FiltersDatas = (data: PlanilhasDTO[]) => {
  // Filtrar datas válidas
   // Normaliza as datas para o formato "DD/MM/AAAA"
   const datasNormalizadas = data.map(item => {
        item.data = normalizeDate(item.data) 

        return item
   });

   // Filtrar datas válidas
   const datasValidas = datasNormalizadas.filter(item => /^\d{2}\/\d{2}\/\d{4}$/.test(item.data));

  // Obter a data atual
  const dataAtual = new Date();

  // Passo 1: Filtrar as datas do dia atual
  const dataDiaAtual = datasNormalizadas.filter(item => {
    if(datasValidas.includes(item)) {
        const dataItem = parseDate(item.data);
        if(dataItem) {
            const diffDias = Math.floor((dataAtual.getTime() - dataItem.getTime()) / (1000 * 60 * 60 * 24));
            return diffDias === 0;
        }
    }else{
        return false
    }
  });

  // Passo 2: Filtrar as datas dos últimos 7 dias
  const dataUltimos7Dias = datasNormalizadas.filter(item => {
    if(datasValidas.includes(item)) {
        const dataItem = parseDate(item.data);
        if(dataItem) {
            const diffDias = Math.floor((dataAtual.getTime() - dataItem.getTime()) / (1000 * 60 * 60 * 24));
            return diffDias >= 1 && diffDias <= 7;
        }
    }

    return false
  });

  // Passo 3: Filtrar as datas dos últimos 30 dias
  const dataUltimos30Dias = datasNormalizadas.filter(item => {
    if(datasValidas.includes(item)) {
        const dataItem = parseDate(item.data);

        if(dataItem) {
            const diffDias = Math.floor((dataAtual.getTime() - dataItem.getTime()) / (1000 * 60 * 60 * 24));
            return diffDias >= 1 && diffDias <= 30;
        }
    }
  });

  // Passo 4: Filtrar as datas do ano atual
  const dataAnoAtual = datasNormalizadas.filter(item => {
    if(datasValidas.includes(item)) {
        const dataItem = parseDate(item.data);
        if(dataItem) {
            return dataItem.getFullYear() === dataAtual.getFullYear();
        }
    }
  });

  // Faça algo com os resultados dos filtros

  return {dataDiaAtual, dataUltimos7Dias, dataUltimos30Dias, dataAnoAtual}
}

const formatDate = (originalDate: Date): string => {
  // Converte a string para um objeto Date
  const dateObject = new Date(originalDate);

  // Mapeia os nomes dos meses
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"
  ];

  // Obtém o mês e o dia da data
  const month = monthNames[dateObject.getMonth()];
  const day = dateObject.getDate();

  // Formata a data para o novo formato "Mon DD"
  const formattedDate = `${month} ${day}`;

  return formattedDate;
};

export {FiltersDatas, formatDate}
