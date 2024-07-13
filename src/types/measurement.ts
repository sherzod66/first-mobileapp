export type Measurement = {
  date: Date;
  data: MeasurementData[];
};

type MeasurementData = {
  key: string;
  value: string;
};
