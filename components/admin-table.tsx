import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AdminTable({
  title,
  columns,
  rows,
  action = "Edit"
}: {
  title: string;
  columns: string[];
  rows: Array<Array<string | number>>;
  action?: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-lg border border-forest/10">
          <div className="grid bg-cream px-4 py-3 text-sm font-black text-forest" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(120px, 1fr)) 100px` }}>
            {columns.map((column) => <span key={column}>{column}</span>)}
            <span>Action</span>
          </div>
          {rows.map((row, index) => (
            <div key={index} className="grid items-center border-t border-forest/10 px-4 py-3 text-sm" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(120px, 1fr)) 100px` }}>
              {row.map((cell, cellIndex) => (
                <span key={cellIndex} className="truncate">
                  {String(cell).toLowerCase().includes("active") || String(cell).toLowerCase().includes("pending") ? <Badge variant="secondary">{cell}</Badge> : cell}
                </span>
              ))}
              <Button variant="outline" size="sm">{action}</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
