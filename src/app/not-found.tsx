export default function NotFound() {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen text-center bg-[hsl(var(--background))] px-6">
            {/* Code d’erreur */}
            <h1 className="text-[clamp(4rem,12vw,8rem)] font-extrabold tracking-tighter bg-clip-text text-transparent bg-[linear-gradient(90deg,hsl(var(--retro-violet)),hsl(var(--retro-rose)),hsl(var(--retro-orange)))]">
                404
            </h1>

            {/* Message */}
            <p className="mt-4 text-lg md:text-xl text-[hsl(var(--foreground)/0.7)]">
                Oups ! Cette page s’est perdue dans les archives VHS…
            </p>

            {/* Bouton retour — style “cassette tab” */}
            <a
                href="/"
                className="mt-8 inline-block font-semibold text-white bg-[hsl(var(--retro-violet))]
                   hover:bg-[hsl(var(--retro-rose))] transition px-8 py-3 text-base shadow-[0_6px_14px_hsl(262_72%_40%/.18)]
                   border border-[hsl(var(--retro-violet))]
                   "
                style={{
                    clipPath:
                        "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
                }}
            >
                Retour à l’accueil
            </a>

            {/* Bande décorative VHS en bas */}
            <div className="mt-16 h-2 w-32 rounded-full bg-[linear-gradient(90deg,hsl(var(--retro-blue)),hsl(var(--retro-violet)),hsl(var(--retro-rose)))] opacity-80" />
        </section>
    );
}
