import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

type Props = React.ComponentPropsWithoutRef<typeof Dialog> & {
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  className?: string;
  classNames?: {
    header?: string;
    title?: string;
    description?: string;
    wrapper?: string;
    footer?: string;
  };
};

export function DialogController({
  children,
  description,
  title,
  trigger,
  footer,
  className,
  classNames,
  ...props
}: Props) {
  return (
    <Dialog {...props}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={classNames?.wrapper}>
        {(title ?? description) && (
          <DialogHeader className={classNames?.header}>
            {title && (
              <DialogTitle className={classNames?.title}>{title}</DialogTitle>
            )}
            {description && (
              <DialogDescription className={classNames?.description}>
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        )}
        <DialogBody className={className}>{children}</DialogBody>
        <DialogFooter className={classNames?.footer}>{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
