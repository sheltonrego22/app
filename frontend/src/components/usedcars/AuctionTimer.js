import { useEffect, useState } from 'react';

// Silent auction closes every Monday 12:00 GST (08:00 UTC)
const nextMondayClose = () => {
  const now = new Date();
  const daysUntilMonday = (8 - now.getUTCDay()) % 7 || 7;
  const target = new Date(now);
  target.setUTCDate(now.getUTCDate() + daysUntilMonday);
  target.setUTCHours(8, 0, 0, 0);
  return target;
};

const splitDuration = (ms) => ({
  d: Math.floor(ms / 86400000),
  h: Math.floor((ms % 86400000) / 3600000),
  m: Math.floor((ms % 3600000) / 60000),
  s: Math.floor((ms % 60000) / 1000),
});

function useAuctionCountdown() {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = nextMondayClose() - new Date();
      if (diff > 0) setTime(splitDuration(diff));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const pad = (n) => String(n).padStart(2, '0');

export function AuctionTimer({ labels = ['D', 'H', 'M', 'S'] }) {
  const time = useAuctionCountdown();
  const parts = [time.d, time.h, time.m, time.s];
  return (
    <div data-testid="auction-timer" className="flex items-center gap-1 font-mono text-2xl sm:text-3xl text-[#EE5A01] font-bold">
      {parts.map((value, i) => (
        <span key={labels[i]} className="flex items-center gap-1">
          {i > 0 && <span className="text-[#666]">:</span>}
          <span>{pad(value)}</span><span className="text-[#666] text-lg">{labels[i]}</span>
        </span>
      ))}
    </div>
  );
}
