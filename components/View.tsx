'use client';

import { useEffect, useState } from "react";
import Ping from "@/components/Ping";
import { getViewCount, incrementViewCount } from "@/app/actions/viewCount";

// Client component to display and update view count
function View({ id }: { id: string }) {
  const [views, setViews] = useState<number | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Initial fetch of view count
    const fetchInitialCount = async () => {
      try {
        const count = await getViewCount(id);
        setViews(count);
      } catch (error) {
        console.error("Error fetching view count:", error);
        setViews(0);
      }
    };

    // Function to update view count
    const updateViewCount = async () => {
      if (isUpdating) return;

      try {
        setIsUpdating(true);
        const newCount = await incrementViewCount(id);
        setViews(newCount);
      } catch (error) {
        console.error("Error updating view count:", error);
      } finally {
        setIsUpdating(false);
      }
    };

    // Initial fetch
    fetchInitialCount();

    // Update view count if in production
    if (process.env.NODE_ENV === "production") {
      updateViewCount();
    }
  }, [id, isUpdating]);

  // Show loading state
  if (views === null) {
    return (
      <div className="view-container">
        <div className="absolute -right-1 -top-1">
          <Ping />
        </div>
        <p className="view-text">
          <span>Loading views...</span>
        </p>
      </div>
    );
  }

  // Show view count
  return (
    <div className="view-container">
      <div className="absolute -right-1 -top-1">
        <Ping />
      </div>
      <p className="view-text">
        <span>Views: {views}</span>
      </p>
    </div>
  );
}

export default View;
