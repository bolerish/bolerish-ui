import { Skeleton } from "@bolerish/ui/skeleton";

export default function Default() {
  return (
    <div style={{ display: "grid", gap: "0.75rem", width: "100%", maxWidth: "24rem" }}>
      <Skeleton style={{ height: "1rem", width: "45%" }} />
      <Skeleton style={{ height: "2.25rem" }} />
    </div>
  );
}
