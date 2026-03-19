"use client";

import { Check } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface Plan {
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
  description?: string;
  features: string[];
  highlighted?: boolean;
  ctaText?: string;
  ctaHref?: string;
}

interface Pricing41Props {
  heading?: string;
  description?: string;
  plans?: Plan[];
  className?: string;
}

const Pricing41 = ({
  heading = "Pricing",
  description = "Use for free with your whole team. Upgrade to enable unlimited issues, enhanced security controls, and additional features.",
  plans = [
    {
      name: "Free",
      monthlyPrice: "$0",
      yearlyPrice: "$0",
      description: "Free for everyone",
      features: [
        "Unlimited members",
        "2 teams",
        "500 issues",
        "Slack and Github integrations",
      ],
      ctaText: "Get started",
      ctaHref: "#",
    },
    {
      name: "Startup",
      monthlyPrice: "$8",
      yearlyPrice: "$6",
      features: [
        "All free plan features and...",
        "AI Assistant",
        "Unlimited teams",
        "Unlimited issues and file uploads",
        "Advanced Insights",
        "Admin roles",
      ],
      highlighted: true,
      ctaText: "Get started",
      ctaHref: "#",
    },
    {
      name: "Enterprise",
      monthlyPrice: "$24",
      yearlyPrice: "$20",
      features: [
        "All startup plan features and...",
        "Advanced AI",
        "SSO & SAML",
        "Dedicated support",
        "Custom integrations",
      ],
      ctaText: "Contact sales",
      ctaHref: "#",
    },
  ],
  className,
}: Pricing41Props) => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className={cn("py-28 lg:py-32", className)}>
      <div className="container max-w-5xl">
        <div className="space-y-4 text-center">
          <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
            {heading}
          </h2>
          <p className="mx-auto max-w-xl leading-snug text-balance text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="mt-8 grid items-start gap-5 text-start md:mt-12 md:grid-cols-3 lg:mt-20">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                plan.highlighted && "origin-top outline-4 outline-primary",
              )}
            >
              <CardContent className="flex flex-col gap-7 px-6 py-5">
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">{plan.name}</h3>
                  <div className="space-y-1">
                    <div className="text-lg font-medium text-muted-foreground">
                      {isAnnual ? plan.yearlyPrice : plan.monthlyPrice}{" "}
                      {plan.monthlyPrice !== "$0" && (
                        <span className="text-muted-foreground">
                          per user/{isAnnual ? "year" : "month"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {plan.monthlyPrice !== "$0" ? (
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={isAnnual}
                      onCheckedChange={() => setIsAnnual(!isAnnual)}
                      aria-label="Toggle annual billing"
                    />
                    <span className="text-sm font-medium">Billed annually</span>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    {plan.description}
                  </span>
                )}

                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-1.5 text-muted-foreground"
                    >
                      <Check className="size-5 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-fit"
                  variant={plan.highlighted ? "default" : "outline"}
                  asChild
                >
                  <a href={plan.ctaHref || "#"}>
                    {plan.ctaText || "Get started"}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Pricing41 };
