import { useEffect, useState } from "react";

// Загружает оба файла, возвращает как объект
export function useMbiData() {
  const [mbiData, setMbiData] = useState({ questions: null, scales: null, loading: true });

  useEffect(() => {
    async function fetchData() {
      const [qRes, sRes] = await Promise.all([
        fetch(import.meta.env.BASE_URL + "data/questions.json").then(r => r.json()),
        fetch(import.meta.env.BASE_URL + "data/scales.json").then(r => r.json())
      ]);
      setMbiData({
        questions: qRes,
        scales: sRes.scales,
        burnoutIndex: sRes.burnoutIndex,
        loading: false
      });
    }
    fetchData();
  }, []);

  return mbiData;
}