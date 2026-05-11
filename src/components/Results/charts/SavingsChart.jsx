import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const SavingsChart = ({
  toolResults,
   showAnnual,
}) => {

const data = toolResults.map((tool) => ({

  tool: tool.tool,

  savings: showAnnual
    ? tool.annualSavings
    : tool.monthlySavings,

  fill:
    tool.monthlySavings > 0
      ? "#10b981"
      : "#3b82f6",

}));

  return (
    <div
      className="
        h-[350px]
        w-full
      "
    >

      <ResponsiveContainer
        width="100%"
        height="100%"
      >

        <BarChart
  data={data}
  margin={{
    top: 10,
    right: 10,
    left: -20,
    bottom: 0,
  }}
>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#1f2937"
          />
<XAxis
  dataKey="tool"
  stroke="#9ca3af"
  tickLine={false}
  axisLine={false}
  tick={{
    fontSize: 12,
  }}
/>

          <YAxis
  stroke="#9ca3af"
  tickLine={false}
  axisLine={false}
  tick={{
    fontSize: 12,
  }}
/>

          <Tooltip
  content={
    <CustomTooltip
      showAnnual={showAnnual}
    />
  }
/>

    <Bar
  dataKey="savings"
  radius={[12, 12, 0, 0]}
>

  {data.map((entry, index) => (
    <Cell
      key={`cell-${index}`}
      fill={entry.fill}
    />
  ))}

</Bar>
     <Cell fill={data.fill} />

        </BarChart>

      </ResponsiveContainer>
    </div>
  );
};

export default SavingsChart;