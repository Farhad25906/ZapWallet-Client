import { motion } from "framer-motion";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    badge?: string;
    center?: boolean;
}

const SectionHeader = ({ title, subtitle, badge, center = true }: SectionHeaderProps) => {
    const words = title.split(" ");

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`relative mb-20 ${center ? "text-center" : "text-left"}`}
        >
            {/* Decorative background glyph */}
            <span
                aria-hidden="true"
                className="pointer-events-none select-none absolute -top-6 left-1/2 -translate-x-1/2 text-[160px] font-black leading-none opacity-[0.04] text-[#019789] whitespace-nowrap"
                style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.05em" }}
            >
                {words[0]}
            </span>

            {/* Badge */}
            {badge && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className={`mb-5 ${center ? "flex justify-center" : ""}`}
                >
                    <span
                        className="relative inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold tracking-[0.18em] uppercase overflow-hidden"
                        style={{
                            color: "#019789",
                            fontFamily: "'Georgia', serif",
                        }}
                    >
                        {/* Badge bg pill */}
                        <span
                            className="absolute inset-0 rounded-full opacity-10"
                            style={{ background: "#019789" }}
                        />
                        {/* Left tick */}
                        <span
                            className="relative w-4 h-px inline-block"
                            style={{ background: "#ffd9ae" }}
                        />
                        <span className="relative">{badge}</span>
                        {/* Right tick */}
                        <span
                            className="relative w-4 h-px inline-block"
                            style={{ background: "#ffd9ae" }}
                        />
                    </span>
                </motion.div>
            )}

            {/* Title block */}
            <div className={`relative inline-block ${center ? "mx-auto" : ""}`}>
                <h2
                    className="relative text-4xl md:text-6xl font-black leading-[1.05] tracking-tight text-slate-900"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    {words.map((word, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.15 + i * 0.07 }}
                            className="inline-block mr-[0.25em]"
                        >
                            {/* Highlight every second word with the teal color */}
                            {i % 3 === 1 ? (
                                <span style={{ color: "#019789" }}>{word}</span>
                            ) : (
                                word
                            )}
                        </motion.span>
                    ))}
                </h2>

                {/* Underline — offset, warm apricot */}
                <motion.span
                    initial={{ scaleX: 0, originX: center ? 0.5 : 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -bottom-3 left-0 w-full h-[5px] rounded-full"
                    style={{
                        background: `linear-gradient(90deg, #ffd9ae 0%, #019789 100%)`,
                        transformOrigin: center ? "center" : "left",
                    }}
                />

                {/* Second thinner line, offset */}
                <motion.span
                    initial={{ scaleX: 0, originX: center ? 0.5 : 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -bottom-5 left-[15%] w-[55%] h-[2px] rounded-full opacity-40"
                    style={{
                        background: "#ffd9ae",
                        transformOrigin: center ? "center" : "left",
                    }}
                />
            </div>

            {/* Subtitle */}
            {subtitle && (
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className={`mt-8 text-base md:text-lg text-slate-500 leading-relaxed max-w-xl ${center ? "mx-auto" : ""
                        }`}
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    {subtitle}
                </motion.p>
            )}

            {/* Corner accent squares */}
            <motion.span
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.7 }}
                className="absolute -top-4 -left-4 w-3 h-3 rounded-sm hidden md:block"
                style={{ background: "#ffd9ae" }}
            />
            <motion.span
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.8 }}
                className="absolute -bottom-8 -right-4 w-2 h-2 rounded-sm hidden md:block"
                style={{ background: "#019789", opacity: 0.5 }}
            />
        </motion.div>
    );
};

export default SectionHeader;