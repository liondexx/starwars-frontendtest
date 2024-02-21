import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type People = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  url: string;
};

const BASE_URL = "https://swapi.dev/api";

async function getData() {
  const res = await fetch(`${BASE_URL}/people`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    console.log(res);
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data.results as unknown as Array<People>;
}

function CardPeople({ name, height, mass, gender }: People) {
  return (
    <Card className="flex flex-col items-center bg-gray-700">
      <img
        alt={name}
        className="h-64 w-full object-cover"
        height="200"
        src="/placeholder.svg"
        style={{
          aspectRatio: "200/200",
          objectFit: "cover",
        }}
        width="200"
      />
      <div className="mt-6 text-center">
        <h3 className="text-2xl font-bold">{name}</h3>
        <p className="text-md text-gray-400">planetplaceholder</p>
        <p className="text-md text-gray-400">{height}</p>
        <p className="text-md text-gray-400">{mass}</p>
        <p className="text-md text-gray-400">{gender}</p>
      </div>
    </Card>
  );
}

export default async function Component() {
  const people = await getData();
  return (
    <div className="dark max-w-7xl mx-auto py-16 px-8 bg-gray-800 text-white">
      <h1 className="text-6xl font-bold">Star Wars Characters</h1>
      <p className="mt-4 text-gray-400 text-lg">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <div className="mt-8">
        <Select>
          <SelectTrigger id="filter">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="all">All</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <h2 className="mt-12 text-5xl font-bold">All Characters</h2>
      <div className="mt-8 grid grid-cols-4 gap-8">
        {people.map((people) => (
          <CardPeople {...people} />
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <Button className="px-12 py-3 text-md font-semibold rounded-md bg-gray-700 text-white">
          LOAD MORE
        </Button>
      </div>
    </div>
  );
}
