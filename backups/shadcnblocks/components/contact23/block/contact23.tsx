"use client";

import { ChevronRight, Clock, MapPin, Phone } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  distance?: string;
  mapQuery: string;
}

interface Contact23Props {
  title?: string;
  description?: string;
  locations?: StoreLocation[];
  defaultMapQuery?: string;
  className?: string;
}

const Contact23 = ({
  title = "Find a Store",
  description = "Enter your zip code to find the nearest location.",
  locations = [
    {
      id: "1",
      name: "Downtown Flagship",
      address: "123 Main Street",
      city: "San Francisco, CA 94102",
      phone: "(415) 555-0100",
      hours: "Mon-Sat 10am-9pm, Sun 11am-6pm",
      distance: "0.8 mi",
      mapQuery: "Union Square, San Francisco, CA",
    },
    {
      id: "2",
      name: "Union Square",
      address: "456 Powell Street",
      city: "San Francisco, CA 94108",
      phone: "(415) 555-0200",
      hours: "Mon-Sat 10am-8pm, Sun 12pm-6pm",
      distance: "1.2 mi",
      mapQuery: "Powell Street, San Francisco, CA",
    },
    {
      id: "3",
      name: "Marina District",
      address: "789 Chestnut Street",
      city: "San Francisco, CA 94123",
      phone: "(415) 555-0300",
      hours: "Mon-Sat 9am-7pm, Sun 10am-5pm",
      distance: "2.5 mi",
      mapQuery: "Marina District, San Francisco, CA",
    },
    {
      id: "4",
      name: "Mission Bay",
      address: "321 Berry Street",
      city: "San Francisco, CA 94158",
      phone: "(415) 555-0400",
      hours: "Mon-Fri 8am-8pm, Sat-Sun 9am-6pm",
      distance: "3.1 mi",
      mapQuery: "Mission Bay, San Francisco, CA",
    },
  ],
  defaultMapQuery = "San Francisco, CA",
  className,
}: Contact23Props) => {
  const [selectedLocation, setSelectedLocation] =
    useState<StoreLocation | null>(null);
  const mapQuery = selectedLocation?.mapQuery || defaultMapQuery;

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <h1 className="mb-4 text-4xl font-medium tracking-tight md:text-5xl">
              {title}
            </h1>
            <p className="text-muted-foreground">{description}</p>
          </div>

          <div className="mb-8 flex max-w-md gap-3">
            <Input
              placeholder="Enter zip code or city"
              className="bg-background"
            />
            <Button>Search</Button>
          </div>

          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {locations.map((location) => (
                  <div
                    key={location.id}
                    onClick={() => setSelectedLocation(location)}
                    className={cn(
                      "group cursor-pointer rounded-xl border bg-background p-5 transition-colors hover:border-primary/50 hover:bg-muted/30",
                      selectedLocation?.id === location.id &&
                        "border-primary bg-muted/30",
                    )}
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{location.name}</h3>
                        {location.distance && (
                          <span className="text-sm text-muted-foreground">
                            {location.distance}
                          </span>
                        )}
                      </div>
                      <ChevronRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                        <div>
                          <p>{location.address}</p>
                          <p className="text-muted-foreground">
                            {location.city}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Phone className="size-4 text-muted-foreground" />
                        <a
                          href={`tel:${location.phone}`}
                          className="hover:underline"
                        >
                          {location.phone}
                        </a>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Clock className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {location.hours}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Get Directions
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Call Store
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="sticky top-8 overflow-hidden rounded-xl">
                <iframe
                  title="Store locations map"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}
                  className="aspect-[4/3] w-full border-0 lg:aspect-auto lg:h-[600px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Contact23 };
