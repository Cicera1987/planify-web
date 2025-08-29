"use client";

import Icon from "./components/assets/icons";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center h-screen w-full relative bg-gray-50 p-6 text-center">
            <button
                onClick={() => router.back()}
                className="absolute top-5 left-5 flex items-center gap-2 px-4 py-2 rounded-md  text-gray-800 font-bold transition-colors cursor-pointer"
            >
                <Icon.ToGoBack /> Voltar
            </button>
            <h1 className="text-3xl font-bold text-gray-800">
                404 - Página Não Encontrada
            </h1>
        </div>
    );
}
