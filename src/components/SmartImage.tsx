/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
}

export default function SmartImage({ src, alt, className = "", referrerPolicy = "no-referrer" }: SmartImageProps) {
  // Synchronously parse to avoid empty string on first render
  const getParsedSrc = (source: string) => {
    if (source && source.startsWith("uploaded_image:")) {
      try {
        const part = source.substring("uploaded_image:".length);
        const [idStr, fallback] = part.split("|");
        const idVal = parseInt(idStr, 10);
        if (!isNaN(idVal)) {
          return {
            url: `/assets/image_${idVal}.png`,
            isUploaded: true,
            id: idVal,
            fallback: fallback || ""
          };
        }
      } catch (err) {
        console.error("Failed to parse SmartImage src:", source, err);
      }
    }
    return {
      url: source || "",
      isUploaded: false,
      id: null,
      fallback: ""
    };
  };

  const initial = getParsedSrc(src);

  const [resolvedSrc, setResolvedSrc] = useState<string>(initial.url);
  const [isUploaded, setIsUploaded] = useState<boolean>(initial.isUploaded);
  const [uploadedId, setUploadedId] = useState<number | null>(initial.id);
  const [fallbackUrl, setFallbackUrl] = useState<string>(initial.fallback);
  const [attempt, setAttempt] = useState<"png" | "jpg" | "png-root" | "jpg-root" | "fallback">("png");

  useEffect(() => {
    const next = getParsedSrc(src);
    setResolvedSrc(next.url);
    setIsUploaded(next.isUploaded);
    setUploadedId(next.id);
    setFallbackUrl(next.fallback);
    setAttempt("png");
  }, [src]);

  const handleError = () => {
    if (!isUploaded || uploadedId === null) return;

    if (attempt === "png") {
      setResolvedSrc(`/assets/image_${uploadedId}.jpg`);
      setAttempt("jpg");
    } else if (attempt === "jpg") {
      setResolvedSrc(`/image_${uploadedId}.png`);
      setAttempt("png-root");
    } else if (attempt === "png-root") {
      setResolvedSrc(`/image_${uploadedId}.jpg`);
      setAttempt("jpg-root");
    } else if (attempt === "jpg-root") {
      setResolvedSrc(fallbackUrl);
      setAttempt("fallback");
    }
  };

  if (!resolvedSrc) {
    return null;
  }

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      onError={handleError}
      className={className}
      referrerPolicy={referrerPolicy}
    />
  );
}

