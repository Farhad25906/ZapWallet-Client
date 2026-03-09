import { motion } from "framer-motion";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    badge?: string;
    center?: boolean;
}

const SectionHeader = ({ title, subtitle, badge, center = true }: SectionHeaderProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`mb-16 ${center ? "text-center" : "text-left"}`}
        >
            {badge && (
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#009689]/10 text-[#009689] font-bold text-sm tracking-wide mb-4 border border-[#009689]/20 uppercase">
                    {badge}
                </span>
            )}
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 relative inline-block">
                {title}
                <span className="absolute -bottom-2 left-0 w-1/3 h-1.5 bg-[#ffd8af] rounded-full"></span>
            </h2>
            {subtitle && (
                <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
};

export default SectionHeader;
