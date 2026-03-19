"use client";

import { Star } from "lucide-react";
import { useState } from "react";

import { Rating } from "@/components/shadcnblocks/rating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  rating: number;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  date: string;
}

const DEFAULT_REVIEWS: Review[] = [
  {
    id: "1",
    rating: 5,
    content:
      "Absolutely love this product! The quality exceeded my expectations and it arrived quickly. Would definitely purchase again.",
    author: {
      name: "Sarah M.",
      avatar:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    },
    date: "Dec 10, 2024",
  },
  {
    id: "2",
    rating: 5,
    content:
      "Perfect! Exactly what I was looking for. Great value for the price.",
    author: {
      name: "James R.",
      avatar:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    },
    date: "Dec 8, 2024",
  },
  {
    id: "3",
    rating: 4,
    content:
      "Very good quality overall. Took off one star because shipping took a bit longer than expected, but the product itself is excellent.",
    author: {
      name: "Emily K.",
      avatar:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    },
    date: "Dec 5, 2024",
  },
  {
    id: "4",
    rating: 5,
    content:
      "This is my third time ordering. Consistently great quality and customer service is responsive when I have questions.",
    author: {
      name: "Michael T.",
    },
    date: "Dec 2, 2024",
  },
  {
    id: "5",
    rating: 4,
    content:
      "Nice product, works as described. Would recommend to friends and family.",
    author: {
      name: "Lisa P.",
      avatar:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
    },
    date: "Nov 28, 2024",
  },
  {
    id: "6",
    rating: 5,
    content:
      "Wow! The attention to detail is impressive. You can tell this was made with care.",
    author: {
      name: "David W.",
      avatar:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
    },
    date: "Nov 25, 2024",
  },
];

interface Reviews4Props {
  reviews?: Review[];
  className?: string;
}

const Reviews4 = ({ reviews = DEFAULT_REVIEWS, className }: Reviews4Props) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const totalReviews = reviews.length;
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;

  // Calculate rating distribution
  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    percentage:
      (reviews.filter((r) => r.rating === star).length / totalReviews) * 100,
  }));

  const filteredReviews = selectedRating
    ? reviews.filter((r) => r.rating === selectedRating)
    : reviews;

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container max-w-4xl">
        {/* Summary Card */}
        <div className="mb-8 rounded-xl border bg-muted/30 p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-12">
            {/* Left: Big Rating */}
            <div className="text-center md:text-left">
              <div className="text-6xl font-bold tracking-tight">
                {averageRating.toFixed(1)}
              </div>
              <Rating
                rate={averageRating}
                className="mt-2 justify-center md:justify-start [&_svg]:size-5"
              />
              <p className="mt-2 text-sm text-muted-foreground">
                {totalReviews} reviews
              </p>
            </div>

            {/* Right: Rating Bars */}
            <div className="flex-1 space-y-2">
              {ratingCounts.map(({ star, count, percentage }) => (
                <button
                  key={star}
                  onClick={() =>
                    setSelectedRating(selectedRating === star ? null : star)
                  }
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md px-2 py-1 transition-colors hover:bg-muted",
                    selectedRating === star && "bg-muted",
                  )}
                >
                  <div className="flex w-12 items-center gap-1 text-sm">
                    <span>{star}</span>
                    <Star className="size-3.5 fill-current" />
                  </div>
                  <Progress value={percentage} className="h-2 flex-1" />
                  <span className="w-8 text-right text-sm text-muted-foreground">
                    {count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filter indicator */}
        {selectedRating && (
          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Showing {selectedRating}-star reviews
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-1 text-xs"
              onClick={() => setSelectedRating(null)}
            >
              Clear filter
            </Button>
          </div>
        )}

        {/* Reviews Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="rounded-lg border bg-card p-4 transition-shadow hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Avatar className="size-8">
                    <AvatarImage
                      src={review.author.avatar}
                      alt={review.author.name}
                    />
                    <AvatarFallback className="text-xs">
                      {review.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{review.author.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {review.date}
                    </p>
                  </div>
                </div>
                <Rating
                  rate={review.rating}
                  className="[&_svg]:size-3 [&>div]:size-3"
                />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {review.content}
              </p>
            </div>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <p className="py-8 text-center text-muted-foreground">
            No {selectedRating}-star reviews yet.
          </p>
        )}
      </div>
    </section>
  );
};

export { Reviews4 };
