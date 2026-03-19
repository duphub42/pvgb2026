import { Bookmark, Briefcase, Star } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

interface UserProfile13Props {
  user?: UserData;
  className?: string;
}

const UserProfile13 = ({
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
}: UserProfile13Props) => {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const extraSkills =
    user.skills && user.skills.length > 3 ? user.skills.length - 3 : 0;
  const displayedSkills = user.skills?.slice(0, 3) || [];

  return (
    <Card className={cn("w-full max-w-sm overflow-hidden pt-0", className)}>
      {/* Cover image */}
      <div
        className="h-36 bg-muted bg-cover bg-center"
        style={{
          backgroundImage: user.coverImage
            ? `url(${user.coverImage})`
            : undefined,
        }}
      />

      <CardContent className="relative px-5 pb-5">
        {/* Avatar with online indicator */}
        <div className="relative -mt-10 inline-block">
          <Avatar className="size-20 border-4 border-card shadow-lg">
            <AvatarImage
              src={user.avatar}
              alt={user.name}
              className="object-cover"
            />
            <AvatarFallback className="text-xl font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          {user.isOnline && (
            <span className="absolute right-1 bottom-1 size-4 rounded-full border-2 border-card bg-emerald-500" />
          )}
        </div>

        {/* Bookmark button */}
        <Button
          variant="outline"
          size="icon"
          className="absolute top-4 right-5 size-9 rounded-full"
        >
          <Bookmark className="size-4" />
        </Button>

        {/* User info */}
        <div className="mt-2">
          <h3 className="text-xl font-semibold">{user.name}</h3>
          <p className="text-sm text-muted-foreground">{user.role}</p>
        </div>

        {/* Skills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {displayedSkills.map((skill) => (
            <Badge key={skill} variant="outline" className="rounded-full">
              {skill}
            </Badge>
          ))}
          {extraSkills > 0 && (
            <Badge variant="outline" className="rounded-full">
              +{extraSkills}
            </Badge>
          )}
        </div>

        {/* Stats */}
        <div className="mt-5 flex items-center justify-between border-t pt-5">
          <div className="flex items-center gap-1.5">
            <Star className="size-4 fill-current" />
            <span className="font-semibold">{user.rating}</span>
            <span className="text-sm text-muted-foreground">Rating</span>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="flex items-center gap-1.5">
            <Briefcase className="size-4" />
            <span className="font-semibold">{user.projects}</span>
            <span className="text-sm text-muted-foreground">Projects</span>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <span className="font-semibold">${user.hourlyRate}/hr</span>
            <span className="block text-xs text-muted-foreground">Rate</span>
          </div>
        </div>

        {/* CTA */}
        <Button className="mt-5 w-full rounded-full" size="lg">
          Hire Me
        </Button>
      </CardContent>
    </Card>
  );
};

export { UserProfile13 };
