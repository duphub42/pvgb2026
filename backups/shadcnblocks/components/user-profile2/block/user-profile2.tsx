import { Github, Globe, Linkedin, Twitter } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

interface Stats {
  followers: number;
  following: number;
  projects: number;
}

interface User {
  name: string;
  avatar?: string;
  role?: string;
  company?: string;
  bio?: string;
  socialLinks?: SocialLinks;
  stats?: Stats;
}

interface UserProfile2Props {
  user?: User;
  className?: string;
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
};

const UserProfile2 = ({
  user = {
    name: "Alex Morgan",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar8.jpg",
    role: "Full Stack Developer",
    company: "Vercel",
    bio: "Building tools for developers. Open source enthusiast. TypeScript advocate. Making the web faster, one commit at a time.",
    socialLinks: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      website: "https://example.com",
    },
    stats: {
      followers: 12400,
      following: 892,
      projects: 47,
    },
  },
  className,
}: UserProfile2Props) => {
  const socialIcons = [
    { key: "twitter", icon: Twitter, href: user.socialLinks?.twitter },
    { key: "linkedin", icon: Linkedin, href: user.socialLinks?.linkedin },
    { key: "github", icon: Github, href: user.socialLinks?.github },
    { key: "website", icon: Globe, href: user.socialLinks?.website },
  ].filter((item) => item.href);

  return (
    <section className={cn("py-32", className)}>
      <div className="container flex justify-center">
        <div className="w-full max-w-md space-y-6">
          <div className="flex items-start gap-5">
            <Avatar className="size-20 shrink-0">
              <AvatarImage
                src={user.avatar}
                alt={user.name}
                className="object-cover"
              />
              <AvatarFallback className="text-2xl font-semibold">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 space-y-1">
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <p className="text-sm text-muted-foreground">
                {user.role}
                {user.company && (
                  <>
                    {" "}
                    at <span className="font-medium">{user.company}</span>
                  </>
                )}
              </p>
              {socialIcons.length > 0 && (
                <div className="flex gap-2 pt-2">
                  {socialIcons.map(({ key, icon: Icon, href }) => (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Icon className="size-4" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {user.bio && (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {user.bio}
            </p>
          )}

          {user.stats && (
            <div className="flex gap-6 border-y py-4">
              <div className="text-center">
                <p className="text-xl font-semibold">
                  {formatNumber(user.stats.followers)}
                </p>
                <p className="text-xs text-muted-foreground">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-semibold">
                  {formatNumber(user.stats.following)}
                </p>
                <p className="text-xs text-muted-foreground">Following</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-semibold">
                  {formatNumber(user.stats.projects)}
                </p>
                <p className="text-xs text-muted-foreground">Projects</p>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button className="flex-1">Follow</Button>
            <Button variant="outline" className="flex-1">
              Message
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { UserProfile2 };
