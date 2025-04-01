type Props = {
  photoUrl: string;
  firstName: string;
  lastName: string;
};

const UserImage = ({ photoUrl, firstName, lastName }: Props) => {
  return (
    <div className="self-center group relative w-34 h-34 lg:w-40 lg:h-40 overflow-hidden rounded-full border-2 border-slate-300">
      {photoUrl ? (
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          No Photo
        </div>
      )}
    </div>
  );
};

export default UserImage;
