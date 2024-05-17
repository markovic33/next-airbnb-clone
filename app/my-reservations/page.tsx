import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import ListingCard from "../components/Cards/ListingCard";
import NoItems from "../components/NoItems";
import prisma from "../lib/db";
import { redirect } from "next/navigation";

async function getData(userId: string) {
  const data = await prisma.reservation.findMany({
    where: {
      userId: userId,
    },
    select: {
      Home: {
        select: {
          id: true,
          country: true,
          photo: true,
          description: true,
          price: true,
          Favorite: {
            where: {
              userId: userId,
            },
          },
        },
      },
    },
  });
  return data;
}

export default async function MyReservationPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id) return redirect("/");

  const data = await getData(user.id);

  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Favorites</h2>

      {data.length === 0 ? (
        <NoItems
          description="Please add reservation to see your listing"
          title="Sorry, you dont have reservations"
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {data.map((item) => (
            <ListingCard
              key={item.Home?.id}
              userId={user?.id}
              homeId={item.Home?.id as string}
              description={item.Home?.description as string}
              imagePath={item.Home?.photo as string}
              location={item.Home?.country as string}
              price={item.Home?.price as number}
              favoriteId={item.Home?.Favorite[0]?.id as string}
              isInFavorites={
                (item.Home?.Favorite.length as number) > 0 ? true : false
              }
              pathname="/my-favorites"
            />
          ))}
        </div>
      )}
    </section>
  );
}
