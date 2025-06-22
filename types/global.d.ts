interface CustomEvent<T = any> extends Event {
  readonly detail: T;
}