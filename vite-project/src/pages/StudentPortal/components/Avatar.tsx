import { initialsFromName } from "../utils/initials";

/**
 * Drop-in replacement for the initials-only avatar used across the
 * portal. Pass the same layout classes you'd have put on the initials
 * `<div>` (size, rounding, background, ring, etc.) — they apply whether
 * a photo is shown or not, so no call site needs separate styling for
 * the two cases.
 */
const Avatar = ({
  photoUrl,
  name,
  className = "",
}: {
  photoUrl?: string | null;
  name: string;
  className?: string;
}) => {
  if (photoUrl) {
    return (
      <img
        src={photoUrl}
        alt={name}
        className={`flex-shrink-0 object-cover ${className}`}
      />
    );
  }

  return <div className={className}>{initialsFromName(name)}</div>;
};

export default Avatar;
