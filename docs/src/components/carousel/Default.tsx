import { colorVars, spacingVars, typographyVars } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import {
  Carousel,
  CarouselViewport,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
const layout = stylex.create({
  preview: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    fontSize: typographyVars.fontSizeSm,
    gap: spacingVars.space3,
    lineHeight: typographyVars.lineHeightNormal,
    justifyContent: "center",
    width: "100%",
  },
});
const styles = stylex.create({
  carousel: {
    maxWidth: "25rem",
  },
  slide: {
    alignItems: "center",
    backgroundColor: colorVars.bgSubtle,
    display: "flex",
    fontSize: typographyVars.fontSizeXl,
    fontWeight: typographyVars.fontWeightSemibold,
    height: "12rem",
    justifyContent: "center",
    padding: spacingVars.space6,
  },
});
export default function Default() {
  return (
    <div {...stylex.props(layout.preview)}>
      <Carousel xstyle={styles.carousel}>
        <CarouselViewport>
          <CarouselContent>
            {["1", "2", "3", "4", "5"].map((item) => (
              <CarouselItem key={item} xstyle={styles.slide}>
                Slide {item}
              </CarouselItem>
            ))}
          </CarouselContent>
        </CarouselViewport>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
