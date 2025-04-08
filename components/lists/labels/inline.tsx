import { Badge, Inline } from "@sanity/ui";

export function LabelsInline({ labels }: { labels: { name: string }[] }) {
  return (
    <Inline space={2}>
      {labels.map((label, index) => (
        <Badge key={index} tone="primary" paddingLeft={2} paddingRight={2}>{label.name}</Badge>
      ))}
    </Inline>
  );
}
