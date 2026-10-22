"use client";

import { sizeVars, spacingRoleVars } from "@bolerish/tokens/semantic.stylex";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import * as stylex from "@stylexjs/stylex";
import useEmblaCarousel from "embla-carousel-react";
import {
  createContext,
  useLayoutEffect,
  useRef,
  useContext,
  useEffect,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";

import { Button } from "./button";

const styles = stylex.create({
  root: { position: "relative", width: "100%" },
  viewport: { overflow: "hidden", width: "100%" },
  content: { display: "flex", gap: "var(--nuee-carousel-gap, 0px)" },
  ratioRoot: { "--nuee-carousel-gap": spacingRoleVars.inlineGap },
  ratioItem: (share: number) => ({
    "--nuee-carousel-basis": `calc((100% - var(--nuee-carousel-gap, 0px)) * ${share})`,
  }),
  item: {
    boxSizing: "border-box",
    flex: "0 0 100%",
    flexBasis: "var(--nuee-carousel-basis, 100%)",
    minWidth: 0,
  },
  control: {
    position: "absolute",
    top: `calc(50% - ${sizeVars.controlSm} / 2)`,
  },
  previous: { insetInlineStart: `calc(${sizeVars.controlSm} * -1.5)` },
  next: { insetInlineEnd: `calc(${sizeVars.controlSm} * -1.5)` },
});

type CarouselApi = ReturnType<typeof useEmblaCarousel>[1];
type CarouselOptions = Parameters<typeof useEmblaCarousel>[0];
type CarouselPlugins = Parameters<typeof useEmblaCarousel>[1];
type CarouselContextValue = {
  slideShare?: number;
  canScrollNext: boolean;
  canScrollPrevious: boolean;
  scrollNext: () => void;
  scrollPrevious: () => void;
  viewportRef: ReturnType<typeof useEmblaCarousel>[0];
};

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) throw new Error("Carousel slots must be rendered inside Carousel.");
  return context;
}

export type { CarouselApi };

export type CarouselProps = Omit<ComponentProps<"section">, "className" | "style"> & {
  children: ReactNode;
  onSelect?: (api: NonNullable<CarouselApi>) => void;
  options?: CarouselOptions;
  plugins?: CarouselPlugins;
  setApi?: (api: NonNullable<CarouselApi>) => void;
  /** Current slide : visible neighboring portion, e.g. [70, 20]. Gap is excluded. */
  slideRatio?: readonly [number, number];
  xstyle?: stylex.StyleXStyles;
};

export function Carousel({
  children,
  onSelect,
  options,
  plugins,
  setApi,
  slideRatio,
  xstyle,
  ...props
}: CarouselProps) {
  let slideShare: number | undefined;
  if (slideRatio !== undefined) {
    if (
      slideRatio.length !== 2 ||
      slideRatio.some((value) => !Number.isFinite(value) || value <= 0) ||
      !Number.isFinite(slideRatio[0] + slideRatio[1])
    ) {
      throw new Error("Carousel slideRatio requires two finite positive numbers.");
    }
    if (options?.axis === "y")
      throw new Error("Carousel slideRatio currently supports horizontal carousels.");
    slideShare = slideRatio[0] / (slideRatio[0] + slideRatio[1]);
  }
  const [viewportRef, api] = useEmblaCarousel(
    slideRatio ? { align: "start", ...options } : options,
    plugins,
  );
  const [canScrollPrevious, setCanScrollPrevious] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelectRef = useRef(onSelect);
  useLayoutEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    if (api) setApi?.(api);
  }, [api, setApi]);

  useEffect(() => {
    if (!api) return;
    function handleSelection(nextApi: NonNullable<CarouselApi>) {
      setCanScrollPrevious(nextApi.canScrollPrev());
      setCanScrollNext(nextApi.canScrollNext());
      onSelectRef.current?.(nextApi);
    }
    api.on("reInit", handleSelection).on("select", handleSelection);
    const frame = requestAnimationFrame(() => handleSelection(api));
    return () => {
      cancelAnimationFrame(frame);
      api.off("reInit", handleSelection).off("select", handleSelection);
    };
  }, [api]);

  function scrollPrevious() {
    api?.scrollPrev();
  }

  function scrollNext() {
    api?.scrollNext();
  }

  return (
    <CarouselContext.Provider
      value={{
        slideShare,
        canScrollNext,
        canScrollPrevious,
        scrollNext,
        scrollPrevious,
        viewportRef,
      }}
    >
      <section
        aria-roledescription="carousel"
        {...props}
        {...stylex.props(styles.root, slideShare !== undefined && styles.ratioRoot, xstyle)}
      >
        {children}
      </section>
    </CarouselContext.Provider>
  );
}

export type CarouselContentProps = Omit<ComponentProps<"div">, "className" | "style"> & {
  xstyle?: stylex.StyleXStyles;
};

export function CarouselViewport({
  xstyle,
  ...props
}: Omit<ComponentProps<"div">, "className" | "style" | "ref"> & { xstyle?: stylex.StyleXStyles }) {
  const { viewportRef } = useCarousel();
  return <div ref={viewportRef} {...props} {...stylex.props(styles.viewport, xstyle)} />;
}

export function CarouselContent({ xstyle, ...props }: CarouselContentProps) {
  return <div {...props} {...stylex.props(styles.content, xstyle)} />;
}

export type CarouselItemProps = Omit<ComponentProps<"div">, "className" | "style"> & {
  xstyle?: stylex.StyleXStyles;
};

export function CarouselItem({ xstyle, ...props }: CarouselItemProps) {
  const { slideShare } = useCarousel();
  return (
    <div
      {...props}
      {...stylex.props(
        styles.item,
        slideShare !== undefined && styles.ratioItem(slideShare),
        xstyle,
      )}
    />
  );
}

type CarouselControlProps = Omit<
  ComponentProps<typeof Button>,
  "children" | "onClick" | "className" | "style"
>;

export function CarouselPrevious({ disabled, xstyle, ...props }: CarouselControlProps) {
  const { canScrollPrevious, scrollPrevious } = useCarousel();
  return (
    <Button
      aria-label="Previous slide"
      disabled={disabled ?? !canScrollPrevious}
      onClick={scrollPrevious}
      size="icon-sm"
      shape="circle"
      variant="secondary"
      xstyle={[styles.control, styles.previous, xstyle]}
      {...props}
    >
      <CaretLeftIcon aria-hidden="true" />
    </Button>
  );
}

export function CarouselNext({ disabled, xstyle, ...props }: CarouselControlProps) {
  const { canScrollNext, scrollNext } = useCarousel();
  return (
    <Button
      aria-label="Next slide"
      disabled={disabled ?? !canScrollNext}
      onClick={scrollNext}
      size="icon-sm"
      shape="circle"
      variant="secondary"
      xstyle={[styles.control, styles.next, xstyle]}
      {...props}
    >
      <CaretRightIcon aria-hidden="true" />
    </Button>
  );
}
