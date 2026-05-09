import {
  BarChart,
  CartesianGrid,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from 'recharts';

const data = [
  { name: 'To Do', value: 400 },
  { name: 'In Process', value: 300 },
  { name: 'Done', value: 300 },
];

const COLORS = ['#9ca3af', '#60a5fa', '#34d399'];

export const TaskChart = () => {
  return (
    <div className="flex justify-center my-7">
      <div className="w-3/4 h-80 backdrop-blur-md bg-white/5 border border-white/10 p-8 rounded-lg">
        <h3 className="text-white mb-4 text-center">Tasks for this month</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} />
            <YAxis hide />

            <Tooltip
              cursor={false}
              contentStyle={{
                backgroundColor: '#184e4a',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
              }}
              itemStyle={{ color: 'white' }}
              formatter={(value) => [value, 'Кількість']}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
