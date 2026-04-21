import { useEffect, useState } from "react";
import "./App.css";
import RootRoute from "./routes/rootRoute";
import { authRefreshActions } from "./store/authStore";
import { Loader2 } from "lucide-react";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await authRefreshActions.rehydrate();
      setIsLoading(false);
    };

    init();
  }, []);

  //토큰 리프레시 될동안 로딩바
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return <RootRoute />;
}
