import { BadgeCheck, LayoutGrid, Plus, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface User {
  name: string;
  image?: string;
  bio?: string;
  verified?: boolean;
  followers?: number;
  posts?: number;
}

interface UserProfile10Props {
  user?: User;
  className?: string;
}

const UserProfile10 = ({
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
}: UserProfile10Props) => {
  return (
    <Card
      className={cn(
        "w-full max-w-xs overflow-hidden pt-0 shadow-lg",
        className,
      )}
    >
      {/* Large portrait image */}
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <img
          src={user.image}
          alt={user.name}
          className="size-full object-cover"
        />
      </div>

      <CardContent className="space-y-4 p-5">
        {/* Name with verification badge */}
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-lg font-semibold">{user.name}</h3>
            {user.verified && (
              <BadgeCheck className="size-5 fill-emerald-500 text-card" />
            )}
          </div>
          {user.bio && (
            <p className="mt-1 text-sm text-muted-foreground">{user.bio}</p>
          )}
        </div>

        {/* Stats and follow button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Users className="size-4" />
              {user.followers?.toLocaleString()}
            </span>
            <span className="flex items-center gap-1.5">
              <LayoutGrid className="size-4" />
              {user.posts}
            </span>
          </div>
          <Button size="sm" className="gap-1.5">
            Follow
            <Plus className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export { UserProfile10 };
