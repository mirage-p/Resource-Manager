import { useEffect, useState } from "react";

export function useSatistics(dataPointCount: number): Statistics[] {
  const [value, setValue] = useState<Statistics[]>([]);
  useEffect(() => {
    const unsub = window.electron.subscribeStat((stats) =>
      setValue((prev) => {
        const newData = [...prev, stats];

        if (newData.length > dataPointCount) {
          newData.shift();
        }

        return newData;
      })
    );
    return unsub;
  }, [dataPointCount]);
  return value;
}
