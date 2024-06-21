export const SongBar = ({ song }) => {
  return (
    <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
      <div className="font-bold text-base mr-3">{song.position}.</div>
      <img className="w-10 h-10 rounded-lg mr-3" src={song?.images?.coverart} alt={song.title} />
      <div className="flex flex-1 flex-row justify-between items-center">
        <div className="flex flex-col justify-center mx-3">
          <p className="font-semibold">{song.title}</p>
          <p className="text-sm text-gray-400 mt-1">{song.subtitle}</p>
        </div>
      </div>
    </div>
  );
};
