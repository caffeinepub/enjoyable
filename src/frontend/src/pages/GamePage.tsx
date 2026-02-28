import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  ExternalLink,
  Gamepad2,
  Maximize2,
  RefreshCw,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SAMPLE_GAMES } from "../data/sampleGames";
import { useGameById } from "../hooks/useQueries";

const CATEGORY_COLORS: Record<string, string> = {
  Action: "bg-red-950/60 text-red-300 border-red-700/50",
  Arcade: "bg-violet-950/60 text-violet-300 border-violet-700/50",
  Puzzle: "bg-cyan-950/60 text-cyan-300 border-cyan-700/50",
  Racing: "bg-orange-950/60 text-orange-300 border-orange-700/50",
  Strategy: "bg-yellow-950/60 text-yellow-300 border-yellow-700/50",
  Word: "bg-green-950/60 text-green-300 border-green-700/50",
  Card: "bg-pink-950/60 text-pink-300 border-pink-700/50",
  Idle: "bg-indigo-950/60 text-indigo-300 border-indigo-700/50",
  Sports: "bg-emerald-950/60 text-emerald-300 border-emerald-700/50",
};

// URLs that are known to block embedding -- open directly in new tab
const OPEN_IN_TAB_DOMAINS = ["orteil.dashnet.org"];

function isBlockedEmbed(url: string): boolean {
  try {
    const hostname = new URL(url).hostname;
    return OPEN_IN_TAB_DOMAINS.some((d) => hostname.includes(d));
  } catch {
    return false;
  }
}

export default function GamePage() {
  const { id } = useParams({ from: "/game/$id" });
  const [iframeError, setIframeError] = useState(false);
  const [_isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [loadAttempted, setLoadAttempted] = useState(false);
  const iframeContainerRef = useRef<HTMLDivElement>(null);

  const { data: backendGame, isLoading } = useGameById(id);

  // Fallback to sample data
  const game = backendGame || SAMPLE_GAMES.find((g) => g.id === id);

  const openInNewTab = game?.embedUrl
    ? () => window.open(game.embedUrl, "_blank", "noopener,noreferrer")
    : undefined;

  // Auto-open in new tab if domain is known to block embeds
  useEffect(() => {
    if (game && isBlockedEmbed(game.embedUrl) && !loadAttempted) {
      setLoadAttempted(true);
      window.open(game.embedUrl, "_blank", "noopener,noreferrer");
      setIframeError(true);
    }
  }, [game, loadAttempted]);

  const handleFullscreen = () => {
    if (!iframeContainerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    } else {
      iframeContainerRef.current
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch(() => {
          // Fullscreen not available, ignore
        });
    }
  };

  const handleReload = () => {
    setIframeError(false);
    setIframeKey((k) => k + 1);
  };

  const categoryClass = game
    ? CATEGORY_COLORS[game.category] ||
      "bg-muted/60 text-muted-foreground border-border"
    : "";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navigation bar */}
      <header className="border-b border-border bg-background/90 backdrop-blur-sm sticky top-0 z-40">
        <div className="container max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link to="/">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 font-display font-bold text-sm hover:bg-card transition-colors"
              style={{ color: "oklch(var(--neon-cyan))" }}
            >
              <ArrowLeft size={16} />
              BACK
            </Button>
          </Link>

          <div className="h-5 w-px bg-border" />

          {isLoading ? (
            <Skeleton className="h-5 w-48 bg-muted/40" />
          ) : game ? (
            <div className="flex items-center gap-2 min-w-0">
              <Gamepad2
                size={16}
                className="shrink-0"
                style={{ color: "oklch(var(--neon-cyan) / 0.7)" }}
              />
              <h1
                className="font-display font-black text-sm sm:text-base tracking-tight truncate"
                style={{ color: "oklch(var(--foreground))" }}
              >
                {game.name}
              </h1>
              <Badge
                className={`text-xs hidden sm:flex border ${categoryClass} font-body shrink-0`}
                variant="outline"
              >
                {game.category}
              </Badge>
            </div>
          ) : (
            <span className="font-display font-bold text-sm text-muted-foreground">
              Game Not Found
            </span>
          )}

          <div className="ml-auto flex items-center gap-2">
            {game && (
              <Button
                variant="ghost"
                size="sm"
                onClick={openInNewTab}
                className="gap-2 font-body text-xs text-muted-foreground hover:text-foreground"
              >
                <ExternalLink size={14} />
                <span className="hidden sm:inline">New Tab</span>
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReload}
              className="gap-2 font-body text-xs text-muted-foreground hover:text-foreground"
            >
              <RefreshCw size={14} />
              <span className="hidden sm:inline">Reload</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFullscreen}
              className="gap-2 font-body text-xs"
              style={{ color: "oklch(var(--neon-cyan) / 0.8)" }}
            >
              <Maximize2 size={14} />
              <span className="hidden sm:inline">Fullscreen</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main game area */}
      <main className="flex-1 flex flex-col">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center space-y-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto"
                style={{
                  background: "oklch(var(--neon-cyan) / 0.1)",
                  border: "1px solid oklch(var(--neon-cyan) / 0.3)",
                }}
              >
                <Gamepad2
                  size={28}
                  style={{ color: "oklch(var(--neon-cyan))" }}
                  className="animate-pulse"
                />
              </div>
              <p
                className="font-display font-bold text-sm"
                style={{ color: "oklch(var(--neon-cyan))" }}
              >
                LOADING GAME...
              </p>
            </div>
          </div>
        ) : !game ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-4 max-w-sm"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto"
                style={{
                  background: "oklch(var(--destructive) / 0.1)",
                  border: "1px solid oklch(var(--destructive) / 0.3)",
                }}
              >
                <AlertTriangle
                  size={28}
                  style={{ color: "oklch(var(--destructive))" }}
                />
              </div>
              <div>
                <h2 className="font-display font-black text-lg text-foreground">
                  GAME NOT FOUND
                </h2>
                <p className="text-muted-foreground text-sm mt-1 font-body">
                  We couldn't find a game with this ID.
                </p>
              </div>
              <Link to="/">
                <Button
                  className="font-display font-bold"
                  style={{
                    background: "oklch(var(--neon-cyan))",
                    color: "oklch(0.08 0 0)",
                  }}
                >
                  BACK TO ARCADE
                </Button>
              </Link>
            </motion.div>
          </div>
        ) : (
          <motion.div
            className="flex-1 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Game description bar */}
            <div className="px-4 py-2 text-xs font-body text-muted-foreground/70 border-b border-border/50 bg-card/30 hidden sm:block truncate">
              {game.description}
            </div>

            {/* iframe container */}
            <div className="flex-1 relative" ref={iframeContainerRef}>
              {iframeError ? (
                <div className="absolute inset-0 flex items-center justify-center bg-background">
                  <div className="text-center space-y-4 max-w-sm p-8">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto"
                      style={{
                        background: "oklch(var(--neon-cyan) / 0.1)",
                        border: "1px solid oklch(var(--neon-cyan) / 0.3)",
                      }}
                    >
                      <ExternalLink
                        size={28}
                        style={{ color: "oklch(var(--neon-cyan))" }}
                      />
                    </div>
                    <div>
                      <h2 className="font-display font-black text-lg text-foreground">
                        PLAY IN BROWSER
                      </h2>
                      <p className="text-muted-foreground text-sm mt-1 font-body leading-relaxed">
                        This game opens in a new tab for the best experience.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button
                        onClick={openInNewTab}
                        className="font-display font-bold text-sm gap-2"
                        style={{
                          background: "oklch(var(--neon-cyan))",
                          color: "oklch(0.08 0 0)",
                        }}
                      >
                        <ExternalLink size={14} />
                        OPEN GAME
                      </Button>
                      <Link to="/">
                        <Button
                          variant="outline"
                          className="font-display font-bold text-sm gap-2 w-full"
                        >
                          <ArrowLeft size={14} />
                          BACK TO ARCADE
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0">
                  <div
                    className="w-full h-full rounded-b-none"
                    style={{
                      border: "1px solid oklch(var(--neon-cyan) / 0.15)",
                      borderTop: "none",
                    }}
                  >
                    <iframe
                      key={iframeKey}
                      src={game.embedUrl}
                      title={game.name}
                      className="w-full h-full"
                      style={{
                        minHeight: "calc(100vh - 120px)",
                        background: "#000",
                        display: "block",
                        border: "none",
                      }}
                      allow="fullscreen; gamepad; pointer-lock; autoplay; encrypted-media"
                      allowFullScreen
                      onError={() => setIframeError(true)}
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals allow-downloads"
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
