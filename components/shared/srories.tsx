"use client";

import { Api } from "@/services/api-client";
import { IStory } from "@/services/stories";
import { useEffect, useRef, useState } from "react";
import Container from "./container";
import { X } from "lucide-react";
import ReactStories from "react-insta-stories";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useClickAway } from "react-use";

type Props = {
  className?: string;
};

export const Stories: React.FC<Props> = ({ className }) => {
  const ref = useRef(null);
  const [stories, setStories] = useState<IStory[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<IStory>();

  useClickAway(ref, () => {
    handleCloseStory();
  });

  useEffect(() => {
    async function fetchStories() {
      const data = await Api.stories.getAll();
      setStories(data);
    }

    fetchStories();
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
          "flex items-center justify-between gap-4 my-10 py-2 overflow-x-auto overscroll-contain",
          className
        )}
      >
        {stories.length === 0 &&
          [...Array(6)].map((_, index) => (
            <div key={index} className="w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse" />
          ))}

        {stories.map((story) => (
          <Image
            alt="Story image"
            key={story.id}
            onClick={() => onClickStory(story)}
            className="rounded-md cursor-pointer w-[200px] h-[250px]"
            height={250}
            width={200}
            src={story.previewImageUrl}
          />
        ))}

        {open && (
          <div className="absolute left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30">
            <div ref={ref} className="relative" style={{ width: 520 }}>
              <button className="absolute -right-10 -top-5 z-30" onClick={handleCloseStory}>
                <X className="absolute top-0 right-0 w-8 h-8 text-white/50" />
              </button>

              <ReactStories
                onAllStoriesEnd={handleCloseStory}
                stories={selectedStory?.items.map((item) => ({ url: item.sourceUrl })) || []}
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
