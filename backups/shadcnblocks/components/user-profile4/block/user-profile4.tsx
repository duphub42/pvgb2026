import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface User {
  name: string;
  avatar?: string;
  role?: string;
  status?: "online" | "offline" | "away" | "busy";
}

interface UserProfile4Props {
  user?: User;
  className?: string;
  showStatus?: boolean;
}

const statusColors = {
  online: "bg-emerald-500",
  offline: "bg-muted-foreground",
  away: "bg-amber-500",
  busy: "bg-red-500",
};

const UserProfile4 = ({
  user = {
    name: "Alex Morgan",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar8.jpg",
    role: "Product Designer",
    status: "online",
  },
  className,
  showStatus = true,
}: UserProfile4Props) => {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={cn(
        "inline-flex max-w-xs items-center gap-3 rounded-full border bg-card py-1.5 pr-4 pl-1.5 shadow-sm",
        className,
      )}
    >
      <div className="relative">
        <Avatar className="size-8">
          <AvatarImage
            src={user.avatar}
            alt={user.name}
            className="object-cover"
          />
          <AvatarFallback className="text-xs font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>
        {showStatus && user.status && (
          <span
            className={cn(
              "absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-card",
              statusColors[user.status],
            )}
          />
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-sm leading-tight font-medium">{user.name}</span>
        {user.role && (
          <span className="text-xs text-muted-foreground">{user.role}</span>
        )}
      </div>
    </div>
  );
};

export { UserProfile4 };
