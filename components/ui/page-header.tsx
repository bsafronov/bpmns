type Props = {
  title: string;
  description?: string;
};
export default function PageHeader({ title, description }: Props) {
  return (
    <div className="my-8 flex flex-col items-center">
      <h1 className="text-3xl font-semibold">{title}</h1>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
