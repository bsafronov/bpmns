export {};

declare global {
  type ID = number;

  type Return<T> = NonNullable<Awaited<ReturnType<T>>>;
}
