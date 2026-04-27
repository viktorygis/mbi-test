// src/hooks/useScales.js

import { useEffect, useState } from "react";

// Универсальный хук загрузки scales.json (асинхронно)
export function useScales() {
  const [scales, setScales] = useState(null);

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + "data/scales.json")
      .then((res) => res.json())
      .then((data) => setScales(data.scales || {}));
  }, []);

  return scales;
}
