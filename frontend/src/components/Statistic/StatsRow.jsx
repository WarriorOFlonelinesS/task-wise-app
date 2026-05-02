import { nanoid } from 'nanoid';
import { StatsItem } from './StatsItem';

export const StatsRow = ({ statistics }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 w-full max-w-6xl mx-auto px-4 justify-center">
      {statistics.map((item) => {
        return (
          <StatsItem
            index={item.id | nanoid()}
            label={item.label}
            icon={item.icon}
            value={item.value}
          />
        );
      })}
    </div>
  );
};
