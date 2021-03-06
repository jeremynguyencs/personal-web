import React, { useState, useEffect, useRef } from "react";
import { SimpleGrid, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { ProjectCard } from "components/Card";
import { PROJECT_CARDS } from "utils/const";

const Carousel = () => {
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [carousel]);

  return (
    <Box ref={carousel} overflow="hidden" cursor="grab">
      <SimpleGrid
        gridAutoFlow="column"
        gridAutoColumns="1fr"
        as={motion.div}
        gap={4}
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
      >
        {PROJECT_CARDS.map((card) => (
          <ProjectCard key={card.title} {...card} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Carousel;
