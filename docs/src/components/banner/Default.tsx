import { spacingVars, typographyVars } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { BannerDescription, BannerTitle, BannerContent, Banner } from "@/components/ui/banner";
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
  column: {
    alignItems: "stretch",
    flexDirection: "column",
  },
});
export default function Default() {
  return (
    <div {...stylex.props(layout.preview, layout.column)}>
      <Banner>
        <BannerContent>
          <BannerTitle>Update available</BannerTitle>
          <BannerDescription>A new version is ready to install.</BannerDescription>
        </BannerContent>
      </Banner>
      <Banner>
        <BannerContent>
          <BannerTitle>Your session expires soon</BannerTitle>
          <BannerDescription>You will be signed out automatically in 5 minutes.</BannerDescription>
        </BannerContent>
      </Banner>
      <Banner>
        <BannerContent>
          <BannerTitle>Couldn’t save changes</BannerTitle>
          <BannerDescription>Check your connection and try again.</BannerDescription>
        </BannerContent>
      </Banner>
      <Banner>
        <BannerContent>
          <BannerTitle>Scheduled maintenance</BannerTitle>
          <BannerDescription>
            The service will be unavailable for about 10 minutes starting at 11 PM.
          </BannerDescription>
        </BannerContent>
      </Banner>
    </div>
  );
}
