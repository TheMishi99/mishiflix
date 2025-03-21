"use client";
import { NEXT_PUBLIC_TMDB_IMAGES_PREFIX } from "@/app.config";
import Spinner from "@/components/Spinner";
import { useLanguage } from "@/contexts/LanguageContext";
import useSeason from "@/hooks/seasons/useSeason";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function SeriesDetailsSeasonDetailsEpisodesPage() {
  const { series_id, season_number } = useParams();
  const { language } = useLanguage();
  const {
    season,
    isLoading: seasonLoading,
    isError: seasonError,
  } = useSeason({
    series_id: Number(series_id),
    season_number: Number(season_number),
    language,
  });

  return (
    <div className="flex flex-col justify-start items-center p-2 gap-2 overflow-y-scroll">
      {seasonLoading ? (
        <Spinner />
      ) : seasonError ? (
        <p>{seasonError}</p>
      ) : (
        season && (
          <>
            <h2 className="text-2xl">{season.name}</h2>
            <p>
              <strong>Episodes: </strong>
            </p>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {season.episodes.map((episode) => (
                <li
                  key={episode.id + episode.name}
                  className="hover:scale-105 hover:border rounded-xl hover:border-red-600"
                >
                  <Link
                    href={`/series/${series_id}/seasons/${season_number}/episodes/${episode.episode_number}`}
                    className="flex flex-col justify-center items-center p-2 gap-2"
                  >
                    <img
                      src={NEXT_PUBLIC_TMDB_IMAGES_PREFIX + episode.still_path}
                      alt={episode.id + episode.name}
                    />
                    <p>
                      {episode.episode_number} - {episode.name}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )
      )}
    </div>
  );
}
