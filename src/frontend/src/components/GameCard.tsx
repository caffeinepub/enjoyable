import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { Gamepad2, Play } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Game } from "../backend.d";

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

const FALLBACK_THUMBNAILS: Record<string, string> = {
  Action: "linear-gradient(135deg, oklch(0.2 0.1 0), oklch(0.35 0.15 20))",
  Arcade: "linear-gradient(135deg, oklch(0.15 0.1 290), oklch(0.3 0.18 280))",
  Puzzle: "linear-gradient(135deg, oklch(0.15 0.08 195), oklch(0.3 0.15 200))",
  Racing: "linear-gradient(135deg, oklch(0.2 0.1 55), oklch(0.35 0.18 45))",
  Strategy: "linear-gradient(135deg, oklch(0.2 0.08 100), oklch(0.35 0.15 95))",
  Word: "linear-gradient(135deg, oklch(0.18 0.1 140), oklch(0.32 0.18 145))",
  Card: "linear-gradient(135deg, oklch(0.18 0.1 335), oklch(0.32 0.18 330))",
  Idle: "linear-gradient(135deg, oklch(0.15 0.08 270), oklch(0.28 0.14 265))",
  Sports: "linear-gradient(135deg, oklch(0.18 0.1 160), oklch(0.32 0.18 155))",
};

interface GameCardProps {
  game: Game;
  index?: number;
}

export default function GameCard({ game, index = 0 }: GameCardProps) {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const fallbackGradient =
    FALLBACK_THUMBNAILS[game.category] ||
    "linear-gradient(135deg, oklch(0.15 0 0), oklch(0.25 0.08 195))";

  const categoryColorClass =
    CATEGORY_COLORS[game.category] ||
    "bg-muted/60 text-muted-foreground border-border";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
    >
      <Link to="/game/$id" params={{ id: game.id }} className="block group">
        <div
          className="relative overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 game-card-glow cursor-pointer"
          style={{
            transform: isHovered ? "scale(1.03) translateY(-4px)" : "scale(1)",
            transition: "transform 0.25s ease, box-shadow 0.25s ease",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Thumbnail */}
          <div className="relative aspect-video overflow-hidden scanline-overlay">
            {game.thumbnailUrl && !imgError ? (
              <img
                src={game.thumbnailUrl}
                alt={game.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={() => setImgError(true)}
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ background: fallbackGradient }}
              >
                <Gamepad2
                  className="text-foreground/30 transition-transform duration-300 group-hover:scale-110"
                  size={48}
                  strokeWidth={1}
                />
              </div>
            )}

            {/* Play overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/60 transition-opacity duration-200"
              style={{ opacity: isHovered ? 1 : 0 }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-200"
                style={{
                  borderColor: "oklch(var(--neon-cyan))",
                  boxShadow: isHovered
                    ? "0 0 20px oklch(var(--neon-cyan) / 0.8)"
                    : "none",
                  background: "oklch(var(--neon-cyan) / 0.2)",
                }}
              >
                <Play
                  size={24}
                  style={{ color: "oklch(var(--neon-cyan))" }}
                  className="ml-1"
                />
              </div>
            </div>

            {/* Featured badge */}
            {game.featured && (
              <div className="absolute top-2 left-2">
                <span
                  className="text-xs font-display font-bold px-2 py-0.5 rounded"
                  style={{
                    background: "oklch(var(--neon-magenta) / 0.9)",
                    color: "oklch(0.97 0 0)",
                    boxShadow: "0 0 8px oklch(var(--neon-magenta) / 0.6)",
                  }}
                >
                  ★ FEATURED
                </span>
              </div>
            )}
          </div>

          {/* Card info */}
          <div className="p-3">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display font-bold text-sm text-foreground leading-tight line-clamp-1 group-hover:text-neon-cyan transition-colors duration-200">
                {game.name}
              </h3>
              <Badge
                className={`text-xs shrink-0 border ${categoryColorClass} font-body`}
                variant="outline"
              >
                {game.category}
              </Badge>
            </div>
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {game.description}
            </p>
          </div>

          {/* Neon bottom border on hover */}
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300"
            style={{
              background: isHovered
                ? "linear-gradient(90deg, oklch(var(--neon-cyan)), oklch(var(--neon-magenta)), oklch(var(--neon-cyan)))"
                : "transparent",
              boxShadow: isHovered
                ? "0 0 10px oklch(var(--neon-cyan) / 0.8)"
                : "none",
            }}
          />
        </div>
      </Link>
    </motion.div>
  );
}
