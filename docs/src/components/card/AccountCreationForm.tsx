import { spacingVars, typo } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
const layout = stylex.create({
  preview: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    fontSize: typo.fontSizeSm,
    gap: spacingVars.space3,
    lineHeight: typo.lineHeightNormal,
    justifyContent: "center",
    width: "100%",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space2,
  },
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space3,
  },
});
export default function AccountCreationForm() {
  return (
    <div {...stylex.props(layout.preview)}>
      <Card>
        <CardHeader>
          <CardTitle>Create account</CardTitle>
          <CardDescription>Enter the name and email you’ll use for the service.</CardDescription>
        </CardHeader>
        <CardContent>
          <form {...stylex.props(layout.stack)}>
            <label htmlFor="account-name" {...stylex.props(layout.field)}>
              Name
              <Input id="account-name" placeholder="Jordan Lee" />
            </label>
            <label htmlFor="account-email" {...stylex.props(layout.field)}>
              Email
              <Input id="account-email" type="email" placeholder="hello@example.com" />
            </label>
          </form>
        </CardContent>
        <CardFooter>
          <Button variant="ghost">Cancel</Button>
          <Button>Create account</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
