import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip
} from 'recharts'
import type { WidgetVisual } from '../data/dashboard'

type WidgetChartProps = {
  visual: WidgetVisual
}

const chartColors = ['#5679ff', '#d6dfff', '#e7555f', '#f6c343', '#1fd5a1']

export const WidgetChart = ({ visual }: WidgetChartProps) => {
  if (visual.type === 'donut') {
    return (
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={visual.data}
              dataKey="value"
              nameKey="name"
              innerRadius={40}
              outerRadius={60}
              paddingAngle={2}
            >
              {visual.data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={entry.color || chartColors[index % chartColors.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    )
  }

  if (visual.type === 'bar') {
    return (
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={visual.data}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <Tooltip
              cursor={{ fill: 'rgba(0,0,0,0.04)' }}
              contentStyle={{ borderRadius: 12, border: '1px solid #e6ebf9' }}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {visual.data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={entry.color || chartColors[index % chartColors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return null
}

