type Statistics = {
  cpuUsage: number;
  ramUsage: number;
  storageUsage: number;
};

type StaticData = {
  totalStorage: number;
  cpuModel: string;
  totalRam: number;
};

type EventPayloadMapping = {
  statistics: Statistics;
  getStaticData: StaticData;
};

type UnsubFunction = () => void;

interface Window {
  electron: {
    subscribeStat: (
      callback: (statistics: Statistics) => void
    ) => UnsubFunction;
    getStaticData: () => Promise<StaticData>;
  };
}
