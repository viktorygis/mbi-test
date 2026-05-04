// hooks/useMbiData.js
import { useEffect, useState } from "react";

export function useMbiData() {
  const [mbiData, setMbiData] = useState({
    questions: null,
    scales: null,
    scores: null,
    answerOptions: null,
    burnoutIndex: null,
    scalesData: null,
    loading: true,
  });

  useEffect(() => {
    async function fetchData() {
      const qRes = await fetch(import.meta.env.BASE_URL + "data/questions.json").then(r => r.json());
      const sRes = await fetch(import.meta.env.BASE_URL + "data/scales.json").then(r => r.json());
      setMbiData({
        questions:     qRes.questions,
        answerOptions: qRes.answerOptions,
        scores:        qRes.scores,
        scales:        sRes.scales,
        burnoutIndex:  sRes.burnoutIndex,
        scalesData:    sRes,
        loading:       false,
      });
    }
    fetchData();
  }, []);

  return mbiData;
}