interface CustomEvent<T = unknown> extends Event {
  readonly detail: T;
}