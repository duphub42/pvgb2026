import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Office {
  id: string;
  region: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  mapImage: string;
}

interface Contact24Props {
  title?: string;
  description?: string;
  offices?: Office[];
  className?: string;
}

const Contact24 = ({
  title = "Our Offices",
  description = "With offices across the globe, we are here to serve you wherever you are.",
  offices = [
    {
      id: "1",
      region: "North America",
      city: "New York",
      address: "350 Fifth Avenue, Suite 4200, New York, NY 10118",
      phone: "+1 (212) 555-0123",
      email: "nyc@company.com",
      mapImage:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/maps/map-2.png",
    },
    {
      id: "2",
      region: "Europe",
      city: "London",
      address: "25 Bank Street, Canary Wharf, London E14 5JP",
      phone: "+44 20 7555 0123",
      email: "london@company.com",
      mapImage:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/maps/map-3.png",
    },
    {
      id: "3",
      region: "Asia Pacific",
      city: "Singapore",
      address: "1 Raffles Place, Tower 2, Singapore 048616",
      phone: "+65 6555 0123",
      email: "singapore@company.com",
      mapImage:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/maps/map-4.png",
    },
    {
      id: "4",
      region: "Middle East",
      city: "Dubai",
      address: "DIFC, Gate Building, Level 13, Dubai, UAE",
      phone: "+971 4 555 0123",
      email: "dubai@company.com",
      mapImage:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/maps/map-5.png",
    },
  ],
  className,
}: Contact24Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <h1 className="mb-4 text-4xl font-medium tracking-tight md:text-5xl">
              {title}
            </h1>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              {description}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {offices.map((office) => (
              <div
                key={office.id}
                className="group overflow-hidden rounded-xl border bg-background"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={office.mapImage}
                    alt={`Map of ${office.city} office`}
                    className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                      {office.region}
                    </p>
                    <h3 className="text-2xl font-semibold">{office.city}</h3>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-5 space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      <span>{office.address}</span>
                    </div>
                    <a
                      href={`tel:${office.phone}`}
                      className="flex items-center gap-3 hover:underline"
                    >
                      <Phone className="size-4 text-muted-foreground" />
                      {office.phone}
                    </a>
                    <a
                      href={`mailto:${office.email}`}
                      className="flex items-center gap-3 hover:underline"
                    >
                      <Mail className="size-4 text-muted-foreground" />
                      {office.email}
                    </a>
                  </div>

                  <Button variant="outline" className="w-full">
                    <ExternalLink className="mr-2 size-4" />
                    View on Map
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Contact24 };
