import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatAssistant from "../components/modules/AI/ChatAssistant";

interface IProps {
    children: ReactNode
}
const CommonLayout = ({ children }: IProps) => {
    return (
        <div className="relative min-h-screen">
            <Navbar />
            {children}
            <Footer />
            <ChatAssistant />
        </div>
    );
};

export default CommonLayout;