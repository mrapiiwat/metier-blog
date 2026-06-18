import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen w-full flex flex-col">
            <Header />

            <main className="flex-1 w-full flex flex-col">
                {children}
            </main>

            <Footer />
        </div>
    )
}