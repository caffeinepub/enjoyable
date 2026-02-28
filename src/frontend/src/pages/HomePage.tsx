import { Input } from "@/components/ui/input";
import { Gamepad2, Search, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import type { Game } from "../backend.d";
import GameCard from "../components/GameCard";
import GameCardSkeleton from "../components/GameCardSkeleton";
import { CATEGORIES, SAMPLE_GAMES } from "../data/sampleGames";
import { useAllGames, useFeaturedGames } from "../hooks/useQueries";

const TICKER_GAMES = [
  "TETRIS",
  "CHESS",
  "SNAKE",
  "2048",
  "PAC-MAN",
  "WORDLE",
  "SUDOKU",
  "FLAPPY BIRD",
  "MINESWEEPER",
  "SOLITAIRE",
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const { data: backendGames, isLoading: gamesLoading } = useAllGames();
  const { data: backendFeatured, isLoading: featuredLoading } =
    useFeaturedGames();

  // Use backend data if available, fallback to sample data
  const allGames: Game[] =
    backendGames && backendGames.length > 0 ? backendGames : SAMPLE_GAMES;
  const featuredGames: Game[] =
    backendFeatured && backendFeatured.length > 0
      ? backendFeatured
      : SAMPLE_GAMES.filter((g) => g.featured);

  // Filter games locally
  const filteredGames = useMemo(() => {
    let games = allGames;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      games = games.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q) ||
          g.category.toLowerCase().includes(q),
      );
    }

    if (activeCategory !== "All") {
      games = games.filter((g) => g.category === activeCategory);
    }

    return games;
  }, [allGames, searchQuery, activeCategory]);

  const isLoading = gamesLoading || featuredLoading;

  return (
    <div className="min-h-screen arcade-grid">
      {/* Header */}
      <header className="relative border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, oklch(var(--neon-cyan) / 0.2), oklch(var(--neon-magenta) / 0.2))",
                border: "1px solid oklch(var(--neon-cyan) / 0.5)",
                boxShadow: "0 0 10px oklch(var(--neon-cyan) / 0.3)",
              }}
            >
              <Gamepad2
                size={20}
                style={{ color: "oklch(var(--neon-cyan))" }}
              />
            </div>
            <span
              className="font-display font-black text-xl tracking-tight"
              style={{
                color: "oklch(var(--neon-cyan))",
                textShadow:
                  "0 0 10px oklch(var(--neon-cyan) / 0.8), 0 0 20px oklch(var(--neon-cyan) / 0.4)",
              }}
            >
              ENJOYABLE
            </span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground text-sm font-body">
            <Zap size={14} style={{ color: "oklch(var(--neon-green))" }} />
            <span className="hidden sm:block">
              {allGames.length}+ games available
            </span>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-10">
          {/* Ambient glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse, oklch(var(--neon-cyan)) 0%, transparent 70%)",
            }}
          />

          <div className="container max-w-4xl mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div
                className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border text-xs font-body"
                style={{
                  borderColor: "oklch(var(--neon-magenta) / 0.5)",
                  background: "oklch(var(--neon-magenta) / 0.08)",
                  color: "oklch(var(--neon-magenta))",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: "oklch(var(--neon-magenta))" }}
                />
                FREE TO PLAY — NO DOWNLOADS
              </div>
            </motion.div>

            <motion.h1
              className="font-display font-black text-5xl sm:text-7xl tracking-tighter mb-4 leading-none"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              style={{
                color: "oklch(var(--neon-cyan))",
                textShadow:
                  "0 0 30px oklch(var(--neon-cyan) / 0.6), 0 0 60px oklch(var(--neon-cyan) / 0.3)",
              }}
            >
              ENJOYABLE
            </motion.h1>

            <motion.p
              className="font-body text-muted-foreground text-base sm:text-lg mb-10 max-w-lg mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Your unlimited arcade. Search, click, and play hundreds of browser
              games — instantly.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              className="relative max-w-lg mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div
                className="relative rounded-xl overflow-hidden"
                style={{
                  boxShadow:
                    "0 0 0 1px oklch(var(--neon-cyan) / 0.5), 0 0 20px oklch(var(--neon-cyan) / 0.2)",
                }}
              >
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
                  size={18}
                  style={{ color: "oklch(var(--neon-cyan))" }}
                />
                <Input
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setActiveCategory("All");
                  }}
                  placeholder="Search games... (try 'puzzle' or 'racing')"
                  className="pl-11 pr-4 h-14 text-base font-body bg-card/80 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50"
                  style={{ fontSize: "16px" }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Ticker */}
        <div
          className="relative overflow-hidden py-2 border-y"
          style={{
            borderColor: "oklch(var(--neon-cyan) / 0.2)",
            background: "oklch(var(--neon-cyan) / 0.05)",
          }}
        >
          <div className="flex animate-marquee whitespace-nowrap">
            {[
              ...TICKER_GAMES.map((n, j) => ({
                name: n,
                uid: `a-${j}`,
                color: j % 3,
              })),
              ...TICKER_GAMES.map((n, j) => ({
                name: n,
                uid: `b-${j}`,
                color: j % 3,
              })),
            ].map((item) => (
              <span
                key={item.uid}
                className="font-display font-bold text-xs px-6 tracking-widest"
                style={{
                  color:
                    item.color === 0
                      ? "oklch(var(--neon-cyan) / 0.7)"
                      : item.color === 1
                        ? "oklch(var(--neon-magenta) / 0.7)"
                        : "oklch(var(--neon-green) / 0.7)",
                }}
              >
                ◈ {item.name}
              </span>
            ))}
          </div>
        </div>

        <div className="container max-w-7xl mx-auto px-4 py-10">
          {/* Featured Games */}
          {!searchQuery && activeCategory === "All" && (
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-1 h-6 rounded-full"
                  style={{
                    background: "oklch(var(--neon-magenta))",
                    boxShadow: "0 0 8px oklch(var(--neon-magenta) / 0.7)",
                  }}
                />
                <h2
                  className="font-display font-black text-xl tracking-tight"
                  style={{ color: "oklch(var(--neon-magenta))" }}
                >
                  FEATURED GAMES
                </h2>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {["fs1", "fs2", "fs3", "fs4", "fs5"].map((k) => (
                    <GameCardSkeleton key={k} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {featuredGames.map((game, i) => (
                    <GameCard key={game.id} game={game} index={i} />
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Category Filter */}
          {!searchQuery && (
            <div className="flex flex-wrap gap-2 mb-8">
              {CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-4 py-1.5 rounded-full text-sm font-display font-bold tracking-wide transition-all duration-200 border"
                  style={
                    activeCategory === cat
                      ? {
                          background: "oklch(var(--neon-cyan))",
                          color: "oklch(0.08 0 0)",
                          borderColor: "oklch(var(--neon-cyan))",
                          boxShadow: "0 0 12px oklch(var(--neon-cyan) / 0.7)",
                        }
                      : {
                          background: "transparent",
                          color: "oklch(0.65 0 0)",
                          borderColor: "oklch(0.28 0 0)",
                        }
                  }
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* All Games Grid */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div
                  className="w-1 h-6 rounded-full"
                  style={{
                    background: "oklch(var(--neon-cyan))",
                    boxShadow: "0 0 8px oklch(var(--neon-cyan) / 0.7)",
                  }}
                />
                <h2
                  className="font-display font-black text-xl tracking-tight"
                  style={{ color: "oklch(var(--neon-cyan))" }}
                >
                  {searchQuery
                    ? `RESULTS FOR "${searchQuery.toUpperCase()}"`
                    : activeCategory === "All"
                      ? "ALL GAMES"
                      : `${activeCategory.toUpperCase()} GAMES`}
                </h2>
              </div>
              <span className="text-muted-foreground text-sm font-body">
                {filteredGames.length} game
                {filteredGames.length !== 1 ? "s" : ""}
              </span>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {[
                  "as1",
                  "as2",
                  "as3",
                  "as4",
                  "as5",
                  "as6",
                  "as7",
                  "as8",
                  "as9",
                  "as10",
                ].map((k) => (
                  <GameCardSkeleton key={k} />
                ))}
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredGames.length > 0 ? (
                  <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                    layout
                  >
                    {filteredGames.map((game, i) => (
                      <GameCard key={game.id} game={game} index={i} />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-20 text-center"
                  >
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4"
                      style={{
                        background: "oklch(var(--neon-cyan) / 0.08)",
                        border: "1px solid oklch(var(--neon-cyan) / 0.2)",
                      }}
                    >
                      <Search
                        size={36}
                        strokeWidth={1}
                        style={{ color: "oklch(var(--neon-cyan) / 0.5)" }}
                      />
                    </div>
                    <p className="font-display font-bold text-lg text-muted-foreground">
                      No games found for "{searchQuery}"
                    </p>
                    <p className="text-muted-foreground/60 text-sm mt-1 font-body">
                      Try a different search term or browse by category
                    </p>
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="mt-4 px-4 py-2 rounded-lg text-sm font-display font-bold transition-all"
                      style={{
                        background: "oklch(var(--neon-cyan) / 0.1)",
                        color: "oklch(var(--neon-cyan))",
                        border: "1px solid oklch(var(--neon-cyan) / 0.3)",
                      }}
                    >
                      Clear Search
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <p className="text-muted-foreground/60 text-sm font-body">
            © {new Date().getFullYear()} Enjoyable. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: "oklch(var(--neon-cyan) / 0.7)" }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
