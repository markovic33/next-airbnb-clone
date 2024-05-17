import { UserRoundIcon } from "lucide-react";
import prisma from "../lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import NoItems from "../components/NoItems";
import ListingCard from "../components/Cards/ListingCard";
import { unstable_noStore as noStore } from "next/cache";

async function getData(userId: string) {
  noStore();
  const data = await prisma.favorite.findMany({
    where: {
      userId: userId,
    },
    select: {
      Home: {
        select: {
          photo: true,
          id: true,
          Favorite: true,
          country: true,
          description: true,
          price: true,
          title: true,
        },
      },
    },
  });
  return data;
}

export default async function FavoritesPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect("/");
  const data = await getData(user.id);
  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Favorites</h2>

      {data.length === 0 ? (
        <NoItems
          description="Please add to favorite to see your listing"
          title="Sorry, you dont have favorites"
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
