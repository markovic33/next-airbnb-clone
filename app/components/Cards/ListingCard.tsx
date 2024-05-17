import { useCountries } from "@/app/lib/getCountries";

import Image from "next/image";
import Link from "next/link";
import { AddToFavorite, DeleteFromFavorite } from "../Buttons/FavoriteButtons";
import { addToFavorite, deleteFromFavorite } from "@/app/actions";
interface iAppProps {
  imagePath: string;
  description: string;
  location: string;
  price: number;
  userId: string | undefined;
  isInFavorites: boolean;
  favoriteId: string;
  homeId: string;
  pathname: string;
}

export default function ListingCard({
  description,
  imagePath,
  location,
  price,
  userId,
  favoriteId,
  isInFavorites,
  homeId,
  pathname,
}: iAppProps) {
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(location);

  return (
    <div className="flex flex-col">
      <div className="relative h-72">
        <Image
          src={`https://szqooclehvyztrwtqxsy.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt="card photo"
          fill
          className="rounded-lg h-full object-cover"
        />
        {userId && (
          <div className="z-10 absolute top-2 left-2">
            {isInFavorites ? (
              <form action={deleteFromFavorite}>
                <input type="hidden" name="favoriteId" value={favoriteId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathname" value={pathname} />
                <DeleteFromFavorite />
              </form>
            ) : (
              <form action={addToFavorite}>
                <input type="hidden" name="homeId" value={homeId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathname" value={pathname} />
                <AddToFavorite />
              </form>
            )}
          </div>
        )}
      </div>
      <Link href={`/home/${homeId}`} className="mt-2">
        <h3 className="">
          {country?.label} / {country?.region}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>
        <p className="pt-2 text-muted-foreground">
          <span className="text-black">${price}</span> per Night
        </p>
      </Link>
    </div>
  );
}
