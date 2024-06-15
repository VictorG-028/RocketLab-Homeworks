import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BoltIcon } from "lucide-react";
import error404 from "../../assets/e404.svg";

// Component template link: https://flowbite.com/application-ui/demo/pages/404/
export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <main className="bg-muted-foreground min-h-screen flex items-center justify-center relative">
      <>
        <BoltIcon className="absolute top-0 left-0 m-4 animate-spin-slow" />
        <BoltIcon className="absolute top-0 right-0 m-4 animate-spin-step" />
        <BoltIcon className="absolute bottom-0 left-0 m-4 animate-spin-alternate" />
        <BoltIcon className="absolute bottom-0 right-0 m-4 animate-spin-step-chaotic" />
        <section className="text-center">
          <img src={error404} alt="Imagem de error 404" className="mx-auto mb-8 w-full max-w-lg"></img>
          <h1 className="text-3xl text-primary font-bold mb-4">Página não encontrada</h1>
          <p className="text-lg text-primary mb-5">Ops... parece que o link foi de americanas.</p>
          <Button onClick={() => navigate("/")}>Voltas à página inicial</Button>
        </section>
      </>
    </main>
  );
};
