import {
  BookOpen,
  Calendar,
  FileSpreadsheetIcon,
  Images,
  Lightbulb,
  Plus,
  Share2,
  ShoppingBag,
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Content2Props {
  className?: string;
}

const Content2 = ({ className }: Content2Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container max-w-5xl">
        <div>
          <div>
            <Badge variant="outline">Features</Badge>
            <h1 className="mt-3 text-3xl font-extrabold">Content Management</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Our content management system allows you to easily organize and
              showcase your work. Share your portfolio, products, or services
              with your audience.
            </p>
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
              alt="placeholder"
              className="my-8 aspect-video w-full rounded-md object-cover"
            />
          </div>
          <section className="mb-8">
            <h2 className="mb-6 text-2xl font-bold">Content Types</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <a
                href="#"
                className="flex items-center gap-3 rounded-xl border px-6 py-5 hover:border-primary"
              >
                <FileSpreadsheetIcon className="h-6 w-6 shrink-0" />
                <div>
                  <h2 className="font-semibold">Projects</h2>
                  <p className="text-sm text-muted-foreground">
                    Showcase your latest work and achievements.
                  </p>
                </div>
              </a>

              <a
                href="#"
                className="flex items-center gap-3 rounded-xl border px-6 py-5 hover:border-primary"
              >
                <ShoppingBag className="h-6 w-6 shrink-0" />
                <div>
                  <h2 className="font-semibold">Products</h2>
                  <p className="text-sm text-muted-foreground">
                    Display your products or services.
                  </p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-xl border px-6 py-5 hover:border-primary"
              >
                <Images className="h-6 w-6 shrink-0" />
                <div>
                  <h2 className="font-semibold">Gallery</h2>
                  <p className="text-sm text-muted-foreground">
                    Share photos and visual content.
                  </p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-xl border px-6 py-5 hover:border-primary"
              >
                <Calendar className="h-6 w-6 shrink-0" />
                <div>
                  <h2 className="font-semibold">Events</h2>
                  <p className="text-sm text-muted-foreground">
                    Promote upcoming events and dates.
                  </p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-xl border px-6 py-5 hover:border-primary"
              >
                <Share2 className="h-6 w-6 shrink-0" />
                <div>
                  <h2 className="font-semibold">Social</h2>
                  <p className="text-sm text-muted-foreground">
                    Link to your social media profiles.
                  </p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-xl border px-6 py-5 hover:border-primary"
              >
                <BookOpen className="h-6 w-6 shrink-0" />
                <div>
                  <h2 className="font-semibold">Blog</h2>
                  <p className="text-sm text-muted-foreground">
                    Share your latest articles and updates.
                  </p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-xl border px-6 py-5 hover:border-primary"
              >
                <Plus className="h-6 w-6 shrink-0" />
                <div>
                  <h2 className="font-semibold">Custom</h2>
                  <p className="text-sm text-muted-foreground">
                    Add any custom content or external links.
                  </p>
                </div>
              </a>
            </div>
          </section>

          <section className="prose mb-8 dark:prose-invert">
            <h2>Adding Content</h2>
            <ol>
              <li>
                Navigate to <strong>Content</strong> and click
                <strong>New</strong> in the top right.
              </li>
              <li>
                Choose your content type and fill in the required information.
              </li>
              <li>
                Add a description, upload media if needed, and click
                <strong>Save</strong>.
              </li>
            </ol>
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>Tip</AlertTitle>
              <AlertDescription>
                You can quickly create content by using our bulk upload feature
                or content templates.
              </AlertDescription>
            </Alert>
          </section>
          <section className="prose mb-8 dark:prose-invert">
            <h2>Managing Content</h2>
            <ol>
              <li>
                Go to <strong>Content</strong> and locate the item you want to
                modify.
              </li>
              <li>
                Click the <strong>options menu</strong> (three dots) and select{" "}
                <strong>Edit</strong>.
              </li>
              <li>
                Update the information and click <strong>Save</strong>.
              </li>
            </ol>
          </section>
        </div>
      </div>
    </section>
  );
};

export { Content2 };
