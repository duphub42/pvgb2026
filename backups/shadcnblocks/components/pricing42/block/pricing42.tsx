"use client";

import { Check, ChevronsUpDown, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface Feature {
  name: string;
  values: (boolean | null | string)[];
}

interface FeatureSection {
  category: string;
  features: Feature[];
}

interface Plan {
  name: string;
  ctaText: string;
  ctaHref?: string;
  ctaVariant?: "default" | "outline" | "secondary";
}

interface Pricing42Props {
  plans?: Plan[];
  featureSections?: FeatureSection[];
  className?: string;
}

const Pricing42 = ({
  plans = [
    {
      name: "Free",
      ctaText: "Get started",
      ctaHref: "#",
      ctaVariant: "outline",
    },
    {
      name: "Startup",
      ctaText: "Get started",
      ctaHref: "#",
      ctaVariant: "outline",
    },
    {
      name: "Enterprise",
      ctaText: "Get a demo",
      ctaHref: "#",
      ctaVariant: "outline",
    },
  ],
  featureSections = [
    {
      category: "Usage",
      features: [
        { name: "Members", values: ["Unlimited", "Unlimited", "Unlimited"] },
        { name: "Transactions", values: ["250", "Unlimited", "Unlimited"] },
        { name: "Teams", values: ["2", "Unlimited", "Unlimited"] },
      ],
    },
    {
      category: "Features",
      features: [
        { name: "Reporting", values: [true, true, true] },
        { name: "Analytics", values: [true, true, true] },
        { name: "Import and export", values: [true, true, true] },
        { name: "Integrations", values: [true, true, true] },
        { name: "AI Assistant", values: [null, true, true] },
        { name: "Admin roles", values: [null, null, true] },
        { name: "Audit log", values: [null, null, true] },
      ],
    },
    {
      category: "Support",
      features: [
        { name: "Priority Support", values: [true, true, true] },
        { name: "Account Manager", values: [null, null, true] },
        { name: "Uptime SLA", values: [null, null, true] },
      ],
    },
  ],
  className,
}: Pricing42Props) => {
  const [selectedPlan, setSelectedPlan] = useState(1);

  const renderFeatureValue = (value: boolean | null | string) => {
    if (value === true) {
      return <Check className="size-5" />;
    }
    if (value === false) {
      return <X className="size-5" />;
    }
    if (value === null) {
      return null;
    }
    return (
      <div className="flex items-center gap-2">
        <Check className="size-4" />
        <span className="text-muted-foreground">{value}</span>
      </div>
    );
  };

  return (
    <section className={cn("pb-28 lg:py-32", className)}>
      <div className="container">
        {/* Plan Headers */}
        <div>
          {/* Mobile View */}
          <div className="md:hidden">
            <Collapsible className="">
              {({ open }) => (
                <>
                  <div className="flex items-center justify-between border-b py-4">
                    <CollapsibleTrigger className="flex items-center gap-2">
                      <h3 className="text-2xl font-semibold">
                        {plans[selectedPlan].name}
                      </h3>
                      <ChevronsUpDown
                        className={cn(
                          "size-5 transition-transform",
                          open && "rotate-180",
                        )}
                      />
                    </CollapsibleTrigger>
                    <Button
                      variant={plans[selectedPlan].ctaVariant || "outline"}
                      className="w-fit"
                      asChild
                    >
                      <a href={plans[selectedPlan].ctaHref || "#"}>
                        {plans[selectedPlan].ctaText}
                      </a>
                    </Button>
                  </div>
                  <CollapsibleContent className="flex flex-col space-y-2 p-2">
                    {plans.map(
                      (plan, index) =>
                        index !== selectedPlan && (
                          <Button
                            size="lg"
                            variant="secondary"
                            key={index}
                            onClick={() => setSelectedPlan(index)}
                          >
                            {plan.name}
                          </Button>
                        ),
                    )}
                  </CollapsibleContent>
                </>
              )}
            </Collapsible>
          </div>

          {/* Desktop View */}
          <div className="grid grid-cols-4 gap-4 max-md:hidden">
            <div className="col-span-1 max-md:hidden" />
            {plans.map((plan, index) => (
              <div key={index}>
                <h3 className="mb-3 text-2xl font-semibold">{plan.name}</h3>
                <Button variant={plan.ctaVariant || "outline"} asChild>
                  <a href={plan.ctaHref || "#"}>{plan.ctaText}</a>
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Sections */}
        {featureSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <div className="border-b border-primary/40 py-4">
              <h3 className="text-lg font-semibold">{section.category}</h3>
            </div>
            {section.features.map((feature, featureIndex) => (
              <div
                key={featureIndex}
                className="grid grid-cols-2 font-medium text-foreground max-md:border-b md:grid-cols-4"
              >
                <span className="inline-flex items-center py-4">
                  {feature.name}
                </span>
                {/* Mobile View - Only Selected Plan */}
                <div className="md:hidden">
                  <div className="flex items-center gap-1 py-4 md:border-b">
                    {renderFeatureValue(feature.values[selectedPlan])}
                  </div>
                </div>
                {/* Desktop View - All Plans */}
                <div className="hidden md:col-span-3 md:grid md:grid-cols-3 md:gap-4">
                  {feature.values.map((value, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1 border-b py-4"
                    >
                      {renderFeatureValue(value)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export { Pricing42 };
