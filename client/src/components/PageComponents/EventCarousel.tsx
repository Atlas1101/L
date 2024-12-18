import React, { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import useFetchRecipes from "@/utils/useFetchRecipes";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/carousel";

import RecipeCard from "./RecipeCard";

export default function RecipeCarousel() {
    const { recipes, loading, error } = useFetchRecipes();

    if (loading) return <div>Loading recipes...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="relative">
            {/* Carousel */}
            <Carousel
                className="w-full"
                plugins={[
                    Autoplay({
                        delay: 2000,
                    }),
                ]}
                opts={{ loop: true, align: "start" }}
                //  className="w-full"
            >
                <CarouselContent className="-ml-2">
                    {recipes.map((recipe) => (
                        <CarouselItem
                            key={recipe.id}
                            className="flex justify-center md:basis-1/1 md:basis-1/3 lg:basis-1/4 my-4 pl-2"
                        >
                            <RecipeCard
                                id={recipe.id}
                                title={recipe.title}
                                description={recipe.category}
                                image={recipe.image}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {/* Navigation Buttons */}
                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
            </Carousel>
        </div>
    );
}
