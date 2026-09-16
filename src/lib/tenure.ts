type Span = Readonly<{ start: string; end: string }>;

function monthIndex(iso: string) {
  const [year, month] = iso.split("-").map(Number);
  return year * 12 + (month - 1);
}

export function totalTenureMonths(spans: readonly Span[]) {
  const covered = new Set<number>();
  for (const span of spans) {
    for (let m = monthIndex(span.start); m < monthIndex(span.end); m += 1) {
      covered.add(m);
    }
  }
  return covered.size;
}

export function splitMonths(months: number) {
  return { years: Math.floor(months / 12), months: months % 12 };
}

export function spanMonths(span: Span) {
  return monthIndex(span.end) - monthIndex(span.start);
}
