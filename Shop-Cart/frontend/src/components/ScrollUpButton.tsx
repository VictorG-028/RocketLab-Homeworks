import { ArrowBigUpIcon } from "lucide-react";
import { useState, useEffect } from "react";

interface Props {

}

export default function ScrollUpButton({} : Props) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100);
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return(
    <div className={`
                  fixed bottom-4 right-4 
                  rounded-full w-12 h-12 bg-foreground
                  ${isScrolled ? "" : "hidden"} 
                  flex items-center justify-center
                  hover:bg-muted-foreground cursor-pointer
            `}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowBigUpIcon className="size-8 stroke-popover"></ArrowBigUpIcon>
    </div>
  );
}
