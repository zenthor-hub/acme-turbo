import type { ComponentProps } from "react";
import {
  createContext,
  use,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { XIcon } from "lucide-react";

import { Button } from "./button";

export const DialogContext = createContext<{
  setIsOpen: (v: boolean) => void;
  isOpen: boolean;
  id: string;
  wasOpened: boolean;
} | null>(null);

export const useDialog = () => {
  const context = use(DialogContext);
  if (!context)
    throw new Error("useDialog must be used within a Dialog component");
  return context;
};

export const Dialog = ({ children }: { children: React.ReactNode }) => {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [wasOpened, setWasOpened] = useState(false);
  const dialogData = useMemo(
    () => ({
      isOpen,
      setIsOpen: (v: boolean) => {
        setIsOpen(v);
        if (v) setWasOpened(true);
      },
      wasOpened,
      id,
    }),
    [isOpen, id, wasOpened],
  );
  return <DialogContext value={dialogData}>{children}</DialogContext>;
};

export const DialogTrigger = ({
  children,
  ...otherProps
}: Omit<
  Extract<ComponentProps<typeof Button>, { as?: "button" }>,
  "onClick"
>) => {
  const { isOpen, id, setIsOpen } = useDialog();
  return (
    <Button
      as="button"
      {...otherProps}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-controls={id}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(!isOpen);
      }}
      type="button"
    >
      {children}
    </Button>
  );
};

export const DialogContent = ({
  showCloseButton = true,
  ...props
}: { children: React.ReactNode; showCloseButton?: boolean } & (
  | { isOpen: boolean; setIsOpen: (v: boolean) => void }
  | { isOpen?: never; setIsOpen?: never }
)) => {
  const dialogData = use(DialogContext);
  const isOpen = props.isOpen ?? dialogData?.isOpen;
  const setIsOpen = props.setIsOpen ?? dialogData?.setIsOpen;
  if (isOpen === undefined || setIsOpen === undefined) {
    throw new Error(
      "DialogContent must be ether inside a <Dialog> or isOpen and setIsOpen must be provided",
    );
  }
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!dialogRef.current) return;
    dialogRef.current[isOpen ? "showModal" : "close"]();
  }, [isOpen]);
  return (
    <dialog
      id={dialogData?.id}
      ref={dialogRef}
      className="transition-allow-discrete backdrop:transition-allow-discrete starting:open:scale-95 starting:open:opacity-0 starting:open:backdrop:opacity-0 relative scale-95 overflow-visible bg-transparent opacity-0 transition-[display,overlay,opacity,transform] backdrop:bg-black backdrop:opacity-0 backdrop:transition-[display,overlay,opacity] open:scale-100 open:opacity-100 open:backdrop:opacity-50"
      onClick={(e) => {
        if ((e.target as HTMLElement).closest(".dialog-content") === null)
          setIsOpen(false);
      }}
    >
      {showCloseButton ? (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-6 top-6"
          onClick={() => setIsOpen(false)}
        >
          <XIcon className="size-6 text-gray-400" />
        </Button>
      ) : null}
      <div className="dialog-content max-h-[calc(100vh_-_5rem)] overflow-y-auto rounded-2xl bg-white p-6">
        {props.children}
      </div>
    </dialog>
  );
};
