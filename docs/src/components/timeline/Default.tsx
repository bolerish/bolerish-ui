import { CheckIcon, ClockIcon, WarningIcon } from "@phosphor-icons/react";
import * as stylex from "@stylexjs/stylex";

import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineIndicator,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/timeline";
const layout = stylex.create({
  componentWidth: {
    maxWidth: "28rem",
    width: "100%",
  },
});
export default function Default() {
  return (
    <Timeline xstyle={layout.componentWidth}>
      <TimelineItem>
        <TimelineIndicator variant="complete">
          <CheckIcon aria-hidden="true" />
        </TimelineIndicator>
        <TimelineContent>
          <TimelineTitle>Order confirmed</TimelineTitle>
          <TimelineDescription>Your payment was approved.</TimelineDescription>
          <TimelineTime dateTime="2026-09-05T09:20:00Z">9:20 AM</TimelineTime>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineIndicator variant="active">
          <ClockIcon aria-hidden="true" />
        </TimelineIndicator>
        <TimelineContent>
          <TimelineTitle>Preparing shipment</TimelineTitle>
          <TimelineDescription>Your items are being packed.</TimelineDescription>
          <TimelineTime dateTime="2026-09-05T10:05:00Z">10:05 AM</TimelineTime>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineIndicator variant="error">
          <WarningIcon aria-hidden="true" />
        </TimelineIndicator>
        <TimelineContent>
          <TimelineTitle>Address needs review</TimelineTitle>
          <TimelineDescription>Update the delivery address to continue.</TimelineDescription>
          <TimelineTime dateTime="2026-09-05T10:24:00Z">10:24 AM</TimelineTime>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineIndicator />
        <TimelineContent>
          <TimelineTitle>Delivered</TimelineTitle>
          <TimelineDescription>The final delivery update will appear here.</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
