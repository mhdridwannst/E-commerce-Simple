import { Card, CardContent } from "./ui/card";

export default function CardComponent({ nama, jurusan }) {
  return (
    <Card className="border border-gray-200 bg-white shadow-sm">
      <CardContent>
        <h1 className="mb-2 text-xl font-semibold text-gray-800">{nama}</h1>
        <h1 className="mb-2 text-xl font-semibold text-gray-800">{jurusan}</h1>
      </CardContent>
    </Card>
  );
}
