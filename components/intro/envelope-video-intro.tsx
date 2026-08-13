"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  type KeyboardEvent,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { CinematicInvitationHero } from "@/components/hero/cinematic-invitation-hero";
import { getInvitationVariant } from "@/lib/config/invitations";
import type { InvitationVariant } from "@/lib/types/invitation";

type EnvelopeVideoIntroProps = {
  invitationId: string;
  isHeroVisible: boolean;
  onHeroVisible: () => void;
  onStartAudio: () => void;
  onComplete?: () => void;
};

const VIDEO_SOURCE = "/video/royal-prestige.mp4";
const OPEN_WAIT_TIME = 0.1;
const HERO_TEXT_START_TIME = 5.1;
const HERO_HOLD_OFFSET = 0.05;

type IntroPhase = "waiting" | "opening" | "heroPlaying" | "heroPaused";

export function EnvelopeVideoIntro({
  invitationId,
  isHeroVisible,
  onHeroVisible,
  onStartAudio,
  onComplete,
}: EnvelopeVideoIntroProps) {
  const prefersReducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isStartingPlaybackRef = useRef(false);
  const hasReachedWaitingFrameRef = useRef(false);
  const hasPreparedWaitingFrameRef = useRef(false);
  const hasHeroVisibleCallbackRunRef = useRef(false);
  const phaseRef = useRef<IntroPhase>("waiting");
  const invitation = useMemo<InvitationVariant | undefined>(
    () => getInvitationVariant(invitationId),
    [invitationId],
  );
  const finalizeIntro = useCallback(() => {
    if (onHeroVisible) {
      onHeroVisible();
      return;
    }

    onComplete?.();
  }, [onComplete, onHeroVisible]);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [phase, setPhase] = useState<IntroPhase>("waiting");
  const [waitingFrameDataUrl, setWaitingFrameDataUrl] = useState<string | null>(null);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.muted = true;
    video.pause();

    const captureWaitingFrame = () => {
      if (video.videoWidth <= 0 || video.videoHeight <= 0) {
        return;
      }

      try {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const context = canvas.getContext("2d");

        if (!context) {
          return;
        }

        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        setWaitingFrameDataUrl(canvas.toDataURL("image/jpeg", 0.92));
      } catch {
        // Some mobile browsers can be picky about frame extraction timing. In that
        // case we still fall back to the paused video element itself.
      }
    };

    const prepareWaitingFrame = () => {
      if (
        prefersReducedMotion ||
        hasPreparedWaitingFrameRef.current ||
        phaseRef.current !== "waiting"
      ) {
        return;
      }

      hasPreparedWaitingFrameRef.current = true;

      try {
        video.pause();
        video.currentTime = Math.min(OPEN_WAIT_TIME, Math.max(0, video.duration || OPEN_WAIT_TIME));
      } catch {}
    };

    const handleCanPlay = () => {
      if (
        phaseRef.current === "waiting" &&
        !prefersReducedMotion &&
        !hasPreparedWaitingFrameRef.current
      ) {
        prepareWaitingFrame();
      }

    };

    const handleLoadedData = () => {
      if (
        phaseRef.current === "waiting" &&
        !prefersReducedMotion &&
        !hasPreparedWaitingFrameRef.current
      ) {
        prepareWaitingFrame();
      }

    };

    const handleLoadedMetadata = () => {
      if (prefersReducedMotion) {
        return;
      }

      prepareWaitingFrame();
    };

    const handleSeeked = () => {
      if (phaseRef.current === "waiting") {
        hasReachedWaitingFrameRef.current = true;
        video.pause();
        captureWaitingFrame();
      }
    };

    const handleTimeUpdate = () => {
      if (
        phaseRef.current === "opening" &&
        video.currentTime >= HERO_TEXT_START_TIME
      ) {
        phaseRef.current = "heroPlaying";
        setPhase("heroPlaying");
        return;
      }

      if (
        phaseRef.current === "heroPlaying" &&
        video.duration &&
        video.currentTime >= video.duration - HERO_HOLD_OFFSET
      ) {
        video.pause();
        if (video.duration) {
          video.currentTime = Math.max(0, video.duration - HERO_HOLD_OFFSET);
        }
        phaseRef.current = "heroPaused";
        setPhase("heroPaused");
      }
    };

    const handleEnded = () => {
      if (phaseRef.current === "heroPlaying") {
        if (video.duration) {
          video.currentTime = Math.max(0, video.duration - HERO_HOLD_OFFSET);
        }
        video.pause();
        phaseRef.current = "heroPaused";
        setPhase("heroPaused");
      }
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("seeked", handleSeeked);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("seeked", handleSeeked);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (
      !hasHeroVisibleCallbackRunRef.current &&
      (phase === "heroPlaying" || phase === "heroPaused")
    ) {
      hasHeroVisibleCallbackRunRef.current = true;
      finalizeIntro();
    }
  }, [finalizeIntro, phase]);

  const beginPlayback = async () => {
    const video = videoRef.current;

    if (!video) {
      finalizeIntro();
      return;
    }

    if (phaseRef.current !== "waiting" || isStartingPlaybackRef.current) {
      return;
    }

    isStartingPlaybackRef.current = true;
    hasReachedWaitingFrameRef.current = true;

    if (prefersReducedMotion) {
      if (!hasInteracted) {
        setHasInteracted(true);
        onStartAudio();
      }

      phaseRef.current = "heroPaused";
      setPhase("heroPaused");
      isStartingPlaybackRef.current = false;
      finalizeIntro();
      return;
    }

    try {
      phaseRef.current = "opening";
      setPhase("opening");
      await video.play();

      if (!hasInteracted) {
        setHasInteracted(true);
        onStartAudio();
      }
    } catch {
      phaseRef.current = "waiting";
      setPhase("waiting");
    } finally {
      isStartingPlaybackRef.current = false;
    }
  };

  const handleSkip = () => {
    const video = videoRef.current;

    if (!hasInteracted) {
      setHasInteracted(true);
      onStartAudio();
    }

    if (video?.duration) {
      video.currentTime = Math.max(0, video.duration - HERO_HOLD_OFFSET);
      video.pause();
    }

    phaseRef.current = "heroPaused";
    setPhase("heroPaused");
    finalizeIntro();
  };

  const handleKeyDown = async (event: KeyboardEvent<HTMLElement>) => {
    if (phase === "waiting" && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      await beginPlayback();
    }
  };

  return (
    <section
      aria-label="Invitation intro video"
      className={
        isHeroVisible
          ? "absolute inset-x-0 top-0 z-30 h-[100svh] overflow-hidden bg-[#120b0d]"
          : "fixed inset-0 z-50 overflow-hidden bg-[#120b0d]"
      }
    >
      <motion.div
        animate={{ opacity: 1 }}
        className="relative h-full w-full"
        initial={{ opacity: 1 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 0.2 }}
      >
        <button
          className="absolute right-4 top-4 z-20 inline-flex min-h-10 items-center justify-center rounded-full border border-white/15 bg-black/15 px-4 text-[10px] uppercase tracking-[0.26em] text-white/85 backdrop-blur-sm"
          onClick={handleSkip}
          type="button"
        >
          Skip intro
        </button>

        <div
          aria-label="Tap to play invitation intro"
          className="absolute inset-0 cursor-pointer"
          onKeyDown={phase === "waiting" ? handleKeyDown : undefined}
          onPointerDown={phase === "waiting" ? (() => { void beginPlayback(); }) : undefined}
          role={phase === "waiting" ? "button" : undefined}
          tabIndex={phase === "waiting" ? 0 : -1}
        >
          <video
            className="absolute inset-0 h-full w-full object-cover"
            controls={false}
            controlsList="nofullscreen nodownload noplaybackrate noremoteplayback"
            disablePictureInPicture
            muted
            playsInline
            preload="auto"
            ref={videoRef}
            src={VIDEO_SOURCE}
          />

          {phase === "waiting" && waitingFrameDataUrl ? (
            <Image
              alt=""
              aria-hidden="true"
              className="absolute inset-0 z-[1] h-full w-full object-cover"
              fill
              priority
              src={waitingFrameDataUrl}
              unoptimized
            />
          ) : null}

          <AnimatePresence>
            {phase === "waiting" ? (
              <motion.div
                animate={{ opacity: 1 }}
                className="absolute inset-0 z-10"
                exit={{ opacity: 0 }}
                initial={{ opacity: 1 }}
                transition={{ duration: prefersReducedMotion ? 0.01 : 0.3 }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(8,5,6,0.14)_58%,rgba(8,5,6,0.44)_100%)]" />
              </motion.div>
            ) : null}
          </AnimatePresence>

          <AnimatePresence>
            {phase === "heroPlaying" || phase === "heroPaused" ? (
              invitation ? (
                <motion.div
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 z-10"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  transition={{
                    duration: prefersReducedMotion ? 0.01 : 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <CinematicInvitationHero
                    invitation={invitation}
                    isActive
                    showScrollCue
                  />
                </motion.div>
              ) : null
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
