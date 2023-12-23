import { FC, ReactNode } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { datapoint } from "../../types";

import styles from "./graph.module.css";

type Props = {
  children?: ReactNode;
  data: datapoint[];
};

const Graph: FC<Props> = ({ data }) => {
  return (
    <div className={styles.container}>
      <LineChart
        width={1000}
        height={600}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="TPM"
          type="number"
          height={90}
          label={{ value: "Tokens per minute" }}
        />
        <YAxis
          label={{
            value: "Cost in $",
            angle: -90,
            position: "insideLeft",
          }}
          width={90}
        />
        <Tooltip />
        <Legend align="center" />
        <Line
          type="linear"
          dataKey="PTU Cost"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="linear" dataKey="PayGo Cost" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

export default Graph;
