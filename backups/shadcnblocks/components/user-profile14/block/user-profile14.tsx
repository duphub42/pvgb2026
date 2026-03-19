import { Bookmark, Briefcase, Star } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UserData {
  name: string;
  role: string;
  avatar?: string;
  coverImage?: string;
  isOnline?: boolean;
  skills?: string[];
  rating?: number;
  projects?: number;
  hourlyRate?: number;
}

interface UserProfile14Props {
  user?: UserData;
  className?: string;
}

const UserProfile14 = ({
  user = {
    name: "Alex Morgan",
    role: "Full Stack Developer",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar8.jpg",
    coverImage:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/pawel-czerwinski-O4fAgtXLRwI-unsplash.jpg",
    isOnline: true,
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    rating: 4.8,
    projects: 127,
    hourlyRate: 95,
  },
  className,
}: UserProfile14Props) => {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const extraSkills =
    user.skills && user.skills.length > 3 ? user.skills.length - 3 : 0;
  const displayedSkills = user.skills?.slice(0, 3) || [];

  return (
    <div
      className={cn(
        "relative w-full max-w-sm overflow-hidden rounded-2xl",
        className,
      )}
    >
      {/* Full background image */}
      <img
        src={user.coverImage}
        alt=""
        className="absolute inset-0 size-full object-cover"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

      {/* Content - uses explicit light colors since it's always on dark overlay */}
      <div className="relative flex flex-col p-5 text-white">
        {/* Top section with avatar and bookmark */}
        <div className="flex items-start justify-between">
          <div className="relative">
            <Avatar className="size-20 border-2 border-white/30 shadow-lg">
              <AvatarImage
                src={user.avatar}
                alt={user.name}
                className="object-cover"
              />
              <AvatarFallback className="bg-white/20 text-xl font-semibold text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            {user.isOnline && (
              <span className="absolute right-1 bottom-1 size-4 rounded-full border-2 border-black/50 bg-emerald-500" />
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-9 rounded-full border border-white/30 text-white hover:bg-white/10 hover:text-white"
          >
            <Bookmark className="size-4" />
          </Button>
        </div>

        {/* User info */}
        <div className="mt-4">
          <h3 className="text-xl font-semibold">{user.name}</h3>
          <p className="text-sm text-white/70">{user.role}</p>
        </div>

        {/* Skills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {displayedSkills.map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className="rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20"
            >
              {skill}
            </Badge>
          ))}
          {extraSkills > 0 && (
            <Badge
              variant="outline"
              className="rounded-full border-white/30 bg-white/10 text-white"
            >
              +{extraSkills}
            </Badge>
          )}
        </div>

        {/* Stats */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Star className="size-4 fill-amber-400 text-amber-400" />
            <span className="font-semibold">{user.rating}</span>
            <span className="text-sm text-white/60">Rating</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Briefcase className="size-4 text-white/60" />
            <span className="font-semibold">{user.projects}</span>
            <span className="text-sm text-white/60">Projects</span>
          </div>
          <div>
            <span className="font-semibold">${user.hourlyRate}/hr</span>
            <span className="block text-xs text-white/60">Rate</span>
          </div>
        </div>

        {/* CTA */}
        <Button
          className="mt-6 w-full rounded-full bg-white text-black hover:bg-white/90"
          size="lg"
        >
          Hire Me
        </Button>
      </div>
    </div>
  );
};

export { UserProfile14 };
