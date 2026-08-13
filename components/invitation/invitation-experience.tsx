"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motion, useReducedMotion } from "motion/react";
import type { InvitationVariant } from "@/lib/types/invitation";
import { EnvelopeVideoIntro } from "@/components/intro/envelope-video-intro";
import { BackgroundMusicControl } from "@/components/invitation/sections/background-music-control";
import { cn } from "@/lib/utils/cn";

type InvitationExperienceContextValue = {
  isOpened: boolean;
  hasOpening: boolean;
  openInvitation: () => void;
  startMusic: () => void;
  isPlaying: boolean;
  isAudioAvailable: boolean;
  toggleMusic: () => void;
};

const InvitationExperienceContext =
  createContext<InvitationExperienceContextValue | null>(null);

type InvitationExperienceProps = {
  invitation: InvitationVariant;
  children: ReactNode;
};

const AUDIO_SOURCE = "/audio/track3.mp3";

export function InvitationExperience({
  invitation,
  children,
}: InvitationExperienceProps) {
  const hasOpening = invitation.sections.openingReveal;
  const prefersReducedMotion = useReducedMotion();
  const [isOpened, setIsOpened] = useState(!hasOpening);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioAvailable, setIsAudioAvailable] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = isOpened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpened]);

  const playAudio = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio || !invitation.sections.backgroundMusic || !isAudioAvailable) {
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, [invitation.sections.backgroundMusic, isAudioAvailable]);

  const pauseAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.pause();
    setIsPlaying(false);
  }, []);

  const openInvitation = useCallback(() => {
    setIsOpened(true);
    void playAudio();
  }, [playAudio]);

  const startMusic = useCallback(() => {
    void playAudio();
  }, [playAudio]);

  const toggleMusic = useCallback(() => {
    if (!isAudioAvailable) {
      return;
    }

    if (isPlaying) {
      pauseAudio();
      return;
    }

    void playAudio();
  }, [isAudioAvailable, isPlaying, pauseAudio, playAudio]);

  const value = useMemo(
    () => ({
      isOpened,
      hasOpening,
      openInvitation,
      startMusic,
      isPlaying,
      isAudioAvailable,
      toggleMusic,
    }),
    [hasOpening, isAudioAvailable, isOpened, isPlaying, openInvitation, startMusic, toggleMusic],
  );

  return (
    <InvitationExperienceContext.Provider value={value}>
      <audio
        loop
        onEnded={() => setIsPlaying(false)}
        onError={() => {
          setIsAudioAvailable(false);
          setIsPlaying(false);
        }}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        preload="none"
        ref={audioRef}
        src={AUDIO_SOURCE}
      />

      <div className="relative">
        {hasOpening && isOpened ? <div aria-hidden="true" className="h-[100svh]" /> : null}

        <motion.main
          animate={
            prefersReducedMotion
              ? { opacity: isOpened ? 1 : 0 }
              : {
                  opacity: isOpened ? 1 : 0,
                  filter: isOpened ? "blur(0px)" : "blur(2px)",
                  scale: isOpened ? 1 : 1.01,
                }
          }
          aria-hidden={!isOpened}
          className={cn("relative", !isOpened && "pointer-events-none select-none")}
          initial={false}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.main>

        {hasOpening ? (
          <EnvelopeVideoIntro
            invitationId={invitation.id}
            isHeroVisible={isOpened}
            onHeroVisible={openInvitation}
            onStartAudio={startMusic}
          />
        ) : null}
      </div>

      {invitation.sections.backgroundMusic && isOpened ? (
        <BackgroundMusicControl
          enabled={invitation.sections.backgroundMusic}
          isAudioAvailable={isAudioAvailable}
          isPlaying={isPlaying}
          toggleMusic={toggleMusic}
        />
      ) : null}
    </InvitationExperienceContext.Provider>
  );
}

export function useInvitationExperience() {
  const context = useContext(InvitationExperienceContext);

  if (!context) {
    throw new Error("useInvitationExperience must be used within InvitationExperience");
  }

  return context;
}
