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
  const [resolvedSrc, setResolvedSrc] = useState<string>("");
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [uploadedId, setUploadedId] = useState<number | null>(null);
  const [fallbackUrl, setFallbackUrl] = useState<string>("");
  const [attempt, setAttempt] = useState<"png" | "jpg" | "png-root" | "jpg-root" | "fallback">("png");

  useEffect(() => {
    if (src.startsWith("uploaded_image:")) {
      try {
        const part = src.substring("uploaded_image:".length);
        const [idStr, fallback] = part.split("|");
        const idVal = parseInt(idStr, 10);
        
        setIsUploaded(true);
        setUploadedId(idVal);
        setFallbackUrl(fallback || "");
        setResolvedSrc(`/assets/image_${idVal}.png`);
        setAttempt("png");
      } catch (err) {
        console.error("Failed to parse SmartImage src:", src, err);
        setResolvedSrc(src);
        setIsUploaded(false);
      }
    } else {
      setResolvedSrc(src);
      setIsUploaded(false);
    }
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
