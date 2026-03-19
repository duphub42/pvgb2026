import { Mail, Phone } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface User {
  name: string;
  avatar?: string;
  coverImage?: string;
  role?: string;
  department?: string;
  email?: string;
  phone?: string;
}

interface UserProfile5Props {
  user?: User;
  className?: string;
}

const UserProfile5 = ({
  user = {
    name: "Alex Morgan",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar8.jpg",
    coverImage:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/pawel-czerwinski-O4fAgtXLRwI-unsplash.jpg",
    role: "Senior Product Designer",
    department: "Design Team",
    email: "alex.morgan@company.com",
    phone: "+1 (555) 123-4567",
  },
  className,
}: UserProfile5Props) => {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className={cn("w-full max-w-xs overflow-hidden pt-0", className)}>
      <div
        className="relative h-24 bg-muted bg-cover bg-center"
        style={{
          backgroundImage: user.coverImage
            ? `url(${user.coverImage})`
            : undefined,
        }}
      >
        <span className="absolute bottom-2 left-4 text-xs font-medium text-white drop-shadow-sm">
          {user.department}
        </span>
      </div>
      <CardContent className="-mt-10 flex flex-col items-center px-6 pb-6">
        <Avatar className="size-20 border-4 border-card shadow-lg">
          <AvatarImage
            src={user.avatar}
            alt={user.name}
            className="object-cover"
          />
          <AvatarFallback className="text-2xl font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <h3 className="mt-4 text-lg font-semibold">{user.name}</h3>
        <p className="text-sm text-muted-foreground">{user.role}</p>

        <div className="mt-6 flex w-full gap-2">
          {user.email && (
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <a href={`mailto:${user.email}`}>
                <Mail className="mr-2 size-4" />
                Email
              </a>
            </Button>
          )}
          {user.phone && (
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <a href={`tel:${user.phone}`}>
                <Phone className="mr-2 size-4" />
                Call
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export { UserProfile5 };
