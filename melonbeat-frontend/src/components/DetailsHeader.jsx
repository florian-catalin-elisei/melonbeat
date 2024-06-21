export const DetailsHeader = ({ songDetails }) => {
  const values = songDetails && Object.values(songDetails?.resources?.["shazam-songs"]);
  const image = values?.map((img) => img?.attributes?.artwork?.url);
  const title = values?.map((title) => title?.attributes?.title);
  const artist = values?.map((artist) => artist?.attributes?.artist);
  const genre = values?.map((genre) => genre?.attributes?.genres?.primary);

  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />
      <div className="absolute inset-0 flex items-center">
        <img
          alt="art"
          src={image}
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
        />
        <div className="ml-5">
          <p className="font-semibold text-xl">{title}</p>
          <p className="mt-2 text-gray-400 text-sm">{artist}</p>
          <p className="mt-2 text-gray-400 text-sm">{genre}</p>
        </div>
      </div>
      <div className="w-full sm:h-44 h-24" />
    </div>
  );
};
