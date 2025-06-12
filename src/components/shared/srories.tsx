"use client";

import { X } from "lucide-react";
import Image from "next/image";
import React from "react";
import ReactStories from "react-insta-stories";
import { useClickAway } from "react-use";

import { cn } from "@/lib/utils";
import { Api } from "@/services/api-client";
import { IStory } from "@/services/stories";

import Container from "./container";

interface StoriesProps {
  className?: string;
}

export const Stories: React.FC<StoriesProps> = ({ className = "" }) => {
  const ref = React.useRef(null);
  const [stories, setStories] = React.useState<IStory[]>([]);
  const [open, setOpen] = React.useState(false);
  const [selectedStory, setSelectedStory] = React.useState<IStory>();

  useClickAway(ref, () => {
    handleCloseStory();
  });

  React.useEffect(() => {
    async function fetchStories() {
      try {
        const data = await Api.stories.getAll();
        setStories(data);
      } catch (error) {
        console.error("Ошибка при получении сторис:", error);
      }
    }

    void fetchStories();
  }, []);

  const handleCloseStory = () => {
    document.body.style.overflow = "";
    setOpen(false);
  };

  const onClickStory = (story: IStory) => {
    setSelectedStory(story);

    if (story.items.length > 0) {
      setOpen(true);
    }
  };

  return (
    <>
      <Container
        className={cn(
          "my-10 flex items-center justify-between gap-4 overflow-x-auto overscroll-contain py-2",
          className,
        )}
      >
        {stories.length === 0 &&
          [...Array<undefined>(6)].map((_, index) => (
            <div key={index} className="h-[250px] w-[200px] animate-pulse rounded-md bg-gray-200" />
          ))}

        {stories.map((story) => (
          <Image
            alt="Story image"
            key={story.id}
            onClick={() => onClickStory(story)}
            className="h-[250px] w-[200px] cursor-pointer rounded-md"
            height={250}
            width={200}
            src={story.previewImageUrl}
          />
        ))}

        {open && (
          <div className="absolute left-0 top-0 z-30 flex size-full items-center justify-center bg-black/80">
            <div ref={ref} className="relative" style={{ width: 520 }}>
              <button className="absolute -right-10 -top-5 z-30" onClick={handleCloseStory}>
                <X className="absolute right-0 top-0 size-8 text-white/50" />
              </button>

              <ReactStories
                onAllStoriesEnd={handleCloseStory}
                stories={selectedStory?.items.map((item) => ({ url: item.sourceUrl })) ?? []}
                defaultInterval={4000}
                width={520}
                height={800}
                keyboardNavigation={true}
                onStoryStart={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  document.body.style.overflow = "hidden";
                }}
              />
            </div>
          </div>
        )}
      </Container>
    </>
  );
};
