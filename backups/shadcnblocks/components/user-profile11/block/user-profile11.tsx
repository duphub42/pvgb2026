import { BadgeCheck, LayoutGrid, Plus, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface User {
  name: string;
  image?: string;
  bio?: string;
  verified?: boolean;
  followers?: number;
  posts?: number;
}

interface UserProfile11Props {
  user?: User;
  className?: string;
}

const UserProfile11 = ({
  user = {
    name: "Sarah Chen",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/portraits/Elegant%20Woman%20Portrait.png",
    bio: "UX Engineer crafting intuitive experiences with code & design",
    verified: true,
    followers: 1248,
    posts: 42,
  },
  className,
}: UserProfile11Props) => {
  return (
    <div
      className={cn(
        "relative w-full max-w-xs overflow-hidden rounded-2xl shadow-lg",
        className,
      )}
    >
      {/* Full background image */}
      <img
        src={user.image}
        alt={user.name}
        className="aspect-[3/4] w-full object-cover"
      />

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Content overlay at bottom - uses explicit light colors since it's always on dark overlay */}
      <div className="absolute inset-x-0 bottom-0 space-y-3 p-5 text-white">
        {/* Name with verification badge */}
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-lg font-semibold">{user.name}</h3>
            {user.verified && (
              <BadgeCheck className="size-5 fill-emerald-500 text-white" />
            )}
          </div>
          {user.bio && <p className="mt-1 text-sm text-white/80">{user.bio}</p>}
        </div>

        {/* Stats and follow button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-white/80">
            <span className="flex items-center gap-1.5">
              <Users className="size-4" />
              {user.followers?.toLocaleString()}
            </span>
            <span className="flex items-center gap-1.5">
              <LayoutGrid className="size-4" />
              {user.posts}
            </span>
          </div>
          <Button
            size="sm"
            className="gap-1.5 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
          >
            Follow
            <Plus className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export { UserProfile11 };
