import { useEffect, useState } from "react";
import FoldOne from "../components/Landing/Fold-1";

export default function Home() {

    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true); // Ensures client-side rendering
      }, []);
    
      if (!isClient) return null;

    return (
        <div>
            <main>
                <FoldOne />

            </main>
        </div>
    )
}