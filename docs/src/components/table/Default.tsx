import { spacingVars, typo } from "@bolerish/tokens/semantic.stylex";
import {
  TableContainer,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@bolerish/ui/table";
import * as stylex from "@stylexjs/stylex";
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
});
const rows = [
  {
    name: "Brand guide",
    owner: "Minyeong",
    status: "Complete",
    updated: "Aug 28",
  },
  {
    name: "Mobile navigation",
    owner: "Jiwoo",
    status: "In review",
    updated: "Aug 27",
  },
  {
    name: "Payment screen",
    owner: "Seojun",
    status: "In progress",
    updated: "Aug 25",
  },
];
export default function Default() {
  return (
    <div {...stylex.props(layout.preview)}>
      <TableContainer>
        <Table>
          <TableCaption>Three recently updated projects</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.owner}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.updated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>All projects</TableCell>
              <TableCell>3</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
