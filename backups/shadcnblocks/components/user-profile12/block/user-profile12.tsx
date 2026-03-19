import { BadgeCheck, MessageSquare, Pencil, Plus } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Stat {
  label: string;
  value: string;
}

interface User {
  name: string;
  username: string;
  avatar?: string;
  coverImage?: string;
  bio?: string;
  verified?: boolean;
}

interface UserProfile12Props {
  user?: User;
  stats?: Stat[];
  className?: string;
}

const UserProfile12 = ({
  user = {
    name: "Alex Morgan",
    username: "@Alex_Morgan",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar8.jpg",
    coverImage:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/pawel-czerwinski-O4fAgtXLRwI-unsplash.jpg",
    bio: "Full-stack developer passionate about building beautiful, performant web applications. Open source contributor and TypeScript enthusiast.",
    verified: true,
  },
  stats = [
    { label: "Posts", value: "847" },
    { label: "Following", value: "312" },
    { label: "Followers", value: "89k" },
  ],
  className,
}: UserProfile12Props) => {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className={cn("w-full max-w-md overflow-hidden pt-0", className)}>
      {/* Cover image */}
      <div
        className="h-36 bg-muted bg-cover bg-center"
        style={{
          backgroundImage: user.coverImage
            ? `url(${user.coverImage})`
            : undefined,
        }}
      />

      <CardContent className="relative px-6 pb-6">
        {/* Avatar overlapping cover */}
        <Avatar className="-mt-14 size-28 border-4 border-card shadow-lg">
          <AvatarImage
            src={user.avatar}
            alt={user.name}
            className="object-cover"
          />
          <AvatarFallback className="text-2xl font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>

        {/* Edit profile button */}
        <Button
          variant="outline"
          size="sm"
          className="absolute top-4 right-6 gap-1.5"
        >
          <Pencil className="size-3.5" />
          Edit Profile
        </Button>

        {/* User info */}
        <div className="mt-3">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            {user.verified && (
              <BadgeCheck className="size-6 fill-sky-500 text-card" />
            )}
          </div>
          <p className="text-muted-foreground">{user.username}</p>
        </div>

        {/* Action buttons */}
        <div className="mt-4 flex items-center gap-2">
          <Button className="gap-1.5">
            <Plus className="size-4" />
            Follow
          </Button>
          <Button variant="outline" size="icon">
            <MessageSquare className="size-4" />
          </Button>
        </div>

        {/* Bio */}
        {user.bio && (
          <p className="mt-5 text-sm text-muted-foreground">{user.bio}</p>
        )}

        {/* Stats */}
        <div className="mt-6 flex items-center justify-between border-t pt-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export { UserProfile12 };
