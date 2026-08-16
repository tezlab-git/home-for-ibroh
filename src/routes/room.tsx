import { createFileRoute } from "@tanstack/react-router";
import { Bookshelf } from "@/components/room/Bookshelf";

export const Route = createFileRoute("/room")({
  head: () => ({
    meta: [
      { title: "Xona — ibroh.im" },
      { name: "description", content: "Ibrohimning virtual xonasi." },
    ],
  }),
  component: RoomPage,
});

function RoomPage() {
  return (
    <div
      className="min-h-screen w-full overflow-hidden"
      style={{ background: "#0e0a04" }}
    >
      <div className="mx-auto max-w-5xl px-4 py-10">
        <Bookshelf />
      </div>
    </div>
  );
}
