import { MaskSad } from "phosphor-react";
import { Link } from "react-router-dom";

export const NoAds = () => {
  return (
    <div className="flex items-center gap-4 bg-[#2A2634] p-5 rounded-lg col-span-4">
      <MaskSad className="text-violet-500 text-4xl" />
      <p className="text-white text-xl font-bold">
        Este game ainda não possui anuncios,{" "}
        <Link
          className="bg-nlw-gradient bg-clip-text text-transparent hover:underline underline-offset-4 decoration-violet-600"
          to="/"
        >
          crie um!
        </Link>
      </p>
    </div>
  );
};
