import { Button, Spinner } from "@sanity/ui";
import { ApiIcon, IconComponent } from "@sanity/icons";

export function ProcessStatusButton({
  loading,
  icon = ApiIcon,
  activeText,
  defaultText,
  disabled = false,
  onClick,
}: {
  loading: boolean;
  icon?: IconComponent;
  defaultText: string;
  activeText: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      iconRight={loading ? <Spinner muted style={{marginTop: 12}}/> : icon}
      text={loading ? activeText : defaultText}
      space={3}
      fontSize={4}
      justify={"space-between"}
    ></Button>
  );
}
