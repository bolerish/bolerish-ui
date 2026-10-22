import { Button } from "@bolerish/ui/button";
import { PlusIcon } from "@phosphor-icons/react";

export default function IconButtons() {
  return (
    <>
      <Button aria-label="Add item" size="icon-xs">
        <PlusIcon aria-hidden="true" />
      </Button>
      <Button aria-label="Add item" size="icon-sm">
        <PlusIcon aria-hidden="true" />
      </Button>
      <Button aria-label="Add item" size="icon-md">
        <PlusIcon aria-hidden="true" />
      </Button>
      <Button aria-label="Add item" size="icon-lg">
        <PlusIcon aria-hidden="true" />
      </Button>
      <Button aria-label="Add item" size="icon-xl">
        <PlusIcon aria-hidden="true" />
      </Button>
    </>
  );
}
