import { siteConfig } from "@/data/site";
import type { ContentPost } from "@/lib/content";

function toAbsoluteUrl(pathOrUrl: string) {
  if (!pathOrUrl) {
    return "";
  }

  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }

  return `${siteConfig.url}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}

export function isEventPost(post: ContentPost) {
  return Boolean(post.startDate && post.endDate && post.location);
}

export function buildEventJsonLd(post: ContentPost) {
  if (!isEventPost(post)) {
    return null;
  }

  const eventImage = toAbsoluteUrl(post.image || post.thumbnail || "");

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: post.title,
    description: post.excerpt,
    startDate: post.startDate,
    endDate: post.endDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    image: eventImage ? [eventImage] : undefined,
    location: {
      "@type": "Place",
      name: post.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: "부산시",
        addressCountry: "KR",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "부산시",
      url: siteConfig.url,
    },
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}${post.route}`,
      availability: "https://schema.org/InStock",
      priceCurrency: "KRW",
      price: post.isFree === true ? "0" : "1",
      category: post.isFree === true ? "무료" : "유료",
    },
    mainEntityOfPage: `${siteConfig.url}${post.route}`,
  };
}
