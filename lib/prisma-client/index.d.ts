
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Theatre
 * 
 */
export type Theatre = $Result.DefaultSelection<Prisma.$TheatrePayload>
/**
 * Model TheatreImage
 * 
 */
export type TheatreImage = $Result.DefaultSelection<Prisma.$TheatreImagePayload>
/**
 * Model TheatreTag
 * 
 */
export type TheatreTag = $Result.DefaultSelection<Prisma.$TheatreTagPayload>
/**
 * Model Venue
 * 
 */
export type Venue = $Result.DefaultSelection<Prisma.$VenuePayload>
/**
 * Model VenueSection
 * 
 */
export type VenueSection = $Result.DefaultSelection<Prisma.$VenueSectionPayload>
/**
 * Model Seat
 * 
 */
export type Seat = $Result.DefaultSelection<Prisma.$SeatPayload>
/**
 * Model Event
 * 
 */
export type Event = $Result.DefaultSelection<Prisma.$EventPayload>
/**
 * Model Booking
 * 
 */
export type Booking = $Result.DefaultSelection<Prisma.$BookingPayload>
/**
 * Model BookedSeat
 * 
 */
export type BookedSeat = $Result.DefaultSelection<Prisma.$BookedSeatPayload>
/**
 * Model NewsArticle
 * 
 */
export type NewsArticle = $Result.DefaultSelection<Prisma.$NewsArticlePayload>
/**
 * Model AboutPage
 * 
 */
export type AboutPage = $Result.DefaultSelection<Prisma.$AboutPagePayload>
/**
 * Model ContactPage
 * 
 */
export type ContactPage = $Result.DefaultSelection<Prisma.$ContactPagePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const SectionType: {
  regular: 'regular',
  balcony: 'balcony'
};

export type SectionType = (typeof SectionType)[keyof typeof SectionType]


export const EventType: {
  performance: 'performance',
  workshop: 'workshop',
  discussion: 'discussion'
};

export type EventType = (typeof EventType)[keyof typeof EventType]


export const BookingStatus: {
  pending: 'pending',
  confirmed: 'confirmed',
  cancelled: 'cancelled'
};

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus]

}

export type SectionType = $Enums.SectionType

export const SectionType: typeof $Enums.SectionType

export type EventType = $Enums.EventType

export const EventType: typeof $Enums.EventType

export type BookingStatus = $Enums.BookingStatus

export const BookingStatus: typeof $Enums.BookingStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.theatre`: Exposes CRUD operations for the **Theatre** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Theatres
    * const theatres = await prisma.theatre.findMany()
    * ```
    */
  get theatre(): Prisma.TheatreDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.theatreImage`: Exposes CRUD operations for the **TheatreImage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TheatreImages
    * const theatreImages = await prisma.theatreImage.findMany()
    * ```
    */
  get theatreImage(): Prisma.TheatreImageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.theatreTag`: Exposes CRUD operations for the **TheatreTag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TheatreTags
    * const theatreTags = await prisma.theatreTag.findMany()
    * ```
    */
  get theatreTag(): Prisma.TheatreTagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.venue`: Exposes CRUD operations for the **Venue** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Venues
    * const venues = await prisma.venue.findMany()
    * ```
    */
  get venue(): Prisma.VenueDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.venueSection`: Exposes CRUD operations for the **VenueSection** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VenueSections
    * const venueSections = await prisma.venueSection.findMany()
    * ```
    */
  get venueSection(): Prisma.VenueSectionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.seat`: Exposes CRUD operations for the **Seat** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Seats
    * const seats = await prisma.seat.findMany()
    * ```
    */
  get seat(): Prisma.SeatDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.event`: Exposes CRUD operations for the **Event** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Events
    * const events = await prisma.event.findMany()
    * ```
    */
  get event(): Prisma.EventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.booking`: Exposes CRUD operations for the **Booking** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bookings
    * const bookings = await prisma.booking.findMany()
    * ```
    */
  get booking(): Prisma.BookingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bookedSeat`: Exposes CRUD operations for the **BookedSeat** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BookedSeats
    * const bookedSeats = await prisma.bookedSeat.findMany()
    * ```
    */
  get bookedSeat(): Prisma.BookedSeatDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.newsArticle`: Exposes CRUD operations for the **NewsArticle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NewsArticles
    * const newsArticles = await prisma.newsArticle.findMany()
    * ```
    */
  get newsArticle(): Prisma.NewsArticleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aboutPage`: Exposes CRUD operations for the **AboutPage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AboutPages
    * const aboutPages = await prisma.aboutPage.findMany()
    * ```
    */
  get aboutPage(): Prisma.AboutPageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.contactPage`: Exposes CRUD operations for the **ContactPage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ContactPages
    * const contactPages = await prisma.contactPage.findMany()
    * ```
    */
  get contactPage(): Prisma.ContactPageDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.13.0
   * Query Engine version: 361e86d0ea4987e9f53a565309b3eed797a6bcbd
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Theatre: 'Theatre',
    TheatreImage: 'TheatreImage',
    TheatreTag: 'TheatreTag',
    Venue: 'Venue',
    VenueSection: 'VenueSection',
    Seat: 'Seat',
    Event: 'Event',
    Booking: 'Booking',
    BookedSeat: 'BookedSeat',
    NewsArticle: 'NewsArticle',
    AboutPage: 'AboutPage',
    ContactPage: 'ContactPage'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "theatre" | "theatreImage" | "theatreTag" | "venue" | "venueSection" | "seat" | "event" | "booking" | "bookedSeat" | "newsArticle" | "aboutPage" | "contactPage"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Theatre: {
        payload: Prisma.$TheatrePayload<ExtArgs>
        fields: Prisma.TheatreFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TheatreFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TheatrePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TheatreFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TheatrePayload>
          }
          findFirst: {
            args: Prisma.TheatreFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TheatrePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TheatreFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TheatrePayload>
          }
          findMany: {
            args: Prisma.TheatreFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TheatrePayload>[]
          }
          create: {
            args: Prisma.TheatreCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TheatrePayload>
          }
          createMany: {
            args: Prisma.TheatreCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TheatreCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TheatrePayload>[]
          }
          delete: {
            args: Prisma.TheatreDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TheatrePayload>
          }
          update: {
            args: Prisma.TheatreUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TheatrePayload>
          }
          deleteMany: {
            args: Prisma.TheatreDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TheatreUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TheatreUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TheatrePayload>[]
          }
          upsert: {
            args: Prisma.TheatreUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TheatrePayload>
          }
          aggregate: {
            args: Prisma.TheatreAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTheatre>
          }
          groupBy: {
            args: Prisma.TheatreGroupByArgs<ExtArgs>
            result: $Utils.Optional<TheatreGroupByOutputType>[]
          }
          count: {
            args: Prisma.TheatreCountArgs<ExtArgs>
            result: $Utils.Optional<TheatreCountAggregateOutputType> | number
          }
        }
      }
      TheatreImage: {
        payload: Prisma.$TheatreImagePayload<ExtArgs>
        fields: Prisma.TheatreImageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TheatreImageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TheatreImagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TheatreImageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TheatreImagePayload>
          }
          findFirst: {
            args: Prisma.TheatreImageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TheatreImagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TheatreImageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TheatreImagePayload>
          }
          findMany: {
            args: Prisma.TheatreImageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TheatreImagePayload>[]
          }
          create: {
            args: Prisma.TheatreImageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TheatreImagePayload>
          }
          createMany: {
            args: Prisma.TheatreImageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TheatreImageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TheatreImagePayload>[]
          }
          delete: {
            args: Prisma.TheatreImageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TheatreImagePayload>
          }
          update: {
            args: Prisma.TheatreImageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TheatreImagePayload>
          }
          deleteMany: {
            args: Prisma.TheatreImageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TheatreImageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TheatreImageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TheatreImagePayload>[]
          }
          upsert: {
            args: Prisma.TheatreImageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TheatreImagePayload>
          }
          aggregate: {
            args: Prisma.TheatreImageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTheatreImage>
          }
          groupBy: {
            args: Prisma.TheatreImageGroupByArgs<ExtArgs>
            result: $Utils.Optional<TheatreImageGroupByOutputType>[]
          }
          count: {
            args: Prisma.TheatreImageCountArgs<ExtArgs>
            result: $Utils.Optional<TheatreImageCountAggregateOutputType> | number
          }
        }
      }
      TheatreTag: {
        payload: Prisma.$TheatreTagPayload<ExtArgs>
        fields: Prisma.TheatreTagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TheatreTagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TheatreTagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TheatreTagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TheatreTagPayload>
          }
          findFirst: {
            args: Prisma.TheatreTagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TheatreTagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TheatreTagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TheatreTagPayload>
          }
          findMany: {
            args: Prisma.TheatreTagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TheatreTagPayload>[]
          }
          create: {
            args: Prisma.TheatreTagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TheatreTagPayload>
          }
          createMany: {
            args: Prisma.TheatreTagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TheatreTagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TheatreTagPayload>[]
          }
          delete: {
            args: Prisma.TheatreTagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TheatreTagPayload>
          }
          update: {
            args: Prisma.TheatreTagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TheatreTagPayload>
          }
          deleteMany: {
            args: Prisma.TheatreTagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TheatreTagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TheatreTagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TheatreTagPayload>[]
          }
          upsert: {
            args: Prisma.TheatreTagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TheatreTagPayload>
          }
          aggregate: {
            args: Prisma.TheatreTagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTheatreTag>
          }
          groupBy: {
            args: Prisma.TheatreTagGroupByArgs<ExtArgs>
            result: $Utils.Optional<TheatreTagGroupByOutputType>[]
          }
          count: {
            args: Prisma.TheatreTagCountArgs<ExtArgs>
            result: $Utils.Optional<TheatreTagCountAggregateOutputType> | number
          }
        }
      }
      Venue: {
        payload: Prisma.$VenuePayload<ExtArgs>
        fields: Prisma.VenueFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VenueFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VenueFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>
          }
          findFirst: {
            args: Prisma.VenueFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VenueFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>
          }
          findMany: {
            args: Prisma.VenueFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>[]
          }
          create: {
            args: Prisma.VenueCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>
          }
          createMany: {
            args: Prisma.VenueCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VenueCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>[]
          }
          delete: {
            args: Prisma.VenueDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>
          }
          update: {
            args: Prisma.VenueUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>
          }
          deleteMany: {
            args: Prisma.VenueDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VenueUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VenueUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>[]
          }
          upsert: {
            args: Prisma.VenueUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>
          }
          aggregate: {
            args: Prisma.VenueAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVenue>
          }
          groupBy: {
            args: Prisma.VenueGroupByArgs<ExtArgs>
            result: $Utils.Optional<VenueGroupByOutputType>[]
          }
          count: {
            args: Prisma.VenueCountArgs<ExtArgs>
            result: $Utils.Optional<VenueCountAggregateOutputType> | number
          }
        }
      }
      VenueSection: {
        payload: Prisma.$VenueSectionPayload<ExtArgs>
        fields: Prisma.VenueSectionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VenueSectionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenueSectionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VenueSectionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenueSectionPayload>
          }
          findFirst: {
            args: Prisma.VenueSectionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenueSectionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VenueSectionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenueSectionPayload>
          }
          findMany: {
            args: Prisma.VenueSectionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenueSectionPayload>[]
          }
          create: {
            args: Prisma.VenueSectionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenueSectionPayload>
          }
          createMany: {
            args: Prisma.VenueSectionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VenueSectionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenueSectionPayload>[]
          }
          delete: {
            args: Prisma.VenueSectionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenueSectionPayload>
          }
          update: {
            args: Prisma.VenueSectionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenueSectionPayload>
          }
          deleteMany: {
            args: Prisma.VenueSectionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VenueSectionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VenueSectionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenueSectionPayload>[]
          }
          upsert: {
            args: Prisma.VenueSectionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenueSectionPayload>
          }
          aggregate: {
            args: Prisma.VenueSectionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVenueSection>
          }
          groupBy: {
            args: Prisma.VenueSectionGroupByArgs<ExtArgs>
            result: $Utils.Optional<VenueSectionGroupByOutputType>[]
          }
          count: {
            args: Prisma.VenueSectionCountArgs<ExtArgs>
            result: $Utils.Optional<VenueSectionCountAggregateOutputType> | number
          }
        }
      }
      Seat: {
        payload: Prisma.$SeatPayload<ExtArgs>
        fields: Prisma.SeatFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SeatFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SeatFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatPayload>
          }
          findFirst: {
            args: Prisma.SeatFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SeatFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatPayload>
          }
          findMany: {
            args: Prisma.SeatFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatPayload>[]
          }
          create: {
            args: Prisma.SeatCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatPayload>
          }
          createMany: {
            args: Prisma.SeatCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SeatCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatPayload>[]
          }
          delete: {
            args: Prisma.SeatDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatPayload>
          }
          update: {
            args: Prisma.SeatUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatPayload>
          }
          deleteMany: {
            args: Prisma.SeatDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SeatUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SeatUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatPayload>[]
          }
          upsert: {
            args: Prisma.SeatUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatPayload>
          }
          aggregate: {
            args: Prisma.SeatAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSeat>
          }
          groupBy: {
            args: Prisma.SeatGroupByArgs<ExtArgs>
            result: $Utils.Optional<SeatGroupByOutputType>[]
          }
          count: {
            args: Prisma.SeatCountArgs<ExtArgs>
            result: $Utils.Optional<SeatCountAggregateOutputType> | number
          }
        }
      }
      Event: {
        payload: Prisma.$EventPayload<ExtArgs>
        fields: Prisma.EventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findFirst: {
            args: Prisma.EventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findMany: {
            args: Prisma.EventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          create: {
            args: Prisma.EventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          createMany: {
            args: Prisma.EventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          delete: {
            args: Prisma.EventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          update: {
            args: Prisma.EventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          deleteMany: {
            args: Prisma.EventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          upsert: {
            args: Prisma.EventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          aggregate: {
            args: Prisma.EventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvent>
          }
          groupBy: {
            args: Prisma.EventGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventCountArgs<ExtArgs>
            result: $Utils.Optional<EventCountAggregateOutputType> | number
          }
        }
      }
      Booking: {
        payload: Prisma.$BookingPayload<ExtArgs>
        fields: Prisma.BookingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          findFirst: {
            args: Prisma.BookingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          findMany: {
            args: Prisma.BookingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          create: {
            args: Prisma.BookingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          createMany: {
            args: Prisma.BookingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BookingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          delete: {
            args: Prisma.BookingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          update: {
            args: Prisma.BookingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          deleteMany: {
            args: Prisma.BookingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BookingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          upsert: {
            args: Prisma.BookingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          aggregate: {
            args: Prisma.BookingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBooking>
          }
          groupBy: {
            args: Prisma.BookingGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookingGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookingCountArgs<ExtArgs>
            result: $Utils.Optional<BookingCountAggregateOutputType> | number
          }
        }
      }
      BookedSeat: {
        payload: Prisma.$BookedSeatPayload<ExtArgs>
        fields: Prisma.BookedSeatFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookedSeatFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookedSeatPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookedSeatFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookedSeatPayload>
          }
          findFirst: {
            args: Prisma.BookedSeatFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookedSeatPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookedSeatFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookedSeatPayload>
          }
          findMany: {
            args: Prisma.BookedSeatFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookedSeatPayload>[]
          }
          create: {
            args: Prisma.BookedSeatCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookedSeatPayload>
          }
          createMany: {
            args: Prisma.BookedSeatCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BookedSeatCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookedSeatPayload>[]
          }
          delete: {
            args: Prisma.BookedSeatDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookedSeatPayload>
          }
          update: {
            args: Prisma.BookedSeatUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookedSeatPayload>
          }
          deleteMany: {
            args: Prisma.BookedSeatDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookedSeatUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BookedSeatUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookedSeatPayload>[]
          }
          upsert: {
            args: Prisma.BookedSeatUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookedSeatPayload>
          }
          aggregate: {
            args: Prisma.BookedSeatAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBookedSeat>
          }
          groupBy: {
            args: Prisma.BookedSeatGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookedSeatGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookedSeatCountArgs<ExtArgs>
            result: $Utils.Optional<BookedSeatCountAggregateOutputType> | number
          }
        }
      }
      NewsArticle: {
        payload: Prisma.$NewsArticlePayload<ExtArgs>
        fields: Prisma.NewsArticleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NewsArticleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsArticlePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NewsArticleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsArticlePayload>
          }
          findFirst: {
            args: Prisma.NewsArticleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsArticlePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NewsArticleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsArticlePayload>
          }
          findMany: {
            args: Prisma.NewsArticleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsArticlePayload>[]
          }
          create: {
            args: Prisma.NewsArticleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsArticlePayload>
          }
          createMany: {
            args: Prisma.NewsArticleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NewsArticleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsArticlePayload>[]
          }
          delete: {
            args: Prisma.NewsArticleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsArticlePayload>
          }
          update: {
            args: Prisma.NewsArticleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsArticlePayload>
          }
          deleteMany: {
            args: Prisma.NewsArticleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NewsArticleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NewsArticleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsArticlePayload>[]
          }
          upsert: {
            args: Prisma.NewsArticleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsArticlePayload>
          }
          aggregate: {
            args: Prisma.NewsArticleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNewsArticle>
          }
          groupBy: {
            args: Prisma.NewsArticleGroupByArgs<ExtArgs>
            result: $Utils.Optional<NewsArticleGroupByOutputType>[]
          }
          count: {
            args: Prisma.NewsArticleCountArgs<ExtArgs>
            result: $Utils.Optional<NewsArticleCountAggregateOutputType> | number
          }
        }
      }
      AboutPage: {
        payload: Prisma.$AboutPagePayload<ExtArgs>
        fields: Prisma.AboutPageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AboutPageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AboutPagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AboutPageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AboutPagePayload>
          }
          findFirst: {
            args: Prisma.AboutPageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AboutPagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AboutPageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AboutPagePayload>
          }
          findMany: {
            args: Prisma.AboutPageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AboutPagePayload>[]
          }
          create: {
            args: Prisma.AboutPageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AboutPagePayload>
          }
          createMany: {
            args: Prisma.AboutPageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AboutPageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AboutPagePayload>[]
          }
          delete: {
            args: Prisma.AboutPageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AboutPagePayload>
          }
          update: {
            args: Prisma.AboutPageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AboutPagePayload>
          }
          deleteMany: {
            args: Prisma.AboutPageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AboutPageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AboutPageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AboutPagePayload>[]
          }
          upsert: {
            args: Prisma.AboutPageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AboutPagePayload>
          }
          aggregate: {
            args: Prisma.AboutPageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAboutPage>
          }
          groupBy: {
            args: Prisma.AboutPageGroupByArgs<ExtArgs>
            result: $Utils.Optional<AboutPageGroupByOutputType>[]
          }
          count: {
            args: Prisma.AboutPageCountArgs<ExtArgs>
            result: $Utils.Optional<AboutPageCountAggregateOutputType> | number
          }
        }
      }
      ContactPage: {
        payload: Prisma.$ContactPagePayload<ExtArgs>
        fields: Prisma.ContactPageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContactPageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContactPageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPagePayload>
          }
          findFirst: {
            args: Prisma.ContactPageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContactPageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPagePayload>
          }
          findMany: {
            args: Prisma.ContactPageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPagePayload>[]
          }
          create: {
            args: Prisma.ContactPageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPagePayload>
          }
          createMany: {
            args: Prisma.ContactPageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContactPageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPagePayload>[]
          }
          delete: {
            args: Prisma.ContactPageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPagePayload>
          }
          update: {
            args: Prisma.ContactPageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPagePayload>
          }
          deleteMany: {
            args: Prisma.ContactPageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContactPageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ContactPageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPagePayload>[]
          }
          upsert: {
            args: Prisma.ContactPageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPagePayload>
          }
          aggregate: {
            args: Prisma.ContactPageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContactPage>
          }
          groupBy: {
            args: Prisma.ContactPageGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContactPageGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContactPageCountArgs<ExtArgs>
            result: $Utils.Optional<ContactPageCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    theatre?: TheatreOmit
    theatreImage?: TheatreImageOmit
    theatreTag?: TheatreTagOmit
    venue?: VenueOmit
    venueSection?: VenueSectionOmit
    seat?: SeatOmit
    event?: EventOmit
    booking?: BookingOmit
    bookedSeat?: BookedSeatOmit
    newsArticle?: NewsArticleOmit
    aboutPage?: AboutPageOmit
    contactPage?: ContactPageOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    bookings: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | UserCountOutputTypeCountBookingsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }


  /**
   * Count Type TheatreCountOutputType
   */

  export type TheatreCountOutputType = {
    images: number
    tags: number
    events: number
  }

  export type TheatreCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    images?: boolean | TheatreCountOutputTypeCountImagesArgs
    tags?: boolean | TheatreCountOutputTypeCountTagsArgs
    events?: boolean | TheatreCountOutputTypeCountEventsArgs
  }

  // Custom InputTypes
  /**
   * TheatreCountOutputType without action
   */
  export type TheatreCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TheatreCountOutputType
     */
    select?: TheatreCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TheatreCountOutputType without action
   */
  export type TheatreCountOutputTypeCountImagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TheatreImageWhereInput
  }

  /**
   * TheatreCountOutputType without action
   */
  export type TheatreCountOutputTypeCountTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TheatreTagWhereInput
  }

  /**
   * TheatreCountOutputType without action
   */
  export type TheatreCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
  }


  /**
   * Count Type VenueCountOutputType
   */

  export type VenueCountOutputType = {
    sections: number
    events: number
  }

  export type VenueCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sections?: boolean | VenueCountOutputTypeCountSectionsArgs
    events?: boolean | VenueCountOutputTypeCountEventsArgs
  }

  // Custom InputTypes
  /**
   * VenueCountOutputType without action
   */
  export type VenueCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VenueCountOutputType
     */
    select?: VenueCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VenueCountOutputType without action
   */
  export type VenueCountOutputTypeCountSectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VenueSectionWhereInput
  }

  /**
   * VenueCountOutputType without action
   */
  export type VenueCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
  }


  /**
   * Count Type VenueSectionCountOutputType
   */

  export type VenueSectionCountOutputType = {
    seats: number
  }

  export type VenueSectionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    seats?: boolean | VenueSectionCountOutputTypeCountSeatsArgs
  }

  // Custom InputTypes
  /**
   * VenueSectionCountOutputType without action
   */
  export type VenueSectionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VenueSectionCountOutputType
     */
    select?: VenueSectionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VenueSectionCountOutputType without action
   */
  export type VenueSectionCountOutputTypeCountSeatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SeatWhereInput
  }


  /**
   * Count Type SeatCountOutputType
   */

  export type SeatCountOutputType = {
    booked_seats: number
  }

  export type SeatCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booked_seats?: boolean | SeatCountOutputTypeCountBooked_seatsArgs
  }

  // Custom InputTypes
  /**
   * SeatCountOutputType without action
   */
  export type SeatCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeatCountOutputType
     */
    select?: SeatCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SeatCountOutputType without action
   */
  export type SeatCountOutputTypeCountBooked_seatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookedSeatWhereInput
  }


  /**
   * Count Type EventCountOutputType
   */

  export type EventCountOutputType = {
    bookings: number
  }

  export type EventCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | EventCountOutputTypeCountBookingsArgs
  }

  // Custom InputTypes
  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCountOutputType
     */
    select?: EventCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }


  /**
   * Count Type BookingCountOutputType
   */

  export type BookingCountOutputType = {
    booked_seats: number
  }

  export type BookingCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booked_seats?: boolean | BookingCountOutputTypeCountBooked_seatsArgs
  }

  // Custom InputTypes
  /**
   * BookingCountOutputType without action
   */
  export type BookingCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingCountOutputType
     */
    select?: BookingCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BookingCountOutputType without action
   */
  export type BookingCountOutputTypeCountBooked_seatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookedSeatWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    password_hash: string | null
    first_name: string | null
    last_name: string | null
    phone: string | null
    is_admin: boolean | null
    email_notifications: boolean | null
    marketing_preferences: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    password_hash: string | null
    first_name: string | null
    last_name: string | null
    phone: string | null
    is_admin: boolean | null
    email_notifications: boolean | null
    marketing_preferences: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password_hash: number
    first_name: number
    last_name: number
    phone: number
    is_admin: number
    email_notifications: number
    marketing_preferences: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password_hash?: true
    first_name?: true
    last_name?: true
    phone?: true
    is_admin?: true
    email_notifications?: true
    marketing_preferences?: true
    created_at?: true
    updated_at?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password_hash?: true
    first_name?: true
    last_name?: true
    phone?: true
    is_admin?: true
    email_notifications?: true
    marketing_preferences?: true
    created_at?: true
    updated_at?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password_hash?: true
    first_name?: true
    last_name?: true
    phone?: true
    is_admin?: true
    email_notifications?: true
    marketing_preferences?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    password_hash: string
    first_name: string
    last_name: string
    phone: string | null
    is_admin: boolean
    email_notifications: boolean
    marketing_preferences: boolean
    created_at: Date
    updated_at: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password_hash?: boolean
    first_name?: boolean
    last_name?: boolean
    phone?: boolean
    is_admin?: boolean
    email_notifications?: boolean
    marketing_preferences?: boolean
    created_at?: boolean
    updated_at?: boolean
    bookings?: boolean | User$bookingsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password_hash?: boolean
    first_name?: boolean
    last_name?: boolean
    phone?: boolean
    is_admin?: boolean
    email_notifications?: boolean
    marketing_preferences?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password_hash?: boolean
    first_name?: boolean
    last_name?: boolean
    phone?: boolean
    is_admin?: boolean
    email_notifications?: boolean
    marketing_preferences?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password_hash?: boolean
    first_name?: boolean
    last_name?: boolean
    phone?: boolean
    is_admin?: boolean
    email_notifications?: boolean
    marketing_preferences?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password_hash" | "first_name" | "last_name" | "phone" | "is_admin" | "email_notifications" | "marketing_preferences" | "created_at" | "updated_at", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | User$bookingsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      bookings: Prisma.$BookingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      password_hash: string
      first_name: string
      last_name: string
      phone: string | null
      is_admin: boolean
      email_notifications: boolean
      marketing_preferences: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bookings<T extends User$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, User$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly password_hash: FieldRef<"User", 'String'>
    readonly first_name: FieldRef<"User", 'String'>
    readonly last_name: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly is_admin: FieldRef<"User", 'Boolean'>
    readonly email_notifications: FieldRef<"User", 'Boolean'>
    readonly marketing_preferences: FieldRef<"User", 'Boolean'>
    readonly created_at: FieldRef<"User", 'DateTime'>
    readonly updated_at: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.bookings
   */
  export type User$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    cursor?: BookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Theatre
   */

  export type AggregateTheatre = {
    _count: TheatreCountAggregateOutputType | null
    _avg: TheatreAvgAggregateOutputType | null
    _sum: TheatreSumAggregateOutputType | null
    _min: TheatreMinAggregateOutputType | null
    _max: TheatreMaxAggregateOutputType | null
  }

  export type TheatreAvgAggregateOutputType = {
    id: number | null
    founded_year: number | null
  }

  export type TheatreSumAggregateOutputType = {
    id: number | null
    founded_year: number | null
  }

  export type TheatreMinAggregateOutputType = {
    id: number | null
    name: string | null
    city: string | null
    country: string | null
    description: string | null
    history: string | null
    website: string | null
    founded_year: number | null
    content_language: string | null
    translation_group: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TheatreMaxAggregateOutputType = {
    id: number | null
    name: string | null
    city: string | null
    country: string | null
    description: string | null
    history: string | null
    website: string | null
    founded_year: number | null
    content_language: string | null
    translation_group: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TheatreCountAggregateOutputType = {
    id: number
    name: number
    city: number
    country: number
    description: number
    history: number
    website: number
    founded_year: number
    content_language: number
    translation_group: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type TheatreAvgAggregateInputType = {
    id?: true
    founded_year?: true
  }

  export type TheatreSumAggregateInputType = {
    id?: true
    founded_year?: true
  }

  export type TheatreMinAggregateInputType = {
    id?: true
    name?: true
    city?: true
    country?: true
    description?: true
    history?: true
    website?: true
    founded_year?: true
    content_language?: true
    translation_group?: true
    created_at?: true
    updated_at?: true
  }

  export type TheatreMaxAggregateInputType = {
    id?: true
    name?: true
    city?: true
    country?: true
    description?: true
    history?: true
    website?: true
    founded_year?: true
    content_language?: true
    translation_group?: true
    created_at?: true
    updated_at?: true
  }

  export type TheatreCountAggregateInputType = {
    id?: true
    name?: true
    city?: true
    country?: true
    description?: true
    history?: true
    website?: true
    founded_year?: true
    content_language?: true
    translation_group?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type TheatreAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Theatre to aggregate.
     */
    where?: TheatreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Theatres to fetch.
     */
    orderBy?: TheatreOrderByWithRelationInput | TheatreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TheatreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Theatres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Theatres.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Theatres
    **/
    _count?: true | TheatreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TheatreAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TheatreSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TheatreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TheatreMaxAggregateInputType
  }

  export type GetTheatreAggregateType<T extends TheatreAggregateArgs> = {
        [P in keyof T & keyof AggregateTheatre]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTheatre[P]>
      : GetScalarType<T[P], AggregateTheatre[P]>
  }




  export type TheatreGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TheatreWhereInput
    orderBy?: TheatreOrderByWithAggregationInput | TheatreOrderByWithAggregationInput[]
    by: TheatreScalarFieldEnum[] | TheatreScalarFieldEnum
    having?: TheatreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TheatreCountAggregateInputType | true
    _avg?: TheatreAvgAggregateInputType
    _sum?: TheatreSumAggregateInputType
    _min?: TheatreMinAggregateInputType
    _max?: TheatreMaxAggregateInputType
  }

  export type TheatreGroupByOutputType = {
    id: number
    name: string
    city: string
    country: string
    description: string | null
    history: string | null
    website: string | null
    founded_year: number | null
    content_language: string
    translation_group: string | null
    created_at: Date
    updated_at: Date
    _count: TheatreCountAggregateOutputType | null
    _avg: TheatreAvgAggregateOutputType | null
    _sum: TheatreSumAggregateOutputType | null
    _min: TheatreMinAggregateOutputType | null
    _max: TheatreMaxAggregateOutputType | null
  }

  type GetTheatreGroupByPayload<T extends TheatreGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TheatreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TheatreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TheatreGroupByOutputType[P]>
            : GetScalarType<T[P], TheatreGroupByOutputType[P]>
        }
      >
    >


  export type TheatreSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    city?: boolean
    country?: boolean
    description?: boolean
    history?: boolean
    website?: boolean
    founded_year?: boolean
    content_language?: boolean
    translation_group?: boolean
    created_at?: boolean
    updated_at?: boolean
    images?: boolean | Theatre$imagesArgs<ExtArgs>
    tags?: boolean | Theatre$tagsArgs<ExtArgs>
    events?: boolean | Theatre$eventsArgs<ExtArgs>
    _count?: boolean | TheatreCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["theatre"]>

  export type TheatreSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    city?: boolean
    country?: boolean
    description?: boolean
    history?: boolean
    website?: boolean
    founded_year?: boolean
    content_language?: boolean
    translation_group?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["theatre"]>

  export type TheatreSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    city?: boolean
    country?: boolean
    description?: boolean
    history?: boolean
    website?: boolean
    founded_year?: boolean
    content_language?: boolean
    translation_group?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["theatre"]>

  export type TheatreSelectScalar = {
    id?: boolean
    name?: boolean
    city?: boolean
    country?: boolean
    description?: boolean
    history?: boolean
    website?: boolean
    founded_year?: boolean
    content_language?: boolean
    translation_group?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type TheatreOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "city" | "country" | "description" | "history" | "website" | "founded_year" | "content_language" | "translation_group" | "created_at" | "updated_at", ExtArgs["result"]["theatre"]>
  export type TheatreInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    images?: boolean | Theatre$imagesArgs<ExtArgs>
    tags?: boolean | Theatre$tagsArgs<ExtArgs>
    events?: boolean | Theatre$eventsArgs<ExtArgs>
    _count?: boolean | TheatreCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TheatreIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TheatreIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TheatrePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Theatre"
    objects: {
      images: Prisma.$TheatreImagePayload<ExtArgs>[]
      tags: Prisma.$TheatreTagPayload<ExtArgs>[]
      events: Prisma.$EventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      city: string
      country: string
      description: string | null
      history: string | null
      website: string | null
      founded_year: number | null
      content_language: string
      translation_group: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["theatre"]>
    composites: {}
  }

  type TheatreGetPayload<S extends boolean | null | undefined | TheatreDefaultArgs> = $Result.GetResult<Prisma.$TheatrePayload, S>

  type TheatreCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TheatreFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TheatreCountAggregateInputType | true
    }

  export interface TheatreDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Theatre'], meta: { name: 'Theatre' } }
    /**
     * Find zero or one Theatre that matches the filter.
     * @param {TheatreFindUniqueArgs} args - Arguments to find a Theatre
     * @example
     * // Get one Theatre
     * const theatre = await prisma.theatre.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TheatreFindUniqueArgs>(args: SelectSubset<T, TheatreFindUniqueArgs<ExtArgs>>): Prisma__TheatreClient<$Result.GetResult<Prisma.$TheatrePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Theatre that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TheatreFindUniqueOrThrowArgs} args - Arguments to find a Theatre
     * @example
     * // Get one Theatre
     * const theatre = await prisma.theatre.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TheatreFindUniqueOrThrowArgs>(args: SelectSubset<T, TheatreFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TheatreClient<$Result.GetResult<Prisma.$TheatrePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Theatre that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TheatreFindFirstArgs} args - Arguments to find a Theatre
     * @example
     * // Get one Theatre
     * const theatre = await prisma.theatre.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TheatreFindFirstArgs>(args?: SelectSubset<T, TheatreFindFirstArgs<ExtArgs>>): Prisma__TheatreClient<$Result.GetResult<Prisma.$TheatrePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Theatre that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TheatreFindFirstOrThrowArgs} args - Arguments to find a Theatre
     * @example
     * // Get one Theatre
     * const theatre = await prisma.theatre.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TheatreFindFirstOrThrowArgs>(args?: SelectSubset<T, TheatreFindFirstOrThrowArgs<ExtArgs>>): Prisma__TheatreClient<$Result.GetResult<Prisma.$TheatrePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Theatres that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TheatreFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Theatres
     * const theatres = await prisma.theatre.findMany()
     * 
     * // Get first 10 Theatres
     * const theatres = await prisma.theatre.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const theatreWithIdOnly = await prisma.theatre.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TheatreFindManyArgs>(args?: SelectSubset<T, TheatreFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TheatrePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Theatre.
     * @param {TheatreCreateArgs} args - Arguments to create a Theatre.
     * @example
     * // Create one Theatre
     * const Theatre = await prisma.theatre.create({
     *   data: {
     *     // ... data to create a Theatre
     *   }
     * })
     * 
     */
    create<T extends TheatreCreateArgs>(args: SelectSubset<T, TheatreCreateArgs<ExtArgs>>): Prisma__TheatreClient<$Result.GetResult<Prisma.$TheatrePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Theatres.
     * @param {TheatreCreateManyArgs} args - Arguments to create many Theatres.
     * @example
     * // Create many Theatres
     * const theatre = await prisma.theatre.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TheatreCreateManyArgs>(args?: SelectSubset<T, TheatreCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Theatres and returns the data saved in the database.
     * @param {TheatreCreateManyAndReturnArgs} args - Arguments to create many Theatres.
     * @example
     * // Create many Theatres
     * const theatre = await prisma.theatre.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Theatres and only return the `id`
     * const theatreWithIdOnly = await prisma.theatre.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TheatreCreateManyAndReturnArgs>(args?: SelectSubset<T, TheatreCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TheatrePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Theatre.
     * @param {TheatreDeleteArgs} args - Arguments to delete one Theatre.
     * @example
     * // Delete one Theatre
     * const Theatre = await prisma.theatre.delete({
     *   where: {
     *     // ... filter to delete one Theatre
     *   }
     * })
     * 
     */
    delete<T extends TheatreDeleteArgs>(args: SelectSubset<T, TheatreDeleteArgs<ExtArgs>>): Prisma__TheatreClient<$Result.GetResult<Prisma.$TheatrePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Theatre.
     * @param {TheatreUpdateArgs} args - Arguments to update one Theatre.
     * @example
     * // Update one Theatre
     * const theatre = await prisma.theatre.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TheatreUpdateArgs>(args: SelectSubset<T, TheatreUpdateArgs<ExtArgs>>): Prisma__TheatreClient<$Result.GetResult<Prisma.$TheatrePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Theatres.
     * @param {TheatreDeleteManyArgs} args - Arguments to filter Theatres to delete.
     * @example
     * // Delete a few Theatres
     * const { count } = await prisma.theatre.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TheatreDeleteManyArgs>(args?: SelectSubset<T, TheatreDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Theatres.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TheatreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Theatres
     * const theatre = await prisma.theatre.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TheatreUpdateManyArgs>(args: SelectSubset<T, TheatreUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Theatres and returns the data updated in the database.
     * @param {TheatreUpdateManyAndReturnArgs} args - Arguments to update many Theatres.
     * @example
     * // Update many Theatres
     * const theatre = await prisma.theatre.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Theatres and only return the `id`
     * const theatreWithIdOnly = await prisma.theatre.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TheatreUpdateManyAndReturnArgs>(args: SelectSubset<T, TheatreUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TheatrePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Theatre.
     * @param {TheatreUpsertArgs} args - Arguments to update or create a Theatre.
     * @example
     * // Update or create a Theatre
     * const theatre = await prisma.theatre.upsert({
     *   create: {
     *     // ... data to create a Theatre
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Theatre we want to update
     *   }
     * })
     */
    upsert<T extends TheatreUpsertArgs>(args: SelectSubset<T, TheatreUpsertArgs<ExtArgs>>): Prisma__TheatreClient<$Result.GetResult<Prisma.$TheatrePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Theatres.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TheatreCountArgs} args - Arguments to filter Theatres to count.
     * @example
     * // Count the number of Theatres
     * const count = await prisma.theatre.count({
     *   where: {
     *     // ... the filter for the Theatres we want to count
     *   }
     * })
    **/
    count<T extends TheatreCountArgs>(
      args?: Subset<T, TheatreCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TheatreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Theatre.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TheatreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TheatreAggregateArgs>(args: Subset<T, TheatreAggregateArgs>): Prisma.PrismaPromise<GetTheatreAggregateType<T>>

    /**
     * Group by Theatre.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TheatreGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TheatreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TheatreGroupByArgs['orderBy'] }
        : { orderBy?: TheatreGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TheatreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTheatreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Theatre model
   */
  readonly fields: TheatreFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Theatre.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TheatreClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    images<T extends Theatre$imagesArgs<ExtArgs> = {}>(args?: Subset<T, Theatre$imagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TheatreImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tags<T extends Theatre$tagsArgs<ExtArgs> = {}>(args?: Subset<T, Theatre$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TheatreTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    events<T extends Theatre$eventsArgs<ExtArgs> = {}>(args?: Subset<T, Theatre$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Theatre model
   */
  interface TheatreFieldRefs {
    readonly id: FieldRef<"Theatre", 'Int'>
    readonly name: FieldRef<"Theatre", 'String'>
    readonly city: FieldRef<"Theatre", 'String'>
    readonly country: FieldRef<"Theatre", 'String'>
    readonly description: FieldRef<"Theatre", 'String'>
    readonly history: FieldRef<"Theatre", 'String'>
    readonly website: FieldRef<"Theatre", 'String'>
    readonly founded_year: FieldRef<"Theatre", 'Int'>
    readonly content_language: FieldRef<"Theatre", 'String'>
    readonly translation_group: FieldRef<"Theatre", 'String'>
    readonly created_at: FieldRef<"Theatre", 'DateTime'>
    readonly updated_at: FieldRef<"Theatre", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Theatre findUnique
   */
  export type TheatreFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theatre
     */
    select?: TheatreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Theatre
     */
    omit?: TheatreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TheatreInclude<ExtArgs> | null
    /**
     * Filter, which Theatre to fetch.
     */
    where: TheatreWhereUniqueInput
  }

  /**
   * Theatre findUniqueOrThrow
   */
  export type TheatreFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theatre
     */
    select?: TheatreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Theatre
     */
    omit?: TheatreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TheatreInclude<ExtArgs> | null
    /**
     * Filter, which Theatre to fetch.
     */
    where: TheatreWhereUniqueInput
  }

  /**
   * Theatre findFirst
   */
  export type TheatreFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theatre
     */
    select?: TheatreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Theatre
     */
    omit?: TheatreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TheatreInclude<ExtArgs> | null
    /**
     * Filter, which Theatre to fetch.
     */
    where?: TheatreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Theatres to fetch.
     */
    orderBy?: TheatreOrderByWithRelationInput | TheatreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Theatres.
     */
    cursor?: TheatreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Theatres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Theatres.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Theatres.
     */
    distinct?: TheatreScalarFieldEnum | TheatreScalarFieldEnum[]
  }

  /**
   * Theatre findFirstOrThrow
   */
  export type TheatreFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theatre
     */
    select?: TheatreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Theatre
     */
    omit?: TheatreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TheatreInclude<ExtArgs> | null
    /**
     * Filter, which Theatre to fetch.
     */
    where?: TheatreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Theatres to fetch.
     */
    orderBy?: TheatreOrderByWithRelationInput | TheatreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Theatres.
     */
    cursor?: TheatreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Theatres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Theatres.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Theatres.
     */
    distinct?: TheatreScalarFieldEnum | TheatreScalarFieldEnum[]
  }

  /**
   * Theatre findMany
   */
  export type TheatreFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theatre
     */
    select?: TheatreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Theatre
     */
    omit?: TheatreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TheatreInclude<ExtArgs> | null
    /**
     * Filter, which Theatres to fetch.
     */
    where?: TheatreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Theatres to fetch.
     */
    orderBy?: TheatreOrderByWithRelationInput | TheatreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Theatres.
     */
    cursor?: TheatreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Theatres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Theatres.
     */
    skip?: number
    distinct?: TheatreScalarFieldEnum | TheatreScalarFieldEnum[]
  }

  /**
   * Theatre create
   */
  export type TheatreCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theatre
     */
    select?: TheatreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Theatre
     */
    omit?: TheatreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TheatreInclude<ExtArgs> | null
    /**
     * The data needed to create a Theatre.
     */
    data: XOR<TheatreCreateInput, TheatreUncheckedCreateInput>
  }

  /**
   * Theatre createMany
   */
  export type TheatreCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Theatres.
     */
    data: TheatreCreateManyInput | TheatreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Theatre createManyAndReturn
   */
  export type TheatreCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theatre
     */
    select?: TheatreSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Theatre
     */
    omit?: TheatreOmit<ExtArgs> | null
    /**
     * The data used to create many Theatres.
     */
    data: TheatreCreateManyInput | TheatreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Theatre update
   */
  export type TheatreUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theatre
     */
    select?: TheatreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Theatre
     */
    omit?: TheatreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TheatreInclude<ExtArgs> | null
    /**
     * The data needed to update a Theatre.
     */
    data: XOR<TheatreUpdateInput, TheatreUncheckedUpdateInput>
    /**
     * Choose, which Theatre to update.
     */
    where: TheatreWhereUniqueInput
  }

  /**
   * Theatre updateMany
   */
  export type TheatreUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Theatres.
     */
    data: XOR<TheatreUpdateManyMutationInput, TheatreUncheckedUpdateManyInput>
    /**
     * Filter which Theatres to update
     */
    where?: TheatreWhereInput
    /**
     * Limit how many Theatres to update.
     */
    limit?: number
  }

  /**
   * Theatre updateManyAndReturn
   */
  export type TheatreUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theatre
     */
    select?: TheatreSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Theatre
     */
    omit?: TheatreOmit<ExtArgs> | null
    /**
     * The data used to update Theatres.
     */
    data: XOR<TheatreUpdateManyMutationInput, TheatreUncheckedUpdateManyInput>
    /**
     * Filter which Theatres to update
     */
    where?: TheatreWhereInput
    /**
     * Limit how many Theatres to update.
     */
    limit?: number
  }

  /**
   * Theatre upsert
   */
  export type TheatreUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theatre
     */
    select?: TheatreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Theatre
     */
    omit?: TheatreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TheatreInclude<ExtArgs> | null
    /**
     * The filter to search for the Theatre to update in case it exists.
     */
    where: TheatreWhereUniqueInput
    /**
     * In case the Theatre found by the `where` argument doesn't exist, create a new Theatre with this data.
     */
    create: XOR<TheatreCreateInput, TheatreUncheckedCreateInput>
    /**
     * In case the Theatre was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TheatreUpdateInput, TheatreUncheckedUpdateInput>
  }

  /**
   * Theatre delete
   */
  export type TheatreDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theatre
     */
    select?: TheatreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Theatre
     */
    omit?: TheatreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TheatreInclude<ExtArgs> | null
    /**
     * Filter which Theatre to delete.
     */
    where: TheatreWhereUniqueInput
  }

  /**
   * Theatre deleteMany
   */
  export type TheatreDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Theatres to delete
     */
    where?: TheatreWhereInput
    /**
     * Limit how many Theatres to delete.
     */
    limit?: number
  }

  /**
   * Theatre.images
   */
  export type Theatre$imagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TheatreImage
     */
    select?: TheatreImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TheatreImage
     */
    omit?: TheatreImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TheatreImageInclude<ExtArgs> | null
    where?: TheatreImageWhereInput
    orderBy?: TheatreImageOrderByWithRelationInput | TheatreImageOrderByWithRelationInput[]
    cursor?: TheatreImageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TheatreImageScalarFieldEnum | TheatreImageScalarFieldEnum[]
  }

  /**
   * Theatre.tags
   */
  export type Theatre$tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TheatreTag
     */
    select?: TheatreTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TheatreTag
     */
    omit?: TheatreTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TheatreTagInclude<ExtArgs> | null
    where?: TheatreTagWhereInput
    orderBy?: TheatreTagOrderByWithRelationInput | TheatreTagOrderByWithRelationInput[]
    cursor?: TheatreTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TheatreTagScalarFieldEnum | TheatreTagScalarFieldEnum[]
  }

  /**
   * Theatre.events
   */
  export type Theatre$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    where?: EventWhereInput
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    cursor?: EventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Theatre without action
   */
  export type TheatreDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theatre
     */
    select?: TheatreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Theatre
     */
    omit?: TheatreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TheatreInclude<ExtArgs> | null
  }


  /**
   * Model TheatreImage
   */

  export type AggregateTheatreImage = {
    _count: TheatreImageCountAggregateOutputType | null
    _avg: TheatreImageAvgAggregateOutputType | null
    _sum: TheatreImageSumAggregateOutputType | null
    _min: TheatreImageMinAggregateOutputType | null
    _max: TheatreImageMaxAggregateOutputType | null
  }

  export type TheatreImageAvgAggregateOutputType = {
    id: number | null
    theatre_id: number | null
  }

  export type TheatreImageSumAggregateOutputType = {
    id: number | null
    theatre_id: number | null
  }

  export type TheatreImageMinAggregateOutputType = {
    id: number | null
    theatre_id: number | null
    image_url: string | null
    caption: string | null
    is_primary: boolean | null
    created_at: Date | null
  }

  export type TheatreImageMaxAggregateOutputType = {
    id: number | null
    theatre_id: number | null
    image_url: string | null
    caption: string | null
    is_primary: boolean | null
    created_at: Date | null
  }

  export type TheatreImageCountAggregateOutputType = {
    id: number
    theatre_id: number
    image_url: number
    caption: number
    is_primary: number
    created_at: number
    _all: number
  }


  export type TheatreImageAvgAggregateInputType = {
    id?: true
    theatre_id?: true
  }

  export type TheatreImageSumAggregateInputType = {
    id?: true
    theatre_id?: true
  }

  export type TheatreImageMinAggregateInputType = {
    id?: true
    theatre_id?: true
    image_url?: true
    caption?: true
    is_primary?: true
    created_at?: true
  }

  export type TheatreImageMaxAggregateInputType = {
    id?: true
    theatre_id?: true
    image_url?: true
    caption?: true
    is_primary?: true
    created_at?: true
  }

  export type TheatreImageCountAggregateInputType = {
    id?: true
    theatre_id?: true
    image_url?: true
    caption?: true
    is_primary?: true
    created_at?: true
    _all?: true
  }

  export type TheatreImageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TheatreImage to aggregate.
     */
    where?: TheatreImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TheatreImages to fetch.
     */
    orderBy?: TheatreImageOrderByWithRelationInput | TheatreImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TheatreImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TheatreImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TheatreImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TheatreImages
    **/
    _count?: true | TheatreImageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TheatreImageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TheatreImageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TheatreImageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TheatreImageMaxAggregateInputType
  }

  export type GetTheatreImageAggregateType<T extends TheatreImageAggregateArgs> = {
        [P in keyof T & keyof AggregateTheatreImage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTheatreImage[P]>
      : GetScalarType<T[P], AggregateTheatreImage[P]>
  }




  export type TheatreImageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TheatreImageWhereInput
    orderBy?: TheatreImageOrderByWithAggregationInput | TheatreImageOrderByWithAggregationInput[]
    by: TheatreImageScalarFieldEnum[] | TheatreImageScalarFieldEnum
    having?: TheatreImageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TheatreImageCountAggregateInputType | true
    _avg?: TheatreImageAvgAggregateInputType
    _sum?: TheatreImageSumAggregateInputType
    _min?: TheatreImageMinAggregateInputType
    _max?: TheatreImageMaxAggregateInputType
  }

  export type TheatreImageGroupByOutputType = {
    id: number
    theatre_id: number
    image_url: string
    caption: string | null
    is_primary: boolean
    created_at: Date
    _count: TheatreImageCountAggregateOutputType | null
    _avg: TheatreImageAvgAggregateOutputType | null
    _sum: TheatreImageSumAggregateOutputType | null
    _min: TheatreImageMinAggregateOutputType | null
    _max: TheatreImageMaxAggregateOutputType | null
  }

  type GetTheatreImageGroupByPayload<T extends TheatreImageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TheatreImageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TheatreImageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TheatreImageGroupByOutputType[P]>
            : GetScalarType<T[P], TheatreImageGroupByOutputType[P]>
        }
      >
    >


  export type TheatreImageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    theatre_id?: boolean
    image_url?: boolean
    caption?: boolean
    is_primary?: boolean
    created_at?: boolean
    theatre?: boolean | TheatreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["theatreImage"]>

  export type TheatreImageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    theatre_id?: boolean
    image_url?: boolean
    caption?: boolean
    is_primary?: boolean
    created_at?: boolean
    theatre?: boolean | TheatreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["theatreImage"]>

  export type TheatreImageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    theatre_id?: boolean
    image_url?: boolean
    caption?: boolean
    is_primary?: boolean
    created_at?: boolean
    theatre?: boolean | TheatreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["theatreImage"]>

  export type TheatreImageSelectScalar = {
    id?: boolean
    theatre_id?: boolean
    image_url?: boolean
    caption?: boolean
    is_primary?: boolean
    created_at?: boolean
  }

  export type TheatreImageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "theatre_id" | "image_url" | "caption" | "is_primary" | "created_at", ExtArgs["result"]["theatreImage"]>
  export type TheatreImageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    theatre?: boolean | TheatreDefaultArgs<ExtArgs>
  }
  export type TheatreImageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    theatre?: boolean | TheatreDefaultArgs<ExtArgs>
  }
  export type TheatreImageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    theatre?: boolean | TheatreDefaultArgs<ExtArgs>
  }

  export type $TheatreImagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TheatreImage"
    objects: {
      theatre: Prisma.$TheatrePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      theatre_id: number
      image_url: string
      caption: string | null
      is_primary: boolean
      created_at: Date
    }, ExtArgs["result"]["theatreImage"]>
    composites: {}
  }

  type TheatreImageGetPayload<S extends boolean | null | undefined | TheatreImageDefaultArgs> = $Result.GetResult<Prisma.$TheatreImagePayload, S>

  type TheatreImageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TheatreImageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TheatreImageCountAggregateInputType | true
    }

  export interface TheatreImageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TheatreImage'], meta: { name: 'TheatreImage' } }
    /**
     * Find zero or one TheatreImage that matches the filter.
     * @param {TheatreImageFindUniqueArgs} args - Arguments to find a TheatreImage
     * @example
     * // Get one TheatreImage
     * const theatreImage = await prisma.theatreImage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TheatreImageFindUniqueArgs>(args: SelectSubset<T, TheatreImageFindUniqueArgs<ExtArgs>>): Prisma__TheatreImageClient<$Result.GetResult<Prisma.$TheatreImagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TheatreImage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TheatreImageFindUniqueOrThrowArgs} args - Arguments to find a TheatreImage
     * @example
     * // Get one TheatreImage
     * const theatreImage = await prisma.theatreImage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TheatreImageFindUniqueOrThrowArgs>(args: SelectSubset<T, TheatreImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TheatreImageClient<$Result.GetResult<Prisma.$TheatreImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TheatreImage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TheatreImageFindFirstArgs} args - Arguments to find a TheatreImage
     * @example
     * // Get one TheatreImage
     * const theatreImage = await prisma.theatreImage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TheatreImageFindFirstArgs>(args?: SelectSubset<T, TheatreImageFindFirstArgs<ExtArgs>>): Prisma__TheatreImageClient<$Result.GetResult<Prisma.$TheatreImagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TheatreImage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TheatreImageFindFirstOrThrowArgs} args - Arguments to find a TheatreImage
     * @example
     * // Get one TheatreImage
     * const theatreImage = await prisma.theatreImage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TheatreImageFindFirstOrThrowArgs>(args?: SelectSubset<T, TheatreImageFindFirstOrThrowArgs<ExtArgs>>): Prisma__TheatreImageClient<$Result.GetResult<Prisma.$TheatreImagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TheatreImages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TheatreImageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TheatreImages
     * const theatreImages = await prisma.theatreImage.findMany()
     * 
     * // Get first 10 TheatreImages
     * const theatreImages = await prisma.theatreImage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const theatreImageWithIdOnly = await prisma.theatreImage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TheatreImageFindManyArgs>(args?: SelectSubset<T, TheatreImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TheatreImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TheatreImage.
     * @param {TheatreImageCreateArgs} args - Arguments to create a TheatreImage.
     * @example
     * // Create one TheatreImage
     * const TheatreImage = await prisma.theatreImage.create({
     *   data: {
     *     // ... data to create a TheatreImage
     *   }
     * })
     * 
     */
    create<T extends TheatreImageCreateArgs>(args: SelectSubset<T, TheatreImageCreateArgs<ExtArgs>>): Prisma__TheatreImageClient<$Result.GetResult<Prisma.$TheatreImagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TheatreImages.
     * @param {TheatreImageCreateManyArgs} args - Arguments to create many TheatreImages.
     * @example
     * // Create many TheatreImages
     * const theatreImage = await prisma.theatreImage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TheatreImageCreateManyArgs>(args?: SelectSubset<T, TheatreImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TheatreImages and returns the data saved in the database.
     * @param {TheatreImageCreateManyAndReturnArgs} args - Arguments to create many TheatreImages.
     * @example
     * // Create many TheatreImages
     * const theatreImage = await prisma.theatreImage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TheatreImages and only return the `id`
     * const theatreImageWithIdOnly = await prisma.theatreImage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TheatreImageCreateManyAndReturnArgs>(args?: SelectSubset<T, TheatreImageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TheatreImagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TheatreImage.
     * @param {TheatreImageDeleteArgs} args - Arguments to delete one TheatreImage.
     * @example
     * // Delete one TheatreImage
     * const TheatreImage = await prisma.theatreImage.delete({
     *   where: {
     *     // ... filter to delete one TheatreImage
     *   }
     * })
     * 
     */
    delete<T extends TheatreImageDeleteArgs>(args: SelectSubset<T, TheatreImageDeleteArgs<ExtArgs>>): Prisma__TheatreImageClient<$Result.GetResult<Prisma.$TheatreImagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TheatreImage.
     * @param {TheatreImageUpdateArgs} args - Arguments to update one TheatreImage.
     * @example
     * // Update one TheatreImage
     * const theatreImage = await prisma.theatreImage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TheatreImageUpdateArgs>(args: SelectSubset<T, TheatreImageUpdateArgs<ExtArgs>>): Prisma__TheatreImageClient<$Result.GetResult<Prisma.$TheatreImagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TheatreImages.
     * @param {TheatreImageDeleteManyArgs} args - Arguments to filter TheatreImages to delete.
     * @example
     * // Delete a few TheatreImages
     * const { count } = await prisma.theatreImage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TheatreImageDeleteManyArgs>(args?: SelectSubset<T, TheatreImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TheatreImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TheatreImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TheatreImages
     * const theatreImage = await prisma.theatreImage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TheatreImageUpdateManyArgs>(args: SelectSubset<T, TheatreImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TheatreImages and returns the data updated in the database.
     * @param {TheatreImageUpdateManyAndReturnArgs} args - Arguments to update many TheatreImages.
     * @example
     * // Update many TheatreImages
     * const theatreImage = await prisma.theatreImage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TheatreImages and only return the `id`
     * const theatreImageWithIdOnly = await prisma.theatreImage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TheatreImageUpdateManyAndReturnArgs>(args: SelectSubset<T, TheatreImageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TheatreImagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TheatreImage.
     * @param {TheatreImageUpsertArgs} args - Arguments to update or create a TheatreImage.
     * @example
     * // Update or create a TheatreImage
     * const theatreImage = await prisma.theatreImage.upsert({
     *   create: {
     *     // ... data to create a TheatreImage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TheatreImage we want to update
     *   }
     * })
     */
    upsert<T extends TheatreImageUpsertArgs>(args: SelectSubset<T, TheatreImageUpsertArgs<ExtArgs>>): Prisma__TheatreImageClient<$Result.GetResult<Prisma.$TheatreImagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TheatreImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TheatreImageCountArgs} args - Arguments to filter TheatreImages to count.
     * @example
     * // Count the number of TheatreImages
     * const count = await prisma.theatreImage.count({
     *   where: {
     *     // ... the filter for the TheatreImages we want to count
     *   }
     * })
    **/
    count<T extends TheatreImageCountArgs>(
      args?: Subset<T, TheatreImageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TheatreImageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TheatreImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TheatreImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TheatreImageAggregateArgs>(args: Subset<T, TheatreImageAggregateArgs>): Prisma.PrismaPromise<GetTheatreImageAggregateType<T>>

    /**
     * Group by TheatreImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TheatreImageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TheatreImageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TheatreImageGroupByArgs['orderBy'] }
        : { orderBy?: TheatreImageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TheatreImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTheatreImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TheatreImage model
   */
  readonly fields: TheatreImageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TheatreImage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TheatreImageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    theatre<T extends TheatreDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TheatreDefaultArgs<ExtArgs>>): Prisma__TheatreClient<$Result.GetResult<Prisma.$TheatrePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TheatreImage model
   */
  interface TheatreImageFieldRefs {
    readonly id: FieldRef<"TheatreImage", 'Int'>
    readonly theatre_id: FieldRef<"TheatreImage", 'Int'>
    readonly image_url: FieldRef<"TheatreImage", 'String'>
    readonly caption: FieldRef<"TheatreImage", 'String'>
    readonly is_primary: FieldRef<"TheatreImage", 'Boolean'>
    readonly created_at: FieldRef<"TheatreImage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TheatreImage findUnique
   */
  export type TheatreImageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TheatreImage
     */
    select?: TheatreImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TheatreImage
     */
    omit?: TheatreImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TheatreImageInclude<ExtArgs> | null
    /**
     * Filter, which TheatreImage to fetch.
     */
    where: TheatreImageWhereUniqueInput
  }

  /**
   * TheatreImage findUniqueOrThrow
   */
  export type TheatreImageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TheatreImage
     */
    select?: TheatreImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TheatreImage
     */
    omit?: TheatreImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TheatreImageInclude<ExtArgs> | null
    /**
     * Filter, which TheatreImage to fetch.
     */
    where: TheatreImageWhereUniqueInput
  }

  /**
   * TheatreImage findFirst
   */
  export type TheatreImageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TheatreImage
     */
    select?: TheatreImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TheatreImage
     */
    omit?: TheatreImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TheatreImageInclude<ExtArgs> | null
    /**
     * Filter, which TheatreImage to fetch.
     */
    where?: TheatreImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TheatreImages to fetch.
     */
    orderBy?: TheatreImageOrderByWithRelationInput | TheatreImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TheatreImages.
     */
    cursor?: TheatreImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TheatreImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TheatreImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TheatreImages.
     */
    distinct?: TheatreImageScalarFieldEnum | TheatreImageScalarFieldEnum[]
  }

  /**
   * TheatreImage findFirstOrThrow
   */
  export type TheatreImageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TheatreImage
     */
    select?: TheatreImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TheatreImage
     */
    omit?: TheatreImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TheatreImageInclude<ExtArgs> | null
    /**
     * Filter, which TheatreImage to fetch.
     */
    where?: TheatreImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TheatreImages to fetch.
     */
    orderBy?: TheatreImageOrderByWithRelationInput | TheatreImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TheatreImages.
     */
    cursor?: TheatreImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TheatreImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TheatreImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TheatreImages.
     */
    distinct?: TheatreImageScalarFieldEnum | TheatreImageScalarFieldEnum[]
  }

  /**
   * TheatreImage findMany
   */
  export type TheatreImageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TheatreImage
     */
    select?: TheatreImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TheatreImage
     */
    omit?: TheatreImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TheatreImageInclude<ExtArgs> | null
    /**
     * Filter, which TheatreImages to fetch.
     */
    where?: TheatreImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TheatreImages to fetch.
     */
    orderBy?: TheatreImageOrderByWithRelationInput | TheatreImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TheatreImages.
     */
    cursor?: TheatreImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TheatreImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TheatreImages.
     */
    skip?: number
    distinct?: TheatreImageScalarFieldEnum | TheatreImageScalarFieldEnum[]
  }

  /**
   * TheatreImage create
   */
  export type TheatreImageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TheatreImage
     */
    select?: TheatreImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TheatreImage
     */
    omit?: TheatreImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TheatreImageInclude<ExtArgs> | null
    /**
     * The data needed to create a TheatreImage.
     */
    data: XOR<TheatreImageCreateInput, TheatreImageUncheckedCreateInput>
  }

  /**
   * TheatreImage createMany
   */
  export type TheatreImageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TheatreImages.
     */
    data: TheatreImageCreateManyInput | TheatreImageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TheatreImage createManyAndReturn
   */
  export type TheatreImageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TheatreImage
     */
    select?: TheatreImageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TheatreImage
     */
    omit?: TheatreImageOmit<ExtArgs> | null
    /**
     * The data used to create many TheatreImages.
     */
    data: TheatreImageCreateManyInput | TheatreImageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TheatreImageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TheatreImage update
   */
  export type TheatreImageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TheatreImage
     */
    select?: TheatreImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TheatreImage
     */
    omit?: TheatreImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TheatreImageInclude<ExtArgs> | null
    /**
     * The data needed to update a TheatreImage.
     */
    data: XOR<TheatreImageUpdateInput, TheatreImageUncheckedUpdateInput>
    /**
     * Choose, which TheatreImage to update.
     */
    where: TheatreImageWhereUniqueInput
  }

  /**
   * TheatreImage updateMany
   */
  export type TheatreImageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TheatreImages.
     */
    data: XOR<TheatreImageUpdateManyMutationInput, TheatreImageUncheckedUpdateManyInput>
    /**
     * Filter which TheatreImages to update
     */
    where?: TheatreImageWhereInput
    /**
     * Limit how many TheatreImages to update.
     */
    limit?: number
  }

  /**
   * TheatreImage updateManyAndReturn
   */
  export type TheatreImageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TheatreImage
     */
    select?: TheatreImageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TheatreImage
     */
    omit?: TheatreImageOmit<ExtArgs> | null
    /**
     * The data used to update TheatreImages.
     */
    data: XOR<TheatreImageUpdateManyMutationInput, TheatreImageUncheckedUpdateManyInput>
    /**
     * Filter which TheatreImages to update
     */
    where?: TheatreImageWhereInput
    /**
     * Limit how many TheatreImages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TheatreImageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TheatreImage upsert
   */
  export type TheatreImageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TheatreImage
     */
    select?: TheatreImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TheatreImage
     */
    omit?: TheatreImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TheatreImageInclude<ExtArgs> | null
    /**
     * The filter to search for the TheatreImage to update in case it exists.
     */
    where: TheatreImageWhereUniqueInput
    /**
     * In case the TheatreImage found by the `where` argument doesn't exist, create a new TheatreImage with this data.
     */
    create: XOR<TheatreImageCreateInput, TheatreImageUncheckedCreateInput>
    /**
     * In case the TheatreImage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TheatreImageUpdateInput, TheatreImageUncheckedUpdateInput>
  }

  /**
   * TheatreImage delete
   */
  export type TheatreImageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TheatreImage
     */
    select?: TheatreImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TheatreImage
     */
    omit?: TheatreImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TheatreImageInclude<ExtArgs> | null
    /**
     * Filter which TheatreImage to delete.
     */
    where: TheatreImageWhereUniqueInput
  }

  /**
   * TheatreImage deleteMany
   */
  export type TheatreImageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TheatreImages to delete
     */
    where?: TheatreImageWhereInput
    /**
     * Limit how many TheatreImages to delete.
     */
    limit?: number
  }

  /**
   * TheatreImage without action
   */
  export type TheatreImageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TheatreImage
     */
    select?: TheatreImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TheatreImage
     */
    omit?: TheatreImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TheatreImageInclude<ExtArgs> | null
  }


  /**
   * Model TheatreTag
   */

  export type AggregateTheatreTag = {
    _count: TheatreTagCountAggregateOutputType | null
    _avg: TheatreTagAvgAggregateOutputType | null
    _sum: TheatreTagSumAggregateOutputType | null
    _min: TheatreTagMinAggregateOutputType | null
    _max: TheatreTagMaxAggregateOutputType | null
  }

  export type TheatreTagAvgAggregateOutputType = {
    id: number | null
    theatre_id: number | null
  }

  export type TheatreTagSumAggregateOutputType = {
    id: number | null
    theatre_id: number | null
  }

  export type TheatreTagMinAggregateOutputType = {
    id: number | null
    theatre_id: number | null
    tag_name: string | null
    created_at: Date | null
  }

  export type TheatreTagMaxAggregateOutputType = {
    id: number | null
    theatre_id: number | null
    tag_name: string | null
    created_at: Date | null
  }

  export type TheatreTagCountAggregateOutputType = {
    id: number
    theatre_id: number
    tag_name: number
    created_at: number
    _all: number
  }


  export type TheatreTagAvgAggregateInputType = {
    id?: true
    theatre_id?: true
  }

  export type TheatreTagSumAggregateInputType = {
    id?: true
    theatre_id?: true
  }

  export type TheatreTagMinAggregateInputType = {
    id?: true
    theatre_id?: true
    tag_name?: true
    created_at?: true
  }

  export type TheatreTagMaxAggregateInputType = {
    id?: true
    theatre_id?: true
    tag_name?: true
    created_at?: true
  }

  export type TheatreTagCountAggregateInputType = {
    id?: true
    theatre_id?: true
    tag_name?: true
    created_at?: true
    _all?: true
  }

  export type TheatreTagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TheatreTag to aggregate.
     */
    where?: TheatreTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TheatreTags to fetch.
     */
    orderBy?: TheatreTagOrderByWithRelationInput | TheatreTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TheatreTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TheatreTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TheatreTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TheatreTags
    **/
    _count?: true | TheatreTagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TheatreTagAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TheatreTagSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TheatreTagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TheatreTagMaxAggregateInputType
  }

  export type GetTheatreTagAggregateType<T extends TheatreTagAggregateArgs> = {
        [P in keyof T & keyof AggregateTheatreTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTheatreTag[P]>
      : GetScalarType<T[P], AggregateTheatreTag[P]>
  }




  export type TheatreTagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TheatreTagWhereInput
    orderBy?: TheatreTagOrderByWithAggregationInput | TheatreTagOrderByWithAggregationInput[]
    by: TheatreTagScalarFieldEnum[] | TheatreTagScalarFieldEnum
    having?: TheatreTagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TheatreTagCountAggregateInputType | true
    _avg?: TheatreTagAvgAggregateInputType
    _sum?: TheatreTagSumAggregateInputType
    _min?: TheatreTagMinAggregateInputType
    _max?: TheatreTagMaxAggregateInputType
  }

  export type TheatreTagGroupByOutputType = {
    id: number
    theatre_id: number
    tag_name: string
    created_at: Date
    _count: TheatreTagCountAggregateOutputType | null
    _avg: TheatreTagAvgAggregateOutputType | null
    _sum: TheatreTagSumAggregateOutputType | null
    _min: TheatreTagMinAggregateOutputType | null
    _max: TheatreTagMaxAggregateOutputType | null
  }

  type GetTheatreTagGroupByPayload<T extends TheatreTagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TheatreTagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TheatreTagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TheatreTagGroupByOutputType[P]>
            : GetScalarType<T[P], TheatreTagGroupByOutputType[P]>
        }
      >
    >


  export type TheatreTagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    theatre_id?: boolean
    tag_name?: boolean
    created_at?: boolean
    theatre?: boolean | TheatreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["theatreTag"]>

  export type TheatreTagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    theatre_id?: boolean
    tag_name?: boolean
    created_at?: boolean
    theatre?: boolean | TheatreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["theatreTag"]>

  export type TheatreTagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    theatre_id?: boolean
    tag_name?: boolean
    created_at?: boolean
    theatre?: boolean | TheatreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["theatreTag"]>

  export type TheatreTagSelectScalar = {
    id?: boolean
    theatre_id?: boolean
    tag_name?: boolean
    created_at?: boolean
  }

  export type TheatreTagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "theatre_id" | "tag_name" | "created_at", ExtArgs["result"]["theatreTag"]>
  export type TheatreTagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    theatre?: boolean | TheatreDefaultArgs<ExtArgs>
  }
  export type TheatreTagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    theatre?: boolean | TheatreDefaultArgs<ExtArgs>
  }
  export type TheatreTagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    theatre?: boolean | TheatreDefaultArgs<ExtArgs>
  }

  export type $TheatreTagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TheatreTag"
    objects: {
      theatre: Prisma.$TheatrePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      theatre_id: number
      tag_name: string
      created_at: Date
    }, ExtArgs["result"]["theatreTag"]>
    composites: {}
  }

  type TheatreTagGetPayload<S extends boolean | null | undefined | TheatreTagDefaultArgs> = $Result.GetResult<Prisma.$TheatreTagPayload, S>

  type TheatreTagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TheatreTagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TheatreTagCountAggregateInputType | true
    }

  export interface TheatreTagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TheatreTag'], meta: { name: 'TheatreTag' } }
    /**
     * Find zero or one TheatreTag that matches the filter.
     * @param {TheatreTagFindUniqueArgs} args - Arguments to find a TheatreTag
     * @example
     * // Get one TheatreTag
     * const theatreTag = await prisma.theatreTag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TheatreTagFindUniqueArgs>(args: SelectSubset<T, TheatreTagFindUniqueArgs<ExtArgs>>): Prisma__TheatreTagClient<$Result.GetResult<Prisma.$TheatreTagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TheatreTag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TheatreTagFindUniqueOrThrowArgs} args - Arguments to find a TheatreTag
     * @example
     * // Get one TheatreTag
     * const theatreTag = await prisma.theatreTag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TheatreTagFindUniqueOrThrowArgs>(args: SelectSubset<T, TheatreTagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TheatreTagClient<$Result.GetResult<Prisma.$TheatreTagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TheatreTag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TheatreTagFindFirstArgs} args - Arguments to find a TheatreTag
     * @example
     * // Get one TheatreTag
     * const theatreTag = await prisma.theatreTag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TheatreTagFindFirstArgs>(args?: SelectSubset<T, TheatreTagFindFirstArgs<ExtArgs>>): Prisma__TheatreTagClient<$Result.GetResult<Prisma.$TheatreTagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TheatreTag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TheatreTagFindFirstOrThrowArgs} args - Arguments to find a TheatreTag
     * @example
     * // Get one TheatreTag
     * const theatreTag = await prisma.theatreTag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TheatreTagFindFirstOrThrowArgs>(args?: SelectSubset<T, TheatreTagFindFirstOrThrowArgs<ExtArgs>>): Prisma__TheatreTagClient<$Result.GetResult<Prisma.$TheatreTagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TheatreTags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TheatreTagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TheatreTags
     * const theatreTags = await prisma.theatreTag.findMany()
     * 
     * // Get first 10 TheatreTags
     * const theatreTags = await prisma.theatreTag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const theatreTagWithIdOnly = await prisma.theatreTag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TheatreTagFindManyArgs>(args?: SelectSubset<T, TheatreTagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TheatreTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TheatreTag.
     * @param {TheatreTagCreateArgs} args - Arguments to create a TheatreTag.
     * @example
     * // Create one TheatreTag
     * const TheatreTag = await prisma.theatreTag.create({
     *   data: {
     *     // ... data to create a TheatreTag
     *   }
     * })
     * 
     */
    create<T extends TheatreTagCreateArgs>(args: SelectSubset<T, TheatreTagCreateArgs<ExtArgs>>): Prisma__TheatreTagClient<$Result.GetResult<Prisma.$TheatreTagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TheatreTags.
     * @param {TheatreTagCreateManyArgs} args - Arguments to create many TheatreTags.
     * @example
     * // Create many TheatreTags
     * const theatreTag = await prisma.theatreTag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TheatreTagCreateManyArgs>(args?: SelectSubset<T, TheatreTagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TheatreTags and returns the data saved in the database.
     * @param {TheatreTagCreateManyAndReturnArgs} args - Arguments to create many TheatreTags.
     * @example
     * // Create many TheatreTags
     * const theatreTag = await prisma.theatreTag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TheatreTags and only return the `id`
     * const theatreTagWithIdOnly = await prisma.theatreTag.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TheatreTagCreateManyAndReturnArgs>(args?: SelectSubset<T, TheatreTagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TheatreTagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TheatreTag.
     * @param {TheatreTagDeleteArgs} args - Arguments to delete one TheatreTag.
     * @example
     * // Delete one TheatreTag
     * const TheatreTag = await prisma.theatreTag.delete({
     *   where: {
     *     // ... filter to delete one TheatreTag
     *   }
     * })
     * 
     */
    delete<T extends TheatreTagDeleteArgs>(args: SelectSubset<T, TheatreTagDeleteArgs<ExtArgs>>): Prisma__TheatreTagClient<$Result.GetResult<Prisma.$TheatreTagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TheatreTag.
     * @param {TheatreTagUpdateArgs} args - Arguments to update one TheatreTag.
     * @example
     * // Update one TheatreTag
     * const theatreTag = await prisma.theatreTag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TheatreTagUpdateArgs>(args: SelectSubset<T, TheatreTagUpdateArgs<ExtArgs>>): Prisma__TheatreTagClient<$Result.GetResult<Prisma.$TheatreTagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TheatreTags.
     * @param {TheatreTagDeleteManyArgs} args - Arguments to filter TheatreTags to delete.
     * @example
     * // Delete a few TheatreTags
     * const { count } = await prisma.theatreTag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TheatreTagDeleteManyArgs>(args?: SelectSubset<T, TheatreTagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TheatreTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TheatreTagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TheatreTags
     * const theatreTag = await prisma.theatreTag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TheatreTagUpdateManyArgs>(args: SelectSubset<T, TheatreTagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TheatreTags and returns the data updated in the database.
     * @param {TheatreTagUpdateManyAndReturnArgs} args - Arguments to update many TheatreTags.
     * @example
     * // Update many TheatreTags
     * const theatreTag = await prisma.theatreTag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TheatreTags and only return the `id`
     * const theatreTagWithIdOnly = await prisma.theatreTag.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TheatreTagUpdateManyAndReturnArgs>(args: SelectSubset<T, TheatreTagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TheatreTagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TheatreTag.
     * @param {TheatreTagUpsertArgs} args - Arguments to update or create a TheatreTag.
     * @example
     * // Update or create a TheatreTag
     * const theatreTag = await prisma.theatreTag.upsert({
     *   create: {
     *     // ... data to create a TheatreTag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TheatreTag we want to update
     *   }
     * })
     */
    upsert<T extends TheatreTagUpsertArgs>(args: SelectSubset<T, TheatreTagUpsertArgs<ExtArgs>>): Prisma__TheatreTagClient<$Result.GetResult<Prisma.$TheatreTagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TheatreTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TheatreTagCountArgs} args - Arguments to filter TheatreTags to count.
     * @example
     * // Count the number of TheatreTags
     * const count = await prisma.theatreTag.count({
     *   where: {
     *     // ... the filter for the TheatreTags we want to count
     *   }
     * })
    **/
    count<T extends TheatreTagCountArgs>(
      args?: Subset<T, TheatreTagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TheatreTagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TheatreTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TheatreTagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TheatreTagAggregateArgs>(args: Subset<T, TheatreTagAggregateArgs>): Prisma.PrismaPromise<GetTheatreTagAggregateType<T>>

    /**
     * Group by TheatreTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TheatreTagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TheatreTagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TheatreTagGroupByArgs['orderBy'] }
        : { orderBy?: TheatreTagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TheatreTagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTheatreTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TheatreTag model
   */
  readonly fields: TheatreTagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TheatreTag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TheatreTagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    theatre<T extends TheatreDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TheatreDefaultArgs<ExtArgs>>): Prisma__TheatreClient<$Result.GetResult<Prisma.$TheatrePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TheatreTag model
   */
  interface TheatreTagFieldRefs {
    readonly id: FieldRef<"TheatreTag", 'Int'>
    readonly theatre_id: FieldRef<"TheatreTag", 'Int'>
    readonly tag_name: FieldRef<"TheatreTag", 'String'>
    readonly created_at: FieldRef<"TheatreTag", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TheatreTag findUnique
   */
  export type TheatreTagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TheatreTag
     */
    select?: TheatreTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TheatreTag
     */
    omit?: TheatreTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TheatreTagInclude<ExtArgs> | null
    /**
     * Filter, which TheatreTag to fetch.
     */
    where: TheatreTagWhereUniqueInput
  }

  /**
   * TheatreTag findUniqueOrThrow
   */
  export type TheatreTagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TheatreTag
     */
    select?: TheatreTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TheatreTag
     */
    omit?: TheatreTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TheatreTagInclude<ExtArgs> | null
    /**
     * Filter, which TheatreTag to fetch.
     */
    where: TheatreTagWhereUniqueInput
  }

  /**
   * TheatreTag findFirst
   */
  export type TheatreTagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TheatreTag
     */
    select?: TheatreTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TheatreTag
     */
    omit?: TheatreTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TheatreTagInclude<ExtArgs> | null
    /**
     * Filter, which TheatreTag to fetch.
     */
    where?: TheatreTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TheatreTags to fetch.
     */
    orderBy?: TheatreTagOrderByWithRelationInput | TheatreTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TheatreTags.
     */
    cursor?: TheatreTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TheatreTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TheatreTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TheatreTags.
     */
    distinct?: TheatreTagScalarFieldEnum | TheatreTagScalarFieldEnum[]
  }

  /**
   * TheatreTag findFirstOrThrow
   */
  export type TheatreTagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TheatreTag
     */
    select?: TheatreTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TheatreTag
     */
    omit?: TheatreTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TheatreTagInclude<ExtArgs> | null
    /**
     * Filter, which TheatreTag to fetch.
     */
    where?: TheatreTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TheatreTags to fetch.
     */
    orderBy?: TheatreTagOrderByWithRelationInput | TheatreTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TheatreTags.
     */
    cursor?: TheatreTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TheatreTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TheatreTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TheatreTags.
     */
    distinct?: TheatreTagScalarFieldEnum | TheatreTagScalarFieldEnum[]
  }

  /**
   * TheatreTag findMany
   */
  export type TheatreTagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TheatreTag
     */
    select?: TheatreTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TheatreTag
     */
    omit?: TheatreTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TheatreTagInclude<ExtArgs> | null
    /**
     * Filter, which TheatreTags to fetch.
     */
    where?: TheatreTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TheatreTags to fetch.
     */
    orderBy?: TheatreTagOrderByWithRelationInput | TheatreTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TheatreTags.
     */
    cursor?: TheatreTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TheatreTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TheatreTags.
     */
    skip?: number
    distinct?: TheatreTagScalarFieldEnum | TheatreTagScalarFieldEnum[]
  }

  /**
   * TheatreTag create
   */
  export type TheatreTagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TheatreTag
     */
    select?: TheatreTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TheatreTag
     */
    omit?: TheatreTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TheatreTagInclude<ExtArgs> | null
    /**
     * The data needed to create a TheatreTag.
     */
    data: XOR<TheatreTagCreateInput, TheatreTagUncheckedCreateInput>
  }

  /**
   * TheatreTag createMany
   */
  export type TheatreTagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TheatreTags.
     */
    data: TheatreTagCreateManyInput | TheatreTagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TheatreTag createManyAndReturn
   */
  export type TheatreTagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TheatreTag
     */
    select?: TheatreTagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TheatreTag
     */
    omit?: TheatreTagOmit<ExtArgs> | null
    /**
     * The data used to create many TheatreTags.
     */
    data: TheatreTagCreateManyInput | TheatreTagCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TheatreTagIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TheatreTag update
   */
  export type TheatreTagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TheatreTag
     */
    select?: TheatreTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TheatreTag
     */
    omit?: TheatreTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TheatreTagInclude<ExtArgs> | null
    /**
     * The data needed to update a TheatreTag.
     */
    data: XOR<TheatreTagUpdateInput, TheatreTagUncheckedUpdateInput>
    /**
     * Choose, which TheatreTag to update.
     */
    where: TheatreTagWhereUniqueInput
  }

  /**
   * TheatreTag updateMany
   */
  export type TheatreTagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TheatreTags.
     */
    data: XOR<TheatreTagUpdateManyMutationInput, TheatreTagUncheckedUpdateManyInput>
    /**
     * Filter which TheatreTags to update
     */
    where?: TheatreTagWhereInput
    /**
     * Limit how many TheatreTags to update.
     */
    limit?: number
  }

  /**
   * TheatreTag updateManyAndReturn
   */
  export type TheatreTagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TheatreTag
     */
    select?: TheatreTagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TheatreTag
     */
    omit?: TheatreTagOmit<ExtArgs> | null
    /**
     * The data used to update TheatreTags.
     */
    data: XOR<TheatreTagUpdateManyMutationInput, TheatreTagUncheckedUpdateManyInput>
    /**
     * Filter which TheatreTags to update
     */
    where?: TheatreTagWhereInput
    /**
     * Limit how many TheatreTags to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TheatreTagIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TheatreTag upsert
   */
  export type TheatreTagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TheatreTag
     */
    select?: TheatreTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TheatreTag
     */
    omit?: TheatreTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TheatreTagInclude<ExtArgs> | null
    /**
     * The filter to search for the TheatreTag to update in case it exists.
     */
    where: TheatreTagWhereUniqueInput
    /**
     * In case the TheatreTag found by the `where` argument doesn't exist, create a new TheatreTag with this data.
     */
    create: XOR<TheatreTagCreateInput, TheatreTagUncheckedCreateInput>
    /**
     * In case the TheatreTag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TheatreTagUpdateInput, TheatreTagUncheckedUpdateInput>
  }

  /**
   * TheatreTag delete
   */
  export type TheatreTagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TheatreTag
     */
    select?: TheatreTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TheatreTag
     */
    omit?: TheatreTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TheatreTagInclude<ExtArgs> | null
    /**
     * Filter which TheatreTag to delete.
     */
    where: TheatreTagWhereUniqueInput
  }

  /**
   * TheatreTag deleteMany
   */
  export type TheatreTagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TheatreTags to delete
     */
    where?: TheatreTagWhereInput
    /**
     * Limit how many TheatreTags to delete.
     */
    limit?: number
  }

  /**
   * TheatreTag without action
   */
  export type TheatreTagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TheatreTag
     */
    select?: TheatreTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TheatreTag
     */
    omit?: TheatreTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TheatreTagInclude<ExtArgs> | null
  }


  /**
   * Model Venue
   */

  export type AggregateVenue = {
    _count: VenueCountAggregateOutputType | null
    _avg: VenueAvgAggregateOutputType | null
    _sum: VenueSumAggregateOutputType | null
    _min: VenueMinAggregateOutputType | null
    _max: VenueMaxAggregateOutputType | null
  }

  export type VenueAvgAggregateOutputType = {
    id: number | null
    capacity: number | null
  }

  export type VenueSumAggregateOutputType = {
    id: number | null
    capacity: number | null
  }

  export type VenueMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    address: string | null
    city: string | null
    capacity: number | null
    image_url: string | null
    created_at: Date | null
  }

  export type VenueMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    address: string | null
    city: string | null
    capacity: number | null
    image_url: string | null
    created_at: Date | null
  }

  export type VenueCountAggregateOutputType = {
    id: number
    name: number
    description: number
    address: number
    city: number
    capacity: number
    image_url: number
    created_at: number
    _all: number
  }


  export type VenueAvgAggregateInputType = {
    id?: true
    capacity?: true
  }

  export type VenueSumAggregateInputType = {
    id?: true
    capacity?: true
  }

  export type VenueMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    address?: true
    city?: true
    capacity?: true
    image_url?: true
    created_at?: true
  }

  export type VenueMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    address?: true
    city?: true
    capacity?: true
    image_url?: true
    created_at?: true
  }

  export type VenueCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    address?: true
    city?: true
    capacity?: true
    image_url?: true
    created_at?: true
    _all?: true
  }

  export type VenueAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Venue to aggregate.
     */
    where?: VenueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Venues to fetch.
     */
    orderBy?: VenueOrderByWithRelationInput | VenueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VenueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Venues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Venues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Venues
    **/
    _count?: true | VenueCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VenueAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VenueSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VenueMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VenueMaxAggregateInputType
  }

  export type GetVenueAggregateType<T extends VenueAggregateArgs> = {
        [P in keyof T & keyof AggregateVenue]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVenue[P]>
      : GetScalarType<T[P], AggregateVenue[P]>
  }




  export type VenueGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VenueWhereInput
    orderBy?: VenueOrderByWithAggregationInput | VenueOrderByWithAggregationInput[]
    by: VenueScalarFieldEnum[] | VenueScalarFieldEnum
    having?: VenueScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VenueCountAggregateInputType | true
    _avg?: VenueAvgAggregateInputType
    _sum?: VenueSumAggregateInputType
    _min?: VenueMinAggregateInputType
    _max?: VenueMaxAggregateInputType
  }

  export type VenueGroupByOutputType = {
    id: number
    name: string
    description: string | null
    address: string | null
    city: string | null
    capacity: number
    image_url: string | null
    created_at: Date
    _count: VenueCountAggregateOutputType | null
    _avg: VenueAvgAggregateOutputType | null
    _sum: VenueSumAggregateOutputType | null
    _min: VenueMinAggregateOutputType | null
    _max: VenueMaxAggregateOutputType | null
  }

  type GetVenueGroupByPayload<T extends VenueGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VenueGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VenueGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VenueGroupByOutputType[P]>
            : GetScalarType<T[P], VenueGroupByOutputType[P]>
        }
      >
    >


  export type VenueSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    address?: boolean
    city?: boolean
    capacity?: boolean
    image_url?: boolean
    created_at?: boolean
    sections?: boolean | Venue$sectionsArgs<ExtArgs>
    events?: boolean | Venue$eventsArgs<ExtArgs>
    _count?: boolean | VenueCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["venue"]>

  export type VenueSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    address?: boolean
    city?: boolean
    capacity?: boolean
    image_url?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["venue"]>

  export type VenueSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    address?: boolean
    city?: boolean
    capacity?: boolean
    image_url?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["venue"]>

  export type VenueSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    address?: boolean
    city?: boolean
    capacity?: boolean
    image_url?: boolean
    created_at?: boolean
  }

  export type VenueOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "address" | "city" | "capacity" | "image_url" | "created_at", ExtArgs["result"]["venue"]>
  export type VenueInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sections?: boolean | Venue$sectionsArgs<ExtArgs>
    events?: boolean | Venue$eventsArgs<ExtArgs>
    _count?: boolean | VenueCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VenueIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type VenueIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $VenuePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Venue"
    objects: {
      sections: Prisma.$VenueSectionPayload<ExtArgs>[]
      events: Prisma.$EventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string | null
      address: string | null
      city: string | null
      capacity: number
      image_url: string | null
      created_at: Date
    }, ExtArgs["result"]["venue"]>
    composites: {}
  }

  type VenueGetPayload<S extends boolean | null | undefined | VenueDefaultArgs> = $Result.GetResult<Prisma.$VenuePayload, S>

  type VenueCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VenueFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VenueCountAggregateInputType | true
    }

  export interface VenueDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Venue'], meta: { name: 'Venue' } }
    /**
     * Find zero or one Venue that matches the filter.
     * @param {VenueFindUniqueArgs} args - Arguments to find a Venue
     * @example
     * // Get one Venue
     * const venue = await prisma.venue.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VenueFindUniqueArgs>(args: SelectSubset<T, VenueFindUniqueArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Venue that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VenueFindUniqueOrThrowArgs} args - Arguments to find a Venue
     * @example
     * // Get one Venue
     * const venue = await prisma.venue.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VenueFindUniqueOrThrowArgs>(args: SelectSubset<T, VenueFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Venue that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueFindFirstArgs} args - Arguments to find a Venue
     * @example
     * // Get one Venue
     * const venue = await prisma.venue.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VenueFindFirstArgs>(args?: SelectSubset<T, VenueFindFirstArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Venue that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueFindFirstOrThrowArgs} args - Arguments to find a Venue
     * @example
     * // Get one Venue
     * const venue = await prisma.venue.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VenueFindFirstOrThrowArgs>(args?: SelectSubset<T, VenueFindFirstOrThrowArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Venues that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Venues
     * const venues = await prisma.venue.findMany()
     * 
     * // Get first 10 Venues
     * const venues = await prisma.venue.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const venueWithIdOnly = await prisma.venue.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VenueFindManyArgs>(args?: SelectSubset<T, VenueFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Venue.
     * @param {VenueCreateArgs} args - Arguments to create a Venue.
     * @example
     * // Create one Venue
     * const Venue = await prisma.venue.create({
     *   data: {
     *     // ... data to create a Venue
     *   }
     * })
     * 
     */
    create<T extends VenueCreateArgs>(args: SelectSubset<T, VenueCreateArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Venues.
     * @param {VenueCreateManyArgs} args - Arguments to create many Venues.
     * @example
     * // Create many Venues
     * const venue = await prisma.venue.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VenueCreateManyArgs>(args?: SelectSubset<T, VenueCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Venues and returns the data saved in the database.
     * @param {VenueCreateManyAndReturnArgs} args - Arguments to create many Venues.
     * @example
     * // Create many Venues
     * const venue = await prisma.venue.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Venues and only return the `id`
     * const venueWithIdOnly = await prisma.venue.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VenueCreateManyAndReturnArgs>(args?: SelectSubset<T, VenueCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Venue.
     * @param {VenueDeleteArgs} args - Arguments to delete one Venue.
     * @example
     * // Delete one Venue
     * const Venue = await prisma.venue.delete({
     *   where: {
     *     // ... filter to delete one Venue
     *   }
     * })
     * 
     */
    delete<T extends VenueDeleteArgs>(args: SelectSubset<T, VenueDeleteArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Venue.
     * @param {VenueUpdateArgs} args - Arguments to update one Venue.
     * @example
     * // Update one Venue
     * const venue = await prisma.venue.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VenueUpdateArgs>(args: SelectSubset<T, VenueUpdateArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Venues.
     * @param {VenueDeleteManyArgs} args - Arguments to filter Venues to delete.
     * @example
     * // Delete a few Venues
     * const { count } = await prisma.venue.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VenueDeleteManyArgs>(args?: SelectSubset<T, VenueDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Venues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Venues
     * const venue = await prisma.venue.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VenueUpdateManyArgs>(args: SelectSubset<T, VenueUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Venues and returns the data updated in the database.
     * @param {VenueUpdateManyAndReturnArgs} args - Arguments to update many Venues.
     * @example
     * // Update many Venues
     * const venue = await prisma.venue.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Venues and only return the `id`
     * const venueWithIdOnly = await prisma.venue.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VenueUpdateManyAndReturnArgs>(args: SelectSubset<T, VenueUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Venue.
     * @param {VenueUpsertArgs} args - Arguments to update or create a Venue.
     * @example
     * // Update or create a Venue
     * const venue = await prisma.venue.upsert({
     *   create: {
     *     // ... data to create a Venue
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Venue we want to update
     *   }
     * })
     */
    upsert<T extends VenueUpsertArgs>(args: SelectSubset<T, VenueUpsertArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Venues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueCountArgs} args - Arguments to filter Venues to count.
     * @example
     * // Count the number of Venues
     * const count = await prisma.venue.count({
     *   where: {
     *     // ... the filter for the Venues we want to count
     *   }
     * })
    **/
    count<T extends VenueCountArgs>(
      args?: Subset<T, VenueCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VenueCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Venue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VenueAggregateArgs>(args: Subset<T, VenueAggregateArgs>): Prisma.PrismaPromise<GetVenueAggregateType<T>>

    /**
     * Group by Venue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VenueGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VenueGroupByArgs['orderBy'] }
        : { orderBy?: VenueGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VenueGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVenueGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Venue model
   */
  readonly fields: VenueFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Venue.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VenueClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sections<T extends Venue$sectionsArgs<ExtArgs> = {}>(args?: Subset<T, Venue$sectionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VenueSectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    events<T extends Venue$eventsArgs<ExtArgs> = {}>(args?: Subset<T, Venue$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Venue model
   */
  interface VenueFieldRefs {
    readonly id: FieldRef<"Venue", 'Int'>
    readonly name: FieldRef<"Venue", 'String'>
    readonly description: FieldRef<"Venue", 'String'>
    readonly address: FieldRef<"Venue", 'String'>
    readonly city: FieldRef<"Venue", 'String'>
    readonly capacity: FieldRef<"Venue", 'Int'>
    readonly image_url: FieldRef<"Venue", 'String'>
    readonly created_at: FieldRef<"Venue", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Venue findUnique
   */
  export type VenueFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * Filter, which Venue to fetch.
     */
    where: VenueWhereUniqueInput
  }

  /**
   * Venue findUniqueOrThrow
   */
  export type VenueFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * Filter, which Venue to fetch.
     */
    where: VenueWhereUniqueInput
  }

  /**
   * Venue findFirst
   */
  export type VenueFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * Filter, which Venue to fetch.
     */
    where?: VenueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Venues to fetch.
     */
    orderBy?: VenueOrderByWithRelationInput | VenueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Venues.
     */
    cursor?: VenueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Venues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Venues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Venues.
     */
    distinct?: VenueScalarFieldEnum | VenueScalarFieldEnum[]
  }

  /**
   * Venue findFirstOrThrow
   */
  export type VenueFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * Filter, which Venue to fetch.
     */
    where?: VenueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Venues to fetch.
     */
    orderBy?: VenueOrderByWithRelationInput | VenueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Venues.
     */
    cursor?: VenueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Venues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Venues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Venues.
     */
    distinct?: VenueScalarFieldEnum | VenueScalarFieldEnum[]
  }

  /**
   * Venue findMany
   */
  export type VenueFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * Filter, which Venues to fetch.
     */
    where?: VenueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Venues to fetch.
     */
    orderBy?: VenueOrderByWithRelationInput | VenueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Venues.
     */
    cursor?: VenueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Venues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Venues.
     */
    skip?: number
    distinct?: VenueScalarFieldEnum | VenueScalarFieldEnum[]
  }

  /**
   * Venue create
   */
  export type VenueCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * The data needed to create a Venue.
     */
    data: XOR<VenueCreateInput, VenueUncheckedCreateInput>
  }

  /**
   * Venue createMany
   */
  export type VenueCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Venues.
     */
    data: VenueCreateManyInput | VenueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Venue createManyAndReturn
   */
  export type VenueCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * The data used to create many Venues.
     */
    data: VenueCreateManyInput | VenueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Venue update
   */
  export type VenueUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * The data needed to update a Venue.
     */
    data: XOR<VenueUpdateInput, VenueUncheckedUpdateInput>
    /**
     * Choose, which Venue to update.
     */
    where: VenueWhereUniqueInput
  }

  /**
   * Venue updateMany
   */
  export type VenueUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Venues.
     */
    data: XOR<VenueUpdateManyMutationInput, VenueUncheckedUpdateManyInput>
    /**
     * Filter which Venues to update
     */
    where?: VenueWhereInput
    /**
     * Limit how many Venues to update.
     */
    limit?: number
  }

  /**
   * Venue updateManyAndReturn
   */
  export type VenueUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * The data used to update Venues.
     */
    data: XOR<VenueUpdateManyMutationInput, VenueUncheckedUpdateManyInput>
    /**
     * Filter which Venues to update
     */
    where?: VenueWhereInput
    /**
     * Limit how many Venues to update.
     */
    limit?: number
  }

  /**
   * Venue upsert
   */
  export type VenueUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * The filter to search for the Venue to update in case it exists.
     */
    where: VenueWhereUniqueInput
    /**
     * In case the Venue found by the `where` argument doesn't exist, create a new Venue with this data.
     */
    create: XOR<VenueCreateInput, VenueUncheckedCreateInput>
    /**
     * In case the Venue was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VenueUpdateInput, VenueUncheckedUpdateInput>
  }

  /**
   * Venue delete
   */
  export type VenueDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * Filter which Venue to delete.
     */
    where: VenueWhereUniqueInput
  }

  /**
   * Venue deleteMany
   */
  export type VenueDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Venues to delete
     */
    where?: VenueWhereInput
    /**
     * Limit how many Venues to delete.
     */
    limit?: number
  }

  /**
   * Venue.sections
   */
  export type Venue$sectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VenueSection
     */
    select?: VenueSectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VenueSection
     */
    omit?: VenueSectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueSectionInclude<ExtArgs> | null
    where?: VenueSectionWhereInput
    orderBy?: VenueSectionOrderByWithRelationInput | VenueSectionOrderByWithRelationInput[]
    cursor?: VenueSectionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VenueSectionScalarFieldEnum | VenueSectionScalarFieldEnum[]
  }

  /**
   * Venue.events
   */
  export type Venue$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    where?: EventWhereInput
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    cursor?: EventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Venue without action
   */
  export type VenueDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
  }


  /**
   * Model VenueSection
   */

  export type AggregateVenueSection = {
    _count: VenueSectionCountAggregateOutputType | null
    _avg: VenueSectionAvgAggregateOutputType | null
    _sum: VenueSectionSumAggregateOutputType | null
    _min: VenueSectionMinAggregateOutputType | null
    _max: VenueSectionMaxAggregateOutputType | null
  }

  export type VenueSectionAvgAggregateOutputType = {
    id: number | null
    venue_id: number | null
  }

  export type VenueSectionSumAggregateOutputType = {
    id: number | null
    venue_id: number | null
  }

  export type VenueSectionMinAggregateOutputType = {
    id: number | null
    venue_id: number | null
    section_name: string | null
    section_type: $Enums.SectionType | null
    created_at: Date | null
  }

  export type VenueSectionMaxAggregateOutputType = {
    id: number | null
    venue_id: number | null
    section_name: string | null
    section_type: $Enums.SectionType | null
    created_at: Date | null
  }

  export type VenueSectionCountAggregateOutputType = {
    id: number
    venue_id: number
    section_name: number
    section_type: number
    created_at: number
    _all: number
  }


  export type VenueSectionAvgAggregateInputType = {
    id?: true
    venue_id?: true
  }

  export type VenueSectionSumAggregateInputType = {
    id?: true
    venue_id?: true
  }

  export type VenueSectionMinAggregateInputType = {
    id?: true
    venue_id?: true
    section_name?: true
    section_type?: true
    created_at?: true
  }

  export type VenueSectionMaxAggregateInputType = {
    id?: true
    venue_id?: true
    section_name?: true
    section_type?: true
    created_at?: true
  }

  export type VenueSectionCountAggregateInputType = {
    id?: true
    venue_id?: true
    section_name?: true
    section_type?: true
    created_at?: true
    _all?: true
  }

  export type VenueSectionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VenueSection to aggregate.
     */
    where?: VenueSectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VenueSections to fetch.
     */
    orderBy?: VenueSectionOrderByWithRelationInput | VenueSectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VenueSectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VenueSections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VenueSections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VenueSections
    **/
    _count?: true | VenueSectionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VenueSectionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VenueSectionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VenueSectionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VenueSectionMaxAggregateInputType
  }

  export type GetVenueSectionAggregateType<T extends VenueSectionAggregateArgs> = {
        [P in keyof T & keyof AggregateVenueSection]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVenueSection[P]>
      : GetScalarType<T[P], AggregateVenueSection[P]>
  }




  export type VenueSectionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VenueSectionWhereInput
    orderBy?: VenueSectionOrderByWithAggregationInput | VenueSectionOrderByWithAggregationInput[]
    by: VenueSectionScalarFieldEnum[] | VenueSectionScalarFieldEnum
    having?: VenueSectionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VenueSectionCountAggregateInputType | true
    _avg?: VenueSectionAvgAggregateInputType
    _sum?: VenueSectionSumAggregateInputType
    _min?: VenueSectionMinAggregateInputType
    _max?: VenueSectionMaxAggregateInputType
  }

  export type VenueSectionGroupByOutputType = {
    id: number
    venue_id: number
    section_name: string
    section_type: $Enums.SectionType
    created_at: Date
    _count: VenueSectionCountAggregateOutputType | null
    _avg: VenueSectionAvgAggregateOutputType | null
    _sum: VenueSectionSumAggregateOutputType | null
    _min: VenueSectionMinAggregateOutputType | null
    _max: VenueSectionMaxAggregateOutputType | null
  }

  type GetVenueSectionGroupByPayload<T extends VenueSectionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VenueSectionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VenueSectionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VenueSectionGroupByOutputType[P]>
            : GetScalarType<T[P], VenueSectionGroupByOutputType[P]>
        }
      >
    >


  export type VenueSectionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    venue_id?: boolean
    section_name?: boolean
    section_type?: boolean
    created_at?: boolean
    venue?: boolean | VenueDefaultArgs<ExtArgs>
    seats?: boolean | VenueSection$seatsArgs<ExtArgs>
    _count?: boolean | VenueSectionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["venueSection"]>

  export type VenueSectionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    venue_id?: boolean
    section_name?: boolean
    section_type?: boolean
    created_at?: boolean
    venue?: boolean | VenueDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["venueSection"]>

  export type VenueSectionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    venue_id?: boolean
    section_name?: boolean
    section_type?: boolean
    created_at?: boolean
    venue?: boolean | VenueDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["venueSection"]>

  export type VenueSectionSelectScalar = {
    id?: boolean
    venue_id?: boolean
    section_name?: boolean
    section_type?: boolean
    created_at?: boolean
  }

  export type VenueSectionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "venue_id" | "section_name" | "section_type" | "created_at", ExtArgs["result"]["venueSection"]>
  export type VenueSectionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    venue?: boolean | VenueDefaultArgs<ExtArgs>
    seats?: boolean | VenueSection$seatsArgs<ExtArgs>
    _count?: boolean | VenueSectionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VenueSectionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    venue?: boolean | VenueDefaultArgs<ExtArgs>
  }
  export type VenueSectionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    venue?: boolean | VenueDefaultArgs<ExtArgs>
  }

  export type $VenueSectionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VenueSection"
    objects: {
      venue: Prisma.$VenuePayload<ExtArgs>
      seats: Prisma.$SeatPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      venue_id: number
      section_name: string
      section_type: $Enums.SectionType
      created_at: Date
    }, ExtArgs["result"]["venueSection"]>
    composites: {}
  }

  type VenueSectionGetPayload<S extends boolean | null | undefined | VenueSectionDefaultArgs> = $Result.GetResult<Prisma.$VenueSectionPayload, S>

  type VenueSectionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VenueSectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VenueSectionCountAggregateInputType | true
    }

  export interface VenueSectionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VenueSection'], meta: { name: 'VenueSection' } }
    /**
     * Find zero or one VenueSection that matches the filter.
     * @param {VenueSectionFindUniqueArgs} args - Arguments to find a VenueSection
     * @example
     * // Get one VenueSection
     * const venueSection = await prisma.venueSection.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VenueSectionFindUniqueArgs>(args: SelectSubset<T, VenueSectionFindUniqueArgs<ExtArgs>>): Prisma__VenueSectionClient<$Result.GetResult<Prisma.$VenueSectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VenueSection that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VenueSectionFindUniqueOrThrowArgs} args - Arguments to find a VenueSection
     * @example
     * // Get one VenueSection
     * const venueSection = await prisma.venueSection.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VenueSectionFindUniqueOrThrowArgs>(args: SelectSubset<T, VenueSectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VenueSectionClient<$Result.GetResult<Prisma.$VenueSectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VenueSection that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueSectionFindFirstArgs} args - Arguments to find a VenueSection
     * @example
     * // Get one VenueSection
     * const venueSection = await prisma.venueSection.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VenueSectionFindFirstArgs>(args?: SelectSubset<T, VenueSectionFindFirstArgs<ExtArgs>>): Prisma__VenueSectionClient<$Result.GetResult<Prisma.$VenueSectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VenueSection that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueSectionFindFirstOrThrowArgs} args - Arguments to find a VenueSection
     * @example
     * // Get one VenueSection
     * const venueSection = await prisma.venueSection.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VenueSectionFindFirstOrThrowArgs>(args?: SelectSubset<T, VenueSectionFindFirstOrThrowArgs<ExtArgs>>): Prisma__VenueSectionClient<$Result.GetResult<Prisma.$VenueSectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VenueSections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueSectionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VenueSections
     * const venueSections = await prisma.venueSection.findMany()
     * 
     * // Get first 10 VenueSections
     * const venueSections = await prisma.venueSection.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const venueSectionWithIdOnly = await prisma.venueSection.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VenueSectionFindManyArgs>(args?: SelectSubset<T, VenueSectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VenueSectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VenueSection.
     * @param {VenueSectionCreateArgs} args - Arguments to create a VenueSection.
     * @example
     * // Create one VenueSection
     * const VenueSection = await prisma.venueSection.create({
     *   data: {
     *     // ... data to create a VenueSection
     *   }
     * })
     * 
     */
    create<T extends VenueSectionCreateArgs>(args: SelectSubset<T, VenueSectionCreateArgs<ExtArgs>>): Prisma__VenueSectionClient<$Result.GetResult<Prisma.$VenueSectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VenueSections.
     * @param {VenueSectionCreateManyArgs} args - Arguments to create many VenueSections.
     * @example
     * // Create many VenueSections
     * const venueSection = await prisma.venueSection.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VenueSectionCreateManyArgs>(args?: SelectSubset<T, VenueSectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VenueSections and returns the data saved in the database.
     * @param {VenueSectionCreateManyAndReturnArgs} args - Arguments to create many VenueSections.
     * @example
     * // Create many VenueSections
     * const venueSection = await prisma.venueSection.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VenueSections and only return the `id`
     * const venueSectionWithIdOnly = await prisma.venueSection.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VenueSectionCreateManyAndReturnArgs>(args?: SelectSubset<T, VenueSectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VenueSectionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VenueSection.
     * @param {VenueSectionDeleteArgs} args - Arguments to delete one VenueSection.
     * @example
     * // Delete one VenueSection
     * const VenueSection = await prisma.venueSection.delete({
     *   where: {
     *     // ... filter to delete one VenueSection
     *   }
     * })
     * 
     */
    delete<T extends VenueSectionDeleteArgs>(args: SelectSubset<T, VenueSectionDeleteArgs<ExtArgs>>): Prisma__VenueSectionClient<$Result.GetResult<Prisma.$VenueSectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VenueSection.
     * @param {VenueSectionUpdateArgs} args - Arguments to update one VenueSection.
     * @example
     * // Update one VenueSection
     * const venueSection = await prisma.venueSection.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VenueSectionUpdateArgs>(args: SelectSubset<T, VenueSectionUpdateArgs<ExtArgs>>): Prisma__VenueSectionClient<$Result.GetResult<Prisma.$VenueSectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VenueSections.
     * @param {VenueSectionDeleteManyArgs} args - Arguments to filter VenueSections to delete.
     * @example
     * // Delete a few VenueSections
     * const { count } = await prisma.venueSection.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VenueSectionDeleteManyArgs>(args?: SelectSubset<T, VenueSectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VenueSections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueSectionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VenueSections
     * const venueSection = await prisma.venueSection.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VenueSectionUpdateManyArgs>(args: SelectSubset<T, VenueSectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VenueSections and returns the data updated in the database.
     * @param {VenueSectionUpdateManyAndReturnArgs} args - Arguments to update many VenueSections.
     * @example
     * // Update many VenueSections
     * const venueSection = await prisma.venueSection.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VenueSections and only return the `id`
     * const venueSectionWithIdOnly = await prisma.venueSection.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VenueSectionUpdateManyAndReturnArgs>(args: SelectSubset<T, VenueSectionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VenueSectionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VenueSection.
     * @param {VenueSectionUpsertArgs} args - Arguments to update or create a VenueSection.
     * @example
     * // Update or create a VenueSection
     * const venueSection = await prisma.venueSection.upsert({
     *   create: {
     *     // ... data to create a VenueSection
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VenueSection we want to update
     *   }
     * })
     */
    upsert<T extends VenueSectionUpsertArgs>(args: SelectSubset<T, VenueSectionUpsertArgs<ExtArgs>>): Prisma__VenueSectionClient<$Result.GetResult<Prisma.$VenueSectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VenueSections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueSectionCountArgs} args - Arguments to filter VenueSections to count.
     * @example
     * // Count the number of VenueSections
     * const count = await prisma.venueSection.count({
     *   where: {
     *     // ... the filter for the VenueSections we want to count
     *   }
     * })
    **/
    count<T extends VenueSectionCountArgs>(
      args?: Subset<T, VenueSectionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VenueSectionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VenueSection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueSectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VenueSectionAggregateArgs>(args: Subset<T, VenueSectionAggregateArgs>): Prisma.PrismaPromise<GetVenueSectionAggregateType<T>>

    /**
     * Group by VenueSection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueSectionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VenueSectionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VenueSectionGroupByArgs['orderBy'] }
        : { orderBy?: VenueSectionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VenueSectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVenueSectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VenueSection model
   */
  readonly fields: VenueSectionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VenueSection.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VenueSectionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    venue<T extends VenueDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VenueDefaultArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    seats<T extends VenueSection$seatsArgs<ExtArgs> = {}>(args?: Subset<T, VenueSection$seatsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VenueSection model
   */
  interface VenueSectionFieldRefs {
    readonly id: FieldRef<"VenueSection", 'Int'>
    readonly venue_id: FieldRef<"VenueSection", 'Int'>
    readonly section_name: FieldRef<"VenueSection", 'String'>
    readonly section_type: FieldRef<"VenueSection", 'SectionType'>
    readonly created_at: FieldRef<"VenueSection", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VenueSection findUnique
   */
  export type VenueSectionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VenueSection
     */
    select?: VenueSectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VenueSection
     */
    omit?: VenueSectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueSectionInclude<ExtArgs> | null
    /**
     * Filter, which VenueSection to fetch.
     */
    where: VenueSectionWhereUniqueInput
  }

  /**
   * VenueSection findUniqueOrThrow
   */
  export type VenueSectionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VenueSection
     */
    select?: VenueSectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VenueSection
     */
    omit?: VenueSectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueSectionInclude<ExtArgs> | null
    /**
     * Filter, which VenueSection to fetch.
     */
    where: VenueSectionWhereUniqueInput
  }

  /**
   * VenueSection findFirst
   */
  export type VenueSectionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VenueSection
     */
    select?: VenueSectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VenueSection
     */
    omit?: VenueSectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueSectionInclude<ExtArgs> | null
    /**
     * Filter, which VenueSection to fetch.
     */
    where?: VenueSectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VenueSections to fetch.
     */
    orderBy?: VenueSectionOrderByWithRelationInput | VenueSectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VenueSections.
     */
    cursor?: VenueSectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VenueSections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VenueSections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VenueSections.
     */
    distinct?: VenueSectionScalarFieldEnum | VenueSectionScalarFieldEnum[]
  }

  /**
   * VenueSection findFirstOrThrow
   */
  export type VenueSectionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VenueSection
     */
    select?: VenueSectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VenueSection
     */
    omit?: VenueSectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueSectionInclude<ExtArgs> | null
    /**
     * Filter, which VenueSection to fetch.
     */
    where?: VenueSectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VenueSections to fetch.
     */
    orderBy?: VenueSectionOrderByWithRelationInput | VenueSectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VenueSections.
     */
    cursor?: VenueSectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VenueSections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VenueSections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VenueSections.
     */
    distinct?: VenueSectionScalarFieldEnum | VenueSectionScalarFieldEnum[]
  }

  /**
   * VenueSection findMany
   */
  export type VenueSectionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VenueSection
     */
    select?: VenueSectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VenueSection
     */
    omit?: VenueSectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueSectionInclude<ExtArgs> | null
    /**
     * Filter, which VenueSections to fetch.
     */
    where?: VenueSectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VenueSections to fetch.
     */
    orderBy?: VenueSectionOrderByWithRelationInput | VenueSectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VenueSections.
     */
    cursor?: VenueSectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VenueSections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VenueSections.
     */
    skip?: number
    distinct?: VenueSectionScalarFieldEnum | VenueSectionScalarFieldEnum[]
  }

  /**
   * VenueSection create
   */
  export type VenueSectionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VenueSection
     */
    select?: VenueSectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VenueSection
     */
    omit?: VenueSectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueSectionInclude<ExtArgs> | null
    /**
     * The data needed to create a VenueSection.
     */
    data: XOR<VenueSectionCreateInput, VenueSectionUncheckedCreateInput>
  }

  /**
   * VenueSection createMany
   */
  export type VenueSectionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VenueSections.
     */
    data: VenueSectionCreateManyInput | VenueSectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VenueSection createManyAndReturn
   */
  export type VenueSectionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VenueSection
     */
    select?: VenueSectionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VenueSection
     */
    omit?: VenueSectionOmit<ExtArgs> | null
    /**
     * The data used to create many VenueSections.
     */
    data: VenueSectionCreateManyInput | VenueSectionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueSectionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VenueSection update
   */
  export type VenueSectionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VenueSection
     */
    select?: VenueSectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VenueSection
     */
    omit?: VenueSectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueSectionInclude<ExtArgs> | null
    /**
     * The data needed to update a VenueSection.
     */
    data: XOR<VenueSectionUpdateInput, VenueSectionUncheckedUpdateInput>
    /**
     * Choose, which VenueSection to update.
     */
    where: VenueSectionWhereUniqueInput
  }

  /**
   * VenueSection updateMany
   */
  export type VenueSectionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VenueSections.
     */
    data: XOR<VenueSectionUpdateManyMutationInput, VenueSectionUncheckedUpdateManyInput>
    /**
     * Filter which VenueSections to update
     */
    where?: VenueSectionWhereInput
    /**
     * Limit how many VenueSections to update.
     */
    limit?: number
  }

  /**
   * VenueSection updateManyAndReturn
   */
  export type VenueSectionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VenueSection
     */
    select?: VenueSectionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VenueSection
     */
    omit?: VenueSectionOmit<ExtArgs> | null
    /**
     * The data used to update VenueSections.
     */
    data: XOR<VenueSectionUpdateManyMutationInput, VenueSectionUncheckedUpdateManyInput>
    /**
     * Filter which VenueSections to update
     */
    where?: VenueSectionWhereInput
    /**
     * Limit how many VenueSections to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueSectionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * VenueSection upsert
   */
  export type VenueSectionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VenueSection
     */
    select?: VenueSectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VenueSection
     */
    omit?: VenueSectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueSectionInclude<ExtArgs> | null
    /**
     * The filter to search for the VenueSection to update in case it exists.
     */
    where: VenueSectionWhereUniqueInput
    /**
     * In case the VenueSection found by the `where` argument doesn't exist, create a new VenueSection with this data.
     */
    create: XOR<VenueSectionCreateInput, VenueSectionUncheckedCreateInput>
    /**
     * In case the VenueSection was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VenueSectionUpdateInput, VenueSectionUncheckedUpdateInput>
  }

  /**
   * VenueSection delete
   */
  export type VenueSectionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VenueSection
     */
    select?: VenueSectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VenueSection
     */
    omit?: VenueSectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueSectionInclude<ExtArgs> | null
    /**
     * Filter which VenueSection to delete.
     */
    where: VenueSectionWhereUniqueInput
  }

  /**
   * VenueSection deleteMany
   */
  export type VenueSectionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VenueSections to delete
     */
    where?: VenueSectionWhereInput
    /**
     * Limit how many VenueSections to delete.
     */
    limit?: number
  }

  /**
   * VenueSection.seats
   */
  export type VenueSection$seatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: SeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seat
     */
    omit?: SeatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeatInclude<ExtArgs> | null
    where?: SeatWhereInput
    orderBy?: SeatOrderByWithRelationInput | SeatOrderByWithRelationInput[]
    cursor?: SeatWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SeatScalarFieldEnum | SeatScalarFieldEnum[]
  }

  /**
   * VenueSection without action
   */
  export type VenueSectionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VenueSection
     */
    select?: VenueSectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VenueSection
     */
    omit?: VenueSectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueSectionInclude<ExtArgs> | null
  }


  /**
   * Model Seat
   */

  export type AggregateSeat = {
    _count: SeatCountAggregateOutputType | null
    _avg: SeatAvgAggregateOutputType | null
    _sum: SeatSumAggregateOutputType | null
    _min: SeatMinAggregateOutputType | null
    _max: SeatMaxAggregateOutputType | null
  }

  export type SeatAvgAggregateOutputType = {
    id: number | null
    venue_section_id: number | null
    row_number: number | null
    seat_number: number | null
  }

  export type SeatSumAggregateOutputType = {
    id: number | null
    venue_section_id: number | null
    row_number: number | null
    seat_number: number | null
  }

  export type SeatMinAggregateOutputType = {
    id: number | null
    venue_section_id: number | null
    row_number: number | null
    seat_number: number | null
    is_available: boolean | null
    is_accessible: boolean | null
    created_at: Date | null
  }

  export type SeatMaxAggregateOutputType = {
    id: number | null
    venue_section_id: number | null
    row_number: number | null
    seat_number: number | null
    is_available: boolean | null
    is_accessible: boolean | null
    created_at: Date | null
  }

  export type SeatCountAggregateOutputType = {
    id: number
    venue_section_id: number
    row_number: number
    seat_number: number
    is_available: number
    is_accessible: number
    created_at: number
    _all: number
  }


  export type SeatAvgAggregateInputType = {
    id?: true
    venue_section_id?: true
    row_number?: true
    seat_number?: true
  }

  export type SeatSumAggregateInputType = {
    id?: true
    venue_section_id?: true
    row_number?: true
    seat_number?: true
  }

  export type SeatMinAggregateInputType = {
    id?: true
    venue_section_id?: true
    row_number?: true
    seat_number?: true
    is_available?: true
    is_accessible?: true
    created_at?: true
  }

  export type SeatMaxAggregateInputType = {
    id?: true
    venue_section_id?: true
    row_number?: true
    seat_number?: true
    is_available?: true
    is_accessible?: true
    created_at?: true
  }

  export type SeatCountAggregateInputType = {
    id?: true
    venue_section_id?: true
    row_number?: true
    seat_number?: true
    is_available?: true
    is_accessible?: true
    created_at?: true
    _all?: true
  }

  export type SeatAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Seat to aggregate.
     */
    where?: SeatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Seats to fetch.
     */
    orderBy?: SeatOrderByWithRelationInput | SeatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SeatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Seats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Seats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Seats
    **/
    _count?: true | SeatCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SeatAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SeatSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SeatMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SeatMaxAggregateInputType
  }

  export type GetSeatAggregateType<T extends SeatAggregateArgs> = {
        [P in keyof T & keyof AggregateSeat]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSeat[P]>
      : GetScalarType<T[P], AggregateSeat[P]>
  }




  export type SeatGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SeatWhereInput
    orderBy?: SeatOrderByWithAggregationInput | SeatOrderByWithAggregationInput[]
    by: SeatScalarFieldEnum[] | SeatScalarFieldEnum
    having?: SeatScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SeatCountAggregateInputType | true
    _avg?: SeatAvgAggregateInputType
    _sum?: SeatSumAggregateInputType
    _min?: SeatMinAggregateInputType
    _max?: SeatMaxAggregateInputType
  }

  export type SeatGroupByOutputType = {
    id: number
    venue_section_id: number
    row_number: number
    seat_number: number
    is_available: boolean
    is_accessible: boolean
    created_at: Date
    _count: SeatCountAggregateOutputType | null
    _avg: SeatAvgAggregateOutputType | null
    _sum: SeatSumAggregateOutputType | null
    _min: SeatMinAggregateOutputType | null
    _max: SeatMaxAggregateOutputType | null
  }

  type GetSeatGroupByPayload<T extends SeatGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SeatGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SeatGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SeatGroupByOutputType[P]>
            : GetScalarType<T[P], SeatGroupByOutputType[P]>
        }
      >
    >


  export type SeatSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    venue_section_id?: boolean
    row_number?: boolean
    seat_number?: boolean
    is_available?: boolean
    is_accessible?: boolean
    created_at?: boolean
    venueSection?: boolean | VenueSectionDefaultArgs<ExtArgs>
    booked_seats?: boolean | Seat$booked_seatsArgs<ExtArgs>
    _count?: boolean | SeatCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["seat"]>

  export type SeatSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    venue_section_id?: boolean
    row_number?: boolean
    seat_number?: boolean
    is_available?: boolean
    is_accessible?: boolean
    created_at?: boolean
    venueSection?: boolean | VenueSectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["seat"]>

  export type SeatSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    venue_section_id?: boolean
    row_number?: boolean
    seat_number?: boolean
    is_available?: boolean
    is_accessible?: boolean
    created_at?: boolean
    venueSection?: boolean | VenueSectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["seat"]>

  export type SeatSelectScalar = {
    id?: boolean
    venue_section_id?: boolean
    row_number?: boolean
    seat_number?: boolean
    is_available?: boolean
    is_accessible?: boolean
    created_at?: boolean
  }

  export type SeatOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "venue_section_id" | "row_number" | "seat_number" | "is_available" | "is_accessible" | "created_at", ExtArgs["result"]["seat"]>
  export type SeatInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    venueSection?: boolean | VenueSectionDefaultArgs<ExtArgs>
    booked_seats?: boolean | Seat$booked_seatsArgs<ExtArgs>
    _count?: boolean | SeatCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SeatIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    venueSection?: boolean | VenueSectionDefaultArgs<ExtArgs>
  }
  export type SeatIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    venueSection?: boolean | VenueSectionDefaultArgs<ExtArgs>
  }

  export type $SeatPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Seat"
    objects: {
      venueSection: Prisma.$VenueSectionPayload<ExtArgs>
      booked_seats: Prisma.$BookedSeatPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      venue_section_id: number
      row_number: number
      seat_number: number
      is_available: boolean
      is_accessible: boolean
      created_at: Date
    }, ExtArgs["result"]["seat"]>
    composites: {}
  }

  type SeatGetPayload<S extends boolean | null | undefined | SeatDefaultArgs> = $Result.GetResult<Prisma.$SeatPayload, S>

  type SeatCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SeatFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SeatCountAggregateInputType | true
    }

  export interface SeatDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Seat'], meta: { name: 'Seat' } }
    /**
     * Find zero or one Seat that matches the filter.
     * @param {SeatFindUniqueArgs} args - Arguments to find a Seat
     * @example
     * // Get one Seat
     * const seat = await prisma.seat.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SeatFindUniqueArgs>(args: SelectSubset<T, SeatFindUniqueArgs<ExtArgs>>): Prisma__SeatClient<$Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Seat that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SeatFindUniqueOrThrowArgs} args - Arguments to find a Seat
     * @example
     * // Get one Seat
     * const seat = await prisma.seat.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SeatFindUniqueOrThrowArgs>(args: SelectSubset<T, SeatFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SeatClient<$Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Seat that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeatFindFirstArgs} args - Arguments to find a Seat
     * @example
     * // Get one Seat
     * const seat = await prisma.seat.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SeatFindFirstArgs>(args?: SelectSubset<T, SeatFindFirstArgs<ExtArgs>>): Prisma__SeatClient<$Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Seat that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeatFindFirstOrThrowArgs} args - Arguments to find a Seat
     * @example
     * // Get one Seat
     * const seat = await prisma.seat.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SeatFindFirstOrThrowArgs>(args?: SelectSubset<T, SeatFindFirstOrThrowArgs<ExtArgs>>): Prisma__SeatClient<$Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Seats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeatFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Seats
     * const seats = await prisma.seat.findMany()
     * 
     * // Get first 10 Seats
     * const seats = await prisma.seat.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const seatWithIdOnly = await prisma.seat.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SeatFindManyArgs>(args?: SelectSubset<T, SeatFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Seat.
     * @param {SeatCreateArgs} args - Arguments to create a Seat.
     * @example
     * // Create one Seat
     * const Seat = await prisma.seat.create({
     *   data: {
     *     // ... data to create a Seat
     *   }
     * })
     * 
     */
    create<T extends SeatCreateArgs>(args: SelectSubset<T, SeatCreateArgs<ExtArgs>>): Prisma__SeatClient<$Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Seats.
     * @param {SeatCreateManyArgs} args - Arguments to create many Seats.
     * @example
     * // Create many Seats
     * const seat = await prisma.seat.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SeatCreateManyArgs>(args?: SelectSubset<T, SeatCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Seats and returns the data saved in the database.
     * @param {SeatCreateManyAndReturnArgs} args - Arguments to create many Seats.
     * @example
     * // Create many Seats
     * const seat = await prisma.seat.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Seats and only return the `id`
     * const seatWithIdOnly = await prisma.seat.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SeatCreateManyAndReturnArgs>(args?: SelectSubset<T, SeatCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Seat.
     * @param {SeatDeleteArgs} args - Arguments to delete one Seat.
     * @example
     * // Delete one Seat
     * const Seat = await prisma.seat.delete({
     *   where: {
     *     // ... filter to delete one Seat
     *   }
     * })
     * 
     */
    delete<T extends SeatDeleteArgs>(args: SelectSubset<T, SeatDeleteArgs<ExtArgs>>): Prisma__SeatClient<$Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Seat.
     * @param {SeatUpdateArgs} args - Arguments to update one Seat.
     * @example
     * // Update one Seat
     * const seat = await prisma.seat.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SeatUpdateArgs>(args: SelectSubset<T, SeatUpdateArgs<ExtArgs>>): Prisma__SeatClient<$Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Seats.
     * @param {SeatDeleteManyArgs} args - Arguments to filter Seats to delete.
     * @example
     * // Delete a few Seats
     * const { count } = await prisma.seat.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SeatDeleteManyArgs>(args?: SelectSubset<T, SeatDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Seats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeatUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Seats
     * const seat = await prisma.seat.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SeatUpdateManyArgs>(args: SelectSubset<T, SeatUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Seats and returns the data updated in the database.
     * @param {SeatUpdateManyAndReturnArgs} args - Arguments to update many Seats.
     * @example
     * // Update many Seats
     * const seat = await prisma.seat.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Seats and only return the `id`
     * const seatWithIdOnly = await prisma.seat.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SeatUpdateManyAndReturnArgs>(args: SelectSubset<T, SeatUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Seat.
     * @param {SeatUpsertArgs} args - Arguments to update or create a Seat.
     * @example
     * // Update or create a Seat
     * const seat = await prisma.seat.upsert({
     *   create: {
     *     // ... data to create a Seat
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Seat we want to update
     *   }
     * })
     */
    upsert<T extends SeatUpsertArgs>(args: SelectSubset<T, SeatUpsertArgs<ExtArgs>>): Prisma__SeatClient<$Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Seats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeatCountArgs} args - Arguments to filter Seats to count.
     * @example
     * // Count the number of Seats
     * const count = await prisma.seat.count({
     *   where: {
     *     // ... the filter for the Seats we want to count
     *   }
     * })
    **/
    count<T extends SeatCountArgs>(
      args?: Subset<T, SeatCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SeatCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Seat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeatAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SeatAggregateArgs>(args: Subset<T, SeatAggregateArgs>): Prisma.PrismaPromise<GetSeatAggregateType<T>>

    /**
     * Group by Seat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeatGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SeatGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SeatGroupByArgs['orderBy'] }
        : { orderBy?: SeatGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SeatGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSeatGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Seat model
   */
  readonly fields: SeatFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Seat.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SeatClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    venueSection<T extends VenueSectionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VenueSectionDefaultArgs<ExtArgs>>): Prisma__VenueSectionClient<$Result.GetResult<Prisma.$VenueSectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    booked_seats<T extends Seat$booked_seatsArgs<ExtArgs> = {}>(args?: Subset<T, Seat$booked_seatsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookedSeatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Seat model
   */
  interface SeatFieldRefs {
    readonly id: FieldRef<"Seat", 'Int'>
    readonly venue_section_id: FieldRef<"Seat", 'Int'>
    readonly row_number: FieldRef<"Seat", 'Int'>
    readonly seat_number: FieldRef<"Seat", 'Int'>
    readonly is_available: FieldRef<"Seat", 'Boolean'>
    readonly is_accessible: FieldRef<"Seat", 'Boolean'>
    readonly created_at: FieldRef<"Seat", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Seat findUnique
   */
  export type SeatFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: SeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seat
     */
    omit?: SeatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeatInclude<ExtArgs> | null
    /**
     * Filter, which Seat to fetch.
     */
    where: SeatWhereUniqueInput
  }

  /**
   * Seat findUniqueOrThrow
   */
  export type SeatFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: SeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seat
     */
    omit?: SeatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeatInclude<ExtArgs> | null
    /**
     * Filter, which Seat to fetch.
     */
    where: SeatWhereUniqueInput
  }

  /**
   * Seat findFirst
   */
  export type SeatFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: SeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seat
     */
    omit?: SeatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeatInclude<ExtArgs> | null
    /**
     * Filter, which Seat to fetch.
     */
    where?: SeatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Seats to fetch.
     */
    orderBy?: SeatOrderByWithRelationInput | SeatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Seats.
     */
    cursor?: SeatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Seats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Seats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Seats.
     */
    distinct?: SeatScalarFieldEnum | SeatScalarFieldEnum[]
  }

  /**
   * Seat findFirstOrThrow
   */
  export type SeatFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: SeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seat
     */
    omit?: SeatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeatInclude<ExtArgs> | null
    /**
     * Filter, which Seat to fetch.
     */
    where?: SeatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Seats to fetch.
     */
    orderBy?: SeatOrderByWithRelationInput | SeatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Seats.
     */
    cursor?: SeatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Seats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Seats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Seats.
     */
    distinct?: SeatScalarFieldEnum | SeatScalarFieldEnum[]
  }

  /**
   * Seat findMany
   */
  export type SeatFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: SeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seat
     */
    omit?: SeatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeatInclude<ExtArgs> | null
    /**
     * Filter, which Seats to fetch.
     */
    where?: SeatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Seats to fetch.
     */
    orderBy?: SeatOrderByWithRelationInput | SeatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Seats.
     */
    cursor?: SeatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Seats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Seats.
     */
    skip?: number
    distinct?: SeatScalarFieldEnum | SeatScalarFieldEnum[]
  }

  /**
   * Seat create
   */
  export type SeatCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: SeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seat
     */
    omit?: SeatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeatInclude<ExtArgs> | null
    /**
     * The data needed to create a Seat.
     */
    data: XOR<SeatCreateInput, SeatUncheckedCreateInput>
  }

  /**
   * Seat createMany
   */
  export type SeatCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Seats.
     */
    data: SeatCreateManyInput | SeatCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Seat createManyAndReturn
   */
  export type SeatCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: SeatSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Seat
     */
    omit?: SeatOmit<ExtArgs> | null
    /**
     * The data used to create many Seats.
     */
    data: SeatCreateManyInput | SeatCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeatIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Seat update
   */
  export type SeatUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: SeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seat
     */
    omit?: SeatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeatInclude<ExtArgs> | null
    /**
     * The data needed to update a Seat.
     */
    data: XOR<SeatUpdateInput, SeatUncheckedUpdateInput>
    /**
     * Choose, which Seat to update.
     */
    where: SeatWhereUniqueInput
  }

  /**
   * Seat updateMany
   */
  export type SeatUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Seats.
     */
    data: XOR<SeatUpdateManyMutationInput, SeatUncheckedUpdateManyInput>
    /**
     * Filter which Seats to update
     */
    where?: SeatWhereInput
    /**
     * Limit how many Seats to update.
     */
    limit?: number
  }

  /**
   * Seat updateManyAndReturn
   */
  export type SeatUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: SeatSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Seat
     */
    omit?: SeatOmit<ExtArgs> | null
    /**
     * The data used to update Seats.
     */
    data: XOR<SeatUpdateManyMutationInput, SeatUncheckedUpdateManyInput>
    /**
     * Filter which Seats to update
     */
    where?: SeatWhereInput
    /**
     * Limit how many Seats to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeatIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Seat upsert
   */
  export type SeatUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: SeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seat
     */
    omit?: SeatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeatInclude<ExtArgs> | null
    /**
     * The filter to search for the Seat to update in case it exists.
     */
    where: SeatWhereUniqueInput
    /**
     * In case the Seat found by the `where` argument doesn't exist, create a new Seat with this data.
     */
    create: XOR<SeatCreateInput, SeatUncheckedCreateInput>
    /**
     * In case the Seat was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SeatUpdateInput, SeatUncheckedUpdateInput>
  }

  /**
   * Seat delete
   */
  export type SeatDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: SeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seat
     */
    omit?: SeatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeatInclude<ExtArgs> | null
    /**
     * Filter which Seat to delete.
     */
    where: SeatWhereUniqueInput
  }

  /**
   * Seat deleteMany
   */
  export type SeatDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Seats to delete
     */
    where?: SeatWhereInput
    /**
     * Limit how many Seats to delete.
     */
    limit?: number
  }

  /**
   * Seat.booked_seats
   */
  export type Seat$booked_seatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedSeat
     */
    select?: BookedSeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookedSeat
     */
    omit?: BookedSeatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedSeatInclude<ExtArgs> | null
    where?: BookedSeatWhereInput
    orderBy?: BookedSeatOrderByWithRelationInput | BookedSeatOrderByWithRelationInput[]
    cursor?: BookedSeatWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookedSeatScalarFieldEnum | BookedSeatScalarFieldEnum[]
  }

  /**
   * Seat without action
   */
  export type SeatDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: SeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seat
     */
    omit?: SeatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeatInclude<ExtArgs> | null
  }


  /**
   * Model Event
   */

  export type AggregateEvent = {
    _count: EventCountAggregateOutputType | null
    _avg: EventAvgAggregateOutputType | null
    _sum: EventSumAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  export type EventAvgAggregateOutputType = {
    id: number | null
    theatre_id: number | null
    venue_id: number | null
    price: Decimal | null
  }

  export type EventSumAggregateOutputType = {
    id: number | null
    theatre_id: number | null
    venue_id: number | null
    price: Decimal | null
  }

  export type EventMinAggregateOutputType = {
    id: number | null
    title: string | null
    theatre_id: number | null
    venue_id: number | null
    event_type: $Enums.EventType | null
    event_date: Date | null
    event_time: Date | null
    description: string | null
    price: Decimal | null
    image_url: string | null
    poster_url: string | null
    language: string | null
    content_language: string | null
    translation_group: string | null
    genre: string | null
    director: string | null
    synopsis: string | null
    subtitles: string | null
    duration: string | null
    is_featured: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type EventMaxAggregateOutputType = {
    id: number | null
    title: string | null
    theatre_id: number | null
    venue_id: number | null
    event_type: $Enums.EventType | null
    event_date: Date | null
    event_time: Date | null
    description: string | null
    price: Decimal | null
    image_url: string | null
    poster_url: string | null
    language: string | null
    content_language: string | null
    translation_group: string | null
    genre: string | null
    director: string | null
    synopsis: string | null
    subtitles: string | null
    duration: string | null
    is_featured: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type EventCountAggregateOutputType = {
    id: number
    title: number
    theatre_id: number
    venue_id: number
    event_type: number
    event_date: number
    event_time: number
    description: number
    price: number
    image_url: number
    poster_url: number
    language: number
    content_language: number
    translation_group: number
    genre: number
    company: number
    director: number
    cast: number
    synopsis: number
    subtitles: number
    duration: number
    is_featured: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type EventAvgAggregateInputType = {
    id?: true
    theatre_id?: true
    venue_id?: true
    price?: true
  }

  export type EventSumAggregateInputType = {
    id?: true
    theatre_id?: true
    venue_id?: true
    price?: true
  }

  export type EventMinAggregateInputType = {
    id?: true
    title?: true
    theatre_id?: true
    venue_id?: true
    event_type?: true
    event_date?: true
    event_time?: true
    description?: true
    price?: true
    image_url?: true
    poster_url?: true
    language?: true
    content_language?: true
    translation_group?: true
    genre?: true
    director?: true
    synopsis?: true
    subtitles?: true
    duration?: true
    is_featured?: true
    created_at?: true
    updated_at?: true
  }

  export type EventMaxAggregateInputType = {
    id?: true
    title?: true
    theatre_id?: true
    venue_id?: true
    event_type?: true
    event_date?: true
    event_time?: true
    description?: true
    price?: true
    image_url?: true
    poster_url?: true
    language?: true
    content_language?: true
    translation_group?: true
    genre?: true
    director?: true
    synopsis?: true
    subtitles?: true
    duration?: true
    is_featured?: true
    created_at?: true
    updated_at?: true
  }

  export type EventCountAggregateInputType = {
    id?: true
    title?: true
    theatre_id?: true
    venue_id?: true
    event_type?: true
    event_date?: true
    event_time?: true
    description?: true
    price?: true
    image_url?: true
    poster_url?: true
    language?: true
    content_language?: true
    translation_group?: true
    genre?: true
    company?: true
    director?: true
    cast?: true
    synopsis?: true
    subtitles?: true
    duration?: true
    is_featured?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type EventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Event to aggregate.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Events
    **/
    _count?: true | EventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventMaxAggregateInputType
  }

  export type GetEventAggregateType<T extends EventAggregateArgs> = {
        [P in keyof T & keyof AggregateEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvent[P]>
      : GetScalarType<T[P], AggregateEvent[P]>
  }




  export type EventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
    orderBy?: EventOrderByWithAggregationInput | EventOrderByWithAggregationInput[]
    by: EventScalarFieldEnum[] | EventScalarFieldEnum
    having?: EventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventCountAggregateInputType | true
    _avg?: EventAvgAggregateInputType
    _sum?: EventSumAggregateInputType
    _min?: EventMinAggregateInputType
    _max?: EventMaxAggregateInputType
  }

  export type EventGroupByOutputType = {
    id: number
    title: string
    theatre_id: number
    venue_id: number | null
    event_type: $Enums.EventType
    event_date: Date
    event_time: Date
    description: string | null
    price: Decimal
    image_url: string | null
    poster_url: string | null
    language: string | null
    content_language: string
    translation_group: string | null
    genre: string | null
    company: string[]
    director: string | null
    cast: string[]
    synopsis: string | null
    subtitles: string | null
    duration: string | null
    is_featured: boolean
    created_at: Date
    updated_at: Date
    _count: EventCountAggregateOutputType | null
    _avg: EventAvgAggregateOutputType | null
    _sum: EventSumAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  type GetEventGroupByPayload<T extends EventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventGroupByOutputType[P]>
            : GetScalarType<T[P], EventGroupByOutputType[P]>
        }
      >
    >


  export type EventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    theatre_id?: boolean
    venue_id?: boolean
    event_type?: boolean
    event_date?: boolean
    event_time?: boolean
    description?: boolean
    price?: boolean
    image_url?: boolean
    poster_url?: boolean
    language?: boolean
    content_language?: boolean
    translation_group?: boolean
    genre?: boolean
    company?: boolean
    director?: boolean
    cast?: boolean
    synopsis?: boolean
    subtitles?: boolean
    duration?: boolean
    is_featured?: boolean
    created_at?: boolean
    updated_at?: boolean
    theatre?: boolean | TheatreDefaultArgs<ExtArgs>
    venue?: boolean | Event$venueArgs<ExtArgs>
    bookings?: boolean | Event$bookingsArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    theatre_id?: boolean
    venue_id?: boolean
    event_type?: boolean
    event_date?: boolean
    event_time?: boolean
    description?: boolean
    price?: boolean
    image_url?: boolean
    poster_url?: boolean
    language?: boolean
    content_language?: boolean
    translation_group?: boolean
    genre?: boolean
    company?: boolean
    director?: boolean
    cast?: boolean
    synopsis?: boolean
    subtitles?: boolean
    duration?: boolean
    is_featured?: boolean
    created_at?: boolean
    updated_at?: boolean
    theatre?: boolean | TheatreDefaultArgs<ExtArgs>
    venue?: boolean | Event$venueArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    theatre_id?: boolean
    venue_id?: boolean
    event_type?: boolean
    event_date?: boolean
    event_time?: boolean
    description?: boolean
    price?: boolean
    image_url?: boolean
    poster_url?: boolean
    language?: boolean
    content_language?: boolean
    translation_group?: boolean
    genre?: boolean
    company?: boolean
    director?: boolean
    cast?: boolean
    synopsis?: boolean
    subtitles?: boolean
    duration?: boolean
    is_featured?: boolean
    created_at?: boolean
    updated_at?: boolean
    theatre?: boolean | TheatreDefaultArgs<ExtArgs>
    venue?: boolean | Event$venueArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectScalar = {
    id?: boolean
    title?: boolean
    theatre_id?: boolean
    venue_id?: boolean
    event_type?: boolean
    event_date?: boolean
    event_time?: boolean
    description?: boolean
    price?: boolean
    image_url?: boolean
    poster_url?: boolean
    language?: boolean
    content_language?: boolean
    translation_group?: boolean
    genre?: boolean
    company?: boolean
    director?: boolean
    cast?: boolean
    synopsis?: boolean
    subtitles?: boolean
    duration?: boolean
    is_featured?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type EventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "theatre_id" | "venue_id" | "event_type" | "event_date" | "event_time" | "description" | "price" | "image_url" | "poster_url" | "language" | "content_language" | "translation_group" | "genre" | "company" | "director" | "cast" | "synopsis" | "subtitles" | "duration" | "is_featured" | "created_at" | "updated_at", ExtArgs["result"]["event"]>
  export type EventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    theatre?: boolean | TheatreDefaultArgs<ExtArgs>
    venue?: boolean | Event$venueArgs<ExtArgs>
    bookings?: boolean | Event$bookingsArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    theatre?: boolean | TheatreDefaultArgs<ExtArgs>
    venue?: boolean | Event$venueArgs<ExtArgs>
  }
  export type EventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    theatre?: boolean | TheatreDefaultArgs<ExtArgs>
    venue?: boolean | Event$venueArgs<ExtArgs>
  }

  export type $EventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Event"
    objects: {
      theatre: Prisma.$TheatrePayload<ExtArgs>
      venue: Prisma.$VenuePayload<ExtArgs> | null
      bookings: Prisma.$BookingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      theatre_id: number
      venue_id: number | null
      event_type: $Enums.EventType
      event_date: Date
      event_time: Date
      description: string | null
      price: Prisma.Decimal
      image_url: string | null
      poster_url: string | null
      language: string | null
      content_language: string
      translation_group: string | null
      genre: string | null
      company: string[]
      director: string | null
      cast: string[]
      synopsis: string | null
      subtitles: string | null
      duration: string | null
      is_featured: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["event"]>
    composites: {}
  }

  type EventGetPayload<S extends boolean | null | undefined | EventDefaultArgs> = $Result.GetResult<Prisma.$EventPayload, S>

  type EventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventCountAggregateInputType | true
    }

  export interface EventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Event'], meta: { name: 'Event' } }
    /**
     * Find zero or one Event that matches the filter.
     * @param {EventFindUniqueArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventFindUniqueArgs>(args: SelectSubset<T, EventFindUniqueArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Event that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventFindUniqueOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventFindUniqueOrThrowArgs>(args: SelectSubset<T, EventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventFindFirstArgs>(args?: SelectSubset<T, EventFindFirstArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventFindFirstOrThrowArgs>(args?: SelectSubset<T, EventFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Events
     * const events = await prisma.event.findMany()
     * 
     * // Get first 10 Events
     * const events = await prisma.event.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventWithIdOnly = await prisma.event.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EventFindManyArgs>(args?: SelectSubset<T, EventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Event.
     * @param {EventCreateArgs} args - Arguments to create a Event.
     * @example
     * // Create one Event
     * const Event = await prisma.event.create({
     *   data: {
     *     // ... data to create a Event
     *   }
     * })
     * 
     */
    create<T extends EventCreateArgs>(args: SelectSubset<T, EventCreateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Events.
     * @param {EventCreateManyArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventCreateManyArgs>(args?: SelectSubset<T, EventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Events and returns the data saved in the database.
     * @param {EventCreateManyAndReturnArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Events and only return the `id`
     * const eventWithIdOnly = await prisma.event.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventCreateManyAndReturnArgs>(args?: SelectSubset<T, EventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Event.
     * @param {EventDeleteArgs} args - Arguments to delete one Event.
     * @example
     * // Delete one Event
     * const Event = await prisma.event.delete({
     *   where: {
     *     // ... filter to delete one Event
     *   }
     * })
     * 
     */
    delete<T extends EventDeleteArgs>(args: SelectSubset<T, EventDeleteArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Event.
     * @param {EventUpdateArgs} args - Arguments to update one Event.
     * @example
     * // Update one Event
     * const event = await prisma.event.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventUpdateArgs>(args: SelectSubset<T, EventUpdateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Events.
     * @param {EventDeleteManyArgs} args - Arguments to filter Events to delete.
     * @example
     * // Delete a few Events
     * const { count } = await prisma.event.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventDeleteManyArgs>(args?: SelectSubset<T, EventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventUpdateManyArgs>(args: SelectSubset<T, EventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events and returns the data updated in the database.
     * @param {EventUpdateManyAndReturnArgs} args - Arguments to update many Events.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Events and only return the `id`
     * const eventWithIdOnly = await prisma.event.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EventUpdateManyAndReturnArgs>(args: SelectSubset<T, EventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Event.
     * @param {EventUpsertArgs} args - Arguments to update or create a Event.
     * @example
     * // Update or create a Event
     * const event = await prisma.event.upsert({
     *   create: {
     *     // ... data to create a Event
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Event we want to update
     *   }
     * })
     */
    upsert<T extends EventUpsertArgs>(args: SelectSubset<T, EventUpsertArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCountArgs} args - Arguments to filter Events to count.
     * @example
     * // Count the number of Events
     * const count = await prisma.event.count({
     *   where: {
     *     // ... the filter for the Events we want to count
     *   }
     * })
    **/
    count<T extends EventCountArgs>(
      args?: Subset<T, EventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventAggregateArgs>(args: Subset<T, EventAggregateArgs>): Prisma.PrismaPromise<GetEventAggregateType<T>>

    /**
     * Group by Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventGroupByArgs['orderBy'] }
        : { orderBy?: EventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Event model
   */
  readonly fields: EventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Event.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    theatre<T extends TheatreDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TheatreDefaultArgs<ExtArgs>>): Prisma__TheatreClient<$Result.GetResult<Prisma.$TheatrePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    venue<T extends Event$venueArgs<ExtArgs> = {}>(args?: Subset<T, Event$venueArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    bookings<T extends Event$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, Event$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Event model
   */
  interface EventFieldRefs {
    readonly id: FieldRef<"Event", 'Int'>
    readonly title: FieldRef<"Event", 'String'>
    readonly theatre_id: FieldRef<"Event", 'Int'>
    readonly venue_id: FieldRef<"Event", 'Int'>
    readonly event_type: FieldRef<"Event", 'EventType'>
    readonly event_date: FieldRef<"Event", 'DateTime'>
    readonly event_time: FieldRef<"Event", 'DateTime'>
    readonly description: FieldRef<"Event", 'String'>
    readonly price: FieldRef<"Event", 'Decimal'>
    readonly image_url: FieldRef<"Event", 'String'>
    readonly poster_url: FieldRef<"Event", 'String'>
    readonly language: FieldRef<"Event", 'String'>
    readonly content_language: FieldRef<"Event", 'String'>
    readonly translation_group: FieldRef<"Event", 'String'>
    readonly genre: FieldRef<"Event", 'String'>
    readonly company: FieldRef<"Event", 'String[]'>
    readonly director: FieldRef<"Event", 'String'>
    readonly cast: FieldRef<"Event", 'String[]'>
    readonly synopsis: FieldRef<"Event", 'String'>
    readonly subtitles: FieldRef<"Event", 'String'>
    readonly duration: FieldRef<"Event", 'String'>
    readonly is_featured: FieldRef<"Event", 'Boolean'>
    readonly created_at: FieldRef<"Event", 'DateTime'>
    readonly updated_at: FieldRef<"Event", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Event findUnique
   */
  export type EventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findUniqueOrThrow
   */
  export type EventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findFirst
   */
  export type EventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findFirstOrThrow
   */
  export type EventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findMany
   */
  export type EventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Events to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event create
   */
  export type EventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to create a Event.
     */
    data: XOR<EventCreateInput, EventUncheckedCreateInput>
  }

  /**
   * Event createMany
   */
  export type EventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Event createManyAndReturn
   */
  export type EventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Event update
   */
  export type EventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to update a Event.
     */
    data: XOR<EventUpdateInput, EventUncheckedUpdateInput>
    /**
     * Choose, which Event to update.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event updateMany
   */
  export type EventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
  }

  /**
   * Event updateManyAndReturn
   */
  export type EventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Event upsert
   */
  export type EventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The filter to search for the Event to update in case it exists.
     */
    where: EventWhereUniqueInput
    /**
     * In case the Event found by the `where` argument doesn't exist, create a new Event with this data.
     */
    create: XOR<EventCreateInput, EventUncheckedCreateInput>
    /**
     * In case the Event was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventUpdateInput, EventUncheckedUpdateInput>
  }

  /**
   * Event delete
   */
  export type EventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter which Event to delete.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event deleteMany
   */
  export type EventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Events to delete
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to delete.
     */
    limit?: number
  }

  /**
   * Event.venue
   */
  export type Event$venueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    where?: VenueWhereInput
  }

  /**
   * Event.bookings
   */
  export type Event$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    cursor?: BookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Event without action
   */
  export type EventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
  }


  /**
   * Model Booking
   */

  export type AggregateBooking = {
    _count: BookingCountAggregateOutputType | null
    _avg: BookingAvgAggregateOutputType | null
    _sum: BookingSumAggregateOutputType | null
    _min: BookingMinAggregateOutputType | null
    _max: BookingMaxAggregateOutputType | null
  }

  export type BookingAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
    event_id: number | null
    total_amount: Decimal | null
  }

  export type BookingSumAggregateOutputType = {
    id: number | null
    user_id: number | null
    event_id: number | null
    total_amount: Decimal | null
  }

  export type BookingMinAggregateOutputType = {
    id: number | null
    user_id: number | null
    event_id: number | null
    booking_reference: string | null
    total_amount: Decimal | null
    booking_status: $Enums.BookingStatus | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type BookingMaxAggregateOutputType = {
    id: number | null
    user_id: number | null
    event_id: number | null
    booking_reference: string | null
    total_amount: Decimal | null
    booking_status: $Enums.BookingStatus | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type BookingCountAggregateOutputType = {
    id: number
    user_id: number
    event_id: number
    booking_reference: number
    total_amount: number
    booking_status: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type BookingAvgAggregateInputType = {
    id?: true
    user_id?: true
    event_id?: true
    total_amount?: true
  }

  export type BookingSumAggregateInputType = {
    id?: true
    user_id?: true
    event_id?: true
    total_amount?: true
  }

  export type BookingMinAggregateInputType = {
    id?: true
    user_id?: true
    event_id?: true
    booking_reference?: true
    total_amount?: true
    booking_status?: true
    created_at?: true
    updated_at?: true
  }

  export type BookingMaxAggregateInputType = {
    id?: true
    user_id?: true
    event_id?: true
    booking_reference?: true
    total_amount?: true
    booking_status?: true
    created_at?: true
    updated_at?: true
  }

  export type BookingCountAggregateInputType = {
    id?: true
    user_id?: true
    event_id?: true
    booking_reference?: true
    total_amount?: true
    booking_status?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type BookingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Booking to aggregate.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bookings
    **/
    _count?: true | BookingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BookingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BookingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookingMaxAggregateInputType
  }

  export type GetBookingAggregateType<T extends BookingAggregateArgs> = {
        [P in keyof T & keyof AggregateBooking]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBooking[P]>
      : GetScalarType<T[P], AggregateBooking[P]>
  }




  export type BookingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithAggregationInput | BookingOrderByWithAggregationInput[]
    by: BookingScalarFieldEnum[] | BookingScalarFieldEnum
    having?: BookingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookingCountAggregateInputType | true
    _avg?: BookingAvgAggregateInputType
    _sum?: BookingSumAggregateInputType
    _min?: BookingMinAggregateInputType
    _max?: BookingMaxAggregateInputType
  }

  export type BookingGroupByOutputType = {
    id: number
    user_id: number
    event_id: number
    booking_reference: string
    total_amount: Decimal
    booking_status: $Enums.BookingStatus
    created_at: Date
    updated_at: Date
    _count: BookingCountAggregateOutputType | null
    _avg: BookingAvgAggregateOutputType | null
    _sum: BookingSumAggregateOutputType | null
    _min: BookingMinAggregateOutputType | null
    _max: BookingMaxAggregateOutputType | null
  }

  type GetBookingGroupByPayload<T extends BookingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookingGroupByOutputType[P]>
            : GetScalarType<T[P], BookingGroupByOutputType[P]>
        }
      >
    >


  export type BookingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    event_id?: boolean
    booking_reference?: boolean
    total_amount?: boolean
    booking_status?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
    booked_seats?: boolean | Booking$booked_seatsArgs<ExtArgs>
    _count?: boolean | BookingCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    event_id?: boolean
    booking_reference?: boolean
    total_amount?: boolean
    booking_status?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    event_id?: boolean
    booking_reference?: boolean
    total_amount?: boolean
    booking_status?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectScalar = {
    id?: boolean
    user_id?: boolean
    event_id?: boolean
    booking_reference?: boolean
    total_amount?: boolean
    booking_status?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type BookingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "event_id" | "booking_reference" | "total_amount" | "booking_status" | "created_at" | "updated_at", ExtArgs["result"]["booking"]>
  export type BookingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
    booked_seats?: boolean | Booking$booked_seatsArgs<ExtArgs>
    _count?: boolean | BookingCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BookingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
  }
  export type BookingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
  }

  export type $BookingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Booking"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      event: Prisma.$EventPayload<ExtArgs>
      booked_seats: Prisma.$BookedSeatPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_id: number
      event_id: number
      booking_reference: string
      total_amount: Prisma.Decimal
      booking_status: $Enums.BookingStatus
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["booking"]>
    composites: {}
  }

  type BookingGetPayload<S extends boolean | null | undefined | BookingDefaultArgs> = $Result.GetResult<Prisma.$BookingPayload, S>

  type BookingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BookingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookingCountAggregateInputType | true
    }

  export interface BookingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Booking'], meta: { name: 'Booking' } }
    /**
     * Find zero or one Booking that matches the filter.
     * @param {BookingFindUniqueArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookingFindUniqueArgs>(args: SelectSubset<T, BookingFindUniqueArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Booking that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BookingFindUniqueOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookingFindUniqueOrThrowArgs>(args: SelectSubset<T, BookingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Booking that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookingFindFirstArgs>(args?: SelectSubset<T, BookingFindFirstArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Booking that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookingFindFirstOrThrowArgs>(args?: SelectSubset<T, BookingFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bookings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bookings
     * const bookings = await prisma.booking.findMany()
     * 
     * // Get first 10 Bookings
     * const bookings = await prisma.booking.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookingWithIdOnly = await prisma.booking.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookingFindManyArgs>(args?: SelectSubset<T, BookingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Booking.
     * @param {BookingCreateArgs} args - Arguments to create a Booking.
     * @example
     * // Create one Booking
     * const Booking = await prisma.booking.create({
     *   data: {
     *     // ... data to create a Booking
     *   }
     * })
     * 
     */
    create<T extends BookingCreateArgs>(args: SelectSubset<T, BookingCreateArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bookings.
     * @param {BookingCreateManyArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const booking = await prisma.booking.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookingCreateManyArgs>(args?: SelectSubset<T, BookingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bookings and returns the data saved in the database.
     * @param {BookingCreateManyAndReturnArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const booking = await prisma.booking.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bookings and only return the `id`
     * const bookingWithIdOnly = await prisma.booking.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BookingCreateManyAndReturnArgs>(args?: SelectSubset<T, BookingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Booking.
     * @param {BookingDeleteArgs} args - Arguments to delete one Booking.
     * @example
     * // Delete one Booking
     * const Booking = await prisma.booking.delete({
     *   where: {
     *     // ... filter to delete one Booking
     *   }
     * })
     * 
     */
    delete<T extends BookingDeleteArgs>(args: SelectSubset<T, BookingDeleteArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Booking.
     * @param {BookingUpdateArgs} args - Arguments to update one Booking.
     * @example
     * // Update one Booking
     * const booking = await prisma.booking.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookingUpdateArgs>(args: SelectSubset<T, BookingUpdateArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bookings.
     * @param {BookingDeleteManyArgs} args - Arguments to filter Bookings to delete.
     * @example
     * // Delete a few Bookings
     * const { count } = await prisma.booking.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookingDeleteManyArgs>(args?: SelectSubset<T, BookingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bookings
     * const booking = await prisma.booking.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookingUpdateManyArgs>(args: SelectSubset<T, BookingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookings and returns the data updated in the database.
     * @param {BookingUpdateManyAndReturnArgs} args - Arguments to update many Bookings.
     * @example
     * // Update many Bookings
     * const booking = await prisma.booking.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bookings and only return the `id`
     * const bookingWithIdOnly = await prisma.booking.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BookingUpdateManyAndReturnArgs>(args: SelectSubset<T, BookingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Booking.
     * @param {BookingUpsertArgs} args - Arguments to update or create a Booking.
     * @example
     * // Update or create a Booking
     * const booking = await prisma.booking.upsert({
     *   create: {
     *     // ... data to create a Booking
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Booking we want to update
     *   }
     * })
     */
    upsert<T extends BookingUpsertArgs>(args: SelectSubset<T, BookingUpsertArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingCountArgs} args - Arguments to filter Bookings to count.
     * @example
     * // Count the number of Bookings
     * const count = await prisma.booking.count({
     *   where: {
     *     // ... the filter for the Bookings we want to count
     *   }
     * })
    **/
    count<T extends BookingCountArgs>(
      args?: Subset<T, BookingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookingAggregateArgs>(args: Subset<T, BookingAggregateArgs>): Prisma.PrismaPromise<GetBookingAggregateType<T>>

    /**
     * Group by Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookingGroupByArgs['orderBy'] }
        : { orderBy?: BookingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Booking model
   */
  readonly fields: BookingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Booking.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    event<T extends EventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDefaultArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    booked_seats<T extends Booking$booked_seatsArgs<ExtArgs> = {}>(args?: Subset<T, Booking$booked_seatsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookedSeatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Booking model
   */
  interface BookingFieldRefs {
    readonly id: FieldRef<"Booking", 'Int'>
    readonly user_id: FieldRef<"Booking", 'Int'>
    readonly event_id: FieldRef<"Booking", 'Int'>
    readonly booking_reference: FieldRef<"Booking", 'String'>
    readonly total_amount: FieldRef<"Booking", 'Decimal'>
    readonly booking_status: FieldRef<"Booking", 'BookingStatus'>
    readonly created_at: FieldRef<"Booking", 'DateTime'>
    readonly updated_at: FieldRef<"Booking", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Booking findUnique
   */
  export type BookingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking findUniqueOrThrow
   */
  export type BookingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking findFirst
   */
  export type BookingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking findFirstOrThrow
   */
  export type BookingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking findMany
   */
  export type BookingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Bookings to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking create
   */
  export type BookingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The data needed to create a Booking.
     */
    data: XOR<BookingCreateInput, BookingUncheckedCreateInput>
  }

  /**
   * Booking createMany
   */
  export type BookingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bookings.
     */
    data: BookingCreateManyInput | BookingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Booking createManyAndReturn
   */
  export type BookingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * The data used to create many Bookings.
     */
    data: BookingCreateManyInput | BookingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Booking update
   */
  export type BookingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The data needed to update a Booking.
     */
    data: XOR<BookingUpdateInput, BookingUncheckedUpdateInput>
    /**
     * Choose, which Booking to update.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking updateMany
   */
  export type BookingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bookings.
     */
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyInput>
    /**
     * Filter which Bookings to update
     */
    where?: BookingWhereInput
    /**
     * Limit how many Bookings to update.
     */
    limit?: number
  }

  /**
   * Booking updateManyAndReturn
   */
  export type BookingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * The data used to update Bookings.
     */
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyInput>
    /**
     * Filter which Bookings to update
     */
    where?: BookingWhereInput
    /**
     * Limit how many Bookings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Booking upsert
   */
  export type BookingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The filter to search for the Booking to update in case it exists.
     */
    where: BookingWhereUniqueInput
    /**
     * In case the Booking found by the `where` argument doesn't exist, create a new Booking with this data.
     */
    create: XOR<BookingCreateInput, BookingUncheckedCreateInput>
    /**
     * In case the Booking was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookingUpdateInput, BookingUncheckedUpdateInput>
  }

  /**
   * Booking delete
   */
  export type BookingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter which Booking to delete.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking deleteMany
   */
  export type BookingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bookings to delete
     */
    where?: BookingWhereInput
    /**
     * Limit how many Bookings to delete.
     */
    limit?: number
  }

  /**
   * Booking.booked_seats
   */
  export type Booking$booked_seatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedSeat
     */
    select?: BookedSeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookedSeat
     */
    omit?: BookedSeatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedSeatInclude<ExtArgs> | null
    where?: BookedSeatWhereInput
    orderBy?: BookedSeatOrderByWithRelationInput | BookedSeatOrderByWithRelationInput[]
    cursor?: BookedSeatWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookedSeatScalarFieldEnum | BookedSeatScalarFieldEnum[]
  }

  /**
   * Booking without action
   */
  export type BookingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
  }


  /**
   * Model BookedSeat
   */

  export type AggregateBookedSeat = {
    _count: BookedSeatCountAggregateOutputType | null
    _avg: BookedSeatAvgAggregateOutputType | null
    _sum: BookedSeatSumAggregateOutputType | null
    _min: BookedSeatMinAggregateOutputType | null
    _max: BookedSeatMaxAggregateOutputType | null
  }

  export type BookedSeatAvgAggregateOutputType = {
    id: number | null
    booking_id: number | null
    seat_id: number | null
  }

  export type BookedSeatSumAggregateOutputType = {
    id: number | null
    booking_id: number | null
    seat_id: number | null
  }

  export type BookedSeatMinAggregateOutputType = {
    id: number | null
    booking_id: number | null
    seat_id: number | null
    created_at: Date | null
  }

  export type BookedSeatMaxAggregateOutputType = {
    id: number | null
    booking_id: number | null
    seat_id: number | null
    created_at: Date | null
  }

  export type BookedSeatCountAggregateOutputType = {
    id: number
    booking_id: number
    seat_id: number
    created_at: number
    _all: number
  }


  export type BookedSeatAvgAggregateInputType = {
    id?: true
    booking_id?: true
    seat_id?: true
  }

  export type BookedSeatSumAggregateInputType = {
    id?: true
    booking_id?: true
    seat_id?: true
  }

  export type BookedSeatMinAggregateInputType = {
    id?: true
    booking_id?: true
    seat_id?: true
    created_at?: true
  }

  export type BookedSeatMaxAggregateInputType = {
    id?: true
    booking_id?: true
    seat_id?: true
    created_at?: true
  }

  export type BookedSeatCountAggregateInputType = {
    id?: true
    booking_id?: true
    seat_id?: true
    created_at?: true
    _all?: true
  }

  export type BookedSeatAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BookedSeat to aggregate.
     */
    where?: BookedSeatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookedSeats to fetch.
     */
    orderBy?: BookedSeatOrderByWithRelationInput | BookedSeatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookedSeatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookedSeats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookedSeats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BookedSeats
    **/
    _count?: true | BookedSeatCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BookedSeatAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BookedSeatSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookedSeatMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookedSeatMaxAggregateInputType
  }

  export type GetBookedSeatAggregateType<T extends BookedSeatAggregateArgs> = {
        [P in keyof T & keyof AggregateBookedSeat]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBookedSeat[P]>
      : GetScalarType<T[P], AggregateBookedSeat[P]>
  }




  export type BookedSeatGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookedSeatWhereInput
    orderBy?: BookedSeatOrderByWithAggregationInput | BookedSeatOrderByWithAggregationInput[]
    by: BookedSeatScalarFieldEnum[] | BookedSeatScalarFieldEnum
    having?: BookedSeatScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookedSeatCountAggregateInputType | true
    _avg?: BookedSeatAvgAggregateInputType
    _sum?: BookedSeatSumAggregateInputType
    _min?: BookedSeatMinAggregateInputType
    _max?: BookedSeatMaxAggregateInputType
  }

  export type BookedSeatGroupByOutputType = {
    id: number
    booking_id: number
    seat_id: number
    created_at: Date
    _count: BookedSeatCountAggregateOutputType | null
    _avg: BookedSeatAvgAggregateOutputType | null
    _sum: BookedSeatSumAggregateOutputType | null
    _min: BookedSeatMinAggregateOutputType | null
    _max: BookedSeatMaxAggregateOutputType | null
  }

  type GetBookedSeatGroupByPayload<T extends BookedSeatGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookedSeatGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookedSeatGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookedSeatGroupByOutputType[P]>
            : GetScalarType<T[P], BookedSeatGroupByOutputType[P]>
        }
      >
    >


  export type BookedSeatSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    booking_id?: boolean
    seat_id?: boolean
    created_at?: boolean
    booking?: boolean | BookingDefaultArgs<ExtArgs>
    seat?: boolean | SeatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookedSeat"]>

  export type BookedSeatSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    booking_id?: boolean
    seat_id?: boolean
    created_at?: boolean
    booking?: boolean | BookingDefaultArgs<ExtArgs>
    seat?: boolean | SeatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookedSeat"]>

  export type BookedSeatSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    booking_id?: boolean
    seat_id?: boolean
    created_at?: boolean
    booking?: boolean | BookingDefaultArgs<ExtArgs>
    seat?: boolean | SeatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookedSeat"]>

  export type BookedSeatSelectScalar = {
    id?: boolean
    booking_id?: boolean
    seat_id?: boolean
    created_at?: boolean
  }

  export type BookedSeatOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "booking_id" | "seat_id" | "created_at", ExtArgs["result"]["bookedSeat"]>
  export type BookedSeatInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingDefaultArgs<ExtArgs>
    seat?: boolean | SeatDefaultArgs<ExtArgs>
  }
  export type BookedSeatIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingDefaultArgs<ExtArgs>
    seat?: boolean | SeatDefaultArgs<ExtArgs>
  }
  export type BookedSeatIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingDefaultArgs<ExtArgs>
    seat?: boolean | SeatDefaultArgs<ExtArgs>
  }

  export type $BookedSeatPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BookedSeat"
    objects: {
      booking: Prisma.$BookingPayload<ExtArgs>
      seat: Prisma.$SeatPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      booking_id: number
      seat_id: number
      created_at: Date
    }, ExtArgs["result"]["bookedSeat"]>
    composites: {}
  }

  type BookedSeatGetPayload<S extends boolean | null | undefined | BookedSeatDefaultArgs> = $Result.GetResult<Prisma.$BookedSeatPayload, S>

  type BookedSeatCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BookedSeatFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookedSeatCountAggregateInputType | true
    }

  export interface BookedSeatDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BookedSeat'], meta: { name: 'BookedSeat' } }
    /**
     * Find zero or one BookedSeat that matches the filter.
     * @param {BookedSeatFindUniqueArgs} args - Arguments to find a BookedSeat
     * @example
     * // Get one BookedSeat
     * const bookedSeat = await prisma.bookedSeat.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookedSeatFindUniqueArgs>(args: SelectSubset<T, BookedSeatFindUniqueArgs<ExtArgs>>): Prisma__BookedSeatClient<$Result.GetResult<Prisma.$BookedSeatPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BookedSeat that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BookedSeatFindUniqueOrThrowArgs} args - Arguments to find a BookedSeat
     * @example
     * // Get one BookedSeat
     * const bookedSeat = await prisma.bookedSeat.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookedSeatFindUniqueOrThrowArgs>(args: SelectSubset<T, BookedSeatFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookedSeatClient<$Result.GetResult<Prisma.$BookedSeatPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BookedSeat that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookedSeatFindFirstArgs} args - Arguments to find a BookedSeat
     * @example
     * // Get one BookedSeat
     * const bookedSeat = await prisma.bookedSeat.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookedSeatFindFirstArgs>(args?: SelectSubset<T, BookedSeatFindFirstArgs<ExtArgs>>): Prisma__BookedSeatClient<$Result.GetResult<Prisma.$BookedSeatPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BookedSeat that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookedSeatFindFirstOrThrowArgs} args - Arguments to find a BookedSeat
     * @example
     * // Get one BookedSeat
     * const bookedSeat = await prisma.bookedSeat.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookedSeatFindFirstOrThrowArgs>(args?: SelectSubset<T, BookedSeatFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookedSeatClient<$Result.GetResult<Prisma.$BookedSeatPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BookedSeats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookedSeatFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BookedSeats
     * const bookedSeats = await prisma.bookedSeat.findMany()
     * 
     * // Get first 10 BookedSeats
     * const bookedSeats = await prisma.bookedSeat.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookedSeatWithIdOnly = await prisma.bookedSeat.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookedSeatFindManyArgs>(args?: SelectSubset<T, BookedSeatFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookedSeatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BookedSeat.
     * @param {BookedSeatCreateArgs} args - Arguments to create a BookedSeat.
     * @example
     * // Create one BookedSeat
     * const BookedSeat = await prisma.bookedSeat.create({
     *   data: {
     *     // ... data to create a BookedSeat
     *   }
     * })
     * 
     */
    create<T extends BookedSeatCreateArgs>(args: SelectSubset<T, BookedSeatCreateArgs<ExtArgs>>): Prisma__BookedSeatClient<$Result.GetResult<Prisma.$BookedSeatPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BookedSeats.
     * @param {BookedSeatCreateManyArgs} args - Arguments to create many BookedSeats.
     * @example
     * // Create many BookedSeats
     * const bookedSeat = await prisma.bookedSeat.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookedSeatCreateManyArgs>(args?: SelectSubset<T, BookedSeatCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BookedSeats and returns the data saved in the database.
     * @param {BookedSeatCreateManyAndReturnArgs} args - Arguments to create many BookedSeats.
     * @example
     * // Create many BookedSeats
     * const bookedSeat = await prisma.bookedSeat.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BookedSeats and only return the `id`
     * const bookedSeatWithIdOnly = await prisma.bookedSeat.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BookedSeatCreateManyAndReturnArgs>(args?: SelectSubset<T, BookedSeatCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookedSeatPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BookedSeat.
     * @param {BookedSeatDeleteArgs} args - Arguments to delete one BookedSeat.
     * @example
     * // Delete one BookedSeat
     * const BookedSeat = await prisma.bookedSeat.delete({
     *   where: {
     *     // ... filter to delete one BookedSeat
     *   }
     * })
     * 
     */
    delete<T extends BookedSeatDeleteArgs>(args: SelectSubset<T, BookedSeatDeleteArgs<ExtArgs>>): Prisma__BookedSeatClient<$Result.GetResult<Prisma.$BookedSeatPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BookedSeat.
     * @param {BookedSeatUpdateArgs} args - Arguments to update one BookedSeat.
     * @example
     * // Update one BookedSeat
     * const bookedSeat = await prisma.bookedSeat.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookedSeatUpdateArgs>(args: SelectSubset<T, BookedSeatUpdateArgs<ExtArgs>>): Prisma__BookedSeatClient<$Result.GetResult<Prisma.$BookedSeatPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BookedSeats.
     * @param {BookedSeatDeleteManyArgs} args - Arguments to filter BookedSeats to delete.
     * @example
     * // Delete a few BookedSeats
     * const { count } = await prisma.bookedSeat.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookedSeatDeleteManyArgs>(args?: SelectSubset<T, BookedSeatDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BookedSeats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookedSeatUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BookedSeats
     * const bookedSeat = await prisma.bookedSeat.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookedSeatUpdateManyArgs>(args: SelectSubset<T, BookedSeatUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BookedSeats and returns the data updated in the database.
     * @param {BookedSeatUpdateManyAndReturnArgs} args - Arguments to update many BookedSeats.
     * @example
     * // Update many BookedSeats
     * const bookedSeat = await prisma.bookedSeat.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BookedSeats and only return the `id`
     * const bookedSeatWithIdOnly = await prisma.bookedSeat.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BookedSeatUpdateManyAndReturnArgs>(args: SelectSubset<T, BookedSeatUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookedSeatPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BookedSeat.
     * @param {BookedSeatUpsertArgs} args - Arguments to update or create a BookedSeat.
     * @example
     * // Update or create a BookedSeat
     * const bookedSeat = await prisma.bookedSeat.upsert({
     *   create: {
     *     // ... data to create a BookedSeat
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BookedSeat we want to update
     *   }
     * })
     */
    upsert<T extends BookedSeatUpsertArgs>(args: SelectSubset<T, BookedSeatUpsertArgs<ExtArgs>>): Prisma__BookedSeatClient<$Result.GetResult<Prisma.$BookedSeatPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BookedSeats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookedSeatCountArgs} args - Arguments to filter BookedSeats to count.
     * @example
     * // Count the number of BookedSeats
     * const count = await prisma.bookedSeat.count({
     *   where: {
     *     // ... the filter for the BookedSeats we want to count
     *   }
     * })
    **/
    count<T extends BookedSeatCountArgs>(
      args?: Subset<T, BookedSeatCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookedSeatCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BookedSeat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookedSeatAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookedSeatAggregateArgs>(args: Subset<T, BookedSeatAggregateArgs>): Prisma.PrismaPromise<GetBookedSeatAggregateType<T>>

    /**
     * Group by BookedSeat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookedSeatGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookedSeatGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookedSeatGroupByArgs['orderBy'] }
        : { orderBy?: BookedSeatGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookedSeatGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookedSeatGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BookedSeat model
   */
  readonly fields: BookedSeatFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BookedSeat.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookedSeatClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    booking<T extends BookingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BookingDefaultArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    seat<T extends SeatDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SeatDefaultArgs<ExtArgs>>): Prisma__SeatClient<$Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BookedSeat model
   */
  interface BookedSeatFieldRefs {
    readonly id: FieldRef<"BookedSeat", 'Int'>
    readonly booking_id: FieldRef<"BookedSeat", 'Int'>
    readonly seat_id: FieldRef<"BookedSeat", 'Int'>
    readonly created_at: FieldRef<"BookedSeat", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BookedSeat findUnique
   */
  export type BookedSeatFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedSeat
     */
    select?: BookedSeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookedSeat
     */
    omit?: BookedSeatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedSeatInclude<ExtArgs> | null
    /**
     * Filter, which BookedSeat to fetch.
     */
    where: BookedSeatWhereUniqueInput
  }

  /**
   * BookedSeat findUniqueOrThrow
   */
  export type BookedSeatFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedSeat
     */
    select?: BookedSeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookedSeat
     */
    omit?: BookedSeatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedSeatInclude<ExtArgs> | null
    /**
     * Filter, which BookedSeat to fetch.
     */
    where: BookedSeatWhereUniqueInput
  }

  /**
   * BookedSeat findFirst
   */
  export type BookedSeatFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedSeat
     */
    select?: BookedSeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookedSeat
     */
    omit?: BookedSeatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedSeatInclude<ExtArgs> | null
    /**
     * Filter, which BookedSeat to fetch.
     */
    where?: BookedSeatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookedSeats to fetch.
     */
    orderBy?: BookedSeatOrderByWithRelationInput | BookedSeatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BookedSeats.
     */
    cursor?: BookedSeatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookedSeats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookedSeats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BookedSeats.
     */
    distinct?: BookedSeatScalarFieldEnum | BookedSeatScalarFieldEnum[]
  }

  /**
   * BookedSeat findFirstOrThrow
   */
  export type BookedSeatFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedSeat
     */
    select?: BookedSeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookedSeat
     */
    omit?: BookedSeatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedSeatInclude<ExtArgs> | null
    /**
     * Filter, which BookedSeat to fetch.
     */
    where?: BookedSeatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookedSeats to fetch.
     */
    orderBy?: BookedSeatOrderByWithRelationInput | BookedSeatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BookedSeats.
     */
    cursor?: BookedSeatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookedSeats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookedSeats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BookedSeats.
     */
    distinct?: BookedSeatScalarFieldEnum | BookedSeatScalarFieldEnum[]
  }

  /**
   * BookedSeat findMany
   */
  export type BookedSeatFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedSeat
     */
    select?: BookedSeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookedSeat
     */
    omit?: BookedSeatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedSeatInclude<ExtArgs> | null
    /**
     * Filter, which BookedSeats to fetch.
     */
    where?: BookedSeatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookedSeats to fetch.
     */
    orderBy?: BookedSeatOrderByWithRelationInput | BookedSeatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BookedSeats.
     */
    cursor?: BookedSeatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookedSeats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookedSeats.
     */
    skip?: number
    distinct?: BookedSeatScalarFieldEnum | BookedSeatScalarFieldEnum[]
  }

  /**
   * BookedSeat create
   */
  export type BookedSeatCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedSeat
     */
    select?: BookedSeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookedSeat
     */
    omit?: BookedSeatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedSeatInclude<ExtArgs> | null
    /**
     * The data needed to create a BookedSeat.
     */
    data: XOR<BookedSeatCreateInput, BookedSeatUncheckedCreateInput>
  }

  /**
   * BookedSeat createMany
   */
  export type BookedSeatCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BookedSeats.
     */
    data: BookedSeatCreateManyInput | BookedSeatCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BookedSeat createManyAndReturn
   */
  export type BookedSeatCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedSeat
     */
    select?: BookedSeatSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BookedSeat
     */
    omit?: BookedSeatOmit<ExtArgs> | null
    /**
     * The data used to create many BookedSeats.
     */
    data: BookedSeatCreateManyInput | BookedSeatCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedSeatIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BookedSeat update
   */
  export type BookedSeatUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedSeat
     */
    select?: BookedSeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookedSeat
     */
    omit?: BookedSeatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedSeatInclude<ExtArgs> | null
    /**
     * The data needed to update a BookedSeat.
     */
    data: XOR<BookedSeatUpdateInput, BookedSeatUncheckedUpdateInput>
    /**
     * Choose, which BookedSeat to update.
     */
    where: BookedSeatWhereUniqueInput
  }

  /**
   * BookedSeat updateMany
   */
  export type BookedSeatUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BookedSeats.
     */
    data: XOR<BookedSeatUpdateManyMutationInput, BookedSeatUncheckedUpdateManyInput>
    /**
     * Filter which BookedSeats to update
     */
    where?: BookedSeatWhereInput
    /**
     * Limit how many BookedSeats to update.
     */
    limit?: number
  }

  /**
   * BookedSeat updateManyAndReturn
   */
  export type BookedSeatUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedSeat
     */
    select?: BookedSeatSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BookedSeat
     */
    omit?: BookedSeatOmit<ExtArgs> | null
    /**
     * The data used to update BookedSeats.
     */
    data: XOR<BookedSeatUpdateManyMutationInput, BookedSeatUncheckedUpdateManyInput>
    /**
     * Filter which BookedSeats to update
     */
    where?: BookedSeatWhereInput
    /**
     * Limit how many BookedSeats to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedSeatIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BookedSeat upsert
   */
  export type BookedSeatUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedSeat
     */
    select?: BookedSeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookedSeat
     */
    omit?: BookedSeatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedSeatInclude<ExtArgs> | null
    /**
     * The filter to search for the BookedSeat to update in case it exists.
     */
    where: BookedSeatWhereUniqueInput
    /**
     * In case the BookedSeat found by the `where` argument doesn't exist, create a new BookedSeat with this data.
     */
    create: XOR<BookedSeatCreateInput, BookedSeatUncheckedCreateInput>
    /**
     * In case the BookedSeat was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookedSeatUpdateInput, BookedSeatUncheckedUpdateInput>
  }

  /**
   * BookedSeat delete
   */
  export type BookedSeatDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedSeat
     */
    select?: BookedSeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookedSeat
     */
    omit?: BookedSeatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedSeatInclude<ExtArgs> | null
    /**
     * Filter which BookedSeat to delete.
     */
    where: BookedSeatWhereUniqueInput
  }

  /**
   * BookedSeat deleteMany
   */
  export type BookedSeatDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BookedSeats to delete
     */
    where?: BookedSeatWhereInput
    /**
     * Limit how many BookedSeats to delete.
     */
    limit?: number
  }

  /**
   * BookedSeat without action
   */
  export type BookedSeatDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedSeat
     */
    select?: BookedSeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookedSeat
     */
    omit?: BookedSeatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedSeatInclude<ExtArgs> | null
  }


  /**
   * Model NewsArticle
   */

  export type AggregateNewsArticle = {
    _count: NewsArticleCountAggregateOutputType | null
    _avg: NewsArticleAvgAggregateOutputType | null
    _sum: NewsArticleSumAggregateOutputType | null
    _min: NewsArticleMinAggregateOutputType | null
    _max: NewsArticleMaxAggregateOutputType | null
  }

  export type NewsArticleAvgAggregateOutputType = {
    id: number | null
  }

  export type NewsArticleSumAggregateOutputType = {
    id: number | null
  }

  export type NewsArticleMinAggregateOutputType = {
    id: number | null
    title: string | null
    excerpt: string | null
    content: string | null
    category: string | null
    image_url: string | null
    author: string | null
    content_language: string | null
    translation_group: string | null
    published_at: Date | null
    is_published: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type NewsArticleMaxAggregateOutputType = {
    id: number | null
    title: string | null
    excerpt: string | null
    content: string | null
    category: string | null
    image_url: string | null
    author: string | null
    content_language: string | null
    translation_group: string | null
    published_at: Date | null
    is_published: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type NewsArticleCountAggregateOutputType = {
    id: number
    title: number
    excerpt: number
    content: number
    category: number
    image_url: number
    author: number
    content_language: number
    translation_group: number
    published_at: number
    is_published: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type NewsArticleAvgAggregateInputType = {
    id?: true
  }

  export type NewsArticleSumAggregateInputType = {
    id?: true
  }

  export type NewsArticleMinAggregateInputType = {
    id?: true
    title?: true
    excerpt?: true
    content?: true
    category?: true
    image_url?: true
    author?: true
    content_language?: true
    translation_group?: true
    published_at?: true
    is_published?: true
    created_at?: true
    updated_at?: true
  }

  export type NewsArticleMaxAggregateInputType = {
    id?: true
    title?: true
    excerpt?: true
    content?: true
    category?: true
    image_url?: true
    author?: true
    content_language?: true
    translation_group?: true
    published_at?: true
    is_published?: true
    created_at?: true
    updated_at?: true
  }

  export type NewsArticleCountAggregateInputType = {
    id?: true
    title?: true
    excerpt?: true
    content?: true
    category?: true
    image_url?: true
    author?: true
    content_language?: true
    translation_group?: true
    published_at?: true
    is_published?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type NewsArticleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NewsArticle to aggregate.
     */
    where?: NewsArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsArticles to fetch.
     */
    orderBy?: NewsArticleOrderByWithRelationInput | NewsArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NewsArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsArticles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsArticles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NewsArticles
    **/
    _count?: true | NewsArticleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NewsArticleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NewsArticleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NewsArticleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NewsArticleMaxAggregateInputType
  }

  export type GetNewsArticleAggregateType<T extends NewsArticleAggregateArgs> = {
        [P in keyof T & keyof AggregateNewsArticle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNewsArticle[P]>
      : GetScalarType<T[P], AggregateNewsArticle[P]>
  }




  export type NewsArticleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NewsArticleWhereInput
    orderBy?: NewsArticleOrderByWithAggregationInput | NewsArticleOrderByWithAggregationInput[]
    by: NewsArticleScalarFieldEnum[] | NewsArticleScalarFieldEnum
    having?: NewsArticleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NewsArticleCountAggregateInputType | true
    _avg?: NewsArticleAvgAggregateInputType
    _sum?: NewsArticleSumAggregateInputType
    _min?: NewsArticleMinAggregateInputType
    _max?: NewsArticleMaxAggregateInputType
  }

  export type NewsArticleGroupByOutputType = {
    id: number
    title: string
    excerpt: string | null
    content: string
    category: string | null
    image_url: string | null
    author: string | null
    content_language: string
    translation_group: string | null
    published_at: Date | null
    is_published: boolean
    created_at: Date
    updated_at: Date
    _count: NewsArticleCountAggregateOutputType | null
    _avg: NewsArticleAvgAggregateOutputType | null
    _sum: NewsArticleSumAggregateOutputType | null
    _min: NewsArticleMinAggregateOutputType | null
    _max: NewsArticleMaxAggregateOutputType | null
  }

  type GetNewsArticleGroupByPayload<T extends NewsArticleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NewsArticleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NewsArticleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NewsArticleGroupByOutputType[P]>
            : GetScalarType<T[P], NewsArticleGroupByOutputType[P]>
        }
      >
    >


  export type NewsArticleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    excerpt?: boolean
    content?: boolean
    category?: boolean
    image_url?: boolean
    author?: boolean
    content_language?: boolean
    translation_group?: boolean
    published_at?: boolean
    is_published?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["newsArticle"]>

  export type NewsArticleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    excerpt?: boolean
    content?: boolean
    category?: boolean
    image_url?: boolean
    author?: boolean
    content_language?: boolean
    translation_group?: boolean
    published_at?: boolean
    is_published?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["newsArticle"]>

  export type NewsArticleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    excerpt?: boolean
    content?: boolean
    category?: boolean
    image_url?: boolean
    author?: boolean
    content_language?: boolean
    translation_group?: boolean
    published_at?: boolean
    is_published?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["newsArticle"]>

  export type NewsArticleSelectScalar = {
    id?: boolean
    title?: boolean
    excerpt?: boolean
    content?: boolean
    category?: boolean
    image_url?: boolean
    author?: boolean
    content_language?: boolean
    translation_group?: boolean
    published_at?: boolean
    is_published?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type NewsArticleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "excerpt" | "content" | "category" | "image_url" | "author" | "content_language" | "translation_group" | "published_at" | "is_published" | "created_at" | "updated_at", ExtArgs["result"]["newsArticle"]>

  export type $NewsArticlePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NewsArticle"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      excerpt: string | null
      content: string
      category: string | null
      image_url: string | null
      author: string | null
      content_language: string
      translation_group: string | null
      published_at: Date | null
      is_published: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["newsArticle"]>
    composites: {}
  }

  type NewsArticleGetPayload<S extends boolean | null | undefined | NewsArticleDefaultArgs> = $Result.GetResult<Prisma.$NewsArticlePayload, S>

  type NewsArticleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NewsArticleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NewsArticleCountAggregateInputType | true
    }

  export interface NewsArticleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NewsArticle'], meta: { name: 'NewsArticle' } }
    /**
     * Find zero or one NewsArticle that matches the filter.
     * @param {NewsArticleFindUniqueArgs} args - Arguments to find a NewsArticle
     * @example
     * // Get one NewsArticle
     * const newsArticle = await prisma.newsArticle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NewsArticleFindUniqueArgs>(args: SelectSubset<T, NewsArticleFindUniqueArgs<ExtArgs>>): Prisma__NewsArticleClient<$Result.GetResult<Prisma.$NewsArticlePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NewsArticle that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NewsArticleFindUniqueOrThrowArgs} args - Arguments to find a NewsArticle
     * @example
     * // Get one NewsArticle
     * const newsArticle = await prisma.newsArticle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NewsArticleFindUniqueOrThrowArgs>(args: SelectSubset<T, NewsArticleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NewsArticleClient<$Result.GetResult<Prisma.$NewsArticlePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NewsArticle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsArticleFindFirstArgs} args - Arguments to find a NewsArticle
     * @example
     * // Get one NewsArticle
     * const newsArticle = await prisma.newsArticle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NewsArticleFindFirstArgs>(args?: SelectSubset<T, NewsArticleFindFirstArgs<ExtArgs>>): Prisma__NewsArticleClient<$Result.GetResult<Prisma.$NewsArticlePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NewsArticle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsArticleFindFirstOrThrowArgs} args - Arguments to find a NewsArticle
     * @example
     * // Get one NewsArticle
     * const newsArticle = await prisma.newsArticle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NewsArticleFindFirstOrThrowArgs>(args?: SelectSubset<T, NewsArticleFindFirstOrThrowArgs<ExtArgs>>): Prisma__NewsArticleClient<$Result.GetResult<Prisma.$NewsArticlePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NewsArticles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsArticleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NewsArticles
     * const newsArticles = await prisma.newsArticle.findMany()
     * 
     * // Get first 10 NewsArticles
     * const newsArticles = await prisma.newsArticle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const newsArticleWithIdOnly = await prisma.newsArticle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NewsArticleFindManyArgs>(args?: SelectSubset<T, NewsArticleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsArticlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NewsArticle.
     * @param {NewsArticleCreateArgs} args - Arguments to create a NewsArticle.
     * @example
     * // Create one NewsArticle
     * const NewsArticle = await prisma.newsArticle.create({
     *   data: {
     *     // ... data to create a NewsArticle
     *   }
     * })
     * 
     */
    create<T extends NewsArticleCreateArgs>(args: SelectSubset<T, NewsArticleCreateArgs<ExtArgs>>): Prisma__NewsArticleClient<$Result.GetResult<Prisma.$NewsArticlePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NewsArticles.
     * @param {NewsArticleCreateManyArgs} args - Arguments to create many NewsArticles.
     * @example
     * // Create many NewsArticles
     * const newsArticle = await prisma.newsArticle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NewsArticleCreateManyArgs>(args?: SelectSubset<T, NewsArticleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NewsArticles and returns the data saved in the database.
     * @param {NewsArticleCreateManyAndReturnArgs} args - Arguments to create many NewsArticles.
     * @example
     * // Create many NewsArticles
     * const newsArticle = await prisma.newsArticle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NewsArticles and only return the `id`
     * const newsArticleWithIdOnly = await prisma.newsArticle.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NewsArticleCreateManyAndReturnArgs>(args?: SelectSubset<T, NewsArticleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsArticlePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NewsArticle.
     * @param {NewsArticleDeleteArgs} args - Arguments to delete one NewsArticle.
     * @example
     * // Delete one NewsArticle
     * const NewsArticle = await prisma.newsArticle.delete({
     *   where: {
     *     // ... filter to delete one NewsArticle
     *   }
     * })
     * 
     */
    delete<T extends NewsArticleDeleteArgs>(args: SelectSubset<T, NewsArticleDeleteArgs<ExtArgs>>): Prisma__NewsArticleClient<$Result.GetResult<Prisma.$NewsArticlePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NewsArticle.
     * @param {NewsArticleUpdateArgs} args - Arguments to update one NewsArticle.
     * @example
     * // Update one NewsArticle
     * const newsArticle = await prisma.newsArticle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NewsArticleUpdateArgs>(args: SelectSubset<T, NewsArticleUpdateArgs<ExtArgs>>): Prisma__NewsArticleClient<$Result.GetResult<Prisma.$NewsArticlePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NewsArticles.
     * @param {NewsArticleDeleteManyArgs} args - Arguments to filter NewsArticles to delete.
     * @example
     * // Delete a few NewsArticles
     * const { count } = await prisma.newsArticle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NewsArticleDeleteManyArgs>(args?: SelectSubset<T, NewsArticleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NewsArticles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsArticleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NewsArticles
     * const newsArticle = await prisma.newsArticle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NewsArticleUpdateManyArgs>(args: SelectSubset<T, NewsArticleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NewsArticles and returns the data updated in the database.
     * @param {NewsArticleUpdateManyAndReturnArgs} args - Arguments to update many NewsArticles.
     * @example
     * // Update many NewsArticles
     * const newsArticle = await prisma.newsArticle.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NewsArticles and only return the `id`
     * const newsArticleWithIdOnly = await prisma.newsArticle.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NewsArticleUpdateManyAndReturnArgs>(args: SelectSubset<T, NewsArticleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsArticlePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NewsArticle.
     * @param {NewsArticleUpsertArgs} args - Arguments to update or create a NewsArticle.
     * @example
     * // Update or create a NewsArticle
     * const newsArticle = await prisma.newsArticle.upsert({
     *   create: {
     *     // ... data to create a NewsArticle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NewsArticle we want to update
     *   }
     * })
     */
    upsert<T extends NewsArticleUpsertArgs>(args: SelectSubset<T, NewsArticleUpsertArgs<ExtArgs>>): Prisma__NewsArticleClient<$Result.GetResult<Prisma.$NewsArticlePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NewsArticles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsArticleCountArgs} args - Arguments to filter NewsArticles to count.
     * @example
     * // Count the number of NewsArticles
     * const count = await prisma.newsArticle.count({
     *   where: {
     *     // ... the filter for the NewsArticles we want to count
     *   }
     * })
    **/
    count<T extends NewsArticleCountArgs>(
      args?: Subset<T, NewsArticleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NewsArticleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NewsArticle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsArticleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NewsArticleAggregateArgs>(args: Subset<T, NewsArticleAggregateArgs>): Prisma.PrismaPromise<GetNewsArticleAggregateType<T>>

    /**
     * Group by NewsArticle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsArticleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NewsArticleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NewsArticleGroupByArgs['orderBy'] }
        : { orderBy?: NewsArticleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NewsArticleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNewsArticleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NewsArticle model
   */
  readonly fields: NewsArticleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NewsArticle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NewsArticleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NewsArticle model
   */
  interface NewsArticleFieldRefs {
    readonly id: FieldRef<"NewsArticle", 'Int'>
    readonly title: FieldRef<"NewsArticle", 'String'>
    readonly excerpt: FieldRef<"NewsArticle", 'String'>
    readonly content: FieldRef<"NewsArticle", 'String'>
    readonly category: FieldRef<"NewsArticle", 'String'>
    readonly image_url: FieldRef<"NewsArticle", 'String'>
    readonly author: FieldRef<"NewsArticle", 'String'>
    readonly content_language: FieldRef<"NewsArticle", 'String'>
    readonly translation_group: FieldRef<"NewsArticle", 'String'>
    readonly published_at: FieldRef<"NewsArticle", 'DateTime'>
    readonly is_published: FieldRef<"NewsArticle", 'Boolean'>
    readonly created_at: FieldRef<"NewsArticle", 'DateTime'>
    readonly updated_at: FieldRef<"NewsArticle", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NewsArticle findUnique
   */
  export type NewsArticleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsArticle
     */
    select?: NewsArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsArticle
     */
    omit?: NewsArticleOmit<ExtArgs> | null
    /**
     * Filter, which NewsArticle to fetch.
     */
    where: NewsArticleWhereUniqueInput
  }

  /**
   * NewsArticle findUniqueOrThrow
   */
  export type NewsArticleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsArticle
     */
    select?: NewsArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsArticle
     */
    omit?: NewsArticleOmit<ExtArgs> | null
    /**
     * Filter, which NewsArticle to fetch.
     */
    where: NewsArticleWhereUniqueInput
  }

  /**
   * NewsArticle findFirst
   */
  export type NewsArticleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsArticle
     */
    select?: NewsArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsArticle
     */
    omit?: NewsArticleOmit<ExtArgs> | null
    /**
     * Filter, which NewsArticle to fetch.
     */
    where?: NewsArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsArticles to fetch.
     */
    orderBy?: NewsArticleOrderByWithRelationInput | NewsArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NewsArticles.
     */
    cursor?: NewsArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsArticles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsArticles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NewsArticles.
     */
    distinct?: NewsArticleScalarFieldEnum | NewsArticleScalarFieldEnum[]
  }

  /**
   * NewsArticle findFirstOrThrow
   */
  export type NewsArticleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsArticle
     */
    select?: NewsArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsArticle
     */
    omit?: NewsArticleOmit<ExtArgs> | null
    /**
     * Filter, which NewsArticle to fetch.
     */
    where?: NewsArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsArticles to fetch.
     */
    orderBy?: NewsArticleOrderByWithRelationInput | NewsArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NewsArticles.
     */
    cursor?: NewsArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsArticles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsArticles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NewsArticles.
     */
    distinct?: NewsArticleScalarFieldEnum | NewsArticleScalarFieldEnum[]
  }

  /**
   * NewsArticle findMany
   */
  export type NewsArticleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsArticle
     */
    select?: NewsArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsArticle
     */
    omit?: NewsArticleOmit<ExtArgs> | null
    /**
     * Filter, which NewsArticles to fetch.
     */
    where?: NewsArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsArticles to fetch.
     */
    orderBy?: NewsArticleOrderByWithRelationInput | NewsArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NewsArticles.
     */
    cursor?: NewsArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsArticles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsArticles.
     */
    skip?: number
    distinct?: NewsArticleScalarFieldEnum | NewsArticleScalarFieldEnum[]
  }

  /**
   * NewsArticle create
   */
  export type NewsArticleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsArticle
     */
    select?: NewsArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsArticle
     */
    omit?: NewsArticleOmit<ExtArgs> | null
    /**
     * The data needed to create a NewsArticle.
     */
    data: XOR<NewsArticleCreateInput, NewsArticleUncheckedCreateInput>
  }

  /**
   * NewsArticle createMany
   */
  export type NewsArticleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NewsArticles.
     */
    data: NewsArticleCreateManyInput | NewsArticleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NewsArticle createManyAndReturn
   */
  export type NewsArticleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsArticle
     */
    select?: NewsArticleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NewsArticle
     */
    omit?: NewsArticleOmit<ExtArgs> | null
    /**
     * The data used to create many NewsArticles.
     */
    data: NewsArticleCreateManyInput | NewsArticleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NewsArticle update
   */
  export type NewsArticleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsArticle
     */
    select?: NewsArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsArticle
     */
    omit?: NewsArticleOmit<ExtArgs> | null
    /**
     * The data needed to update a NewsArticle.
     */
    data: XOR<NewsArticleUpdateInput, NewsArticleUncheckedUpdateInput>
    /**
     * Choose, which NewsArticle to update.
     */
    where: NewsArticleWhereUniqueInput
  }

  /**
   * NewsArticle updateMany
   */
  export type NewsArticleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NewsArticles.
     */
    data: XOR<NewsArticleUpdateManyMutationInput, NewsArticleUncheckedUpdateManyInput>
    /**
     * Filter which NewsArticles to update
     */
    where?: NewsArticleWhereInput
    /**
     * Limit how many NewsArticles to update.
     */
    limit?: number
  }

  /**
   * NewsArticle updateManyAndReturn
   */
  export type NewsArticleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsArticle
     */
    select?: NewsArticleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NewsArticle
     */
    omit?: NewsArticleOmit<ExtArgs> | null
    /**
     * The data used to update NewsArticles.
     */
    data: XOR<NewsArticleUpdateManyMutationInput, NewsArticleUncheckedUpdateManyInput>
    /**
     * Filter which NewsArticles to update
     */
    where?: NewsArticleWhereInput
    /**
     * Limit how many NewsArticles to update.
     */
    limit?: number
  }

  /**
   * NewsArticle upsert
   */
  export type NewsArticleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsArticle
     */
    select?: NewsArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsArticle
     */
    omit?: NewsArticleOmit<ExtArgs> | null
    /**
     * The filter to search for the NewsArticle to update in case it exists.
     */
    where: NewsArticleWhereUniqueInput
    /**
     * In case the NewsArticle found by the `where` argument doesn't exist, create a new NewsArticle with this data.
     */
    create: XOR<NewsArticleCreateInput, NewsArticleUncheckedCreateInput>
    /**
     * In case the NewsArticle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NewsArticleUpdateInput, NewsArticleUncheckedUpdateInput>
  }

  /**
   * NewsArticle delete
   */
  export type NewsArticleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsArticle
     */
    select?: NewsArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsArticle
     */
    omit?: NewsArticleOmit<ExtArgs> | null
    /**
     * Filter which NewsArticle to delete.
     */
    where: NewsArticleWhereUniqueInput
  }

  /**
   * NewsArticle deleteMany
   */
  export type NewsArticleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NewsArticles to delete
     */
    where?: NewsArticleWhereInput
    /**
     * Limit how many NewsArticles to delete.
     */
    limit?: number
  }

  /**
   * NewsArticle without action
   */
  export type NewsArticleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsArticle
     */
    select?: NewsArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsArticle
     */
    omit?: NewsArticleOmit<ExtArgs> | null
  }


  /**
   * Model AboutPage
   */

  export type AggregateAboutPage = {
    _count: AboutPageCountAggregateOutputType | null
    _avg: AboutPageAvgAggregateOutputType | null
    _sum: AboutPageSumAggregateOutputType | null
    _min: AboutPageMinAggregateOutputType | null
    _max: AboutPageMaxAggregateOutputType | null
  }

  export type AboutPageAvgAggregateOutputType = {
    id: number | null
  }

  export type AboutPageSumAggregateOutputType = {
    id: number | null
  }

  export type AboutPageMinAggregateOutputType = {
    id: number | null
    title: string | null
    content: string | null
    mission: string | null
    vision: string | null
    history: string | null
    image_url: string | null
    content_language: string | null
    translation_group: string | null
    is_published: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AboutPageMaxAggregateOutputType = {
    id: number | null
    title: string | null
    content: string | null
    mission: string | null
    vision: string | null
    history: string | null
    image_url: string | null
    content_language: string | null
    translation_group: string | null
    is_published: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AboutPageCountAggregateOutputType = {
    id: number
    title: number
    content: number
    mission: number
    vision: number
    history: number
    image_url: number
    content_language: number
    translation_group: number
    is_published: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type AboutPageAvgAggregateInputType = {
    id?: true
  }

  export type AboutPageSumAggregateInputType = {
    id?: true
  }

  export type AboutPageMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    mission?: true
    vision?: true
    history?: true
    image_url?: true
    content_language?: true
    translation_group?: true
    is_published?: true
    created_at?: true
    updated_at?: true
  }

  export type AboutPageMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    mission?: true
    vision?: true
    history?: true
    image_url?: true
    content_language?: true
    translation_group?: true
    is_published?: true
    created_at?: true
    updated_at?: true
  }

  export type AboutPageCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    mission?: true
    vision?: true
    history?: true
    image_url?: true
    content_language?: true
    translation_group?: true
    is_published?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type AboutPageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AboutPage to aggregate.
     */
    where?: AboutPageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AboutPages to fetch.
     */
    orderBy?: AboutPageOrderByWithRelationInput | AboutPageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AboutPageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AboutPages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AboutPages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AboutPages
    **/
    _count?: true | AboutPageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AboutPageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AboutPageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AboutPageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AboutPageMaxAggregateInputType
  }

  export type GetAboutPageAggregateType<T extends AboutPageAggregateArgs> = {
        [P in keyof T & keyof AggregateAboutPage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAboutPage[P]>
      : GetScalarType<T[P], AggregateAboutPage[P]>
  }




  export type AboutPageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AboutPageWhereInput
    orderBy?: AboutPageOrderByWithAggregationInput | AboutPageOrderByWithAggregationInput[]
    by: AboutPageScalarFieldEnum[] | AboutPageScalarFieldEnum
    having?: AboutPageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AboutPageCountAggregateInputType | true
    _avg?: AboutPageAvgAggregateInputType
    _sum?: AboutPageSumAggregateInputType
    _min?: AboutPageMinAggregateInputType
    _max?: AboutPageMaxAggregateInputType
  }

  export type AboutPageGroupByOutputType = {
    id: number
    title: string
    content: string
    mission: string | null
    vision: string | null
    history: string | null
    image_url: string | null
    content_language: string
    translation_group: string | null
    is_published: boolean
    created_at: Date
    updated_at: Date
    _count: AboutPageCountAggregateOutputType | null
    _avg: AboutPageAvgAggregateOutputType | null
    _sum: AboutPageSumAggregateOutputType | null
    _min: AboutPageMinAggregateOutputType | null
    _max: AboutPageMaxAggregateOutputType | null
  }

  type GetAboutPageGroupByPayload<T extends AboutPageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AboutPageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AboutPageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AboutPageGroupByOutputType[P]>
            : GetScalarType<T[P], AboutPageGroupByOutputType[P]>
        }
      >
    >


  export type AboutPageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    mission?: boolean
    vision?: boolean
    history?: boolean
    image_url?: boolean
    content_language?: boolean
    translation_group?: boolean
    is_published?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["aboutPage"]>

  export type AboutPageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    mission?: boolean
    vision?: boolean
    history?: boolean
    image_url?: boolean
    content_language?: boolean
    translation_group?: boolean
    is_published?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["aboutPage"]>

  export type AboutPageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    mission?: boolean
    vision?: boolean
    history?: boolean
    image_url?: boolean
    content_language?: boolean
    translation_group?: boolean
    is_published?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["aboutPage"]>

  export type AboutPageSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    mission?: boolean
    vision?: boolean
    history?: boolean
    image_url?: boolean
    content_language?: boolean
    translation_group?: boolean
    is_published?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type AboutPageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "mission" | "vision" | "history" | "image_url" | "content_language" | "translation_group" | "is_published" | "created_at" | "updated_at", ExtArgs["result"]["aboutPage"]>

  export type $AboutPagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AboutPage"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      content: string
      mission: string | null
      vision: string | null
      history: string | null
      image_url: string | null
      content_language: string
      translation_group: string | null
      is_published: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["aboutPage"]>
    composites: {}
  }

  type AboutPageGetPayload<S extends boolean | null | undefined | AboutPageDefaultArgs> = $Result.GetResult<Prisma.$AboutPagePayload, S>

  type AboutPageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AboutPageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AboutPageCountAggregateInputType | true
    }

  export interface AboutPageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AboutPage'], meta: { name: 'AboutPage' } }
    /**
     * Find zero or one AboutPage that matches the filter.
     * @param {AboutPageFindUniqueArgs} args - Arguments to find a AboutPage
     * @example
     * // Get one AboutPage
     * const aboutPage = await prisma.aboutPage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AboutPageFindUniqueArgs>(args: SelectSubset<T, AboutPageFindUniqueArgs<ExtArgs>>): Prisma__AboutPageClient<$Result.GetResult<Prisma.$AboutPagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AboutPage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AboutPageFindUniqueOrThrowArgs} args - Arguments to find a AboutPage
     * @example
     * // Get one AboutPage
     * const aboutPage = await prisma.aboutPage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AboutPageFindUniqueOrThrowArgs>(args: SelectSubset<T, AboutPageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AboutPageClient<$Result.GetResult<Prisma.$AboutPagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AboutPage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AboutPageFindFirstArgs} args - Arguments to find a AboutPage
     * @example
     * // Get one AboutPage
     * const aboutPage = await prisma.aboutPage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AboutPageFindFirstArgs>(args?: SelectSubset<T, AboutPageFindFirstArgs<ExtArgs>>): Prisma__AboutPageClient<$Result.GetResult<Prisma.$AboutPagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AboutPage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AboutPageFindFirstOrThrowArgs} args - Arguments to find a AboutPage
     * @example
     * // Get one AboutPage
     * const aboutPage = await prisma.aboutPage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AboutPageFindFirstOrThrowArgs>(args?: SelectSubset<T, AboutPageFindFirstOrThrowArgs<ExtArgs>>): Prisma__AboutPageClient<$Result.GetResult<Prisma.$AboutPagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AboutPages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AboutPageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AboutPages
     * const aboutPages = await prisma.aboutPage.findMany()
     * 
     * // Get first 10 AboutPages
     * const aboutPages = await prisma.aboutPage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aboutPageWithIdOnly = await prisma.aboutPage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AboutPageFindManyArgs>(args?: SelectSubset<T, AboutPageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AboutPagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AboutPage.
     * @param {AboutPageCreateArgs} args - Arguments to create a AboutPage.
     * @example
     * // Create one AboutPage
     * const AboutPage = await prisma.aboutPage.create({
     *   data: {
     *     // ... data to create a AboutPage
     *   }
     * })
     * 
     */
    create<T extends AboutPageCreateArgs>(args: SelectSubset<T, AboutPageCreateArgs<ExtArgs>>): Prisma__AboutPageClient<$Result.GetResult<Prisma.$AboutPagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AboutPages.
     * @param {AboutPageCreateManyArgs} args - Arguments to create many AboutPages.
     * @example
     * // Create many AboutPages
     * const aboutPage = await prisma.aboutPage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AboutPageCreateManyArgs>(args?: SelectSubset<T, AboutPageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AboutPages and returns the data saved in the database.
     * @param {AboutPageCreateManyAndReturnArgs} args - Arguments to create many AboutPages.
     * @example
     * // Create many AboutPages
     * const aboutPage = await prisma.aboutPage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AboutPages and only return the `id`
     * const aboutPageWithIdOnly = await prisma.aboutPage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AboutPageCreateManyAndReturnArgs>(args?: SelectSubset<T, AboutPageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AboutPagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AboutPage.
     * @param {AboutPageDeleteArgs} args - Arguments to delete one AboutPage.
     * @example
     * // Delete one AboutPage
     * const AboutPage = await prisma.aboutPage.delete({
     *   where: {
     *     // ... filter to delete one AboutPage
     *   }
     * })
     * 
     */
    delete<T extends AboutPageDeleteArgs>(args: SelectSubset<T, AboutPageDeleteArgs<ExtArgs>>): Prisma__AboutPageClient<$Result.GetResult<Prisma.$AboutPagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AboutPage.
     * @param {AboutPageUpdateArgs} args - Arguments to update one AboutPage.
     * @example
     * // Update one AboutPage
     * const aboutPage = await prisma.aboutPage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AboutPageUpdateArgs>(args: SelectSubset<T, AboutPageUpdateArgs<ExtArgs>>): Prisma__AboutPageClient<$Result.GetResult<Prisma.$AboutPagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AboutPages.
     * @param {AboutPageDeleteManyArgs} args - Arguments to filter AboutPages to delete.
     * @example
     * // Delete a few AboutPages
     * const { count } = await prisma.aboutPage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AboutPageDeleteManyArgs>(args?: SelectSubset<T, AboutPageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AboutPages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AboutPageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AboutPages
     * const aboutPage = await prisma.aboutPage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AboutPageUpdateManyArgs>(args: SelectSubset<T, AboutPageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AboutPages and returns the data updated in the database.
     * @param {AboutPageUpdateManyAndReturnArgs} args - Arguments to update many AboutPages.
     * @example
     * // Update many AboutPages
     * const aboutPage = await prisma.aboutPage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AboutPages and only return the `id`
     * const aboutPageWithIdOnly = await prisma.aboutPage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AboutPageUpdateManyAndReturnArgs>(args: SelectSubset<T, AboutPageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AboutPagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AboutPage.
     * @param {AboutPageUpsertArgs} args - Arguments to update or create a AboutPage.
     * @example
     * // Update or create a AboutPage
     * const aboutPage = await prisma.aboutPage.upsert({
     *   create: {
     *     // ... data to create a AboutPage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AboutPage we want to update
     *   }
     * })
     */
    upsert<T extends AboutPageUpsertArgs>(args: SelectSubset<T, AboutPageUpsertArgs<ExtArgs>>): Prisma__AboutPageClient<$Result.GetResult<Prisma.$AboutPagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AboutPages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AboutPageCountArgs} args - Arguments to filter AboutPages to count.
     * @example
     * // Count the number of AboutPages
     * const count = await prisma.aboutPage.count({
     *   where: {
     *     // ... the filter for the AboutPages we want to count
     *   }
     * })
    **/
    count<T extends AboutPageCountArgs>(
      args?: Subset<T, AboutPageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AboutPageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AboutPage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AboutPageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AboutPageAggregateArgs>(args: Subset<T, AboutPageAggregateArgs>): Prisma.PrismaPromise<GetAboutPageAggregateType<T>>

    /**
     * Group by AboutPage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AboutPageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AboutPageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AboutPageGroupByArgs['orderBy'] }
        : { orderBy?: AboutPageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AboutPageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAboutPageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AboutPage model
   */
  readonly fields: AboutPageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AboutPage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AboutPageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AboutPage model
   */
  interface AboutPageFieldRefs {
    readonly id: FieldRef<"AboutPage", 'Int'>
    readonly title: FieldRef<"AboutPage", 'String'>
    readonly content: FieldRef<"AboutPage", 'String'>
    readonly mission: FieldRef<"AboutPage", 'String'>
    readonly vision: FieldRef<"AboutPage", 'String'>
    readonly history: FieldRef<"AboutPage", 'String'>
    readonly image_url: FieldRef<"AboutPage", 'String'>
    readonly content_language: FieldRef<"AboutPage", 'String'>
    readonly translation_group: FieldRef<"AboutPage", 'String'>
    readonly is_published: FieldRef<"AboutPage", 'Boolean'>
    readonly created_at: FieldRef<"AboutPage", 'DateTime'>
    readonly updated_at: FieldRef<"AboutPage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AboutPage findUnique
   */
  export type AboutPageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AboutPage
     */
    select?: AboutPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AboutPage
     */
    omit?: AboutPageOmit<ExtArgs> | null
    /**
     * Filter, which AboutPage to fetch.
     */
    where: AboutPageWhereUniqueInput
  }

  /**
   * AboutPage findUniqueOrThrow
   */
  export type AboutPageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AboutPage
     */
    select?: AboutPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AboutPage
     */
    omit?: AboutPageOmit<ExtArgs> | null
    /**
     * Filter, which AboutPage to fetch.
     */
    where: AboutPageWhereUniqueInput
  }

  /**
   * AboutPage findFirst
   */
  export type AboutPageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AboutPage
     */
    select?: AboutPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AboutPage
     */
    omit?: AboutPageOmit<ExtArgs> | null
    /**
     * Filter, which AboutPage to fetch.
     */
    where?: AboutPageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AboutPages to fetch.
     */
    orderBy?: AboutPageOrderByWithRelationInput | AboutPageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AboutPages.
     */
    cursor?: AboutPageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AboutPages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AboutPages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AboutPages.
     */
    distinct?: AboutPageScalarFieldEnum | AboutPageScalarFieldEnum[]
  }

  /**
   * AboutPage findFirstOrThrow
   */
  export type AboutPageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AboutPage
     */
    select?: AboutPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AboutPage
     */
    omit?: AboutPageOmit<ExtArgs> | null
    /**
     * Filter, which AboutPage to fetch.
     */
    where?: AboutPageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AboutPages to fetch.
     */
    orderBy?: AboutPageOrderByWithRelationInput | AboutPageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AboutPages.
     */
    cursor?: AboutPageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AboutPages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AboutPages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AboutPages.
     */
    distinct?: AboutPageScalarFieldEnum | AboutPageScalarFieldEnum[]
  }

  /**
   * AboutPage findMany
   */
  export type AboutPageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AboutPage
     */
    select?: AboutPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AboutPage
     */
    omit?: AboutPageOmit<ExtArgs> | null
    /**
     * Filter, which AboutPages to fetch.
     */
    where?: AboutPageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AboutPages to fetch.
     */
    orderBy?: AboutPageOrderByWithRelationInput | AboutPageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AboutPages.
     */
    cursor?: AboutPageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AboutPages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AboutPages.
     */
    skip?: number
    distinct?: AboutPageScalarFieldEnum | AboutPageScalarFieldEnum[]
  }

  /**
   * AboutPage create
   */
  export type AboutPageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AboutPage
     */
    select?: AboutPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AboutPage
     */
    omit?: AboutPageOmit<ExtArgs> | null
    /**
     * The data needed to create a AboutPage.
     */
    data: XOR<AboutPageCreateInput, AboutPageUncheckedCreateInput>
  }

  /**
   * AboutPage createMany
   */
  export type AboutPageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AboutPages.
     */
    data: AboutPageCreateManyInput | AboutPageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AboutPage createManyAndReturn
   */
  export type AboutPageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AboutPage
     */
    select?: AboutPageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AboutPage
     */
    omit?: AboutPageOmit<ExtArgs> | null
    /**
     * The data used to create many AboutPages.
     */
    data: AboutPageCreateManyInput | AboutPageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AboutPage update
   */
  export type AboutPageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AboutPage
     */
    select?: AboutPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AboutPage
     */
    omit?: AboutPageOmit<ExtArgs> | null
    /**
     * The data needed to update a AboutPage.
     */
    data: XOR<AboutPageUpdateInput, AboutPageUncheckedUpdateInput>
    /**
     * Choose, which AboutPage to update.
     */
    where: AboutPageWhereUniqueInput
  }

  /**
   * AboutPage updateMany
   */
  export type AboutPageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AboutPages.
     */
    data: XOR<AboutPageUpdateManyMutationInput, AboutPageUncheckedUpdateManyInput>
    /**
     * Filter which AboutPages to update
     */
    where?: AboutPageWhereInput
    /**
     * Limit how many AboutPages to update.
     */
    limit?: number
  }

  /**
   * AboutPage updateManyAndReturn
   */
  export type AboutPageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AboutPage
     */
    select?: AboutPageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AboutPage
     */
    omit?: AboutPageOmit<ExtArgs> | null
    /**
     * The data used to update AboutPages.
     */
    data: XOR<AboutPageUpdateManyMutationInput, AboutPageUncheckedUpdateManyInput>
    /**
     * Filter which AboutPages to update
     */
    where?: AboutPageWhereInput
    /**
     * Limit how many AboutPages to update.
     */
    limit?: number
  }

  /**
   * AboutPage upsert
   */
  export type AboutPageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AboutPage
     */
    select?: AboutPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AboutPage
     */
    omit?: AboutPageOmit<ExtArgs> | null
    /**
     * The filter to search for the AboutPage to update in case it exists.
     */
    where: AboutPageWhereUniqueInput
    /**
     * In case the AboutPage found by the `where` argument doesn't exist, create a new AboutPage with this data.
     */
    create: XOR<AboutPageCreateInput, AboutPageUncheckedCreateInput>
    /**
     * In case the AboutPage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AboutPageUpdateInput, AboutPageUncheckedUpdateInput>
  }

  /**
   * AboutPage delete
   */
  export type AboutPageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AboutPage
     */
    select?: AboutPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AboutPage
     */
    omit?: AboutPageOmit<ExtArgs> | null
    /**
     * Filter which AboutPage to delete.
     */
    where: AboutPageWhereUniqueInput
  }

  /**
   * AboutPage deleteMany
   */
  export type AboutPageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AboutPages to delete
     */
    where?: AboutPageWhereInput
    /**
     * Limit how many AboutPages to delete.
     */
    limit?: number
  }

  /**
   * AboutPage without action
   */
  export type AboutPageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AboutPage
     */
    select?: AboutPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AboutPage
     */
    omit?: AboutPageOmit<ExtArgs> | null
  }


  /**
   * Model ContactPage
   */

  export type AggregateContactPage = {
    _count: ContactPageCountAggregateOutputType | null
    _avg: ContactPageAvgAggregateOutputType | null
    _sum: ContactPageSumAggregateOutputType | null
    _min: ContactPageMinAggregateOutputType | null
    _max: ContactPageMaxAggregateOutputType | null
  }

  export type ContactPageAvgAggregateOutputType = {
    id: number | null
  }

  export type ContactPageSumAggregateOutputType = {
    id: number | null
  }

  export type ContactPageMinAggregateOutputType = {
    id: number | null
    title: string | null
    content: string | null
    address: string | null
    phone: string | null
    email: string | null
    office_hours: string | null
    map_embed: string | null
    content_language: string | null
    translation_group: string | null
    is_published: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ContactPageMaxAggregateOutputType = {
    id: number | null
    title: string | null
    content: string | null
    address: string | null
    phone: string | null
    email: string | null
    office_hours: string | null
    map_embed: string | null
    content_language: string | null
    translation_group: string | null
    is_published: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ContactPageCountAggregateOutputType = {
    id: number
    title: number
    content: number
    address: number
    phone: number
    email: number
    office_hours: number
    map_embed: number
    content_language: number
    translation_group: number
    is_published: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ContactPageAvgAggregateInputType = {
    id?: true
  }

  export type ContactPageSumAggregateInputType = {
    id?: true
  }

  export type ContactPageMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    address?: true
    phone?: true
    email?: true
    office_hours?: true
    map_embed?: true
    content_language?: true
    translation_group?: true
    is_published?: true
    created_at?: true
    updated_at?: true
  }

  export type ContactPageMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    address?: true
    phone?: true
    email?: true
    office_hours?: true
    map_embed?: true
    content_language?: true
    translation_group?: true
    is_published?: true
    created_at?: true
    updated_at?: true
  }

  export type ContactPageCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    address?: true
    phone?: true
    email?: true
    office_hours?: true
    map_embed?: true
    content_language?: true
    translation_group?: true
    is_published?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ContactPageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContactPage to aggregate.
     */
    where?: ContactPageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactPages to fetch.
     */
    orderBy?: ContactPageOrderByWithRelationInput | ContactPageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContactPageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactPages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactPages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ContactPages
    **/
    _count?: true | ContactPageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ContactPageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ContactPageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContactPageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContactPageMaxAggregateInputType
  }

  export type GetContactPageAggregateType<T extends ContactPageAggregateArgs> = {
        [P in keyof T & keyof AggregateContactPage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContactPage[P]>
      : GetScalarType<T[P], AggregateContactPage[P]>
  }




  export type ContactPageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContactPageWhereInput
    orderBy?: ContactPageOrderByWithAggregationInput | ContactPageOrderByWithAggregationInput[]
    by: ContactPageScalarFieldEnum[] | ContactPageScalarFieldEnum
    having?: ContactPageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContactPageCountAggregateInputType | true
    _avg?: ContactPageAvgAggregateInputType
    _sum?: ContactPageSumAggregateInputType
    _min?: ContactPageMinAggregateInputType
    _max?: ContactPageMaxAggregateInputType
  }

  export type ContactPageGroupByOutputType = {
    id: number
    title: string
    content: string
    address: string | null
    phone: string | null
    email: string | null
    office_hours: string | null
    map_embed: string | null
    content_language: string
    translation_group: string | null
    is_published: boolean
    created_at: Date
    updated_at: Date
    _count: ContactPageCountAggregateOutputType | null
    _avg: ContactPageAvgAggregateOutputType | null
    _sum: ContactPageSumAggregateOutputType | null
    _min: ContactPageMinAggregateOutputType | null
    _max: ContactPageMaxAggregateOutputType | null
  }

  type GetContactPageGroupByPayload<T extends ContactPageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContactPageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContactPageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContactPageGroupByOutputType[P]>
            : GetScalarType<T[P], ContactPageGroupByOutputType[P]>
        }
      >
    >


  export type ContactPageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    address?: boolean
    phone?: boolean
    email?: boolean
    office_hours?: boolean
    map_embed?: boolean
    content_language?: boolean
    translation_group?: boolean
    is_published?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["contactPage"]>

  export type ContactPageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    address?: boolean
    phone?: boolean
    email?: boolean
    office_hours?: boolean
    map_embed?: boolean
    content_language?: boolean
    translation_group?: boolean
    is_published?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["contactPage"]>

  export type ContactPageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    address?: boolean
    phone?: boolean
    email?: boolean
    office_hours?: boolean
    map_embed?: boolean
    content_language?: boolean
    translation_group?: boolean
    is_published?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["contactPage"]>

  export type ContactPageSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    address?: boolean
    phone?: boolean
    email?: boolean
    office_hours?: boolean
    map_embed?: boolean
    content_language?: boolean
    translation_group?: boolean
    is_published?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ContactPageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "address" | "phone" | "email" | "office_hours" | "map_embed" | "content_language" | "translation_group" | "is_published" | "created_at" | "updated_at", ExtArgs["result"]["contactPage"]>

  export type $ContactPagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ContactPage"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      content: string
      address: string | null
      phone: string | null
      email: string | null
      office_hours: string | null
      map_embed: string | null
      content_language: string
      translation_group: string | null
      is_published: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["contactPage"]>
    composites: {}
  }

  type ContactPageGetPayload<S extends boolean | null | undefined | ContactPageDefaultArgs> = $Result.GetResult<Prisma.$ContactPagePayload, S>

  type ContactPageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContactPageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContactPageCountAggregateInputType | true
    }

  export interface ContactPageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ContactPage'], meta: { name: 'ContactPage' } }
    /**
     * Find zero or one ContactPage that matches the filter.
     * @param {ContactPageFindUniqueArgs} args - Arguments to find a ContactPage
     * @example
     * // Get one ContactPage
     * const contactPage = await prisma.contactPage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContactPageFindUniqueArgs>(args: SelectSubset<T, ContactPageFindUniqueArgs<ExtArgs>>): Prisma__ContactPageClient<$Result.GetResult<Prisma.$ContactPagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ContactPage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContactPageFindUniqueOrThrowArgs} args - Arguments to find a ContactPage
     * @example
     * // Get one ContactPage
     * const contactPage = await prisma.contactPage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContactPageFindUniqueOrThrowArgs>(args: SelectSubset<T, ContactPageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContactPageClient<$Result.GetResult<Prisma.$ContactPagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContactPage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactPageFindFirstArgs} args - Arguments to find a ContactPage
     * @example
     * // Get one ContactPage
     * const contactPage = await prisma.contactPage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContactPageFindFirstArgs>(args?: SelectSubset<T, ContactPageFindFirstArgs<ExtArgs>>): Prisma__ContactPageClient<$Result.GetResult<Prisma.$ContactPagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContactPage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactPageFindFirstOrThrowArgs} args - Arguments to find a ContactPage
     * @example
     * // Get one ContactPage
     * const contactPage = await prisma.contactPage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContactPageFindFirstOrThrowArgs>(args?: SelectSubset<T, ContactPageFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContactPageClient<$Result.GetResult<Prisma.$ContactPagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ContactPages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactPageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ContactPages
     * const contactPages = await prisma.contactPage.findMany()
     * 
     * // Get first 10 ContactPages
     * const contactPages = await prisma.contactPage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contactPageWithIdOnly = await prisma.contactPage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContactPageFindManyArgs>(args?: SelectSubset<T, ContactPageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ContactPage.
     * @param {ContactPageCreateArgs} args - Arguments to create a ContactPage.
     * @example
     * // Create one ContactPage
     * const ContactPage = await prisma.contactPage.create({
     *   data: {
     *     // ... data to create a ContactPage
     *   }
     * })
     * 
     */
    create<T extends ContactPageCreateArgs>(args: SelectSubset<T, ContactPageCreateArgs<ExtArgs>>): Prisma__ContactPageClient<$Result.GetResult<Prisma.$ContactPagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ContactPages.
     * @param {ContactPageCreateManyArgs} args - Arguments to create many ContactPages.
     * @example
     * // Create many ContactPages
     * const contactPage = await prisma.contactPage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContactPageCreateManyArgs>(args?: SelectSubset<T, ContactPageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ContactPages and returns the data saved in the database.
     * @param {ContactPageCreateManyAndReturnArgs} args - Arguments to create many ContactPages.
     * @example
     * // Create many ContactPages
     * const contactPage = await prisma.contactPage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ContactPages and only return the `id`
     * const contactPageWithIdOnly = await prisma.contactPage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContactPageCreateManyAndReturnArgs>(args?: SelectSubset<T, ContactPageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ContactPage.
     * @param {ContactPageDeleteArgs} args - Arguments to delete one ContactPage.
     * @example
     * // Delete one ContactPage
     * const ContactPage = await prisma.contactPage.delete({
     *   where: {
     *     // ... filter to delete one ContactPage
     *   }
     * })
     * 
     */
    delete<T extends ContactPageDeleteArgs>(args: SelectSubset<T, ContactPageDeleteArgs<ExtArgs>>): Prisma__ContactPageClient<$Result.GetResult<Prisma.$ContactPagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ContactPage.
     * @param {ContactPageUpdateArgs} args - Arguments to update one ContactPage.
     * @example
     * // Update one ContactPage
     * const contactPage = await prisma.contactPage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContactPageUpdateArgs>(args: SelectSubset<T, ContactPageUpdateArgs<ExtArgs>>): Prisma__ContactPageClient<$Result.GetResult<Prisma.$ContactPagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ContactPages.
     * @param {ContactPageDeleteManyArgs} args - Arguments to filter ContactPages to delete.
     * @example
     * // Delete a few ContactPages
     * const { count } = await prisma.contactPage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContactPageDeleteManyArgs>(args?: SelectSubset<T, ContactPageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContactPages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactPageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ContactPages
     * const contactPage = await prisma.contactPage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContactPageUpdateManyArgs>(args: SelectSubset<T, ContactPageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContactPages and returns the data updated in the database.
     * @param {ContactPageUpdateManyAndReturnArgs} args - Arguments to update many ContactPages.
     * @example
     * // Update many ContactPages
     * const contactPage = await prisma.contactPage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ContactPages and only return the `id`
     * const contactPageWithIdOnly = await prisma.contactPage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ContactPageUpdateManyAndReturnArgs>(args: SelectSubset<T, ContactPageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ContactPage.
     * @param {ContactPageUpsertArgs} args - Arguments to update or create a ContactPage.
     * @example
     * // Update or create a ContactPage
     * const contactPage = await prisma.contactPage.upsert({
     *   create: {
     *     // ... data to create a ContactPage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ContactPage we want to update
     *   }
     * })
     */
    upsert<T extends ContactPageUpsertArgs>(args: SelectSubset<T, ContactPageUpsertArgs<ExtArgs>>): Prisma__ContactPageClient<$Result.GetResult<Prisma.$ContactPagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ContactPages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactPageCountArgs} args - Arguments to filter ContactPages to count.
     * @example
     * // Count the number of ContactPages
     * const count = await prisma.contactPage.count({
     *   where: {
     *     // ... the filter for the ContactPages we want to count
     *   }
     * })
    **/
    count<T extends ContactPageCountArgs>(
      args?: Subset<T, ContactPageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContactPageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ContactPage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactPageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContactPageAggregateArgs>(args: Subset<T, ContactPageAggregateArgs>): Prisma.PrismaPromise<GetContactPageAggregateType<T>>

    /**
     * Group by ContactPage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactPageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContactPageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContactPageGroupByArgs['orderBy'] }
        : { orderBy?: ContactPageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContactPageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContactPageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ContactPage model
   */
  readonly fields: ContactPageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ContactPage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContactPageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ContactPage model
   */
  interface ContactPageFieldRefs {
    readonly id: FieldRef<"ContactPage", 'Int'>
    readonly title: FieldRef<"ContactPage", 'String'>
    readonly content: FieldRef<"ContactPage", 'String'>
    readonly address: FieldRef<"ContactPage", 'String'>
    readonly phone: FieldRef<"ContactPage", 'String'>
    readonly email: FieldRef<"ContactPage", 'String'>
    readonly office_hours: FieldRef<"ContactPage", 'String'>
    readonly map_embed: FieldRef<"ContactPage", 'String'>
    readonly content_language: FieldRef<"ContactPage", 'String'>
    readonly translation_group: FieldRef<"ContactPage", 'String'>
    readonly is_published: FieldRef<"ContactPage", 'Boolean'>
    readonly created_at: FieldRef<"ContactPage", 'DateTime'>
    readonly updated_at: FieldRef<"ContactPage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ContactPage findUnique
   */
  export type ContactPageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactPage
     */
    select?: ContactPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactPage
     */
    omit?: ContactPageOmit<ExtArgs> | null
    /**
     * Filter, which ContactPage to fetch.
     */
    where: ContactPageWhereUniqueInput
  }

  /**
   * ContactPage findUniqueOrThrow
   */
  export type ContactPageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactPage
     */
    select?: ContactPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactPage
     */
    omit?: ContactPageOmit<ExtArgs> | null
    /**
     * Filter, which ContactPage to fetch.
     */
    where: ContactPageWhereUniqueInput
  }

  /**
   * ContactPage findFirst
   */
  export type ContactPageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactPage
     */
    select?: ContactPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactPage
     */
    omit?: ContactPageOmit<ExtArgs> | null
    /**
     * Filter, which ContactPage to fetch.
     */
    where?: ContactPageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactPages to fetch.
     */
    orderBy?: ContactPageOrderByWithRelationInput | ContactPageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContactPages.
     */
    cursor?: ContactPageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactPages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactPages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContactPages.
     */
    distinct?: ContactPageScalarFieldEnum | ContactPageScalarFieldEnum[]
  }

  /**
   * ContactPage findFirstOrThrow
   */
  export type ContactPageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactPage
     */
    select?: ContactPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactPage
     */
    omit?: ContactPageOmit<ExtArgs> | null
    /**
     * Filter, which ContactPage to fetch.
     */
    where?: ContactPageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactPages to fetch.
     */
    orderBy?: ContactPageOrderByWithRelationInput | ContactPageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContactPages.
     */
    cursor?: ContactPageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactPages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactPages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContactPages.
     */
    distinct?: ContactPageScalarFieldEnum | ContactPageScalarFieldEnum[]
  }

  /**
   * ContactPage findMany
   */
  export type ContactPageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactPage
     */
    select?: ContactPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactPage
     */
    omit?: ContactPageOmit<ExtArgs> | null
    /**
     * Filter, which ContactPages to fetch.
     */
    where?: ContactPageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactPages to fetch.
     */
    orderBy?: ContactPageOrderByWithRelationInput | ContactPageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ContactPages.
     */
    cursor?: ContactPageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactPages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactPages.
     */
    skip?: number
    distinct?: ContactPageScalarFieldEnum | ContactPageScalarFieldEnum[]
  }

  /**
   * ContactPage create
   */
  export type ContactPageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactPage
     */
    select?: ContactPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactPage
     */
    omit?: ContactPageOmit<ExtArgs> | null
    /**
     * The data needed to create a ContactPage.
     */
    data: XOR<ContactPageCreateInput, ContactPageUncheckedCreateInput>
  }

  /**
   * ContactPage createMany
   */
  export type ContactPageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ContactPages.
     */
    data: ContactPageCreateManyInput | ContactPageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ContactPage createManyAndReturn
   */
  export type ContactPageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactPage
     */
    select?: ContactPageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ContactPage
     */
    omit?: ContactPageOmit<ExtArgs> | null
    /**
     * The data used to create many ContactPages.
     */
    data: ContactPageCreateManyInput | ContactPageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ContactPage update
   */
  export type ContactPageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactPage
     */
    select?: ContactPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactPage
     */
    omit?: ContactPageOmit<ExtArgs> | null
    /**
     * The data needed to update a ContactPage.
     */
    data: XOR<ContactPageUpdateInput, ContactPageUncheckedUpdateInput>
    /**
     * Choose, which ContactPage to update.
     */
    where: ContactPageWhereUniqueInput
  }

  /**
   * ContactPage updateMany
   */
  export type ContactPageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ContactPages.
     */
    data: XOR<ContactPageUpdateManyMutationInput, ContactPageUncheckedUpdateManyInput>
    /**
     * Filter which ContactPages to update
     */
    where?: ContactPageWhereInput
    /**
     * Limit how many ContactPages to update.
     */
    limit?: number
  }

  /**
   * ContactPage updateManyAndReturn
   */
  export type ContactPageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactPage
     */
    select?: ContactPageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ContactPage
     */
    omit?: ContactPageOmit<ExtArgs> | null
    /**
     * The data used to update ContactPages.
     */
    data: XOR<ContactPageUpdateManyMutationInput, ContactPageUncheckedUpdateManyInput>
    /**
     * Filter which ContactPages to update
     */
    where?: ContactPageWhereInput
    /**
     * Limit how many ContactPages to update.
     */
    limit?: number
  }

  /**
   * ContactPage upsert
   */
  export type ContactPageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactPage
     */
    select?: ContactPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactPage
     */
    omit?: ContactPageOmit<ExtArgs> | null
    /**
     * The filter to search for the ContactPage to update in case it exists.
     */
    where: ContactPageWhereUniqueInput
    /**
     * In case the ContactPage found by the `where` argument doesn't exist, create a new ContactPage with this data.
     */
    create: XOR<ContactPageCreateInput, ContactPageUncheckedCreateInput>
    /**
     * In case the ContactPage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContactPageUpdateInput, ContactPageUncheckedUpdateInput>
  }

  /**
   * ContactPage delete
   */
  export type ContactPageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactPage
     */
    select?: ContactPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactPage
     */
    omit?: ContactPageOmit<ExtArgs> | null
    /**
     * Filter which ContactPage to delete.
     */
    where: ContactPageWhereUniqueInput
  }

  /**
   * ContactPage deleteMany
   */
  export type ContactPageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContactPages to delete
     */
    where?: ContactPageWhereInput
    /**
     * Limit how many ContactPages to delete.
     */
    limit?: number
  }

  /**
   * ContactPage without action
   */
  export type ContactPageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactPage
     */
    select?: ContactPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactPage
     */
    omit?: ContactPageOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password_hash: 'password_hash',
    first_name: 'first_name',
    last_name: 'last_name',
    phone: 'phone',
    is_admin: 'is_admin',
    email_notifications: 'email_notifications',
    marketing_preferences: 'marketing_preferences',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const TheatreScalarFieldEnum: {
    id: 'id',
    name: 'name',
    city: 'city',
    country: 'country',
    description: 'description',
    history: 'history',
    website: 'website',
    founded_year: 'founded_year',
    content_language: 'content_language',
    translation_group: 'translation_group',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type TheatreScalarFieldEnum = (typeof TheatreScalarFieldEnum)[keyof typeof TheatreScalarFieldEnum]


  export const TheatreImageScalarFieldEnum: {
    id: 'id',
    theatre_id: 'theatre_id',
    image_url: 'image_url',
    caption: 'caption',
    is_primary: 'is_primary',
    created_at: 'created_at'
  };

  export type TheatreImageScalarFieldEnum = (typeof TheatreImageScalarFieldEnum)[keyof typeof TheatreImageScalarFieldEnum]


  export const TheatreTagScalarFieldEnum: {
    id: 'id',
    theatre_id: 'theatre_id',
    tag_name: 'tag_name',
    created_at: 'created_at'
  };

  export type TheatreTagScalarFieldEnum = (typeof TheatreTagScalarFieldEnum)[keyof typeof TheatreTagScalarFieldEnum]


  export const VenueScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    address: 'address',
    city: 'city',
    capacity: 'capacity',
    image_url: 'image_url',
    created_at: 'created_at'
  };

  export type VenueScalarFieldEnum = (typeof VenueScalarFieldEnum)[keyof typeof VenueScalarFieldEnum]


  export const VenueSectionScalarFieldEnum: {
    id: 'id',
    venue_id: 'venue_id',
    section_name: 'section_name',
    section_type: 'section_type',
    created_at: 'created_at'
  };

  export type VenueSectionScalarFieldEnum = (typeof VenueSectionScalarFieldEnum)[keyof typeof VenueSectionScalarFieldEnum]


  export const SeatScalarFieldEnum: {
    id: 'id',
    venue_section_id: 'venue_section_id',
    row_number: 'row_number',
    seat_number: 'seat_number',
    is_available: 'is_available',
    is_accessible: 'is_accessible',
    created_at: 'created_at'
  };

  export type SeatScalarFieldEnum = (typeof SeatScalarFieldEnum)[keyof typeof SeatScalarFieldEnum]


  export const EventScalarFieldEnum: {
    id: 'id',
    title: 'title',
    theatre_id: 'theatre_id',
    venue_id: 'venue_id',
    event_type: 'event_type',
    event_date: 'event_date',
    event_time: 'event_time',
    description: 'description',
    price: 'price',
    image_url: 'image_url',
    poster_url: 'poster_url',
    language: 'language',
    content_language: 'content_language',
    translation_group: 'translation_group',
    genre: 'genre',
    company: 'company',
    director: 'director',
    cast: 'cast',
    synopsis: 'synopsis',
    subtitles: 'subtitles',
    duration: 'duration',
    is_featured: 'is_featured',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type EventScalarFieldEnum = (typeof EventScalarFieldEnum)[keyof typeof EventScalarFieldEnum]


  export const BookingScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    event_id: 'event_id',
    booking_reference: 'booking_reference',
    total_amount: 'total_amount',
    booking_status: 'booking_status',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type BookingScalarFieldEnum = (typeof BookingScalarFieldEnum)[keyof typeof BookingScalarFieldEnum]


  export const BookedSeatScalarFieldEnum: {
    id: 'id',
    booking_id: 'booking_id',
    seat_id: 'seat_id',
    created_at: 'created_at'
  };

  export type BookedSeatScalarFieldEnum = (typeof BookedSeatScalarFieldEnum)[keyof typeof BookedSeatScalarFieldEnum]


  export const NewsArticleScalarFieldEnum: {
    id: 'id',
    title: 'title',
    excerpt: 'excerpt',
    content: 'content',
    category: 'category',
    image_url: 'image_url',
    author: 'author',
    content_language: 'content_language',
    translation_group: 'translation_group',
    published_at: 'published_at',
    is_published: 'is_published',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type NewsArticleScalarFieldEnum = (typeof NewsArticleScalarFieldEnum)[keyof typeof NewsArticleScalarFieldEnum]


  export const AboutPageScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    mission: 'mission',
    vision: 'vision',
    history: 'history',
    image_url: 'image_url',
    content_language: 'content_language',
    translation_group: 'translation_group',
    is_published: 'is_published',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type AboutPageScalarFieldEnum = (typeof AboutPageScalarFieldEnum)[keyof typeof AboutPageScalarFieldEnum]


  export const ContactPageScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    address: 'address',
    phone: 'phone',
    email: 'email',
    office_hours: 'office_hours',
    map_embed: 'map_embed',
    content_language: 'content_language',
    translation_group: 'translation_group',
    is_published: 'is_published',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ContactPageScalarFieldEnum = (typeof ContactPageScalarFieldEnum)[keyof typeof ContactPageScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'SectionType'
   */
  export type EnumSectionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SectionType'>
    


  /**
   * Reference to a field of type 'SectionType[]'
   */
  export type ListEnumSectionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SectionType[]'>
    


  /**
   * Reference to a field of type 'EventType'
   */
  export type EnumEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventType'>
    


  /**
   * Reference to a field of type 'EventType[]'
   */
  export type ListEnumEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventType[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'BookingStatus'
   */
  export type EnumBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingStatus'>
    


  /**
   * Reference to a field of type 'BookingStatus[]'
   */
  export type ListEnumBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    password_hash?: StringFilter<"User"> | string
    first_name?: StringFilter<"User"> | string
    last_name?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    is_admin?: BoolFilter<"User"> | boolean
    email_notifications?: BoolFilter<"User"> | boolean
    marketing_preferences?: BoolFilter<"User"> | boolean
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    bookings?: BookingListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    phone?: SortOrderInput | SortOrder
    is_admin?: SortOrder
    email_notifications?: SortOrder
    marketing_preferences?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    bookings?: BookingOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password_hash?: StringFilter<"User"> | string
    first_name?: StringFilter<"User"> | string
    last_name?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    is_admin?: BoolFilter<"User"> | boolean
    email_notifications?: BoolFilter<"User"> | boolean
    marketing_preferences?: BoolFilter<"User"> | boolean
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    bookings?: BookingListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    phone?: SortOrderInput | SortOrder
    is_admin?: SortOrder
    email_notifications?: SortOrder
    marketing_preferences?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    password_hash?: StringWithAggregatesFilter<"User"> | string
    first_name?: StringWithAggregatesFilter<"User"> | string
    last_name?: StringWithAggregatesFilter<"User"> | string
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    is_admin?: BoolWithAggregatesFilter<"User"> | boolean
    email_notifications?: BoolWithAggregatesFilter<"User"> | boolean
    marketing_preferences?: BoolWithAggregatesFilter<"User"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type TheatreWhereInput = {
    AND?: TheatreWhereInput | TheatreWhereInput[]
    OR?: TheatreWhereInput[]
    NOT?: TheatreWhereInput | TheatreWhereInput[]
    id?: IntFilter<"Theatre"> | number
    name?: StringFilter<"Theatre"> | string
    city?: StringFilter<"Theatre"> | string
    country?: StringFilter<"Theatre"> | string
    description?: StringNullableFilter<"Theatre"> | string | null
    history?: StringNullableFilter<"Theatre"> | string | null
    website?: StringNullableFilter<"Theatre"> | string | null
    founded_year?: IntNullableFilter<"Theatre"> | number | null
    content_language?: StringFilter<"Theatre"> | string
    translation_group?: StringNullableFilter<"Theatre"> | string | null
    created_at?: DateTimeFilter<"Theatre"> | Date | string
    updated_at?: DateTimeFilter<"Theatre"> | Date | string
    images?: TheatreImageListRelationFilter
    tags?: TheatreTagListRelationFilter
    events?: EventListRelationFilter
  }

  export type TheatreOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    city?: SortOrder
    country?: SortOrder
    description?: SortOrderInput | SortOrder
    history?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    founded_year?: SortOrderInput | SortOrder
    content_language?: SortOrder
    translation_group?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    images?: TheatreImageOrderByRelationAggregateInput
    tags?: TheatreTagOrderByRelationAggregateInput
    events?: EventOrderByRelationAggregateInput
  }

  export type TheatreWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TheatreWhereInput | TheatreWhereInput[]
    OR?: TheatreWhereInput[]
    NOT?: TheatreWhereInput | TheatreWhereInput[]
    name?: StringFilter<"Theatre"> | string
    city?: StringFilter<"Theatre"> | string
    country?: StringFilter<"Theatre"> | string
    description?: StringNullableFilter<"Theatre"> | string | null
    history?: StringNullableFilter<"Theatre"> | string | null
    website?: StringNullableFilter<"Theatre"> | string | null
    founded_year?: IntNullableFilter<"Theatre"> | number | null
    content_language?: StringFilter<"Theatre"> | string
    translation_group?: StringNullableFilter<"Theatre"> | string | null
    created_at?: DateTimeFilter<"Theatre"> | Date | string
    updated_at?: DateTimeFilter<"Theatre"> | Date | string
    images?: TheatreImageListRelationFilter
    tags?: TheatreTagListRelationFilter
    events?: EventListRelationFilter
  }, "id">

  export type TheatreOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    city?: SortOrder
    country?: SortOrder
    description?: SortOrderInput | SortOrder
    history?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    founded_year?: SortOrderInput | SortOrder
    content_language?: SortOrder
    translation_group?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: TheatreCountOrderByAggregateInput
    _avg?: TheatreAvgOrderByAggregateInput
    _max?: TheatreMaxOrderByAggregateInput
    _min?: TheatreMinOrderByAggregateInput
    _sum?: TheatreSumOrderByAggregateInput
  }

  export type TheatreScalarWhereWithAggregatesInput = {
    AND?: TheatreScalarWhereWithAggregatesInput | TheatreScalarWhereWithAggregatesInput[]
    OR?: TheatreScalarWhereWithAggregatesInput[]
    NOT?: TheatreScalarWhereWithAggregatesInput | TheatreScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Theatre"> | number
    name?: StringWithAggregatesFilter<"Theatre"> | string
    city?: StringWithAggregatesFilter<"Theatre"> | string
    country?: StringWithAggregatesFilter<"Theatre"> | string
    description?: StringNullableWithAggregatesFilter<"Theatre"> | string | null
    history?: StringNullableWithAggregatesFilter<"Theatre"> | string | null
    website?: StringNullableWithAggregatesFilter<"Theatre"> | string | null
    founded_year?: IntNullableWithAggregatesFilter<"Theatre"> | number | null
    content_language?: StringWithAggregatesFilter<"Theatre"> | string
    translation_group?: StringNullableWithAggregatesFilter<"Theatre"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Theatre"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Theatre"> | Date | string
  }

  export type TheatreImageWhereInput = {
    AND?: TheatreImageWhereInput | TheatreImageWhereInput[]
    OR?: TheatreImageWhereInput[]
    NOT?: TheatreImageWhereInput | TheatreImageWhereInput[]
    id?: IntFilter<"TheatreImage"> | number
    theatre_id?: IntFilter<"TheatreImage"> | number
    image_url?: StringFilter<"TheatreImage"> | string
    caption?: StringNullableFilter<"TheatreImage"> | string | null
    is_primary?: BoolFilter<"TheatreImage"> | boolean
    created_at?: DateTimeFilter<"TheatreImage"> | Date | string
    theatre?: XOR<TheatreScalarRelationFilter, TheatreWhereInput>
  }

  export type TheatreImageOrderByWithRelationInput = {
    id?: SortOrder
    theatre_id?: SortOrder
    image_url?: SortOrder
    caption?: SortOrderInput | SortOrder
    is_primary?: SortOrder
    created_at?: SortOrder
    theatre?: TheatreOrderByWithRelationInput
  }

  export type TheatreImageWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TheatreImageWhereInput | TheatreImageWhereInput[]
    OR?: TheatreImageWhereInput[]
    NOT?: TheatreImageWhereInput | TheatreImageWhereInput[]
    theatre_id?: IntFilter<"TheatreImage"> | number
    image_url?: StringFilter<"TheatreImage"> | string
    caption?: StringNullableFilter<"TheatreImage"> | string | null
    is_primary?: BoolFilter<"TheatreImage"> | boolean
    created_at?: DateTimeFilter<"TheatreImage"> | Date | string
    theatre?: XOR<TheatreScalarRelationFilter, TheatreWhereInput>
  }, "id">

  export type TheatreImageOrderByWithAggregationInput = {
    id?: SortOrder
    theatre_id?: SortOrder
    image_url?: SortOrder
    caption?: SortOrderInput | SortOrder
    is_primary?: SortOrder
    created_at?: SortOrder
    _count?: TheatreImageCountOrderByAggregateInput
    _avg?: TheatreImageAvgOrderByAggregateInput
    _max?: TheatreImageMaxOrderByAggregateInput
    _min?: TheatreImageMinOrderByAggregateInput
    _sum?: TheatreImageSumOrderByAggregateInput
  }

  export type TheatreImageScalarWhereWithAggregatesInput = {
    AND?: TheatreImageScalarWhereWithAggregatesInput | TheatreImageScalarWhereWithAggregatesInput[]
    OR?: TheatreImageScalarWhereWithAggregatesInput[]
    NOT?: TheatreImageScalarWhereWithAggregatesInput | TheatreImageScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TheatreImage"> | number
    theatre_id?: IntWithAggregatesFilter<"TheatreImage"> | number
    image_url?: StringWithAggregatesFilter<"TheatreImage"> | string
    caption?: StringNullableWithAggregatesFilter<"TheatreImage"> | string | null
    is_primary?: BoolWithAggregatesFilter<"TheatreImage"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"TheatreImage"> | Date | string
  }

  export type TheatreTagWhereInput = {
    AND?: TheatreTagWhereInput | TheatreTagWhereInput[]
    OR?: TheatreTagWhereInput[]
    NOT?: TheatreTagWhereInput | TheatreTagWhereInput[]
    id?: IntFilter<"TheatreTag"> | number
    theatre_id?: IntFilter<"TheatreTag"> | number
    tag_name?: StringFilter<"TheatreTag"> | string
    created_at?: DateTimeFilter<"TheatreTag"> | Date | string
    theatre?: XOR<TheatreScalarRelationFilter, TheatreWhereInput>
  }

  export type TheatreTagOrderByWithRelationInput = {
    id?: SortOrder
    theatre_id?: SortOrder
    tag_name?: SortOrder
    created_at?: SortOrder
    theatre?: TheatreOrderByWithRelationInput
  }

  export type TheatreTagWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TheatreTagWhereInput | TheatreTagWhereInput[]
    OR?: TheatreTagWhereInput[]
    NOT?: TheatreTagWhereInput | TheatreTagWhereInput[]
    theatre_id?: IntFilter<"TheatreTag"> | number
    tag_name?: StringFilter<"TheatreTag"> | string
    created_at?: DateTimeFilter<"TheatreTag"> | Date | string
    theatre?: XOR<TheatreScalarRelationFilter, TheatreWhereInput>
  }, "id">

  export type TheatreTagOrderByWithAggregationInput = {
    id?: SortOrder
    theatre_id?: SortOrder
    tag_name?: SortOrder
    created_at?: SortOrder
    _count?: TheatreTagCountOrderByAggregateInput
    _avg?: TheatreTagAvgOrderByAggregateInput
    _max?: TheatreTagMaxOrderByAggregateInput
    _min?: TheatreTagMinOrderByAggregateInput
    _sum?: TheatreTagSumOrderByAggregateInput
  }

  export type TheatreTagScalarWhereWithAggregatesInput = {
    AND?: TheatreTagScalarWhereWithAggregatesInput | TheatreTagScalarWhereWithAggregatesInput[]
    OR?: TheatreTagScalarWhereWithAggregatesInput[]
    NOT?: TheatreTagScalarWhereWithAggregatesInput | TheatreTagScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TheatreTag"> | number
    theatre_id?: IntWithAggregatesFilter<"TheatreTag"> | number
    tag_name?: StringWithAggregatesFilter<"TheatreTag"> | string
    created_at?: DateTimeWithAggregatesFilter<"TheatreTag"> | Date | string
  }

  export type VenueWhereInput = {
    AND?: VenueWhereInput | VenueWhereInput[]
    OR?: VenueWhereInput[]
    NOT?: VenueWhereInput | VenueWhereInput[]
    id?: IntFilter<"Venue"> | number
    name?: StringFilter<"Venue"> | string
    description?: StringNullableFilter<"Venue"> | string | null
    address?: StringNullableFilter<"Venue"> | string | null
    city?: StringNullableFilter<"Venue"> | string | null
    capacity?: IntFilter<"Venue"> | number
    image_url?: StringNullableFilter<"Venue"> | string | null
    created_at?: DateTimeFilter<"Venue"> | Date | string
    sections?: VenueSectionListRelationFilter
    events?: EventListRelationFilter
  }

  export type VenueOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    capacity?: SortOrder
    image_url?: SortOrderInput | SortOrder
    created_at?: SortOrder
    sections?: VenueSectionOrderByRelationAggregateInput
    events?: EventOrderByRelationAggregateInput
  }

  export type VenueWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: VenueWhereInput | VenueWhereInput[]
    OR?: VenueWhereInput[]
    NOT?: VenueWhereInput | VenueWhereInput[]
    name?: StringFilter<"Venue"> | string
    description?: StringNullableFilter<"Venue"> | string | null
    address?: StringNullableFilter<"Venue"> | string | null
    city?: StringNullableFilter<"Venue"> | string | null
    capacity?: IntFilter<"Venue"> | number
    image_url?: StringNullableFilter<"Venue"> | string | null
    created_at?: DateTimeFilter<"Venue"> | Date | string
    sections?: VenueSectionListRelationFilter
    events?: EventListRelationFilter
  }, "id">

  export type VenueOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    capacity?: SortOrder
    image_url?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: VenueCountOrderByAggregateInput
    _avg?: VenueAvgOrderByAggregateInput
    _max?: VenueMaxOrderByAggregateInput
    _min?: VenueMinOrderByAggregateInput
    _sum?: VenueSumOrderByAggregateInput
  }

  export type VenueScalarWhereWithAggregatesInput = {
    AND?: VenueScalarWhereWithAggregatesInput | VenueScalarWhereWithAggregatesInput[]
    OR?: VenueScalarWhereWithAggregatesInput[]
    NOT?: VenueScalarWhereWithAggregatesInput | VenueScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Venue"> | number
    name?: StringWithAggregatesFilter<"Venue"> | string
    description?: StringNullableWithAggregatesFilter<"Venue"> | string | null
    address?: StringNullableWithAggregatesFilter<"Venue"> | string | null
    city?: StringNullableWithAggregatesFilter<"Venue"> | string | null
    capacity?: IntWithAggregatesFilter<"Venue"> | number
    image_url?: StringNullableWithAggregatesFilter<"Venue"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Venue"> | Date | string
  }

  export type VenueSectionWhereInput = {
    AND?: VenueSectionWhereInput | VenueSectionWhereInput[]
    OR?: VenueSectionWhereInput[]
    NOT?: VenueSectionWhereInput | VenueSectionWhereInput[]
    id?: IntFilter<"VenueSection"> | number
    venue_id?: IntFilter<"VenueSection"> | number
    section_name?: StringFilter<"VenueSection"> | string
    section_type?: EnumSectionTypeFilter<"VenueSection"> | $Enums.SectionType
    created_at?: DateTimeFilter<"VenueSection"> | Date | string
    venue?: XOR<VenueScalarRelationFilter, VenueWhereInput>
    seats?: SeatListRelationFilter
  }

  export type VenueSectionOrderByWithRelationInput = {
    id?: SortOrder
    venue_id?: SortOrder
    section_name?: SortOrder
    section_type?: SortOrder
    created_at?: SortOrder
    venue?: VenueOrderByWithRelationInput
    seats?: SeatOrderByRelationAggregateInput
  }

  export type VenueSectionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: VenueSectionWhereInput | VenueSectionWhereInput[]
    OR?: VenueSectionWhereInput[]
    NOT?: VenueSectionWhereInput | VenueSectionWhereInput[]
    venue_id?: IntFilter<"VenueSection"> | number
    section_name?: StringFilter<"VenueSection"> | string
    section_type?: EnumSectionTypeFilter<"VenueSection"> | $Enums.SectionType
    created_at?: DateTimeFilter<"VenueSection"> | Date | string
    venue?: XOR<VenueScalarRelationFilter, VenueWhereInput>
    seats?: SeatListRelationFilter
  }, "id">

  export type VenueSectionOrderByWithAggregationInput = {
    id?: SortOrder
    venue_id?: SortOrder
    section_name?: SortOrder
    section_type?: SortOrder
    created_at?: SortOrder
    _count?: VenueSectionCountOrderByAggregateInput
    _avg?: VenueSectionAvgOrderByAggregateInput
    _max?: VenueSectionMaxOrderByAggregateInput
    _min?: VenueSectionMinOrderByAggregateInput
    _sum?: VenueSectionSumOrderByAggregateInput
  }

  export type VenueSectionScalarWhereWithAggregatesInput = {
    AND?: VenueSectionScalarWhereWithAggregatesInput | VenueSectionScalarWhereWithAggregatesInput[]
    OR?: VenueSectionScalarWhereWithAggregatesInput[]
    NOT?: VenueSectionScalarWhereWithAggregatesInput | VenueSectionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"VenueSection"> | number
    venue_id?: IntWithAggregatesFilter<"VenueSection"> | number
    section_name?: StringWithAggregatesFilter<"VenueSection"> | string
    section_type?: EnumSectionTypeWithAggregatesFilter<"VenueSection"> | $Enums.SectionType
    created_at?: DateTimeWithAggregatesFilter<"VenueSection"> | Date | string
  }

  export type SeatWhereInput = {
    AND?: SeatWhereInput | SeatWhereInput[]
    OR?: SeatWhereInput[]
    NOT?: SeatWhereInput | SeatWhereInput[]
    id?: IntFilter<"Seat"> | number
    venue_section_id?: IntFilter<"Seat"> | number
    row_number?: IntFilter<"Seat"> | number
    seat_number?: IntFilter<"Seat"> | number
    is_available?: BoolFilter<"Seat"> | boolean
    is_accessible?: BoolFilter<"Seat"> | boolean
    created_at?: DateTimeFilter<"Seat"> | Date | string
    venueSection?: XOR<VenueSectionScalarRelationFilter, VenueSectionWhereInput>
    booked_seats?: BookedSeatListRelationFilter
  }

  export type SeatOrderByWithRelationInput = {
    id?: SortOrder
    venue_section_id?: SortOrder
    row_number?: SortOrder
    seat_number?: SortOrder
    is_available?: SortOrder
    is_accessible?: SortOrder
    created_at?: SortOrder
    venueSection?: VenueSectionOrderByWithRelationInput
    booked_seats?: BookedSeatOrderByRelationAggregateInput
  }

  export type SeatWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    unique_seat?: SeatUnique_seatCompoundUniqueInput
    AND?: SeatWhereInput | SeatWhereInput[]
    OR?: SeatWhereInput[]
    NOT?: SeatWhereInput | SeatWhereInput[]
    venue_section_id?: IntFilter<"Seat"> | number
    row_number?: IntFilter<"Seat"> | number
    seat_number?: IntFilter<"Seat"> | number
    is_available?: BoolFilter<"Seat"> | boolean
    is_accessible?: BoolFilter<"Seat"> | boolean
    created_at?: DateTimeFilter<"Seat"> | Date | string
    venueSection?: XOR<VenueSectionScalarRelationFilter, VenueSectionWhereInput>
    booked_seats?: BookedSeatListRelationFilter
  }, "id" | "unique_seat">

  export type SeatOrderByWithAggregationInput = {
    id?: SortOrder
    venue_section_id?: SortOrder
    row_number?: SortOrder
    seat_number?: SortOrder
    is_available?: SortOrder
    is_accessible?: SortOrder
    created_at?: SortOrder
    _count?: SeatCountOrderByAggregateInput
    _avg?: SeatAvgOrderByAggregateInput
    _max?: SeatMaxOrderByAggregateInput
    _min?: SeatMinOrderByAggregateInput
    _sum?: SeatSumOrderByAggregateInput
  }

  export type SeatScalarWhereWithAggregatesInput = {
    AND?: SeatScalarWhereWithAggregatesInput | SeatScalarWhereWithAggregatesInput[]
    OR?: SeatScalarWhereWithAggregatesInput[]
    NOT?: SeatScalarWhereWithAggregatesInput | SeatScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Seat"> | number
    venue_section_id?: IntWithAggregatesFilter<"Seat"> | number
    row_number?: IntWithAggregatesFilter<"Seat"> | number
    seat_number?: IntWithAggregatesFilter<"Seat"> | number
    is_available?: BoolWithAggregatesFilter<"Seat"> | boolean
    is_accessible?: BoolWithAggregatesFilter<"Seat"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"Seat"> | Date | string
  }

  export type EventWhereInput = {
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    id?: IntFilter<"Event"> | number
    title?: StringFilter<"Event"> | string
    theatre_id?: IntFilter<"Event"> | number
    venue_id?: IntNullableFilter<"Event"> | number | null
    event_type?: EnumEventTypeFilter<"Event"> | $Enums.EventType
    event_date?: DateTimeFilter<"Event"> | Date | string
    event_time?: DateTimeFilter<"Event"> | Date | string
    description?: StringNullableFilter<"Event"> | string | null
    price?: DecimalFilter<"Event"> | Decimal | DecimalJsLike | number | string
    image_url?: StringNullableFilter<"Event"> | string | null
    poster_url?: StringNullableFilter<"Event"> | string | null
    language?: StringNullableFilter<"Event"> | string | null
    content_language?: StringFilter<"Event"> | string
    translation_group?: StringNullableFilter<"Event"> | string | null
    genre?: StringNullableFilter<"Event"> | string | null
    company?: StringNullableListFilter<"Event">
    director?: StringNullableFilter<"Event"> | string | null
    cast?: StringNullableListFilter<"Event">
    synopsis?: StringNullableFilter<"Event"> | string | null
    subtitles?: StringNullableFilter<"Event"> | string | null
    duration?: StringNullableFilter<"Event"> | string | null
    is_featured?: BoolFilter<"Event"> | boolean
    created_at?: DateTimeFilter<"Event"> | Date | string
    updated_at?: DateTimeFilter<"Event"> | Date | string
    theatre?: XOR<TheatreScalarRelationFilter, TheatreWhereInput>
    venue?: XOR<VenueNullableScalarRelationFilter, VenueWhereInput> | null
    bookings?: BookingListRelationFilter
  }

  export type EventOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    theatre_id?: SortOrder
    venue_id?: SortOrderInput | SortOrder
    event_type?: SortOrder
    event_date?: SortOrder
    event_time?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    image_url?: SortOrderInput | SortOrder
    poster_url?: SortOrderInput | SortOrder
    language?: SortOrderInput | SortOrder
    content_language?: SortOrder
    translation_group?: SortOrderInput | SortOrder
    genre?: SortOrderInput | SortOrder
    company?: SortOrder
    director?: SortOrderInput | SortOrder
    cast?: SortOrder
    synopsis?: SortOrderInput | SortOrder
    subtitles?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    is_featured?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    theatre?: TheatreOrderByWithRelationInput
    venue?: VenueOrderByWithRelationInput
    bookings?: BookingOrderByRelationAggregateInput
  }

  export type EventWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    title?: StringFilter<"Event"> | string
    theatre_id?: IntFilter<"Event"> | number
    venue_id?: IntNullableFilter<"Event"> | number | null
    event_type?: EnumEventTypeFilter<"Event"> | $Enums.EventType
    event_date?: DateTimeFilter<"Event"> | Date | string
    event_time?: DateTimeFilter<"Event"> | Date | string
    description?: StringNullableFilter<"Event"> | string | null
    price?: DecimalFilter<"Event"> | Decimal | DecimalJsLike | number | string
    image_url?: StringNullableFilter<"Event"> | string | null
    poster_url?: StringNullableFilter<"Event"> | string | null
    language?: StringNullableFilter<"Event"> | string | null
    content_language?: StringFilter<"Event"> | string
    translation_group?: StringNullableFilter<"Event"> | string | null
    genre?: StringNullableFilter<"Event"> | string | null
    company?: StringNullableListFilter<"Event">
    director?: StringNullableFilter<"Event"> | string | null
    cast?: StringNullableListFilter<"Event">
    synopsis?: StringNullableFilter<"Event"> | string | null
    subtitles?: StringNullableFilter<"Event"> | string | null
    duration?: StringNullableFilter<"Event"> | string | null
    is_featured?: BoolFilter<"Event"> | boolean
    created_at?: DateTimeFilter<"Event"> | Date | string
    updated_at?: DateTimeFilter<"Event"> | Date | string
    theatre?: XOR<TheatreScalarRelationFilter, TheatreWhereInput>
    venue?: XOR<VenueNullableScalarRelationFilter, VenueWhereInput> | null
    bookings?: BookingListRelationFilter
  }, "id">

  export type EventOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    theatre_id?: SortOrder
    venue_id?: SortOrderInput | SortOrder
    event_type?: SortOrder
    event_date?: SortOrder
    event_time?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    image_url?: SortOrderInput | SortOrder
    poster_url?: SortOrderInput | SortOrder
    language?: SortOrderInput | SortOrder
    content_language?: SortOrder
    translation_group?: SortOrderInput | SortOrder
    genre?: SortOrderInput | SortOrder
    company?: SortOrder
    director?: SortOrderInput | SortOrder
    cast?: SortOrder
    synopsis?: SortOrderInput | SortOrder
    subtitles?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    is_featured?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: EventCountOrderByAggregateInput
    _avg?: EventAvgOrderByAggregateInput
    _max?: EventMaxOrderByAggregateInput
    _min?: EventMinOrderByAggregateInput
    _sum?: EventSumOrderByAggregateInput
  }

  export type EventScalarWhereWithAggregatesInput = {
    AND?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    OR?: EventScalarWhereWithAggregatesInput[]
    NOT?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Event"> | number
    title?: StringWithAggregatesFilter<"Event"> | string
    theatre_id?: IntWithAggregatesFilter<"Event"> | number
    venue_id?: IntNullableWithAggregatesFilter<"Event"> | number | null
    event_type?: EnumEventTypeWithAggregatesFilter<"Event"> | $Enums.EventType
    event_date?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    event_time?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    description?: StringNullableWithAggregatesFilter<"Event"> | string | null
    price?: DecimalWithAggregatesFilter<"Event"> | Decimal | DecimalJsLike | number | string
    image_url?: StringNullableWithAggregatesFilter<"Event"> | string | null
    poster_url?: StringNullableWithAggregatesFilter<"Event"> | string | null
    language?: StringNullableWithAggregatesFilter<"Event"> | string | null
    content_language?: StringWithAggregatesFilter<"Event"> | string
    translation_group?: StringNullableWithAggregatesFilter<"Event"> | string | null
    genre?: StringNullableWithAggregatesFilter<"Event"> | string | null
    company?: StringNullableListFilter<"Event">
    director?: StringNullableWithAggregatesFilter<"Event"> | string | null
    cast?: StringNullableListFilter<"Event">
    synopsis?: StringNullableWithAggregatesFilter<"Event"> | string | null
    subtitles?: StringNullableWithAggregatesFilter<"Event"> | string | null
    duration?: StringNullableWithAggregatesFilter<"Event"> | string | null
    is_featured?: BoolWithAggregatesFilter<"Event"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Event"> | Date | string
  }

  export type BookingWhereInput = {
    AND?: BookingWhereInput | BookingWhereInput[]
    OR?: BookingWhereInput[]
    NOT?: BookingWhereInput | BookingWhereInput[]
    id?: IntFilter<"Booking"> | number
    user_id?: IntFilter<"Booking"> | number
    event_id?: IntFilter<"Booking"> | number
    booking_reference?: StringFilter<"Booking"> | string
    total_amount?: DecimalFilter<"Booking"> | Decimal | DecimalJsLike | number | string
    booking_status?: EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus
    created_at?: DateTimeFilter<"Booking"> | Date | string
    updated_at?: DateTimeFilter<"Booking"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
    booked_seats?: BookedSeatListRelationFilter
  }

  export type BookingOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    event_id?: SortOrder
    booking_reference?: SortOrder
    total_amount?: SortOrder
    booking_status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user?: UserOrderByWithRelationInput
    event?: EventOrderByWithRelationInput
    booked_seats?: BookedSeatOrderByRelationAggregateInput
  }

  export type BookingWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    booking_reference?: string
    AND?: BookingWhereInput | BookingWhereInput[]
    OR?: BookingWhereInput[]
    NOT?: BookingWhereInput | BookingWhereInput[]
    user_id?: IntFilter<"Booking"> | number
    event_id?: IntFilter<"Booking"> | number
    total_amount?: DecimalFilter<"Booking"> | Decimal | DecimalJsLike | number | string
    booking_status?: EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus
    created_at?: DateTimeFilter<"Booking"> | Date | string
    updated_at?: DateTimeFilter<"Booking"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
    booked_seats?: BookedSeatListRelationFilter
  }, "id" | "booking_reference">

  export type BookingOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    event_id?: SortOrder
    booking_reference?: SortOrder
    total_amount?: SortOrder
    booking_status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: BookingCountOrderByAggregateInput
    _avg?: BookingAvgOrderByAggregateInput
    _max?: BookingMaxOrderByAggregateInput
    _min?: BookingMinOrderByAggregateInput
    _sum?: BookingSumOrderByAggregateInput
  }

  export type BookingScalarWhereWithAggregatesInput = {
    AND?: BookingScalarWhereWithAggregatesInput | BookingScalarWhereWithAggregatesInput[]
    OR?: BookingScalarWhereWithAggregatesInput[]
    NOT?: BookingScalarWhereWithAggregatesInput | BookingScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Booking"> | number
    user_id?: IntWithAggregatesFilter<"Booking"> | number
    event_id?: IntWithAggregatesFilter<"Booking"> | number
    booking_reference?: StringWithAggregatesFilter<"Booking"> | string
    total_amount?: DecimalWithAggregatesFilter<"Booking"> | Decimal | DecimalJsLike | number | string
    booking_status?: EnumBookingStatusWithAggregatesFilter<"Booking"> | $Enums.BookingStatus
    created_at?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
  }

  export type BookedSeatWhereInput = {
    AND?: BookedSeatWhereInput | BookedSeatWhereInput[]
    OR?: BookedSeatWhereInput[]
    NOT?: BookedSeatWhereInput | BookedSeatWhereInput[]
    id?: IntFilter<"BookedSeat"> | number
    booking_id?: IntFilter<"BookedSeat"> | number
    seat_id?: IntFilter<"BookedSeat"> | number
    created_at?: DateTimeFilter<"BookedSeat"> | Date | string
    booking?: XOR<BookingScalarRelationFilter, BookingWhereInput>
    seat?: XOR<SeatScalarRelationFilter, SeatWhereInput>
  }

  export type BookedSeatOrderByWithRelationInput = {
    id?: SortOrder
    booking_id?: SortOrder
    seat_id?: SortOrder
    created_at?: SortOrder
    booking?: BookingOrderByWithRelationInput
    seat?: SeatOrderByWithRelationInput
  }

  export type BookedSeatWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    unique_booked_seat?: BookedSeatUnique_booked_seatCompoundUniqueInput
    AND?: BookedSeatWhereInput | BookedSeatWhereInput[]
    OR?: BookedSeatWhereInput[]
    NOT?: BookedSeatWhereInput | BookedSeatWhereInput[]
    booking_id?: IntFilter<"BookedSeat"> | number
    seat_id?: IntFilter<"BookedSeat"> | number
    created_at?: DateTimeFilter<"BookedSeat"> | Date | string
    booking?: XOR<BookingScalarRelationFilter, BookingWhereInput>
    seat?: XOR<SeatScalarRelationFilter, SeatWhereInput>
  }, "id" | "unique_booked_seat">

  export type BookedSeatOrderByWithAggregationInput = {
    id?: SortOrder
    booking_id?: SortOrder
    seat_id?: SortOrder
    created_at?: SortOrder
    _count?: BookedSeatCountOrderByAggregateInput
    _avg?: BookedSeatAvgOrderByAggregateInput
    _max?: BookedSeatMaxOrderByAggregateInput
    _min?: BookedSeatMinOrderByAggregateInput
    _sum?: BookedSeatSumOrderByAggregateInput
  }

  export type BookedSeatScalarWhereWithAggregatesInput = {
    AND?: BookedSeatScalarWhereWithAggregatesInput | BookedSeatScalarWhereWithAggregatesInput[]
    OR?: BookedSeatScalarWhereWithAggregatesInput[]
    NOT?: BookedSeatScalarWhereWithAggregatesInput | BookedSeatScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"BookedSeat"> | number
    booking_id?: IntWithAggregatesFilter<"BookedSeat"> | number
    seat_id?: IntWithAggregatesFilter<"BookedSeat"> | number
    created_at?: DateTimeWithAggregatesFilter<"BookedSeat"> | Date | string
  }

  export type NewsArticleWhereInput = {
    AND?: NewsArticleWhereInput | NewsArticleWhereInput[]
    OR?: NewsArticleWhereInput[]
    NOT?: NewsArticleWhereInput | NewsArticleWhereInput[]
    id?: IntFilter<"NewsArticle"> | number
    title?: StringFilter<"NewsArticle"> | string
    excerpt?: StringNullableFilter<"NewsArticle"> | string | null
    content?: StringFilter<"NewsArticle"> | string
    category?: StringNullableFilter<"NewsArticle"> | string | null
    image_url?: StringNullableFilter<"NewsArticle"> | string | null
    author?: StringNullableFilter<"NewsArticle"> | string | null
    content_language?: StringFilter<"NewsArticle"> | string
    translation_group?: StringNullableFilter<"NewsArticle"> | string | null
    published_at?: DateTimeNullableFilter<"NewsArticle"> | Date | string | null
    is_published?: BoolFilter<"NewsArticle"> | boolean
    created_at?: DateTimeFilter<"NewsArticle"> | Date | string
    updated_at?: DateTimeFilter<"NewsArticle"> | Date | string
  }

  export type NewsArticleOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    excerpt?: SortOrderInput | SortOrder
    content?: SortOrder
    category?: SortOrderInput | SortOrder
    image_url?: SortOrderInput | SortOrder
    author?: SortOrderInput | SortOrder
    content_language?: SortOrder
    translation_group?: SortOrderInput | SortOrder
    published_at?: SortOrderInput | SortOrder
    is_published?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type NewsArticleWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: NewsArticleWhereInput | NewsArticleWhereInput[]
    OR?: NewsArticleWhereInput[]
    NOT?: NewsArticleWhereInput | NewsArticleWhereInput[]
    title?: StringFilter<"NewsArticle"> | string
    excerpt?: StringNullableFilter<"NewsArticle"> | string | null
    content?: StringFilter<"NewsArticle"> | string
    category?: StringNullableFilter<"NewsArticle"> | string | null
    image_url?: StringNullableFilter<"NewsArticle"> | string | null
    author?: StringNullableFilter<"NewsArticle"> | string | null
    content_language?: StringFilter<"NewsArticle"> | string
    translation_group?: StringNullableFilter<"NewsArticle"> | string | null
    published_at?: DateTimeNullableFilter<"NewsArticle"> | Date | string | null
    is_published?: BoolFilter<"NewsArticle"> | boolean
    created_at?: DateTimeFilter<"NewsArticle"> | Date | string
    updated_at?: DateTimeFilter<"NewsArticle"> | Date | string
  }, "id">

  export type NewsArticleOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    excerpt?: SortOrderInput | SortOrder
    content?: SortOrder
    category?: SortOrderInput | SortOrder
    image_url?: SortOrderInput | SortOrder
    author?: SortOrderInput | SortOrder
    content_language?: SortOrder
    translation_group?: SortOrderInput | SortOrder
    published_at?: SortOrderInput | SortOrder
    is_published?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: NewsArticleCountOrderByAggregateInput
    _avg?: NewsArticleAvgOrderByAggregateInput
    _max?: NewsArticleMaxOrderByAggregateInput
    _min?: NewsArticleMinOrderByAggregateInput
    _sum?: NewsArticleSumOrderByAggregateInput
  }

  export type NewsArticleScalarWhereWithAggregatesInput = {
    AND?: NewsArticleScalarWhereWithAggregatesInput | NewsArticleScalarWhereWithAggregatesInput[]
    OR?: NewsArticleScalarWhereWithAggregatesInput[]
    NOT?: NewsArticleScalarWhereWithAggregatesInput | NewsArticleScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"NewsArticle"> | number
    title?: StringWithAggregatesFilter<"NewsArticle"> | string
    excerpt?: StringNullableWithAggregatesFilter<"NewsArticle"> | string | null
    content?: StringWithAggregatesFilter<"NewsArticle"> | string
    category?: StringNullableWithAggregatesFilter<"NewsArticle"> | string | null
    image_url?: StringNullableWithAggregatesFilter<"NewsArticle"> | string | null
    author?: StringNullableWithAggregatesFilter<"NewsArticle"> | string | null
    content_language?: StringWithAggregatesFilter<"NewsArticle"> | string
    translation_group?: StringNullableWithAggregatesFilter<"NewsArticle"> | string | null
    published_at?: DateTimeNullableWithAggregatesFilter<"NewsArticle"> | Date | string | null
    is_published?: BoolWithAggregatesFilter<"NewsArticle"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"NewsArticle"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"NewsArticle"> | Date | string
  }

  export type AboutPageWhereInput = {
    AND?: AboutPageWhereInput | AboutPageWhereInput[]
    OR?: AboutPageWhereInput[]
    NOT?: AboutPageWhereInput | AboutPageWhereInput[]
    id?: IntFilter<"AboutPage"> | number
    title?: StringFilter<"AboutPage"> | string
    content?: StringFilter<"AboutPage"> | string
    mission?: StringNullableFilter<"AboutPage"> | string | null
    vision?: StringNullableFilter<"AboutPage"> | string | null
    history?: StringNullableFilter<"AboutPage"> | string | null
    image_url?: StringNullableFilter<"AboutPage"> | string | null
    content_language?: StringFilter<"AboutPage"> | string
    translation_group?: StringNullableFilter<"AboutPage"> | string | null
    is_published?: BoolFilter<"AboutPage"> | boolean
    created_at?: DateTimeFilter<"AboutPage"> | Date | string
    updated_at?: DateTimeFilter<"AboutPage"> | Date | string
  }

  export type AboutPageOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    mission?: SortOrderInput | SortOrder
    vision?: SortOrderInput | SortOrder
    history?: SortOrderInput | SortOrder
    image_url?: SortOrderInput | SortOrder
    content_language?: SortOrder
    translation_group?: SortOrderInput | SortOrder
    is_published?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AboutPageWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AboutPageWhereInput | AboutPageWhereInput[]
    OR?: AboutPageWhereInput[]
    NOT?: AboutPageWhereInput | AboutPageWhereInput[]
    title?: StringFilter<"AboutPage"> | string
    content?: StringFilter<"AboutPage"> | string
    mission?: StringNullableFilter<"AboutPage"> | string | null
    vision?: StringNullableFilter<"AboutPage"> | string | null
    history?: StringNullableFilter<"AboutPage"> | string | null
    image_url?: StringNullableFilter<"AboutPage"> | string | null
    content_language?: StringFilter<"AboutPage"> | string
    translation_group?: StringNullableFilter<"AboutPage"> | string | null
    is_published?: BoolFilter<"AboutPage"> | boolean
    created_at?: DateTimeFilter<"AboutPage"> | Date | string
    updated_at?: DateTimeFilter<"AboutPage"> | Date | string
  }, "id">

  export type AboutPageOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    mission?: SortOrderInput | SortOrder
    vision?: SortOrderInput | SortOrder
    history?: SortOrderInput | SortOrder
    image_url?: SortOrderInput | SortOrder
    content_language?: SortOrder
    translation_group?: SortOrderInput | SortOrder
    is_published?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: AboutPageCountOrderByAggregateInput
    _avg?: AboutPageAvgOrderByAggregateInput
    _max?: AboutPageMaxOrderByAggregateInput
    _min?: AboutPageMinOrderByAggregateInput
    _sum?: AboutPageSumOrderByAggregateInput
  }

  export type AboutPageScalarWhereWithAggregatesInput = {
    AND?: AboutPageScalarWhereWithAggregatesInput | AboutPageScalarWhereWithAggregatesInput[]
    OR?: AboutPageScalarWhereWithAggregatesInput[]
    NOT?: AboutPageScalarWhereWithAggregatesInput | AboutPageScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AboutPage"> | number
    title?: StringWithAggregatesFilter<"AboutPage"> | string
    content?: StringWithAggregatesFilter<"AboutPage"> | string
    mission?: StringNullableWithAggregatesFilter<"AboutPage"> | string | null
    vision?: StringNullableWithAggregatesFilter<"AboutPage"> | string | null
    history?: StringNullableWithAggregatesFilter<"AboutPage"> | string | null
    image_url?: StringNullableWithAggregatesFilter<"AboutPage"> | string | null
    content_language?: StringWithAggregatesFilter<"AboutPage"> | string
    translation_group?: StringNullableWithAggregatesFilter<"AboutPage"> | string | null
    is_published?: BoolWithAggregatesFilter<"AboutPage"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"AboutPage"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"AboutPage"> | Date | string
  }

  export type ContactPageWhereInput = {
    AND?: ContactPageWhereInput | ContactPageWhereInput[]
    OR?: ContactPageWhereInput[]
    NOT?: ContactPageWhereInput | ContactPageWhereInput[]
    id?: IntFilter<"ContactPage"> | number
    title?: StringFilter<"ContactPage"> | string
    content?: StringFilter<"ContactPage"> | string
    address?: StringNullableFilter<"ContactPage"> | string | null
    phone?: StringNullableFilter<"ContactPage"> | string | null
    email?: StringNullableFilter<"ContactPage"> | string | null
    office_hours?: StringNullableFilter<"ContactPage"> | string | null
    map_embed?: StringNullableFilter<"ContactPage"> | string | null
    content_language?: StringFilter<"ContactPage"> | string
    translation_group?: StringNullableFilter<"ContactPage"> | string | null
    is_published?: BoolFilter<"ContactPage"> | boolean
    created_at?: DateTimeFilter<"ContactPage"> | Date | string
    updated_at?: DateTimeFilter<"ContactPage"> | Date | string
  }

  export type ContactPageOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    address?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    office_hours?: SortOrderInput | SortOrder
    map_embed?: SortOrderInput | SortOrder
    content_language?: SortOrder
    translation_group?: SortOrderInput | SortOrder
    is_published?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ContactPageWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ContactPageWhereInput | ContactPageWhereInput[]
    OR?: ContactPageWhereInput[]
    NOT?: ContactPageWhereInput | ContactPageWhereInput[]
    title?: StringFilter<"ContactPage"> | string
    content?: StringFilter<"ContactPage"> | string
    address?: StringNullableFilter<"ContactPage"> | string | null
    phone?: StringNullableFilter<"ContactPage"> | string | null
    email?: StringNullableFilter<"ContactPage"> | string | null
    office_hours?: StringNullableFilter<"ContactPage"> | string | null
    map_embed?: StringNullableFilter<"ContactPage"> | string | null
    content_language?: StringFilter<"ContactPage"> | string
    translation_group?: StringNullableFilter<"ContactPage"> | string | null
    is_published?: BoolFilter<"ContactPage"> | boolean
    created_at?: DateTimeFilter<"ContactPage"> | Date | string
    updated_at?: DateTimeFilter<"ContactPage"> | Date | string
  }, "id">

  export type ContactPageOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    address?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    office_hours?: SortOrderInput | SortOrder
    map_embed?: SortOrderInput | SortOrder
    content_language?: SortOrder
    translation_group?: SortOrderInput | SortOrder
    is_published?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ContactPageCountOrderByAggregateInput
    _avg?: ContactPageAvgOrderByAggregateInput
    _max?: ContactPageMaxOrderByAggregateInput
    _min?: ContactPageMinOrderByAggregateInput
    _sum?: ContactPageSumOrderByAggregateInput
  }

  export type ContactPageScalarWhereWithAggregatesInput = {
    AND?: ContactPageScalarWhereWithAggregatesInput | ContactPageScalarWhereWithAggregatesInput[]
    OR?: ContactPageScalarWhereWithAggregatesInput[]
    NOT?: ContactPageScalarWhereWithAggregatesInput | ContactPageScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ContactPage"> | number
    title?: StringWithAggregatesFilter<"ContactPage"> | string
    content?: StringWithAggregatesFilter<"ContactPage"> | string
    address?: StringNullableWithAggregatesFilter<"ContactPage"> | string | null
    phone?: StringNullableWithAggregatesFilter<"ContactPage"> | string | null
    email?: StringNullableWithAggregatesFilter<"ContactPage"> | string | null
    office_hours?: StringNullableWithAggregatesFilter<"ContactPage"> | string | null
    map_embed?: StringNullableWithAggregatesFilter<"ContactPage"> | string | null
    content_language?: StringWithAggregatesFilter<"ContactPage"> | string
    translation_group?: StringNullableWithAggregatesFilter<"ContactPage"> | string | null
    is_published?: BoolWithAggregatesFilter<"ContactPage"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"ContactPage"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"ContactPage"> | Date | string
  }

  export type UserCreateInput = {
    email: string
    password_hash: string
    first_name: string
    last_name: string
    phone?: string | null
    is_admin?: boolean
    email_notifications?: boolean
    marketing_preferences?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    bookings?: BookingCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    password_hash: string
    first_name: string
    last_name: string
    phone?: string | null
    is_admin?: boolean
    email_notifications?: boolean
    marketing_preferences?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    is_admin?: BoolFieldUpdateOperationsInput | boolean
    email_notifications?: BoolFieldUpdateOperationsInput | boolean
    marketing_preferences?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    is_admin?: BoolFieldUpdateOperationsInput | boolean
    email_notifications?: BoolFieldUpdateOperationsInput | boolean
    marketing_preferences?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    password_hash: string
    first_name: string
    last_name: string
    phone?: string | null
    is_admin?: boolean
    email_notifications?: boolean
    marketing_preferences?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    is_admin?: BoolFieldUpdateOperationsInput | boolean
    email_notifications?: BoolFieldUpdateOperationsInput | boolean
    marketing_preferences?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    is_admin?: BoolFieldUpdateOperationsInput | boolean
    email_notifications?: BoolFieldUpdateOperationsInput | boolean
    marketing_preferences?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TheatreCreateInput = {
    name: string
    city: string
    country: string
    description?: string | null
    history?: string | null
    website?: string | null
    founded_year?: number | null
    content_language?: string
    translation_group?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    images?: TheatreImageCreateNestedManyWithoutTheatreInput
    tags?: TheatreTagCreateNestedManyWithoutTheatreInput
    events?: EventCreateNestedManyWithoutTheatreInput
  }

  export type TheatreUncheckedCreateInput = {
    id?: number
    name: string
    city: string
    country: string
    description?: string | null
    history?: string | null
    website?: string | null
    founded_year?: number | null
    content_language?: string
    translation_group?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    images?: TheatreImageUncheckedCreateNestedManyWithoutTheatreInput
    tags?: TheatreTagUncheckedCreateNestedManyWithoutTheatreInput
    events?: EventUncheckedCreateNestedManyWithoutTheatreInput
  }

  export type TheatreUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    history?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    founded_year?: NullableIntFieldUpdateOperationsInput | number | null
    content_language?: StringFieldUpdateOperationsInput | string
    translation_group?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: TheatreImageUpdateManyWithoutTheatreNestedInput
    tags?: TheatreTagUpdateManyWithoutTheatreNestedInput
    events?: EventUpdateManyWithoutTheatreNestedInput
  }

  export type TheatreUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    history?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    founded_year?: NullableIntFieldUpdateOperationsInput | number | null
    content_language?: StringFieldUpdateOperationsInput | string
    translation_group?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: TheatreImageUncheckedUpdateManyWithoutTheatreNestedInput
    tags?: TheatreTagUncheckedUpdateManyWithoutTheatreNestedInput
    events?: EventUncheckedUpdateManyWithoutTheatreNestedInput
  }

  export type TheatreCreateManyInput = {
    id?: number
    name: string
    city: string
    country: string
    description?: string | null
    history?: string | null
    website?: string | null
    founded_year?: number | null
    content_language?: string
    translation_group?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TheatreUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    history?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    founded_year?: NullableIntFieldUpdateOperationsInput | number | null
    content_language?: StringFieldUpdateOperationsInput | string
    translation_group?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TheatreUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    history?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    founded_year?: NullableIntFieldUpdateOperationsInput | number | null
    content_language?: StringFieldUpdateOperationsInput | string
    translation_group?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TheatreImageCreateInput = {
    image_url: string
    caption?: string | null
    is_primary?: boolean
    created_at?: Date | string
    theatre: TheatreCreateNestedOneWithoutImagesInput
  }

  export type TheatreImageUncheckedCreateInput = {
    id?: number
    theatre_id: number
    image_url: string
    caption?: string | null
    is_primary?: boolean
    created_at?: Date | string
  }

  export type TheatreImageUpdateInput = {
    image_url?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    is_primary?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    theatre?: TheatreUpdateOneRequiredWithoutImagesNestedInput
  }

  export type TheatreImageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    theatre_id?: IntFieldUpdateOperationsInput | number
    image_url?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    is_primary?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TheatreImageCreateManyInput = {
    id?: number
    theatre_id: number
    image_url: string
    caption?: string | null
    is_primary?: boolean
    created_at?: Date | string
  }

  export type TheatreImageUpdateManyMutationInput = {
    image_url?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    is_primary?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TheatreImageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    theatre_id?: IntFieldUpdateOperationsInput | number
    image_url?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    is_primary?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TheatreTagCreateInput = {
    tag_name: string
    created_at?: Date | string
    theatre: TheatreCreateNestedOneWithoutTagsInput
  }

  export type TheatreTagUncheckedCreateInput = {
    id?: number
    theatre_id: number
    tag_name: string
    created_at?: Date | string
  }

  export type TheatreTagUpdateInput = {
    tag_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    theatre?: TheatreUpdateOneRequiredWithoutTagsNestedInput
  }

  export type TheatreTagUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    theatre_id?: IntFieldUpdateOperationsInput | number
    tag_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TheatreTagCreateManyInput = {
    id?: number
    theatre_id: number
    tag_name: string
    created_at?: Date | string
  }

  export type TheatreTagUpdateManyMutationInput = {
    tag_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TheatreTagUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    theatre_id?: IntFieldUpdateOperationsInput | number
    tag_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VenueCreateInput = {
    name: string
    description?: string | null
    address?: string | null
    city?: string | null
    capacity: number
    image_url?: string | null
    created_at?: Date | string
    sections?: VenueSectionCreateNestedManyWithoutVenueInput
    events?: EventCreateNestedManyWithoutVenueInput
  }

  export type VenueUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
    address?: string | null
    city?: string | null
    capacity: number
    image_url?: string | null
    created_at?: Date | string
    sections?: VenueSectionUncheckedCreateNestedManyWithoutVenueInput
    events?: EventUncheckedCreateNestedManyWithoutVenueInput
  }

  export type VenueUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: IntFieldUpdateOperationsInput | number
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    sections?: VenueSectionUpdateManyWithoutVenueNestedInput
    events?: EventUpdateManyWithoutVenueNestedInput
  }

  export type VenueUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: IntFieldUpdateOperationsInput | number
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    sections?: VenueSectionUncheckedUpdateManyWithoutVenueNestedInput
    events?: EventUncheckedUpdateManyWithoutVenueNestedInput
  }

  export type VenueCreateManyInput = {
    id?: number
    name: string
    description?: string | null
    address?: string | null
    city?: string | null
    capacity: number
    image_url?: string | null
    created_at?: Date | string
  }

  export type VenueUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: IntFieldUpdateOperationsInput | number
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VenueUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: IntFieldUpdateOperationsInput | number
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VenueSectionCreateInput = {
    section_name: string
    section_type: $Enums.SectionType
    created_at?: Date | string
    venue: VenueCreateNestedOneWithoutSectionsInput
    seats?: SeatCreateNestedManyWithoutVenueSectionInput
  }

  export type VenueSectionUncheckedCreateInput = {
    id?: number
    venue_id: number
    section_name: string
    section_type: $Enums.SectionType
    created_at?: Date | string
    seats?: SeatUncheckedCreateNestedManyWithoutVenueSectionInput
  }

  export type VenueSectionUpdateInput = {
    section_name?: StringFieldUpdateOperationsInput | string
    section_type?: EnumSectionTypeFieldUpdateOperationsInput | $Enums.SectionType
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    venue?: VenueUpdateOneRequiredWithoutSectionsNestedInput
    seats?: SeatUpdateManyWithoutVenueSectionNestedInput
  }

  export type VenueSectionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    venue_id?: IntFieldUpdateOperationsInput | number
    section_name?: StringFieldUpdateOperationsInput | string
    section_type?: EnumSectionTypeFieldUpdateOperationsInput | $Enums.SectionType
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    seats?: SeatUncheckedUpdateManyWithoutVenueSectionNestedInput
  }

  export type VenueSectionCreateManyInput = {
    id?: number
    venue_id: number
    section_name: string
    section_type: $Enums.SectionType
    created_at?: Date | string
  }

  export type VenueSectionUpdateManyMutationInput = {
    section_name?: StringFieldUpdateOperationsInput | string
    section_type?: EnumSectionTypeFieldUpdateOperationsInput | $Enums.SectionType
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VenueSectionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    venue_id?: IntFieldUpdateOperationsInput | number
    section_name?: StringFieldUpdateOperationsInput | string
    section_type?: EnumSectionTypeFieldUpdateOperationsInput | $Enums.SectionType
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SeatCreateInput = {
    row_number: number
    seat_number: number
    is_available?: boolean
    is_accessible?: boolean
    created_at?: Date | string
    venueSection: VenueSectionCreateNestedOneWithoutSeatsInput
    booked_seats?: BookedSeatCreateNestedManyWithoutSeatInput
  }

  export type SeatUncheckedCreateInput = {
    id?: number
    venue_section_id: number
    row_number: number
    seat_number: number
    is_available?: boolean
    is_accessible?: boolean
    created_at?: Date | string
    booked_seats?: BookedSeatUncheckedCreateNestedManyWithoutSeatInput
  }

  export type SeatUpdateInput = {
    row_number?: IntFieldUpdateOperationsInput | number
    seat_number?: IntFieldUpdateOperationsInput | number
    is_available?: BoolFieldUpdateOperationsInput | boolean
    is_accessible?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    venueSection?: VenueSectionUpdateOneRequiredWithoutSeatsNestedInput
    booked_seats?: BookedSeatUpdateManyWithoutSeatNestedInput
  }

  export type SeatUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    venue_section_id?: IntFieldUpdateOperationsInput | number
    row_number?: IntFieldUpdateOperationsInput | number
    seat_number?: IntFieldUpdateOperationsInput | number
    is_available?: BoolFieldUpdateOperationsInput | boolean
    is_accessible?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    booked_seats?: BookedSeatUncheckedUpdateManyWithoutSeatNestedInput
  }

  export type SeatCreateManyInput = {
    id?: number
    venue_section_id: number
    row_number: number
    seat_number: number
    is_available?: boolean
    is_accessible?: boolean
    created_at?: Date | string
  }

  export type SeatUpdateManyMutationInput = {
    row_number?: IntFieldUpdateOperationsInput | number
    seat_number?: IntFieldUpdateOperationsInput | number
    is_available?: BoolFieldUpdateOperationsInput | boolean
    is_accessible?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SeatUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    venue_section_id?: IntFieldUpdateOperationsInput | number
    row_number?: IntFieldUpdateOperationsInput | number
    seat_number?: IntFieldUpdateOperationsInput | number
    is_available?: BoolFieldUpdateOperationsInput | boolean
    is_accessible?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventCreateInput = {
    title: string
    event_type: $Enums.EventType
    event_date: Date | string
    event_time: Date | string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    image_url?: string | null
    poster_url?: string | null
    language?: string | null
    content_language?: string
    translation_group?: string | null
    genre?: string | null
    company?: EventCreatecompanyInput | string[]
    director?: string | null
    cast?: EventCreatecastInput | string[]
    synopsis?: string | null
    subtitles?: string | null
    duration?: string | null
    is_featured?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    theatre: TheatreCreateNestedOneWithoutEventsInput
    venue?: VenueCreateNestedOneWithoutEventsInput
    bookings?: BookingCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateInput = {
    id?: number
    title: string
    theatre_id: number
    venue_id?: number | null
    event_type: $Enums.EventType
    event_date: Date | string
    event_time: Date | string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    image_url?: string | null
    poster_url?: string | null
    language?: string | null
    content_language?: string
    translation_group?: string | null
    genre?: string | null
    company?: EventCreatecompanyInput | string[]
    director?: string | null
    cast?: EventCreatecastInput | string[]
    synopsis?: string | null
    subtitles?: string | null
    duration?: string | null
    is_featured?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    event_type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    event_date?: DateTimeFieldUpdateOperationsInput | Date | string
    event_time?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    poster_url?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    content_language?: StringFieldUpdateOperationsInput | string
    translation_group?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    company?: EventUpdatecompanyInput | string[]
    director?: NullableStringFieldUpdateOperationsInput | string | null
    cast?: EventUpdatecastInput | string[]
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    subtitles?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    theatre?: TheatreUpdateOneRequiredWithoutEventsNestedInput
    venue?: VenueUpdateOneWithoutEventsNestedInput
    bookings?: BookingUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    theatre_id?: IntFieldUpdateOperationsInput | number
    venue_id?: NullableIntFieldUpdateOperationsInput | number | null
    event_type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    event_date?: DateTimeFieldUpdateOperationsInput | Date | string
    event_time?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    poster_url?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    content_language?: StringFieldUpdateOperationsInput | string
    translation_group?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    company?: EventUpdatecompanyInput | string[]
    director?: NullableStringFieldUpdateOperationsInput | string | null
    cast?: EventUpdatecastInput | string[]
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    subtitles?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventCreateManyInput = {
    id?: number
    title: string
    theatre_id: number
    venue_id?: number | null
    event_type: $Enums.EventType
    event_date: Date | string
    event_time: Date | string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    image_url?: string | null
    poster_url?: string | null
    language?: string | null
    content_language?: string
    translation_group?: string | null
    genre?: string | null
    company?: EventCreatecompanyInput | string[]
    director?: string | null
    cast?: EventCreatecastInput | string[]
    synopsis?: string | null
    subtitles?: string | null
    duration?: string | null
    is_featured?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type EventUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    event_type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    event_date?: DateTimeFieldUpdateOperationsInput | Date | string
    event_time?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    poster_url?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    content_language?: StringFieldUpdateOperationsInput | string
    translation_group?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    company?: EventUpdatecompanyInput | string[]
    director?: NullableStringFieldUpdateOperationsInput | string | null
    cast?: EventUpdatecastInput | string[]
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    subtitles?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    theatre_id?: IntFieldUpdateOperationsInput | number
    venue_id?: NullableIntFieldUpdateOperationsInput | number | null
    event_type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    event_date?: DateTimeFieldUpdateOperationsInput | Date | string
    event_time?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    poster_url?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    content_language?: StringFieldUpdateOperationsInput | string
    translation_group?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    company?: EventUpdatecompanyInput | string[]
    director?: NullableStringFieldUpdateOperationsInput | string | null
    cast?: EventUpdatecastInput | string[]
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    subtitles?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateInput = {
    booking_reference: string
    total_amount: Decimal | DecimalJsLike | number | string
    booking_status?: $Enums.BookingStatus
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutBookingsInput
    event: EventCreateNestedOneWithoutBookingsInput
    booked_seats?: BookedSeatCreateNestedManyWithoutBookingInput
  }

  export type BookingUncheckedCreateInput = {
    id?: number
    user_id: number
    event_id: number
    booking_reference: string
    total_amount: Decimal | DecimalJsLike | number | string
    booking_status?: $Enums.BookingStatus
    created_at?: Date | string
    updated_at?: Date | string
    booked_seats?: BookedSeatUncheckedCreateNestedManyWithoutBookingInput
  }

  export type BookingUpdateInput = {
    booking_reference?: StringFieldUpdateOperationsInput | string
    total_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    booking_status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBookingsNestedInput
    event?: EventUpdateOneRequiredWithoutBookingsNestedInput
    booked_seats?: BookedSeatUpdateManyWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    event_id?: IntFieldUpdateOperationsInput | number
    booking_reference?: StringFieldUpdateOperationsInput | string
    total_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    booking_status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    booked_seats?: BookedSeatUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type BookingCreateManyInput = {
    id?: number
    user_id: number
    event_id: number
    booking_reference: string
    total_amount: Decimal | DecimalJsLike | number | string
    booking_status?: $Enums.BookingStatus
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BookingUpdateManyMutationInput = {
    booking_reference?: StringFieldUpdateOperationsInput | string
    total_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    booking_status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    event_id?: IntFieldUpdateOperationsInput | number
    booking_reference?: StringFieldUpdateOperationsInput | string
    total_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    booking_status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookedSeatCreateInput = {
    created_at?: Date | string
    booking: BookingCreateNestedOneWithoutBooked_seatsInput
    seat: SeatCreateNestedOneWithoutBooked_seatsInput
  }

  export type BookedSeatUncheckedCreateInput = {
    id?: number
    booking_id: number
    seat_id: number
    created_at?: Date | string
  }

  export type BookedSeatUpdateInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: BookingUpdateOneRequiredWithoutBooked_seatsNestedInput
    seat?: SeatUpdateOneRequiredWithoutBooked_seatsNestedInput
  }

  export type BookedSeatUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    booking_id?: IntFieldUpdateOperationsInput | number
    seat_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookedSeatCreateManyInput = {
    id?: number
    booking_id: number
    seat_id: number
    created_at?: Date | string
  }

  export type BookedSeatUpdateManyMutationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookedSeatUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    booking_id?: IntFieldUpdateOperationsInput | number
    seat_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsArticleCreateInput = {
    title: string
    excerpt?: string | null
    content: string
    category?: string | null
    image_url?: string | null
    author?: string | null
    content_language?: string
    translation_group?: string | null
    published_at?: Date | string | null
    is_published?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type NewsArticleUncheckedCreateInput = {
    id?: number
    title: string
    excerpt?: string | null
    content: string
    category?: string | null
    image_url?: string | null
    author?: string | null
    content_language?: string
    translation_group?: string | null
    published_at?: Date | string | null
    is_published?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type NewsArticleUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    content_language?: StringFieldUpdateOperationsInput | string
    translation_group?: NullableStringFieldUpdateOperationsInput | string | null
    published_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_published?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsArticleUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    content_language?: StringFieldUpdateOperationsInput | string
    translation_group?: NullableStringFieldUpdateOperationsInput | string | null
    published_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_published?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsArticleCreateManyInput = {
    id?: number
    title: string
    excerpt?: string | null
    content: string
    category?: string | null
    image_url?: string | null
    author?: string | null
    content_language?: string
    translation_group?: string | null
    published_at?: Date | string | null
    is_published?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type NewsArticleUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    content_language?: StringFieldUpdateOperationsInput | string
    translation_group?: NullableStringFieldUpdateOperationsInput | string | null
    published_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_published?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsArticleUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    content_language?: StringFieldUpdateOperationsInput | string
    translation_group?: NullableStringFieldUpdateOperationsInput | string | null
    published_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_published?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AboutPageCreateInput = {
    title: string
    content: string
    mission?: string | null
    vision?: string | null
    history?: string | null
    image_url?: string | null
    content_language?: string
    translation_group?: string | null
    is_published?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AboutPageUncheckedCreateInput = {
    id?: number
    title: string
    content: string
    mission?: string | null
    vision?: string | null
    history?: string | null
    image_url?: string | null
    content_language?: string
    translation_group?: string | null
    is_published?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AboutPageUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    mission?: NullableStringFieldUpdateOperationsInput | string | null
    vision?: NullableStringFieldUpdateOperationsInput | string | null
    history?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    content_language?: StringFieldUpdateOperationsInput | string
    translation_group?: NullableStringFieldUpdateOperationsInput | string | null
    is_published?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AboutPageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    mission?: NullableStringFieldUpdateOperationsInput | string | null
    vision?: NullableStringFieldUpdateOperationsInput | string | null
    history?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    content_language?: StringFieldUpdateOperationsInput | string
    translation_group?: NullableStringFieldUpdateOperationsInput | string | null
    is_published?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AboutPageCreateManyInput = {
    id?: number
    title: string
    content: string
    mission?: string | null
    vision?: string | null
    history?: string | null
    image_url?: string | null
    content_language?: string
    translation_group?: string | null
    is_published?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AboutPageUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    mission?: NullableStringFieldUpdateOperationsInput | string | null
    vision?: NullableStringFieldUpdateOperationsInput | string | null
    history?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    content_language?: StringFieldUpdateOperationsInput | string
    translation_group?: NullableStringFieldUpdateOperationsInput | string | null
    is_published?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AboutPageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    mission?: NullableStringFieldUpdateOperationsInput | string | null
    vision?: NullableStringFieldUpdateOperationsInput | string | null
    history?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    content_language?: StringFieldUpdateOperationsInput | string
    translation_group?: NullableStringFieldUpdateOperationsInput | string | null
    is_published?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactPageCreateInput = {
    title: string
    content: string
    address?: string | null
    phone?: string | null
    email?: string | null
    office_hours?: string | null
    map_embed?: string | null
    content_language?: string
    translation_group?: string | null
    is_published?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ContactPageUncheckedCreateInput = {
    id?: number
    title: string
    content: string
    address?: string | null
    phone?: string | null
    email?: string | null
    office_hours?: string | null
    map_embed?: string | null
    content_language?: string
    translation_group?: string | null
    is_published?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ContactPageUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    office_hours?: NullableStringFieldUpdateOperationsInput | string | null
    map_embed?: NullableStringFieldUpdateOperationsInput | string | null
    content_language?: StringFieldUpdateOperationsInput | string
    translation_group?: NullableStringFieldUpdateOperationsInput | string | null
    is_published?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactPageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    office_hours?: NullableStringFieldUpdateOperationsInput | string | null
    map_embed?: NullableStringFieldUpdateOperationsInput | string | null
    content_language?: StringFieldUpdateOperationsInput | string
    translation_group?: NullableStringFieldUpdateOperationsInput | string | null
    is_published?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactPageCreateManyInput = {
    id?: number
    title: string
    content: string
    address?: string | null
    phone?: string | null
    email?: string | null
    office_hours?: string | null
    map_embed?: string | null
    content_language?: string
    translation_group?: string | null
    is_published?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ContactPageUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    office_hours?: NullableStringFieldUpdateOperationsInput | string | null
    map_embed?: NullableStringFieldUpdateOperationsInput | string | null
    content_language?: StringFieldUpdateOperationsInput | string
    translation_group?: NullableStringFieldUpdateOperationsInput | string | null
    is_published?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactPageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    office_hours?: NullableStringFieldUpdateOperationsInput | string | null
    map_embed?: NullableStringFieldUpdateOperationsInput | string | null
    content_language?: StringFieldUpdateOperationsInput | string
    translation_group?: NullableStringFieldUpdateOperationsInput | string | null
    is_published?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BookingListRelationFilter = {
    every?: BookingWhereInput
    some?: BookingWhereInput
    none?: BookingWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BookingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    phone?: SortOrder
    is_admin?: SortOrder
    email_notifications?: SortOrder
    marketing_preferences?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    phone?: SortOrder
    is_admin?: SortOrder
    email_notifications?: SortOrder
    marketing_preferences?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    phone?: SortOrder
    is_admin?: SortOrder
    email_notifications?: SortOrder
    marketing_preferences?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type TheatreImageListRelationFilter = {
    every?: TheatreImageWhereInput
    some?: TheatreImageWhereInput
    none?: TheatreImageWhereInput
  }

  export type TheatreTagListRelationFilter = {
    every?: TheatreTagWhereInput
    some?: TheatreTagWhereInput
    none?: TheatreTagWhereInput
  }

  export type EventListRelationFilter = {
    every?: EventWhereInput
    some?: EventWhereInput
    none?: EventWhereInput
  }

  export type TheatreImageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TheatreTagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TheatreCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    city?: SortOrder
    country?: SortOrder
    description?: SortOrder
    history?: SortOrder
    website?: SortOrder
    founded_year?: SortOrder
    content_language?: SortOrder
    translation_group?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TheatreAvgOrderByAggregateInput = {
    id?: SortOrder
    founded_year?: SortOrder
  }

  export type TheatreMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    city?: SortOrder
    country?: SortOrder
    description?: SortOrder
    history?: SortOrder
    website?: SortOrder
    founded_year?: SortOrder
    content_language?: SortOrder
    translation_group?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TheatreMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    city?: SortOrder
    country?: SortOrder
    description?: SortOrder
    history?: SortOrder
    website?: SortOrder
    founded_year?: SortOrder
    content_language?: SortOrder
    translation_group?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TheatreSumOrderByAggregateInput = {
    id?: SortOrder
    founded_year?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type TheatreScalarRelationFilter = {
    is?: TheatreWhereInput
    isNot?: TheatreWhereInput
  }

  export type TheatreImageCountOrderByAggregateInput = {
    id?: SortOrder
    theatre_id?: SortOrder
    image_url?: SortOrder
    caption?: SortOrder
    is_primary?: SortOrder
    created_at?: SortOrder
  }

  export type TheatreImageAvgOrderByAggregateInput = {
    id?: SortOrder
    theatre_id?: SortOrder
  }

  export type TheatreImageMaxOrderByAggregateInput = {
    id?: SortOrder
    theatre_id?: SortOrder
    image_url?: SortOrder
    caption?: SortOrder
    is_primary?: SortOrder
    created_at?: SortOrder
  }

  export type TheatreImageMinOrderByAggregateInput = {
    id?: SortOrder
    theatre_id?: SortOrder
    image_url?: SortOrder
    caption?: SortOrder
    is_primary?: SortOrder
    created_at?: SortOrder
  }

  export type TheatreImageSumOrderByAggregateInput = {
    id?: SortOrder
    theatre_id?: SortOrder
  }

  export type TheatreTagCountOrderByAggregateInput = {
    id?: SortOrder
    theatre_id?: SortOrder
    tag_name?: SortOrder
    created_at?: SortOrder
  }

  export type TheatreTagAvgOrderByAggregateInput = {
    id?: SortOrder
    theatre_id?: SortOrder
  }

  export type TheatreTagMaxOrderByAggregateInput = {
    id?: SortOrder
    theatre_id?: SortOrder
    tag_name?: SortOrder
    created_at?: SortOrder
  }

  export type TheatreTagMinOrderByAggregateInput = {
    id?: SortOrder
    theatre_id?: SortOrder
    tag_name?: SortOrder
    created_at?: SortOrder
  }

  export type TheatreTagSumOrderByAggregateInput = {
    id?: SortOrder
    theatre_id?: SortOrder
  }

  export type VenueSectionListRelationFilter = {
    every?: VenueSectionWhereInput
    some?: VenueSectionWhereInput
    none?: VenueSectionWhereInput
  }

  export type VenueSectionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VenueCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    address?: SortOrder
    city?: SortOrder
    capacity?: SortOrder
    image_url?: SortOrder
    created_at?: SortOrder
  }

  export type VenueAvgOrderByAggregateInput = {
    id?: SortOrder
    capacity?: SortOrder
  }

  export type VenueMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    address?: SortOrder
    city?: SortOrder
    capacity?: SortOrder
    image_url?: SortOrder
    created_at?: SortOrder
  }

  export type VenueMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    address?: SortOrder
    city?: SortOrder
    capacity?: SortOrder
    image_url?: SortOrder
    created_at?: SortOrder
  }

  export type VenueSumOrderByAggregateInput = {
    id?: SortOrder
    capacity?: SortOrder
  }

  export type EnumSectionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SectionType | EnumSectionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SectionType[] | ListEnumSectionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SectionType[] | ListEnumSectionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSectionTypeFilter<$PrismaModel> | $Enums.SectionType
  }

  export type VenueScalarRelationFilter = {
    is?: VenueWhereInput
    isNot?: VenueWhereInput
  }

  export type SeatListRelationFilter = {
    every?: SeatWhereInput
    some?: SeatWhereInput
    none?: SeatWhereInput
  }

  export type SeatOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VenueSectionCountOrderByAggregateInput = {
    id?: SortOrder
    venue_id?: SortOrder
    section_name?: SortOrder
    section_type?: SortOrder
    created_at?: SortOrder
  }

  export type VenueSectionAvgOrderByAggregateInput = {
    id?: SortOrder
    venue_id?: SortOrder
  }

  export type VenueSectionMaxOrderByAggregateInput = {
    id?: SortOrder
    venue_id?: SortOrder
    section_name?: SortOrder
    section_type?: SortOrder
    created_at?: SortOrder
  }

  export type VenueSectionMinOrderByAggregateInput = {
    id?: SortOrder
    venue_id?: SortOrder
    section_name?: SortOrder
    section_type?: SortOrder
    created_at?: SortOrder
  }

  export type VenueSectionSumOrderByAggregateInput = {
    id?: SortOrder
    venue_id?: SortOrder
  }

  export type EnumSectionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SectionType | EnumSectionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SectionType[] | ListEnumSectionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SectionType[] | ListEnumSectionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSectionTypeWithAggregatesFilter<$PrismaModel> | $Enums.SectionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSectionTypeFilter<$PrismaModel>
    _max?: NestedEnumSectionTypeFilter<$PrismaModel>
  }

  export type VenueSectionScalarRelationFilter = {
    is?: VenueSectionWhereInput
    isNot?: VenueSectionWhereInput
  }

  export type BookedSeatListRelationFilter = {
    every?: BookedSeatWhereInput
    some?: BookedSeatWhereInput
    none?: BookedSeatWhereInput
  }

  export type BookedSeatOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SeatUnique_seatCompoundUniqueInput = {
    venue_section_id: number
    row_number: number
    seat_number: number
  }

  export type SeatCountOrderByAggregateInput = {
    id?: SortOrder
    venue_section_id?: SortOrder
    row_number?: SortOrder
    seat_number?: SortOrder
    is_available?: SortOrder
    is_accessible?: SortOrder
    created_at?: SortOrder
  }

  export type SeatAvgOrderByAggregateInput = {
    id?: SortOrder
    venue_section_id?: SortOrder
    row_number?: SortOrder
    seat_number?: SortOrder
  }

  export type SeatMaxOrderByAggregateInput = {
    id?: SortOrder
    venue_section_id?: SortOrder
    row_number?: SortOrder
    seat_number?: SortOrder
    is_available?: SortOrder
    is_accessible?: SortOrder
    created_at?: SortOrder
  }

  export type SeatMinOrderByAggregateInput = {
    id?: SortOrder
    venue_section_id?: SortOrder
    row_number?: SortOrder
    seat_number?: SortOrder
    is_available?: SortOrder
    is_accessible?: SortOrder
    created_at?: SortOrder
  }

  export type SeatSumOrderByAggregateInput = {
    id?: SortOrder
    venue_section_id?: SortOrder
    row_number?: SortOrder
    seat_number?: SortOrder
  }

  export type EnumEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.EventType | EnumEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEventTypeFilter<$PrismaModel> | $Enums.EventType
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type VenueNullableScalarRelationFilter = {
    is?: VenueWhereInput | null
    isNot?: VenueWhereInput | null
  }

  export type EventCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    theatre_id?: SortOrder
    venue_id?: SortOrder
    event_type?: SortOrder
    event_date?: SortOrder
    event_time?: SortOrder
    description?: SortOrder
    price?: SortOrder
    image_url?: SortOrder
    poster_url?: SortOrder
    language?: SortOrder
    content_language?: SortOrder
    translation_group?: SortOrder
    genre?: SortOrder
    company?: SortOrder
    director?: SortOrder
    cast?: SortOrder
    synopsis?: SortOrder
    subtitles?: SortOrder
    duration?: SortOrder
    is_featured?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type EventAvgOrderByAggregateInput = {
    id?: SortOrder
    theatre_id?: SortOrder
    venue_id?: SortOrder
    price?: SortOrder
  }

  export type EventMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    theatre_id?: SortOrder
    venue_id?: SortOrder
    event_type?: SortOrder
    event_date?: SortOrder
    event_time?: SortOrder
    description?: SortOrder
    price?: SortOrder
    image_url?: SortOrder
    poster_url?: SortOrder
    language?: SortOrder
    content_language?: SortOrder
    translation_group?: SortOrder
    genre?: SortOrder
    director?: SortOrder
    synopsis?: SortOrder
    subtitles?: SortOrder
    duration?: SortOrder
    is_featured?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type EventMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    theatre_id?: SortOrder
    venue_id?: SortOrder
    event_type?: SortOrder
    event_date?: SortOrder
    event_time?: SortOrder
    description?: SortOrder
    price?: SortOrder
    image_url?: SortOrder
    poster_url?: SortOrder
    language?: SortOrder
    content_language?: SortOrder
    translation_group?: SortOrder
    genre?: SortOrder
    director?: SortOrder
    synopsis?: SortOrder
    subtitles?: SortOrder
    duration?: SortOrder
    is_featured?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type EventSumOrderByAggregateInput = {
    id?: SortOrder
    theatre_id?: SortOrder
    venue_id?: SortOrder
    price?: SortOrder
  }

  export type EnumEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventType | EnumEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEventTypeWithAggregatesFilter<$PrismaModel> | $Enums.EventType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEventTypeFilter<$PrismaModel>
    _max?: NestedEnumEventTypeFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EnumBookingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusFilter<$PrismaModel> | $Enums.BookingStatus
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type EventScalarRelationFilter = {
    is?: EventWhereInput
    isNot?: EventWhereInput
  }

  export type BookingCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    event_id?: SortOrder
    booking_reference?: SortOrder
    total_amount?: SortOrder
    booking_status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BookingAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    event_id?: SortOrder
    total_amount?: SortOrder
  }

  export type BookingMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    event_id?: SortOrder
    booking_reference?: SortOrder
    total_amount?: SortOrder
    booking_status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BookingMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    event_id?: SortOrder
    booking_reference?: SortOrder
    total_amount?: SortOrder
    booking_status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BookingSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    event_id?: SortOrder
    total_amount?: SortOrder
  }

  export type EnumBookingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookingStatusFilter<$PrismaModel>
    _max?: NestedEnumBookingStatusFilter<$PrismaModel>
  }

  export type BookingScalarRelationFilter = {
    is?: BookingWhereInput
    isNot?: BookingWhereInput
  }

  export type SeatScalarRelationFilter = {
    is?: SeatWhereInput
    isNot?: SeatWhereInput
  }

  export type BookedSeatUnique_booked_seatCompoundUniqueInput = {
    booking_id: number
    seat_id: number
  }

  export type BookedSeatCountOrderByAggregateInput = {
    id?: SortOrder
    booking_id?: SortOrder
    seat_id?: SortOrder
    created_at?: SortOrder
  }

  export type BookedSeatAvgOrderByAggregateInput = {
    id?: SortOrder
    booking_id?: SortOrder
    seat_id?: SortOrder
  }

  export type BookedSeatMaxOrderByAggregateInput = {
    id?: SortOrder
    booking_id?: SortOrder
    seat_id?: SortOrder
    created_at?: SortOrder
  }

  export type BookedSeatMinOrderByAggregateInput = {
    id?: SortOrder
    booking_id?: SortOrder
    seat_id?: SortOrder
    created_at?: SortOrder
  }

  export type BookedSeatSumOrderByAggregateInput = {
    id?: SortOrder
    booking_id?: SortOrder
    seat_id?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NewsArticleCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    excerpt?: SortOrder
    content?: SortOrder
    category?: SortOrder
    image_url?: SortOrder
    author?: SortOrder
    content_language?: SortOrder
    translation_group?: SortOrder
    published_at?: SortOrder
    is_published?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type NewsArticleAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type NewsArticleMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    excerpt?: SortOrder
    content?: SortOrder
    category?: SortOrder
    image_url?: SortOrder
    author?: SortOrder
    content_language?: SortOrder
    translation_group?: SortOrder
    published_at?: SortOrder
    is_published?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type NewsArticleMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    excerpt?: SortOrder
    content?: SortOrder
    category?: SortOrder
    image_url?: SortOrder
    author?: SortOrder
    content_language?: SortOrder
    translation_group?: SortOrder
    published_at?: SortOrder
    is_published?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type NewsArticleSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type AboutPageCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    mission?: SortOrder
    vision?: SortOrder
    history?: SortOrder
    image_url?: SortOrder
    content_language?: SortOrder
    translation_group?: SortOrder
    is_published?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AboutPageAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AboutPageMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    mission?: SortOrder
    vision?: SortOrder
    history?: SortOrder
    image_url?: SortOrder
    content_language?: SortOrder
    translation_group?: SortOrder
    is_published?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AboutPageMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    mission?: SortOrder
    vision?: SortOrder
    history?: SortOrder
    image_url?: SortOrder
    content_language?: SortOrder
    translation_group?: SortOrder
    is_published?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AboutPageSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ContactPageCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    office_hours?: SortOrder
    map_embed?: SortOrder
    content_language?: SortOrder
    translation_group?: SortOrder
    is_published?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ContactPageAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ContactPageMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    office_hours?: SortOrder
    map_embed?: SortOrder
    content_language?: SortOrder
    translation_group?: SortOrder
    is_published?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ContactPageMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    office_hours?: SortOrder
    map_embed?: SortOrder
    content_language?: SortOrder
    translation_group?: SortOrder
    is_published?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ContactPageSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BookingCreateNestedManyWithoutUserInput = {
    create?: XOR<BookingCreateWithoutUserInput, BookingUncheckedCreateWithoutUserInput> | BookingCreateWithoutUserInput[] | BookingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutUserInput | BookingCreateOrConnectWithoutUserInput[]
    createMany?: BookingCreateManyUserInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type BookingUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<BookingCreateWithoutUserInput, BookingUncheckedCreateWithoutUserInput> | BookingCreateWithoutUserInput[] | BookingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutUserInput | BookingCreateOrConnectWithoutUserInput[]
    createMany?: BookingCreateManyUserInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BookingUpdateManyWithoutUserNestedInput = {
    create?: XOR<BookingCreateWithoutUserInput, BookingUncheckedCreateWithoutUserInput> | BookingCreateWithoutUserInput[] | BookingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutUserInput | BookingCreateOrConnectWithoutUserInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutUserInput | BookingUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BookingCreateManyUserInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutUserInput | BookingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutUserInput | BookingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BookingUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<BookingCreateWithoutUserInput, BookingUncheckedCreateWithoutUserInput> | BookingCreateWithoutUserInput[] | BookingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutUserInput | BookingCreateOrConnectWithoutUserInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutUserInput | BookingUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BookingCreateManyUserInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutUserInput | BookingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutUserInput | BookingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type TheatreImageCreateNestedManyWithoutTheatreInput = {
    create?: XOR<TheatreImageCreateWithoutTheatreInput, TheatreImageUncheckedCreateWithoutTheatreInput> | TheatreImageCreateWithoutTheatreInput[] | TheatreImageUncheckedCreateWithoutTheatreInput[]
    connectOrCreate?: TheatreImageCreateOrConnectWithoutTheatreInput | TheatreImageCreateOrConnectWithoutTheatreInput[]
    createMany?: TheatreImageCreateManyTheatreInputEnvelope
    connect?: TheatreImageWhereUniqueInput | TheatreImageWhereUniqueInput[]
  }

  export type TheatreTagCreateNestedManyWithoutTheatreInput = {
    create?: XOR<TheatreTagCreateWithoutTheatreInput, TheatreTagUncheckedCreateWithoutTheatreInput> | TheatreTagCreateWithoutTheatreInput[] | TheatreTagUncheckedCreateWithoutTheatreInput[]
    connectOrCreate?: TheatreTagCreateOrConnectWithoutTheatreInput | TheatreTagCreateOrConnectWithoutTheatreInput[]
    createMany?: TheatreTagCreateManyTheatreInputEnvelope
    connect?: TheatreTagWhereUniqueInput | TheatreTagWhereUniqueInput[]
  }

  export type EventCreateNestedManyWithoutTheatreInput = {
    create?: XOR<EventCreateWithoutTheatreInput, EventUncheckedCreateWithoutTheatreInput> | EventCreateWithoutTheatreInput[] | EventUncheckedCreateWithoutTheatreInput[]
    connectOrCreate?: EventCreateOrConnectWithoutTheatreInput | EventCreateOrConnectWithoutTheatreInput[]
    createMany?: EventCreateManyTheatreInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type TheatreImageUncheckedCreateNestedManyWithoutTheatreInput = {
    create?: XOR<TheatreImageCreateWithoutTheatreInput, TheatreImageUncheckedCreateWithoutTheatreInput> | TheatreImageCreateWithoutTheatreInput[] | TheatreImageUncheckedCreateWithoutTheatreInput[]
    connectOrCreate?: TheatreImageCreateOrConnectWithoutTheatreInput | TheatreImageCreateOrConnectWithoutTheatreInput[]
    createMany?: TheatreImageCreateManyTheatreInputEnvelope
    connect?: TheatreImageWhereUniqueInput | TheatreImageWhereUniqueInput[]
  }

  export type TheatreTagUncheckedCreateNestedManyWithoutTheatreInput = {
    create?: XOR<TheatreTagCreateWithoutTheatreInput, TheatreTagUncheckedCreateWithoutTheatreInput> | TheatreTagCreateWithoutTheatreInput[] | TheatreTagUncheckedCreateWithoutTheatreInput[]
    connectOrCreate?: TheatreTagCreateOrConnectWithoutTheatreInput | TheatreTagCreateOrConnectWithoutTheatreInput[]
    createMany?: TheatreTagCreateManyTheatreInputEnvelope
    connect?: TheatreTagWhereUniqueInput | TheatreTagWhereUniqueInput[]
  }

  export type EventUncheckedCreateNestedManyWithoutTheatreInput = {
    create?: XOR<EventCreateWithoutTheatreInput, EventUncheckedCreateWithoutTheatreInput> | EventCreateWithoutTheatreInput[] | EventUncheckedCreateWithoutTheatreInput[]
    connectOrCreate?: EventCreateOrConnectWithoutTheatreInput | EventCreateOrConnectWithoutTheatreInput[]
    createMany?: EventCreateManyTheatreInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TheatreImageUpdateManyWithoutTheatreNestedInput = {
    create?: XOR<TheatreImageCreateWithoutTheatreInput, TheatreImageUncheckedCreateWithoutTheatreInput> | TheatreImageCreateWithoutTheatreInput[] | TheatreImageUncheckedCreateWithoutTheatreInput[]
    connectOrCreate?: TheatreImageCreateOrConnectWithoutTheatreInput | TheatreImageCreateOrConnectWithoutTheatreInput[]
    upsert?: TheatreImageUpsertWithWhereUniqueWithoutTheatreInput | TheatreImageUpsertWithWhereUniqueWithoutTheatreInput[]
    createMany?: TheatreImageCreateManyTheatreInputEnvelope
    set?: TheatreImageWhereUniqueInput | TheatreImageWhereUniqueInput[]
    disconnect?: TheatreImageWhereUniqueInput | TheatreImageWhereUniqueInput[]
    delete?: TheatreImageWhereUniqueInput | TheatreImageWhereUniqueInput[]
    connect?: TheatreImageWhereUniqueInput | TheatreImageWhereUniqueInput[]
    update?: TheatreImageUpdateWithWhereUniqueWithoutTheatreInput | TheatreImageUpdateWithWhereUniqueWithoutTheatreInput[]
    updateMany?: TheatreImageUpdateManyWithWhereWithoutTheatreInput | TheatreImageUpdateManyWithWhereWithoutTheatreInput[]
    deleteMany?: TheatreImageScalarWhereInput | TheatreImageScalarWhereInput[]
  }

  export type TheatreTagUpdateManyWithoutTheatreNestedInput = {
    create?: XOR<TheatreTagCreateWithoutTheatreInput, TheatreTagUncheckedCreateWithoutTheatreInput> | TheatreTagCreateWithoutTheatreInput[] | TheatreTagUncheckedCreateWithoutTheatreInput[]
    connectOrCreate?: TheatreTagCreateOrConnectWithoutTheatreInput | TheatreTagCreateOrConnectWithoutTheatreInput[]
    upsert?: TheatreTagUpsertWithWhereUniqueWithoutTheatreInput | TheatreTagUpsertWithWhereUniqueWithoutTheatreInput[]
    createMany?: TheatreTagCreateManyTheatreInputEnvelope
    set?: TheatreTagWhereUniqueInput | TheatreTagWhereUniqueInput[]
    disconnect?: TheatreTagWhereUniqueInput | TheatreTagWhereUniqueInput[]
    delete?: TheatreTagWhereUniqueInput | TheatreTagWhereUniqueInput[]
    connect?: TheatreTagWhereUniqueInput | TheatreTagWhereUniqueInput[]
    update?: TheatreTagUpdateWithWhereUniqueWithoutTheatreInput | TheatreTagUpdateWithWhereUniqueWithoutTheatreInput[]
    updateMany?: TheatreTagUpdateManyWithWhereWithoutTheatreInput | TheatreTagUpdateManyWithWhereWithoutTheatreInput[]
    deleteMany?: TheatreTagScalarWhereInput | TheatreTagScalarWhereInput[]
  }

  export type EventUpdateManyWithoutTheatreNestedInput = {
    create?: XOR<EventCreateWithoutTheatreInput, EventUncheckedCreateWithoutTheatreInput> | EventCreateWithoutTheatreInput[] | EventUncheckedCreateWithoutTheatreInput[]
    connectOrCreate?: EventCreateOrConnectWithoutTheatreInput | EventCreateOrConnectWithoutTheatreInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutTheatreInput | EventUpsertWithWhereUniqueWithoutTheatreInput[]
    createMany?: EventCreateManyTheatreInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutTheatreInput | EventUpdateWithWhereUniqueWithoutTheatreInput[]
    updateMany?: EventUpdateManyWithWhereWithoutTheatreInput | EventUpdateManyWithWhereWithoutTheatreInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type TheatreImageUncheckedUpdateManyWithoutTheatreNestedInput = {
    create?: XOR<TheatreImageCreateWithoutTheatreInput, TheatreImageUncheckedCreateWithoutTheatreInput> | TheatreImageCreateWithoutTheatreInput[] | TheatreImageUncheckedCreateWithoutTheatreInput[]
    connectOrCreate?: TheatreImageCreateOrConnectWithoutTheatreInput | TheatreImageCreateOrConnectWithoutTheatreInput[]
    upsert?: TheatreImageUpsertWithWhereUniqueWithoutTheatreInput | TheatreImageUpsertWithWhereUniqueWithoutTheatreInput[]
    createMany?: TheatreImageCreateManyTheatreInputEnvelope
    set?: TheatreImageWhereUniqueInput | TheatreImageWhereUniqueInput[]
    disconnect?: TheatreImageWhereUniqueInput | TheatreImageWhereUniqueInput[]
    delete?: TheatreImageWhereUniqueInput | TheatreImageWhereUniqueInput[]
    connect?: TheatreImageWhereUniqueInput | TheatreImageWhereUniqueInput[]
    update?: TheatreImageUpdateWithWhereUniqueWithoutTheatreInput | TheatreImageUpdateWithWhereUniqueWithoutTheatreInput[]
    updateMany?: TheatreImageUpdateManyWithWhereWithoutTheatreInput | TheatreImageUpdateManyWithWhereWithoutTheatreInput[]
    deleteMany?: TheatreImageScalarWhereInput | TheatreImageScalarWhereInput[]
  }

  export type TheatreTagUncheckedUpdateManyWithoutTheatreNestedInput = {
    create?: XOR<TheatreTagCreateWithoutTheatreInput, TheatreTagUncheckedCreateWithoutTheatreInput> | TheatreTagCreateWithoutTheatreInput[] | TheatreTagUncheckedCreateWithoutTheatreInput[]
    connectOrCreate?: TheatreTagCreateOrConnectWithoutTheatreInput | TheatreTagCreateOrConnectWithoutTheatreInput[]
    upsert?: TheatreTagUpsertWithWhereUniqueWithoutTheatreInput | TheatreTagUpsertWithWhereUniqueWithoutTheatreInput[]
    createMany?: TheatreTagCreateManyTheatreInputEnvelope
    set?: TheatreTagWhereUniqueInput | TheatreTagWhereUniqueInput[]
    disconnect?: TheatreTagWhereUniqueInput | TheatreTagWhereUniqueInput[]
    delete?: TheatreTagWhereUniqueInput | TheatreTagWhereUniqueInput[]
    connect?: TheatreTagWhereUniqueInput | TheatreTagWhereUniqueInput[]
    update?: TheatreTagUpdateWithWhereUniqueWithoutTheatreInput | TheatreTagUpdateWithWhereUniqueWithoutTheatreInput[]
    updateMany?: TheatreTagUpdateManyWithWhereWithoutTheatreInput | TheatreTagUpdateManyWithWhereWithoutTheatreInput[]
    deleteMany?: TheatreTagScalarWhereInput | TheatreTagScalarWhereInput[]
  }

  export type EventUncheckedUpdateManyWithoutTheatreNestedInput = {
    create?: XOR<EventCreateWithoutTheatreInput, EventUncheckedCreateWithoutTheatreInput> | EventCreateWithoutTheatreInput[] | EventUncheckedCreateWithoutTheatreInput[]
    connectOrCreate?: EventCreateOrConnectWithoutTheatreInput | EventCreateOrConnectWithoutTheatreInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutTheatreInput | EventUpsertWithWhereUniqueWithoutTheatreInput[]
    createMany?: EventCreateManyTheatreInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutTheatreInput | EventUpdateWithWhereUniqueWithoutTheatreInput[]
    updateMany?: EventUpdateManyWithWhereWithoutTheatreInput | EventUpdateManyWithWhereWithoutTheatreInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type TheatreCreateNestedOneWithoutImagesInput = {
    create?: XOR<TheatreCreateWithoutImagesInput, TheatreUncheckedCreateWithoutImagesInput>
    connectOrCreate?: TheatreCreateOrConnectWithoutImagesInput
    connect?: TheatreWhereUniqueInput
  }

  export type TheatreUpdateOneRequiredWithoutImagesNestedInput = {
    create?: XOR<TheatreCreateWithoutImagesInput, TheatreUncheckedCreateWithoutImagesInput>
    connectOrCreate?: TheatreCreateOrConnectWithoutImagesInput
    upsert?: TheatreUpsertWithoutImagesInput
    connect?: TheatreWhereUniqueInput
    update?: XOR<XOR<TheatreUpdateToOneWithWhereWithoutImagesInput, TheatreUpdateWithoutImagesInput>, TheatreUncheckedUpdateWithoutImagesInput>
  }

  export type TheatreCreateNestedOneWithoutTagsInput = {
    create?: XOR<TheatreCreateWithoutTagsInput, TheatreUncheckedCreateWithoutTagsInput>
    connectOrCreate?: TheatreCreateOrConnectWithoutTagsInput
    connect?: TheatreWhereUniqueInput
  }

  export type TheatreUpdateOneRequiredWithoutTagsNestedInput = {
    create?: XOR<TheatreCreateWithoutTagsInput, TheatreUncheckedCreateWithoutTagsInput>
    connectOrCreate?: TheatreCreateOrConnectWithoutTagsInput
    upsert?: TheatreUpsertWithoutTagsInput
    connect?: TheatreWhereUniqueInput
    update?: XOR<XOR<TheatreUpdateToOneWithWhereWithoutTagsInput, TheatreUpdateWithoutTagsInput>, TheatreUncheckedUpdateWithoutTagsInput>
  }

  export type VenueSectionCreateNestedManyWithoutVenueInput = {
    create?: XOR<VenueSectionCreateWithoutVenueInput, VenueSectionUncheckedCreateWithoutVenueInput> | VenueSectionCreateWithoutVenueInput[] | VenueSectionUncheckedCreateWithoutVenueInput[]
    connectOrCreate?: VenueSectionCreateOrConnectWithoutVenueInput | VenueSectionCreateOrConnectWithoutVenueInput[]
    createMany?: VenueSectionCreateManyVenueInputEnvelope
    connect?: VenueSectionWhereUniqueInput | VenueSectionWhereUniqueInput[]
  }

  export type EventCreateNestedManyWithoutVenueInput = {
    create?: XOR<EventCreateWithoutVenueInput, EventUncheckedCreateWithoutVenueInput> | EventCreateWithoutVenueInput[] | EventUncheckedCreateWithoutVenueInput[]
    connectOrCreate?: EventCreateOrConnectWithoutVenueInput | EventCreateOrConnectWithoutVenueInput[]
    createMany?: EventCreateManyVenueInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type VenueSectionUncheckedCreateNestedManyWithoutVenueInput = {
    create?: XOR<VenueSectionCreateWithoutVenueInput, VenueSectionUncheckedCreateWithoutVenueInput> | VenueSectionCreateWithoutVenueInput[] | VenueSectionUncheckedCreateWithoutVenueInput[]
    connectOrCreate?: VenueSectionCreateOrConnectWithoutVenueInput | VenueSectionCreateOrConnectWithoutVenueInput[]
    createMany?: VenueSectionCreateManyVenueInputEnvelope
    connect?: VenueSectionWhereUniqueInput | VenueSectionWhereUniqueInput[]
  }

  export type EventUncheckedCreateNestedManyWithoutVenueInput = {
    create?: XOR<EventCreateWithoutVenueInput, EventUncheckedCreateWithoutVenueInput> | EventCreateWithoutVenueInput[] | EventUncheckedCreateWithoutVenueInput[]
    connectOrCreate?: EventCreateOrConnectWithoutVenueInput | EventCreateOrConnectWithoutVenueInput[]
    createMany?: EventCreateManyVenueInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type VenueSectionUpdateManyWithoutVenueNestedInput = {
    create?: XOR<VenueSectionCreateWithoutVenueInput, VenueSectionUncheckedCreateWithoutVenueInput> | VenueSectionCreateWithoutVenueInput[] | VenueSectionUncheckedCreateWithoutVenueInput[]
    connectOrCreate?: VenueSectionCreateOrConnectWithoutVenueInput | VenueSectionCreateOrConnectWithoutVenueInput[]
    upsert?: VenueSectionUpsertWithWhereUniqueWithoutVenueInput | VenueSectionUpsertWithWhereUniqueWithoutVenueInput[]
    createMany?: VenueSectionCreateManyVenueInputEnvelope
    set?: VenueSectionWhereUniqueInput | VenueSectionWhereUniqueInput[]
    disconnect?: VenueSectionWhereUniqueInput | VenueSectionWhereUniqueInput[]
    delete?: VenueSectionWhereUniqueInput | VenueSectionWhereUniqueInput[]
    connect?: VenueSectionWhereUniqueInput | VenueSectionWhereUniqueInput[]
    update?: VenueSectionUpdateWithWhereUniqueWithoutVenueInput | VenueSectionUpdateWithWhereUniqueWithoutVenueInput[]
    updateMany?: VenueSectionUpdateManyWithWhereWithoutVenueInput | VenueSectionUpdateManyWithWhereWithoutVenueInput[]
    deleteMany?: VenueSectionScalarWhereInput | VenueSectionScalarWhereInput[]
  }

  export type EventUpdateManyWithoutVenueNestedInput = {
    create?: XOR<EventCreateWithoutVenueInput, EventUncheckedCreateWithoutVenueInput> | EventCreateWithoutVenueInput[] | EventUncheckedCreateWithoutVenueInput[]
    connectOrCreate?: EventCreateOrConnectWithoutVenueInput | EventCreateOrConnectWithoutVenueInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutVenueInput | EventUpsertWithWhereUniqueWithoutVenueInput[]
    createMany?: EventCreateManyVenueInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutVenueInput | EventUpdateWithWhereUniqueWithoutVenueInput[]
    updateMany?: EventUpdateManyWithWhereWithoutVenueInput | EventUpdateManyWithWhereWithoutVenueInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type VenueSectionUncheckedUpdateManyWithoutVenueNestedInput = {
    create?: XOR<VenueSectionCreateWithoutVenueInput, VenueSectionUncheckedCreateWithoutVenueInput> | VenueSectionCreateWithoutVenueInput[] | VenueSectionUncheckedCreateWithoutVenueInput[]
    connectOrCreate?: VenueSectionCreateOrConnectWithoutVenueInput | VenueSectionCreateOrConnectWithoutVenueInput[]
    upsert?: VenueSectionUpsertWithWhereUniqueWithoutVenueInput | VenueSectionUpsertWithWhereUniqueWithoutVenueInput[]
    createMany?: VenueSectionCreateManyVenueInputEnvelope
    set?: VenueSectionWhereUniqueInput | VenueSectionWhereUniqueInput[]
    disconnect?: VenueSectionWhereUniqueInput | VenueSectionWhereUniqueInput[]
    delete?: VenueSectionWhereUniqueInput | VenueSectionWhereUniqueInput[]
    connect?: VenueSectionWhereUniqueInput | VenueSectionWhereUniqueInput[]
    update?: VenueSectionUpdateWithWhereUniqueWithoutVenueInput | VenueSectionUpdateWithWhereUniqueWithoutVenueInput[]
    updateMany?: VenueSectionUpdateManyWithWhereWithoutVenueInput | VenueSectionUpdateManyWithWhereWithoutVenueInput[]
    deleteMany?: VenueSectionScalarWhereInput | VenueSectionScalarWhereInput[]
  }

  export type EventUncheckedUpdateManyWithoutVenueNestedInput = {
    create?: XOR<EventCreateWithoutVenueInput, EventUncheckedCreateWithoutVenueInput> | EventCreateWithoutVenueInput[] | EventUncheckedCreateWithoutVenueInput[]
    connectOrCreate?: EventCreateOrConnectWithoutVenueInput | EventCreateOrConnectWithoutVenueInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutVenueInput | EventUpsertWithWhereUniqueWithoutVenueInput[]
    createMany?: EventCreateManyVenueInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutVenueInput | EventUpdateWithWhereUniqueWithoutVenueInput[]
    updateMany?: EventUpdateManyWithWhereWithoutVenueInput | EventUpdateManyWithWhereWithoutVenueInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type VenueCreateNestedOneWithoutSectionsInput = {
    create?: XOR<VenueCreateWithoutSectionsInput, VenueUncheckedCreateWithoutSectionsInput>
    connectOrCreate?: VenueCreateOrConnectWithoutSectionsInput
    connect?: VenueWhereUniqueInput
  }

  export type SeatCreateNestedManyWithoutVenueSectionInput = {
    create?: XOR<SeatCreateWithoutVenueSectionInput, SeatUncheckedCreateWithoutVenueSectionInput> | SeatCreateWithoutVenueSectionInput[] | SeatUncheckedCreateWithoutVenueSectionInput[]
    connectOrCreate?: SeatCreateOrConnectWithoutVenueSectionInput | SeatCreateOrConnectWithoutVenueSectionInput[]
    createMany?: SeatCreateManyVenueSectionInputEnvelope
    connect?: SeatWhereUniqueInput | SeatWhereUniqueInput[]
  }

  export type SeatUncheckedCreateNestedManyWithoutVenueSectionInput = {
    create?: XOR<SeatCreateWithoutVenueSectionInput, SeatUncheckedCreateWithoutVenueSectionInput> | SeatCreateWithoutVenueSectionInput[] | SeatUncheckedCreateWithoutVenueSectionInput[]
    connectOrCreate?: SeatCreateOrConnectWithoutVenueSectionInput | SeatCreateOrConnectWithoutVenueSectionInput[]
    createMany?: SeatCreateManyVenueSectionInputEnvelope
    connect?: SeatWhereUniqueInput | SeatWhereUniqueInput[]
  }

  export type EnumSectionTypeFieldUpdateOperationsInput = {
    set?: $Enums.SectionType
  }

  export type VenueUpdateOneRequiredWithoutSectionsNestedInput = {
    create?: XOR<VenueCreateWithoutSectionsInput, VenueUncheckedCreateWithoutSectionsInput>
    connectOrCreate?: VenueCreateOrConnectWithoutSectionsInput
    upsert?: VenueUpsertWithoutSectionsInput
    connect?: VenueWhereUniqueInput
    update?: XOR<XOR<VenueUpdateToOneWithWhereWithoutSectionsInput, VenueUpdateWithoutSectionsInput>, VenueUncheckedUpdateWithoutSectionsInput>
  }

  export type SeatUpdateManyWithoutVenueSectionNestedInput = {
    create?: XOR<SeatCreateWithoutVenueSectionInput, SeatUncheckedCreateWithoutVenueSectionInput> | SeatCreateWithoutVenueSectionInput[] | SeatUncheckedCreateWithoutVenueSectionInput[]
    connectOrCreate?: SeatCreateOrConnectWithoutVenueSectionInput | SeatCreateOrConnectWithoutVenueSectionInput[]
    upsert?: SeatUpsertWithWhereUniqueWithoutVenueSectionInput | SeatUpsertWithWhereUniqueWithoutVenueSectionInput[]
    createMany?: SeatCreateManyVenueSectionInputEnvelope
    set?: SeatWhereUniqueInput | SeatWhereUniqueInput[]
    disconnect?: SeatWhereUniqueInput | SeatWhereUniqueInput[]
    delete?: SeatWhereUniqueInput | SeatWhereUniqueInput[]
    connect?: SeatWhereUniqueInput | SeatWhereUniqueInput[]
    update?: SeatUpdateWithWhereUniqueWithoutVenueSectionInput | SeatUpdateWithWhereUniqueWithoutVenueSectionInput[]
    updateMany?: SeatUpdateManyWithWhereWithoutVenueSectionInput | SeatUpdateManyWithWhereWithoutVenueSectionInput[]
    deleteMany?: SeatScalarWhereInput | SeatScalarWhereInput[]
  }

  export type SeatUncheckedUpdateManyWithoutVenueSectionNestedInput = {
    create?: XOR<SeatCreateWithoutVenueSectionInput, SeatUncheckedCreateWithoutVenueSectionInput> | SeatCreateWithoutVenueSectionInput[] | SeatUncheckedCreateWithoutVenueSectionInput[]
    connectOrCreate?: SeatCreateOrConnectWithoutVenueSectionInput | SeatCreateOrConnectWithoutVenueSectionInput[]
    upsert?: SeatUpsertWithWhereUniqueWithoutVenueSectionInput | SeatUpsertWithWhereUniqueWithoutVenueSectionInput[]
    createMany?: SeatCreateManyVenueSectionInputEnvelope
    set?: SeatWhereUniqueInput | SeatWhereUniqueInput[]
    disconnect?: SeatWhereUniqueInput | SeatWhereUniqueInput[]
    delete?: SeatWhereUniqueInput | SeatWhereUniqueInput[]
    connect?: SeatWhereUniqueInput | SeatWhereUniqueInput[]
    update?: SeatUpdateWithWhereUniqueWithoutVenueSectionInput | SeatUpdateWithWhereUniqueWithoutVenueSectionInput[]
    updateMany?: SeatUpdateManyWithWhereWithoutVenueSectionInput | SeatUpdateManyWithWhereWithoutVenueSectionInput[]
    deleteMany?: SeatScalarWhereInput | SeatScalarWhereInput[]
  }

  export type VenueSectionCreateNestedOneWithoutSeatsInput = {
    create?: XOR<VenueSectionCreateWithoutSeatsInput, VenueSectionUncheckedCreateWithoutSeatsInput>
    connectOrCreate?: VenueSectionCreateOrConnectWithoutSeatsInput
    connect?: VenueSectionWhereUniqueInput
  }

  export type BookedSeatCreateNestedManyWithoutSeatInput = {
    create?: XOR<BookedSeatCreateWithoutSeatInput, BookedSeatUncheckedCreateWithoutSeatInput> | BookedSeatCreateWithoutSeatInput[] | BookedSeatUncheckedCreateWithoutSeatInput[]
    connectOrCreate?: BookedSeatCreateOrConnectWithoutSeatInput | BookedSeatCreateOrConnectWithoutSeatInput[]
    createMany?: BookedSeatCreateManySeatInputEnvelope
    connect?: BookedSeatWhereUniqueInput | BookedSeatWhereUniqueInput[]
  }

  export type BookedSeatUncheckedCreateNestedManyWithoutSeatInput = {
    create?: XOR<BookedSeatCreateWithoutSeatInput, BookedSeatUncheckedCreateWithoutSeatInput> | BookedSeatCreateWithoutSeatInput[] | BookedSeatUncheckedCreateWithoutSeatInput[]
    connectOrCreate?: BookedSeatCreateOrConnectWithoutSeatInput | BookedSeatCreateOrConnectWithoutSeatInput[]
    createMany?: BookedSeatCreateManySeatInputEnvelope
    connect?: BookedSeatWhereUniqueInput | BookedSeatWhereUniqueInput[]
  }

  export type VenueSectionUpdateOneRequiredWithoutSeatsNestedInput = {
    create?: XOR<VenueSectionCreateWithoutSeatsInput, VenueSectionUncheckedCreateWithoutSeatsInput>
    connectOrCreate?: VenueSectionCreateOrConnectWithoutSeatsInput
    upsert?: VenueSectionUpsertWithoutSeatsInput
    connect?: VenueSectionWhereUniqueInput
    update?: XOR<XOR<VenueSectionUpdateToOneWithWhereWithoutSeatsInput, VenueSectionUpdateWithoutSeatsInput>, VenueSectionUncheckedUpdateWithoutSeatsInput>
  }

  export type BookedSeatUpdateManyWithoutSeatNestedInput = {
    create?: XOR<BookedSeatCreateWithoutSeatInput, BookedSeatUncheckedCreateWithoutSeatInput> | BookedSeatCreateWithoutSeatInput[] | BookedSeatUncheckedCreateWithoutSeatInput[]
    connectOrCreate?: BookedSeatCreateOrConnectWithoutSeatInput | BookedSeatCreateOrConnectWithoutSeatInput[]
    upsert?: BookedSeatUpsertWithWhereUniqueWithoutSeatInput | BookedSeatUpsertWithWhereUniqueWithoutSeatInput[]
    createMany?: BookedSeatCreateManySeatInputEnvelope
    set?: BookedSeatWhereUniqueInput | BookedSeatWhereUniqueInput[]
    disconnect?: BookedSeatWhereUniqueInput | BookedSeatWhereUniqueInput[]
    delete?: BookedSeatWhereUniqueInput | BookedSeatWhereUniqueInput[]
    connect?: BookedSeatWhereUniqueInput | BookedSeatWhereUniqueInput[]
    update?: BookedSeatUpdateWithWhereUniqueWithoutSeatInput | BookedSeatUpdateWithWhereUniqueWithoutSeatInput[]
    updateMany?: BookedSeatUpdateManyWithWhereWithoutSeatInput | BookedSeatUpdateManyWithWhereWithoutSeatInput[]
    deleteMany?: BookedSeatScalarWhereInput | BookedSeatScalarWhereInput[]
  }

  export type BookedSeatUncheckedUpdateManyWithoutSeatNestedInput = {
    create?: XOR<BookedSeatCreateWithoutSeatInput, BookedSeatUncheckedCreateWithoutSeatInput> | BookedSeatCreateWithoutSeatInput[] | BookedSeatUncheckedCreateWithoutSeatInput[]
    connectOrCreate?: BookedSeatCreateOrConnectWithoutSeatInput | BookedSeatCreateOrConnectWithoutSeatInput[]
    upsert?: BookedSeatUpsertWithWhereUniqueWithoutSeatInput | BookedSeatUpsertWithWhereUniqueWithoutSeatInput[]
    createMany?: BookedSeatCreateManySeatInputEnvelope
    set?: BookedSeatWhereUniqueInput | BookedSeatWhereUniqueInput[]
    disconnect?: BookedSeatWhereUniqueInput | BookedSeatWhereUniqueInput[]
    delete?: BookedSeatWhereUniqueInput | BookedSeatWhereUniqueInput[]
    connect?: BookedSeatWhereUniqueInput | BookedSeatWhereUniqueInput[]
    update?: BookedSeatUpdateWithWhereUniqueWithoutSeatInput | BookedSeatUpdateWithWhereUniqueWithoutSeatInput[]
    updateMany?: BookedSeatUpdateManyWithWhereWithoutSeatInput | BookedSeatUpdateManyWithWhereWithoutSeatInput[]
    deleteMany?: BookedSeatScalarWhereInput | BookedSeatScalarWhereInput[]
  }

  export type EventCreatecompanyInput = {
    set: string[]
  }

  export type EventCreatecastInput = {
    set: string[]
  }

  export type TheatreCreateNestedOneWithoutEventsInput = {
    create?: XOR<TheatreCreateWithoutEventsInput, TheatreUncheckedCreateWithoutEventsInput>
    connectOrCreate?: TheatreCreateOrConnectWithoutEventsInput
    connect?: TheatreWhereUniqueInput
  }

  export type VenueCreateNestedOneWithoutEventsInput = {
    create?: XOR<VenueCreateWithoutEventsInput, VenueUncheckedCreateWithoutEventsInput>
    connectOrCreate?: VenueCreateOrConnectWithoutEventsInput
    connect?: VenueWhereUniqueInput
  }

  export type BookingCreateNestedManyWithoutEventInput = {
    create?: XOR<BookingCreateWithoutEventInput, BookingUncheckedCreateWithoutEventInput> | BookingCreateWithoutEventInput[] | BookingUncheckedCreateWithoutEventInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutEventInput | BookingCreateOrConnectWithoutEventInput[]
    createMany?: BookingCreateManyEventInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type BookingUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<BookingCreateWithoutEventInput, BookingUncheckedCreateWithoutEventInput> | BookingCreateWithoutEventInput[] | BookingUncheckedCreateWithoutEventInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutEventInput | BookingCreateOrConnectWithoutEventInput[]
    createMany?: BookingCreateManyEventInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type EnumEventTypeFieldUpdateOperationsInput = {
    set?: $Enums.EventType
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type EventUpdatecompanyInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EventUpdatecastInput = {
    set?: string[]
    push?: string | string[]
  }

  export type TheatreUpdateOneRequiredWithoutEventsNestedInput = {
    create?: XOR<TheatreCreateWithoutEventsInput, TheatreUncheckedCreateWithoutEventsInput>
    connectOrCreate?: TheatreCreateOrConnectWithoutEventsInput
    upsert?: TheatreUpsertWithoutEventsInput
    connect?: TheatreWhereUniqueInput
    update?: XOR<XOR<TheatreUpdateToOneWithWhereWithoutEventsInput, TheatreUpdateWithoutEventsInput>, TheatreUncheckedUpdateWithoutEventsInput>
  }

  export type VenueUpdateOneWithoutEventsNestedInput = {
    create?: XOR<VenueCreateWithoutEventsInput, VenueUncheckedCreateWithoutEventsInput>
    connectOrCreate?: VenueCreateOrConnectWithoutEventsInput
    upsert?: VenueUpsertWithoutEventsInput
    disconnect?: VenueWhereInput | boolean
    delete?: VenueWhereInput | boolean
    connect?: VenueWhereUniqueInput
    update?: XOR<XOR<VenueUpdateToOneWithWhereWithoutEventsInput, VenueUpdateWithoutEventsInput>, VenueUncheckedUpdateWithoutEventsInput>
  }

  export type BookingUpdateManyWithoutEventNestedInput = {
    create?: XOR<BookingCreateWithoutEventInput, BookingUncheckedCreateWithoutEventInput> | BookingCreateWithoutEventInput[] | BookingUncheckedCreateWithoutEventInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutEventInput | BookingCreateOrConnectWithoutEventInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutEventInput | BookingUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: BookingCreateManyEventInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutEventInput | BookingUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutEventInput | BookingUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type BookingUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<BookingCreateWithoutEventInput, BookingUncheckedCreateWithoutEventInput> | BookingCreateWithoutEventInput[] | BookingUncheckedCreateWithoutEventInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutEventInput | BookingCreateOrConnectWithoutEventInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutEventInput | BookingUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: BookingCreateManyEventInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutEventInput | BookingUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutEventInput | BookingUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutBookingsInput = {
    create?: XOR<UserCreateWithoutBookingsInput, UserUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBookingsInput
    connect?: UserWhereUniqueInput
  }

  export type EventCreateNestedOneWithoutBookingsInput = {
    create?: XOR<EventCreateWithoutBookingsInput, EventUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: EventCreateOrConnectWithoutBookingsInput
    connect?: EventWhereUniqueInput
  }

  export type BookedSeatCreateNestedManyWithoutBookingInput = {
    create?: XOR<BookedSeatCreateWithoutBookingInput, BookedSeatUncheckedCreateWithoutBookingInput> | BookedSeatCreateWithoutBookingInput[] | BookedSeatUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: BookedSeatCreateOrConnectWithoutBookingInput | BookedSeatCreateOrConnectWithoutBookingInput[]
    createMany?: BookedSeatCreateManyBookingInputEnvelope
    connect?: BookedSeatWhereUniqueInput | BookedSeatWhereUniqueInput[]
  }

  export type BookedSeatUncheckedCreateNestedManyWithoutBookingInput = {
    create?: XOR<BookedSeatCreateWithoutBookingInput, BookedSeatUncheckedCreateWithoutBookingInput> | BookedSeatCreateWithoutBookingInput[] | BookedSeatUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: BookedSeatCreateOrConnectWithoutBookingInput | BookedSeatCreateOrConnectWithoutBookingInput[]
    createMany?: BookedSeatCreateManyBookingInputEnvelope
    connect?: BookedSeatWhereUniqueInput | BookedSeatWhereUniqueInput[]
  }

  export type EnumBookingStatusFieldUpdateOperationsInput = {
    set?: $Enums.BookingStatus
  }

  export type UserUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: XOR<UserCreateWithoutBookingsInput, UserUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBookingsInput
    upsert?: UserUpsertWithoutBookingsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBookingsInput, UserUpdateWithoutBookingsInput>, UserUncheckedUpdateWithoutBookingsInput>
  }

  export type EventUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: XOR<EventCreateWithoutBookingsInput, EventUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: EventCreateOrConnectWithoutBookingsInput
    upsert?: EventUpsertWithoutBookingsInput
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutBookingsInput, EventUpdateWithoutBookingsInput>, EventUncheckedUpdateWithoutBookingsInput>
  }

  export type BookedSeatUpdateManyWithoutBookingNestedInput = {
    create?: XOR<BookedSeatCreateWithoutBookingInput, BookedSeatUncheckedCreateWithoutBookingInput> | BookedSeatCreateWithoutBookingInput[] | BookedSeatUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: BookedSeatCreateOrConnectWithoutBookingInput | BookedSeatCreateOrConnectWithoutBookingInput[]
    upsert?: BookedSeatUpsertWithWhereUniqueWithoutBookingInput | BookedSeatUpsertWithWhereUniqueWithoutBookingInput[]
    createMany?: BookedSeatCreateManyBookingInputEnvelope
    set?: BookedSeatWhereUniqueInput | BookedSeatWhereUniqueInput[]
    disconnect?: BookedSeatWhereUniqueInput | BookedSeatWhereUniqueInput[]
    delete?: BookedSeatWhereUniqueInput | BookedSeatWhereUniqueInput[]
    connect?: BookedSeatWhereUniqueInput | BookedSeatWhereUniqueInput[]
    update?: BookedSeatUpdateWithWhereUniqueWithoutBookingInput | BookedSeatUpdateWithWhereUniqueWithoutBookingInput[]
    updateMany?: BookedSeatUpdateManyWithWhereWithoutBookingInput | BookedSeatUpdateManyWithWhereWithoutBookingInput[]
    deleteMany?: BookedSeatScalarWhereInput | BookedSeatScalarWhereInput[]
  }

  export type BookedSeatUncheckedUpdateManyWithoutBookingNestedInput = {
    create?: XOR<BookedSeatCreateWithoutBookingInput, BookedSeatUncheckedCreateWithoutBookingInput> | BookedSeatCreateWithoutBookingInput[] | BookedSeatUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: BookedSeatCreateOrConnectWithoutBookingInput | BookedSeatCreateOrConnectWithoutBookingInput[]
    upsert?: BookedSeatUpsertWithWhereUniqueWithoutBookingInput | BookedSeatUpsertWithWhereUniqueWithoutBookingInput[]
    createMany?: BookedSeatCreateManyBookingInputEnvelope
    set?: BookedSeatWhereUniqueInput | BookedSeatWhereUniqueInput[]
    disconnect?: BookedSeatWhereUniqueInput | BookedSeatWhereUniqueInput[]
    delete?: BookedSeatWhereUniqueInput | BookedSeatWhereUniqueInput[]
    connect?: BookedSeatWhereUniqueInput | BookedSeatWhereUniqueInput[]
    update?: BookedSeatUpdateWithWhereUniqueWithoutBookingInput | BookedSeatUpdateWithWhereUniqueWithoutBookingInput[]
    updateMany?: BookedSeatUpdateManyWithWhereWithoutBookingInput | BookedSeatUpdateManyWithWhereWithoutBookingInput[]
    deleteMany?: BookedSeatScalarWhereInput | BookedSeatScalarWhereInput[]
  }

  export type BookingCreateNestedOneWithoutBooked_seatsInput = {
    create?: XOR<BookingCreateWithoutBooked_seatsInput, BookingUncheckedCreateWithoutBooked_seatsInput>
    connectOrCreate?: BookingCreateOrConnectWithoutBooked_seatsInput
    connect?: BookingWhereUniqueInput
  }

  export type SeatCreateNestedOneWithoutBooked_seatsInput = {
    create?: XOR<SeatCreateWithoutBooked_seatsInput, SeatUncheckedCreateWithoutBooked_seatsInput>
    connectOrCreate?: SeatCreateOrConnectWithoutBooked_seatsInput
    connect?: SeatWhereUniqueInput
  }

  export type BookingUpdateOneRequiredWithoutBooked_seatsNestedInput = {
    create?: XOR<BookingCreateWithoutBooked_seatsInput, BookingUncheckedCreateWithoutBooked_seatsInput>
    connectOrCreate?: BookingCreateOrConnectWithoutBooked_seatsInput
    upsert?: BookingUpsertWithoutBooked_seatsInput
    connect?: BookingWhereUniqueInput
    update?: XOR<XOR<BookingUpdateToOneWithWhereWithoutBooked_seatsInput, BookingUpdateWithoutBooked_seatsInput>, BookingUncheckedUpdateWithoutBooked_seatsInput>
  }

  export type SeatUpdateOneRequiredWithoutBooked_seatsNestedInput = {
    create?: XOR<SeatCreateWithoutBooked_seatsInput, SeatUncheckedCreateWithoutBooked_seatsInput>
    connectOrCreate?: SeatCreateOrConnectWithoutBooked_seatsInput
    upsert?: SeatUpsertWithoutBooked_seatsInput
    connect?: SeatWhereUniqueInput
    update?: XOR<XOR<SeatUpdateToOneWithWhereWithoutBooked_seatsInput, SeatUpdateWithoutBooked_seatsInput>, SeatUncheckedUpdateWithoutBooked_seatsInput>
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumSectionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SectionType | EnumSectionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SectionType[] | ListEnumSectionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SectionType[] | ListEnumSectionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSectionTypeFilter<$PrismaModel> | $Enums.SectionType
  }

  export type NestedEnumSectionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SectionType | EnumSectionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SectionType[] | ListEnumSectionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SectionType[] | ListEnumSectionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSectionTypeWithAggregatesFilter<$PrismaModel> | $Enums.SectionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSectionTypeFilter<$PrismaModel>
    _max?: NestedEnumSectionTypeFilter<$PrismaModel>
  }

  export type NestedEnumEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.EventType | EnumEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEventTypeFilter<$PrismaModel> | $Enums.EventType
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedEnumEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventType | EnumEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEventTypeWithAggregatesFilter<$PrismaModel> | $Enums.EventType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEventTypeFilter<$PrismaModel>
    _max?: NestedEnumEventTypeFilter<$PrismaModel>
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumBookingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusFilter<$PrismaModel> | $Enums.BookingStatus
  }

  export type NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookingStatusFilter<$PrismaModel>
    _max?: NestedEnumBookingStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BookingCreateWithoutUserInput = {
    booking_reference: string
    total_amount: Decimal | DecimalJsLike | number | string
    booking_status?: $Enums.BookingStatus
    created_at?: Date | string
    updated_at?: Date | string
    event: EventCreateNestedOneWithoutBookingsInput
    booked_seats?: BookedSeatCreateNestedManyWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutUserInput = {
    id?: number
    event_id: number
    booking_reference: string
    total_amount: Decimal | DecimalJsLike | number | string
    booking_status?: $Enums.BookingStatus
    created_at?: Date | string
    updated_at?: Date | string
    booked_seats?: BookedSeatUncheckedCreateNestedManyWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutUserInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutUserInput, BookingUncheckedCreateWithoutUserInput>
  }

  export type BookingCreateManyUserInputEnvelope = {
    data: BookingCreateManyUserInput | BookingCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type BookingUpsertWithWhereUniqueWithoutUserInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutUserInput, BookingUncheckedUpdateWithoutUserInput>
    create: XOR<BookingCreateWithoutUserInput, BookingUncheckedCreateWithoutUserInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutUserInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutUserInput, BookingUncheckedUpdateWithoutUserInput>
  }

  export type BookingUpdateManyWithWhereWithoutUserInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutUserInput>
  }

  export type BookingScalarWhereInput = {
    AND?: BookingScalarWhereInput | BookingScalarWhereInput[]
    OR?: BookingScalarWhereInput[]
    NOT?: BookingScalarWhereInput | BookingScalarWhereInput[]
    id?: IntFilter<"Booking"> | number
    user_id?: IntFilter<"Booking"> | number
    event_id?: IntFilter<"Booking"> | number
    booking_reference?: StringFilter<"Booking"> | string
    total_amount?: DecimalFilter<"Booking"> | Decimal | DecimalJsLike | number | string
    booking_status?: EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus
    created_at?: DateTimeFilter<"Booking"> | Date | string
    updated_at?: DateTimeFilter<"Booking"> | Date | string
  }

  export type TheatreImageCreateWithoutTheatreInput = {
    image_url: string
    caption?: string | null
    is_primary?: boolean
    created_at?: Date | string
  }

  export type TheatreImageUncheckedCreateWithoutTheatreInput = {
    id?: number
    image_url: string
    caption?: string | null
    is_primary?: boolean
    created_at?: Date | string
  }

  export type TheatreImageCreateOrConnectWithoutTheatreInput = {
    where: TheatreImageWhereUniqueInput
    create: XOR<TheatreImageCreateWithoutTheatreInput, TheatreImageUncheckedCreateWithoutTheatreInput>
  }

  export type TheatreImageCreateManyTheatreInputEnvelope = {
    data: TheatreImageCreateManyTheatreInput | TheatreImageCreateManyTheatreInput[]
    skipDuplicates?: boolean
  }

  export type TheatreTagCreateWithoutTheatreInput = {
    tag_name: string
    created_at?: Date | string
  }

  export type TheatreTagUncheckedCreateWithoutTheatreInput = {
    id?: number
    tag_name: string
    created_at?: Date | string
  }

  export type TheatreTagCreateOrConnectWithoutTheatreInput = {
    where: TheatreTagWhereUniqueInput
    create: XOR<TheatreTagCreateWithoutTheatreInput, TheatreTagUncheckedCreateWithoutTheatreInput>
  }

  export type TheatreTagCreateManyTheatreInputEnvelope = {
    data: TheatreTagCreateManyTheatreInput | TheatreTagCreateManyTheatreInput[]
    skipDuplicates?: boolean
  }

  export type EventCreateWithoutTheatreInput = {
    title: string
    event_type: $Enums.EventType
    event_date: Date | string
    event_time: Date | string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    image_url?: string | null
    poster_url?: string | null
    language?: string | null
    content_language?: string
    translation_group?: string | null
    genre?: string | null
    company?: EventCreatecompanyInput | string[]
    director?: string | null
    cast?: EventCreatecastInput | string[]
    synopsis?: string | null
    subtitles?: string | null
    duration?: string | null
    is_featured?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    venue?: VenueCreateNestedOneWithoutEventsInput
    bookings?: BookingCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutTheatreInput = {
    id?: number
    title: string
    venue_id?: number | null
    event_type: $Enums.EventType
    event_date: Date | string
    event_time: Date | string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    image_url?: string | null
    poster_url?: string | null
    language?: string | null
    content_language?: string
    translation_group?: string | null
    genre?: string | null
    company?: EventCreatecompanyInput | string[]
    director?: string | null
    cast?: EventCreatecastInput | string[]
    synopsis?: string | null
    subtitles?: string | null
    duration?: string | null
    is_featured?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutTheatreInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutTheatreInput, EventUncheckedCreateWithoutTheatreInput>
  }

  export type EventCreateManyTheatreInputEnvelope = {
    data: EventCreateManyTheatreInput | EventCreateManyTheatreInput[]
    skipDuplicates?: boolean
  }

  export type TheatreImageUpsertWithWhereUniqueWithoutTheatreInput = {
    where: TheatreImageWhereUniqueInput
    update: XOR<TheatreImageUpdateWithoutTheatreInput, TheatreImageUncheckedUpdateWithoutTheatreInput>
    create: XOR<TheatreImageCreateWithoutTheatreInput, TheatreImageUncheckedCreateWithoutTheatreInput>
  }

  export type TheatreImageUpdateWithWhereUniqueWithoutTheatreInput = {
    where: TheatreImageWhereUniqueInput
    data: XOR<TheatreImageUpdateWithoutTheatreInput, TheatreImageUncheckedUpdateWithoutTheatreInput>
  }

  export type TheatreImageUpdateManyWithWhereWithoutTheatreInput = {
    where: TheatreImageScalarWhereInput
    data: XOR<TheatreImageUpdateManyMutationInput, TheatreImageUncheckedUpdateManyWithoutTheatreInput>
  }

  export type TheatreImageScalarWhereInput = {
    AND?: TheatreImageScalarWhereInput | TheatreImageScalarWhereInput[]
    OR?: TheatreImageScalarWhereInput[]
    NOT?: TheatreImageScalarWhereInput | TheatreImageScalarWhereInput[]
    id?: IntFilter<"TheatreImage"> | number
    theatre_id?: IntFilter<"TheatreImage"> | number
    image_url?: StringFilter<"TheatreImage"> | string
    caption?: StringNullableFilter<"TheatreImage"> | string | null
    is_primary?: BoolFilter<"TheatreImage"> | boolean
    created_at?: DateTimeFilter<"TheatreImage"> | Date | string
  }

  export type TheatreTagUpsertWithWhereUniqueWithoutTheatreInput = {
    where: TheatreTagWhereUniqueInput
    update: XOR<TheatreTagUpdateWithoutTheatreInput, TheatreTagUncheckedUpdateWithoutTheatreInput>
    create: XOR<TheatreTagCreateWithoutTheatreInput, TheatreTagUncheckedCreateWithoutTheatreInput>
  }

  export type TheatreTagUpdateWithWhereUniqueWithoutTheatreInput = {
    where: TheatreTagWhereUniqueInput
    data: XOR<TheatreTagUpdateWithoutTheatreInput, TheatreTagUncheckedUpdateWithoutTheatreInput>
  }

  export type TheatreTagUpdateManyWithWhereWithoutTheatreInput = {
    where: TheatreTagScalarWhereInput
    data: XOR<TheatreTagUpdateManyMutationInput, TheatreTagUncheckedUpdateManyWithoutTheatreInput>
  }

  export type TheatreTagScalarWhereInput = {
    AND?: TheatreTagScalarWhereInput | TheatreTagScalarWhereInput[]
    OR?: TheatreTagScalarWhereInput[]
    NOT?: TheatreTagScalarWhereInput | TheatreTagScalarWhereInput[]
    id?: IntFilter<"TheatreTag"> | number
    theatre_id?: IntFilter<"TheatreTag"> | number
    tag_name?: StringFilter<"TheatreTag"> | string
    created_at?: DateTimeFilter<"TheatreTag"> | Date | string
  }

  export type EventUpsertWithWhereUniqueWithoutTheatreInput = {
    where: EventWhereUniqueInput
    update: XOR<EventUpdateWithoutTheatreInput, EventUncheckedUpdateWithoutTheatreInput>
    create: XOR<EventCreateWithoutTheatreInput, EventUncheckedCreateWithoutTheatreInput>
  }

  export type EventUpdateWithWhereUniqueWithoutTheatreInput = {
    where: EventWhereUniqueInput
    data: XOR<EventUpdateWithoutTheatreInput, EventUncheckedUpdateWithoutTheatreInput>
  }

  export type EventUpdateManyWithWhereWithoutTheatreInput = {
    where: EventScalarWhereInput
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyWithoutTheatreInput>
  }

  export type EventScalarWhereInput = {
    AND?: EventScalarWhereInput | EventScalarWhereInput[]
    OR?: EventScalarWhereInput[]
    NOT?: EventScalarWhereInput | EventScalarWhereInput[]
    id?: IntFilter<"Event"> | number
    title?: StringFilter<"Event"> | string
    theatre_id?: IntFilter<"Event"> | number
    venue_id?: IntNullableFilter<"Event"> | number | null
    event_type?: EnumEventTypeFilter<"Event"> | $Enums.EventType
    event_date?: DateTimeFilter<"Event"> | Date | string
    event_time?: DateTimeFilter<"Event"> | Date | string
    description?: StringNullableFilter<"Event"> | string | null
    price?: DecimalFilter<"Event"> | Decimal | DecimalJsLike | number | string
    image_url?: StringNullableFilter<"Event"> | string | null
    poster_url?: StringNullableFilter<"Event"> | string | null
    language?: StringNullableFilter<"Event"> | string | null
    content_language?: StringFilter<"Event"> | string
    translation_group?: StringNullableFilter<"Event"> | string | null
    genre?: StringNullableFilter<"Event"> | string | null
    company?: StringNullableListFilter<"Event">
    director?: StringNullableFilter<"Event"> | string | null
    cast?: StringNullableListFilter<"Event">
    synopsis?: StringNullableFilter<"Event"> | string | null
    subtitles?: StringNullableFilter<"Event"> | string | null
    duration?: StringNullableFilter<"Event"> | string | null
    is_featured?: BoolFilter<"Event"> | boolean
    created_at?: DateTimeFilter<"Event"> | Date | string
    updated_at?: DateTimeFilter<"Event"> | Date | string
  }

  export type TheatreCreateWithoutImagesInput = {
    name: string
    city: string
    country: string
    description?: string | null
    history?: string | null
    website?: string | null
    founded_year?: number | null
    content_language?: string
    translation_group?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    tags?: TheatreTagCreateNestedManyWithoutTheatreInput
    events?: EventCreateNestedManyWithoutTheatreInput
  }

  export type TheatreUncheckedCreateWithoutImagesInput = {
    id?: number
    name: string
    city: string
    country: string
    description?: string | null
    history?: string | null
    website?: string | null
    founded_year?: number | null
    content_language?: string
    translation_group?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    tags?: TheatreTagUncheckedCreateNestedManyWithoutTheatreInput
    events?: EventUncheckedCreateNestedManyWithoutTheatreInput
  }

  export type TheatreCreateOrConnectWithoutImagesInput = {
    where: TheatreWhereUniqueInput
    create: XOR<TheatreCreateWithoutImagesInput, TheatreUncheckedCreateWithoutImagesInput>
  }

  export type TheatreUpsertWithoutImagesInput = {
    update: XOR<TheatreUpdateWithoutImagesInput, TheatreUncheckedUpdateWithoutImagesInput>
    create: XOR<TheatreCreateWithoutImagesInput, TheatreUncheckedCreateWithoutImagesInput>
    where?: TheatreWhereInput
  }

  export type TheatreUpdateToOneWithWhereWithoutImagesInput = {
    where?: TheatreWhereInput
    data: XOR<TheatreUpdateWithoutImagesInput, TheatreUncheckedUpdateWithoutImagesInput>
  }

  export type TheatreUpdateWithoutImagesInput = {
    name?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    history?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    founded_year?: NullableIntFieldUpdateOperationsInput | number | null
    content_language?: StringFieldUpdateOperationsInput | string
    translation_group?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: TheatreTagUpdateManyWithoutTheatreNestedInput
    events?: EventUpdateManyWithoutTheatreNestedInput
  }

  export type TheatreUncheckedUpdateWithoutImagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    history?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    founded_year?: NullableIntFieldUpdateOperationsInput | number | null
    content_language?: StringFieldUpdateOperationsInput | string
    translation_group?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: TheatreTagUncheckedUpdateManyWithoutTheatreNestedInput
    events?: EventUncheckedUpdateManyWithoutTheatreNestedInput
  }

  export type TheatreCreateWithoutTagsInput = {
    name: string
    city: string
    country: string
    description?: string | null
    history?: string | null
    website?: string | null
    founded_year?: number | null
    content_language?: string
    translation_group?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    images?: TheatreImageCreateNestedManyWithoutTheatreInput
    events?: EventCreateNestedManyWithoutTheatreInput
  }

  export type TheatreUncheckedCreateWithoutTagsInput = {
    id?: number
    name: string
    city: string
    country: string
    description?: string | null
    history?: string | null
    website?: string | null
    founded_year?: number | null
    content_language?: string
    translation_group?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    images?: TheatreImageUncheckedCreateNestedManyWithoutTheatreInput
    events?: EventUncheckedCreateNestedManyWithoutTheatreInput
  }

  export type TheatreCreateOrConnectWithoutTagsInput = {
    where: TheatreWhereUniqueInput
    create: XOR<TheatreCreateWithoutTagsInput, TheatreUncheckedCreateWithoutTagsInput>
  }

  export type TheatreUpsertWithoutTagsInput = {
    update: XOR<TheatreUpdateWithoutTagsInput, TheatreUncheckedUpdateWithoutTagsInput>
    create: XOR<TheatreCreateWithoutTagsInput, TheatreUncheckedCreateWithoutTagsInput>
    where?: TheatreWhereInput
  }

  export type TheatreUpdateToOneWithWhereWithoutTagsInput = {
    where?: TheatreWhereInput
    data: XOR<TheatreUpdateWithoutTagsInput, TheatreUncheckedUpdateWithoutTagsInput>
  }

  export type TheatreUpdateWithoutTagsInput = {
    name?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    history?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    founded_year?: NullableIntFieldUpdateOperationsInput | number | null
    content_language?: StringFieldUpdateOperationsInput | string
    translation_group?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: TheatreImageUpdateManyWithoutTheatreNestedInput
    events?: EventUpdateManyWithoutTheatreNestedInput
  }

  export type TheatreUncheckedUpdateWithoutTagsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    history?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    founded_year?: NullableIntFieldUpdateOperationsInput | number | null
    content_language?: StringFieldUpdateOperationsInput | string
    translation_group?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: TheatreImageUncheckedUpdateManyWithoutTheatreNestedInput
    events?: EventUncheckedUpdateManyWithoutTheatreNestedInput
  }

  export type VenueSectionCreateWithoutVenueInput = {
    section_name: string
    section_type: $Enums.SectionType
    created_at?: Date | string
    seats?: SeatCreateNestedManyWithoutVenueSectionInput
  }

  export type VenueSectionUncheckedCreateWithoutVenueInput = {
    id?: number
    section_name: string
    section_type: $Enums.SectionType
    created_at?: Date | string
    seats?: SeatUncheckedCreateNestedManyWithoutVenueSectionInput
  }

  export type VenueSectionCreateOrConnectWithoutVenueInput = {
    where: VenueSectionWhereUniqueInput
    create: XOR<VenueSectionCreateWithoutVenueInput, VenueSectionUncheckedCreateWithoutVenueInput>
  }

  export type VenueSectionCreateManyVenueInputEnvelope = {
    data: VenueSectionCreateManyVenueInput | VenueSectionCreateManyVenueInput[]
    skipDuplicates?: boolean
  }

  export type EventCreateWithoutVenueInput = {
    title: string
    event_type: $Enums.EventType
    event_date: Date | string
    event_time: Date | string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    image_url?: string | null
    poster_url?: string | null
    language?: string | null
    content_language?: string
    translation_group?: string | null
    genre?: string | null
    company?: EventCreatecompanyInput | string[]
    director?: string | null
    cast?: EventCreatecastInput | string[]
    synopsis?: string | null
    subtitles?: string | null
    duration?: string | null
    is_featured?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    theatre: TheatreCreateNestedOneWithoutEventsInput
    bookings?: BookingCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutVenueInput = {
    id?: number
    title: string
    theatre_id: number
    event_type: $Enums.EventType
    event_date: Date | string
    event_time: Date | string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    image_url?: string | null
    poster_url?: string | null
    language?: string | null
    content_language?: string
    translation_group?: string | null
    genre?: string | null
    company?: EventCreatecompanyInput | string[]
    director?: string | null
    cast?: EventCreatecastInput | string[]
    synopsis?: string | null
    subtitles?: string | null
    duration?: string | null
    is_featured?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutVenueInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutVenueInput, EventUncheckedCreateWithoutVenueInput>
  }

  export type EventCreateManyVenueInputEnvelope = {
    data: EventCreateManyVenueInput | EventCreateManyVenueInput[]
    skipDuplicates?: boolean
  }

  export type VenueSectionUpsertWithWhereUniqueWithoutVenueInput = {
    where: VenueSectionWhereUniqueInput
    update: XOR<VenueSectionUpdateWithoutVenueInput, VenueSectionUncheckedUpdateWithoutVenueInput>
    create: XOR<VenueSectionCreateWithoutVenueInput, VenueSectionUncheckedCreateWithoutVenueInput>
  }

  export type VenueSectionUpdateWithWhereUniqueWithoutVenueInput = {
    where: VenueSectionWhereUniqueInput
    data: XOR<VenueSectionUpdateWithoutVenueInput, VenueSectionUncheckedUpdateWithoutVenueInput>
  }

  export type VenueSectionUpdateManyWithWhereWithoutVenueInput = {
    where: VenueSectionScalarWhereInput
    data: XOR<VenueSectionUpdateManyMutationInput, VenueSectionUncheckedUpdateManyWithoutVenueInput>
  }

  export type VenueSectionScalarWhereInput = {
    AND?: VenueSectionScalarWhereInput | VenueSectionScalarWhereInput[]
    OR?: VenueSectionScalarWhereInput[]
    NOT?: VenueSectionScalarWhereInput | VenueSectionScalarWhereInput[]
    id?: IntFilter<"VenueSection"> | number
    venue_id?: IntFilter<"VenueSection"> | number
    section_name?: StringFilter<"VenueSection"> | string
    section_type?: EnumSectionTypeFilter<"VenueSection"> | $Enums.SectionType
    created_at?: DateTimeFilter<"VenueSection"> | Date | string
  }

  export type EventUpsertWithWhereUniqueWithoutVenueInput = {
    where: EventWhereUniqueInput
    update: XOR<EventUpdateWithoutVenueInput, EventUncheckedUpdateWithoutVenueInput>
    create: XOR<EventCreateWithoutVenueInput, EventUncheckedCreateWithoutVenueInput>
  }

  export type EventUpdateWithWhereUniqueWithoutVenueInput = {
    where: EventWhereUniqueInput
    data: XOR<EventUpdateWithoutVenueInput, EventUncheckedUpdateWithoutVenueInput>
  }

  export type EventUpdateManyWithWhereWithoutVenueInput = {
    where: EventScalarWhereInput
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyWithoutVenueInput>
  }

  export type VenueCreateWithoutSectionsInput = {
    name: string
    description?: string | null
    address?: string | null
    city?: string | null
    capacity: number
    image_url?: string | null
    created_at?: Date | string
    events?: EventCreateNestedManyWithoutVenueInput
  }

  export type VenueUncheckedCreateWithoutSectionsInput = {
    id?: number
    name: string
    description?: string | null
    address?: string | null
    city?: string | null
    capacity: number
    image_url?: string | null
    created_at?: Date | string
    events?: EventUncheckedCreateNestedManyWithoutVenueInput
  }

  export type VenueCreateOrConnectWithoutSectionsInput = {
    where: VenueWhereUniqueInput
    create: XOR<VenueCreateWithoutSectionsInput, VenueUncheckedCreateWithoutSectionsInput>
  }

  export type SeatCreateWithoutVenueSectionInput = {
    row_number: number
    seat_number: number
    is_available?: boolean
    is_accessible?: boolean
    created_at?: Date | string
    booked_seats?: BookedSeatCreateNestedManyWithoutSeatInput
  }

  export type SeatUncheckedCreateWithoutVenueSectionInput = {
    id?: number
    row_number: number
    seat_number: number
    is_available?: boolean
    is_accessible?: boolean
    created_at?: Date | string
    booked_seats?: BookedSeatUncheckedCreateNestedManyWithoutSeatInput
  }

  export type SeatCreateOrConnectWithoutVenueSectionInput = {
    where: SeatWhereUniqueInput
    create: XOR<SeatCreateWithoutVenueSectionInput, SeatUncheckedCreateWithoutVenueSectionInput>
  }

  export type SeatCreateManyVenueSectionInputEnvelope = {
    data: SeatCreateManyVenueSectionInput | SeatCreateManyVenueSectionInput[]
    skipDuplicates?: boolean
  }

  export type VenueUpsertWithoutSectionsInput = {
    update: XOR<VenueUpdateWithoutSectionsInput, VenueUncheckedUpdateWithoutSectionsInput>
    create: XOR<VenueCreateWithoutSectionsInput, VenueUncheckedCreateWithoutSectionsInput>
    where?: VenueWhereInput
  }

  export type VenueUpdateToOneWithWhereWithoutSectionsInput = {
    where?: VenueWhereInput
    data: XOR<VenueUpdateWithoutSectionsInput, VenueUncheckedUpdateWithoutSectionsInput>
  }

  export type VenueUpdateWithoutSectionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: IntFieldUpdateOperationsInput | number
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUpdateManyWithoutVenueNestedInput
  }

  export type VenueUncheckedUpdateWithoutSectionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: IntFieldUpdateOperationsInput | number
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUncheckedUpdateManyWithoutVenueNestedInput
  }

  export type SeatUpsertWithWhereUniqueWithoutVenueSectionInput = {
    where: SeatWhereUniqueInput
    update: XOR<SeatUpdateWithoutVenueSectionInput, SeatUncheckedUpdateWithoutVenueSectionInput>
    create: XOR<SeatCreateWithoutVenueSectionInput, SeatUncheckedCreateWithoutVenueSectionInput>
  }

  export type SeatUpdateWithWhereUniqueWithoutVenueSectionInput = {
    where: SeatWhereUniqueInput
    data: XOR<SeatUpdateWithoutVenueSectionInput, SeatUncheckedUpdateWithoutVenueSectionInput>
  }

  export type SeatUpdateManyWithWhereWithoutVenueSectionInput = {
    where: SeatScalarWhereInput
    data: XOR<SeatUpdateManyMutationInput, SeatUncheckedUpdateManyWithoutVenueSectionInput>
  }

  export type SeatScalarWhereInput = {
    AND?: SeatScalarWhereInput | SeatScalarWhereInput[]
    OR?: SeatScalarWhereInput[]
    NOT?: SeatScalarWhereInput | SeatScalarWhereInput[]
    id?: IntFilter<"Seat"> | number
    venue_section_id?: IntFilter<"Seat"> | number
    row_number?: IntFilter<"Seat"> | number
    seat_number?: IntFilter<"Seat"> | number
    is_available?: BoolFilter<"Seat"> | boolean
    is_accessible?: BoolFilter<"Seat"> | boolean
    created_at?: DateTimeFilter<"Seat"> | Date | string
  }

  export type VenueSectionCreateWithoutSeatsInput = {
    section_name: string
    section_type: $Enums.SectionType
    created_at?: Date | string
    venue: VenueCreateNestedOneWithoutSectionsInput
  }

  export type VenueSectionUncheckedCreateWithoutSeatsInput = {
    id?: number
    venue_id: number
    section_name: string
    section_type: $Enums.SectionType
    created_at?: Date | string
  }

  export type VenueSectionCreateOrConnectWithoutSeatsInput = {
    where: VenueSectionWhereUniqueInput
    create: XOR<VenueSectionCreateWithoutSeatsInput, VenueSectionUncheckedCreateWithoutSeatsInput>
  }

  export type BookedSeatCreateWithoutSeatInput = {
    created_at?: Date | string
    booking: BookingCreateNestedOneWithoutBooked_seatsInput
  }

  export type BookedSeatUncheckedCreateWithoutSeatInput = {
    id?: number
    booking_id: number
    created_at?: Date | string
  }

  export type BookedSeatCreateOrConnectWithoutSeatInput = {
    where: BookedSeatWhereUniqueInput
    create: XOR<BookedSeatCreateWithoutSeatInput, BookedSeatUncheckedCreateWithoutSeatInput>
  }

  export type BookedSeatCreateManySeatInputEnvelope = {
    data: BookedSeatCreateManySeatInput | BookedSeatCreateManySeatInput[]
    skipDuplicates?: boolean
  }

  export type VenueSectionUpsertWithoutSeatsInput = {
    update: XOR<VenueSectionUpdateWithoutSeatsInput, VenueSectionUncheckedUpdateWithoutSeatsInput>
    create: XOR<VenueSectionCreateWithoutSeatsInput, VenueSectionUncheckedCreateWithoutSeatsInput>
    where?: VenueSectionWhereInput
  }

  export type VenueSectionUpdateToOneWithWhereWithoutSeatsInput = {
    where?: VenueSectionWhereInput
    data: XOR<VenueSectionUpdateWithoutSeatsInput, VenueSectionUncheckedUpdateWithoutSeatsInput>
  }

  export type VenueSectionUpdateWithoutSeatsInput = {
    section_name?: StringFieldUpdateOperationsInput | string
    section_type?: EnumSectionTypeFieldUpdateOperationsInput | $Enums.SectionType
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    venue?: VenueUpdateOneRequiredWithoutSectionsNestedInput
  }

  export type VenueSectionUncheckedUpdateWithoutSeatsInput = {
    id?: IntFieldUpdateOperationsInput | number
    venue_id?: IntFieldUpdateOperationsInput | number
    section_name?: StringFieldUpdateOperationsInput | string
    section_type?: EnumSectionTypeFieldUpdateOperationsInput | $Enums.SectionType
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookedSeatUpsertWithWhereUniqueWithoutSeatInput = {
    where: BookedSeatWhereUniqueInput
    update: XOR<BookedSeatUpdateWithoutSeatInput, BookedSeatUncheckedUpdateWithoutSeatInput>
    create: XOR<BookedSeatCreateWithoutSeatInput, BookedSeatUncheckedCreateWithoutSeatInput>
  }

  export type BookedSeatUpdateWithWhereUniqueWithoutSeatInput = {
    where: BookedSeatWhereUniqueInput
    data: XOR<BookedSeatUpdateWithoutSeatInput, BookedSeatUncheckedUpdateWithoutSeatInput>
  }

  export type BookedSeatUpdateManyWithWhereWithoutSeatInput = {
    where: BookedSeatScalarWhereInput
    data: XOR<BookedSeatUpdateManyMutationInput, BookedSeatUncheckedUpdateManyWithoutSeatInput>
  }

  export type BookedSeatScalarWhereInput = {
    AND?: BookedSeatScalarWhereInput | BookedSeatScalarWhereInput[]
    OR?: BookedSeatScalarWhereInput[]
    NOT?: BookedSeatScalarWhereInput | BookedSeatScalarWhereInput[]
    id?: IntFilter<"BookedSeat"> | number
    booking_id?: IntFilter<"BookedSeat"> | number
    seat_id?: IntFilter<"BookedSeat"> | number
    created_at?: DateTimeFilter<"BookedSeat"> | Date | string
  }

  export type TheatreCreateWithoutEventsInput = {
    name: string
    city: string
    country: string
    description?: string | null
    history?: string | null
    website?: string | null
    founded_year?: number | null
    content_language?: string
    translation_group?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    images?: TheatreImageCreateNestedManyWithoutTheatreInput
    tags?: TheatreTagCreateNestedManyWithoutTheatreInput
  }

  export type TheatreUncheckedCreateWithoutEventsInput = {
    id?: number
    name: string
    city: string
    country: string
    description?: string | null
    history?: string | null
    website?: string | null
    founded_year?: number | null
    content_language?: string
    translation_group?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    images?: TheatreImageUncheckedCreateNestedManyWithoutTheatreInput
    tags?: TheatreTagUncheckedCreateNestedManyWithoutTheatreInput
  }

  export type TheatreCreateOrConnectWithoutEventsInput = {
    where: TheatreWhereUniqueInput
    create: XOR<TheatreCreateWithoutEventsInput, TheatreUncheckedCreateWithoutEventsInput>
  }

  export type VenueCreateWithoutEventsInput = {
    name: string
    description?: string | null
    address?: string | null
    city?: string | null
    capacity: number
    image_url?: string | null
    created_at?: Date | string
    sections?: VenueSectionCreateNestedManyWithoutVenueInput
  }

  export type VenueUncheckedCreateWithoutEventsInput = {
    id?: number
    name: string
    description?: string | null
    address?: string | null
    city?: string | null
    capacity: number
    image_url?: string | null
    created_at?: Date | string
    sections?: VenueSectionUncheckedCreateNestedManyWithoutVenueInput
  }

  export type VenueCreateOrConnectWithoutEventsInput = {
    where: VenueWhereUniqueInput
    create: XOR<VenueCreateWithoutEventsInput, VenueUncheckedCreateWithoutEventsInput>
  }

  export type BookingCreateWithoutEventInput = {
    booking_reference: string
    total_amount: Decimal | DecimalJsLike | number | string
    booking_status?: $Enums.BookingStatus
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutBookingsInput
    booked_seats?: BookedSeatCreateNestedManyWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutEventInput = {
    id?: number
    user_id: number
    booking_reference: string
    total_amount: Decimal | DecimalJsLike | number | string
    booking_status?: $Enums.BookingStatus
    created_at?: Date | string
    updated_at?: Date | string
    booked_seats?: BookedSeatUncheckedCreateNestedManyWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutEventInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutEventInput, BookingUncheckedCreateWithoutEventInput>
  }

  export type BookingCreateManyEventInputEnvelope = {
    data: BookingCreateManyEventInput | BookingCreateManyEventInput[]
    skipDuplicates?: boolean
  }

  export type TheatreUpsertWithoutEventsInput = {
    update: XOR<TheatreUpdateWithoutEventsInput, TheatreUncheckedUpdateWithoutEventsInput>
    create: XOR<TheatreCreateWithoutEventsInput, TheatreUncheckedCreateWithoutEventsInput>
    where?: TheatreWhereInput
  }

  export type TheatreUpdateToOneWithWhereWithoutEventsInput = {
    where?: TheatreWhereInput
    data: XOR<TheatreUpdateWithoutEventsInput, TheatreUncheckedUpdateWithoutEventsInput>
  }

  export type TheatreUpdateWithoutEventsInput = {
    name?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    history?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    founded_year?: NullableIntFieldUpdateOperationsInput | number | null
    content_language?: StringFieldUpdateOperationsInput | string
    translation_group?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: TheatreImageUpdateManyWithoutTheatreNestedInput
    tags?: TheatreTagUpdateManyWithoutTheatreNestedInput
  }

  export type TheatreUncheckedUpdateWithoutEventsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    history?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    founded_year?: NullableIntFieldUpdateOperationsInput | number | null
    content_language?: StringFieldUpdateOperationsInput | string
    translation_group?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: TheatreImageUncheckedUpdateManyWithoutTheatreNestedInput
    tags?: TheatreTagUncheckedUpdateManyWithoutTheatreNestedInput
  }

  export type VenueUpsertWithoutEventsInput = {
    update: XOR<VenueUpdateWithoutEventsInput, VenueUncheckedUpdateWithoutEventsInput>
    create: XOR<VenueCreateWithoutEventsInput, VenueUncheckedCreateWithoutEventsInput>
    where?: VenueWhereInput
  }

  export type VenueUpdateToOneWithWhereWithoutEventsInput = {
    where?: VenueWhereInput
    data: XOR<VenueUpdateWithoutEventsInput, VenueUncheckedUpdateWithoutEventsInput>
  }

  export type VenueUpdateWithoutEventsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: IntFieldUpdateOperationsInput | number
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    sections?: VenueSectionUpdateManyWithoutVenueNestedInput
  }

  export type VenueUncheckedUpdateWithoutEventsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: IntFieldUpdateOperationsInput | number
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    sections?: VenueSectionUncheckedUpdateManyWithoutVenueNestedInput
  }

  export type BookingUpsertWithWhereUniqueWithoutEventInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutEventInput, BookingUncheckedUpdateWithoutEventInput>
    create: XOR<BookingCreateWithoutEventInput, BookingUncheckedCreateWithoutEventInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutEventInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutEventInput, BookingUncheckedUpdateWithoutEventInput>
  }

  export type BookingUpdateManyWithWhereWithoutEventInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutEventInput>
  }

  export type UserCreateWithoutBookingsInput = {
    email: string
    password_hash: string
    first_name: string
    last_name: string
    phone?: string | null
    is_admin?: boolean
    email_notifications?: boolean
    marketing_preferences?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserUncheckedCreateWithoutBookingsInput = {
    id?: number
    email: string
    password_hash: string
    first_name: string
    last_name: string
    phone?: string | null
    is_admin?: boolean
    email_notifications?: boolean
    marketing_preferences?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserCreateOrConnectWithoutBookingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBookingsInput, UserUncheckedCreateWithoutBookingsInput>
  }

  export type EventCreateWithoutBookingsInput = {
    title: string
    event_type: $Enums.EventType
    event_date: Date | string
    event_time: Date | string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    image_url?: string | null
    poster_url?: string | null
    language?: string | null
    content_language?: string
    translation_group?: string | null
    genre?: string | null
    company?: EventCreatecompanyInput | string[]
    director?: string | null
    cast?: EventCreatecastInput | string[]
    synopsis?: string | null
    subtitles?: string | null
    duration?: string | null
    is_featured?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    theatre: TheatreCreateNestedOneWithoutEventsInput
    venue?: VenueCreateNestedOneWithoutEventsInput
  }

  export type EventUncheckedCreateWithoutBookingsInput = {
    id?: number
    title: string
    theatre_id: number
    venue_id?: number | null
    event_type: $Enums.EventType
    event_date: Date | string
    event_time: Date | string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    image_url?: string | null
    poster_url?: string | null
    language?: string | null
    content_language?: string
    translation_group?: string | null
    genre?: string | null
    company?: EventCreatecompanyInput | string[]
    director?: string | null
    cast?: EventCreatecastInput | string[]
    synopsis?: string | null
    subtitles?: string | null
    duration?: string | null
    is_featured?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type EventCreateOrConnectWithoutBookingsInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutBookingsInput, EventUncheckedCreateWithoutBookingsInput>
  }

  export type BookedSeatCreateWithoutBookingInput = {
    created_at?: Date | string
    seat: SeatCreateNestedOneWithoutBooked_seatsInput
  }

  export type BookedSeatUncheckedCreateWithoutBookingInput = {
    id?: number
    seat_id: number
    created_at?: Date | string
  }

  export type BookedSeatCreateOrConnectWithoutBookingInput = {
    where: BookedSeatWhereUniqueInput
    create: XOR<BookedSeatCreateWithoutBookingInput, BookedSeatUncheckedCreateWithoutBookingInput>
  }

  export type BookedSeatCreateManyBookingInputEnvelope = {
    data: BookedSeatCreateManyBookingInput | BookedSeatCreateManyBookingInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutBookingsInput = {
    update: XOR<UserUpdateWithoutBookingsInput, UserUncheckedUpdateWithoutBookingsInput>
    create: XOR<UserCreateWithoutBookingsInput, UserUncheckedCreateWithoutBookingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBookingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBookingsInput, UserUncheckedUpdateWithoutBookingsInput>
  }

  export type UserUpdateWithoutBookingsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    is_admin?: BoolFieldUpdateOperationsInput | boolean
    email_notifications?: BoolFieldUpdateOperationsInput | boolean
    marketing_preferences?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutBookingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    is_admin?: BoolFieldUpdateOperationsInput | boolean
    email_notifications?: BoolFieldUpdateOperationsInput | boolean
    marketing_preferences?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventUpsertWithoutBookingsInput = {
    update: XOR<EventUpdateWithoutBookingsInput, EventUncheckedUpdateWithoutBookingsInput>
    create: XOR<EventCreateWithoutBookingsInput, EventUncheckedCreateWithoutBookingsInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutBookingsInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutBookingsInput, EventUncheckedUpdateWithoutBookingsInput>
  }

  export type EventUpdateWithoutBookingsInput = {
    title?: StringFieldUpdateOperationsInput | string
    event_type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    event_date?: DateTimeFieldUpdateOperationsInput | Date | string
    event_time?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    poster_url?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    content_language?: StringFieldUpdateOperationsInput | string
    translation_group?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    company?: EventUpdatecompanyInput | string[]
    director?: NullableStringFieldUpdateOperationsInput | string | null
    cast?: EventUpdatecastInput | string[]
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    subtitles?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    theatre?: TheatreUpdateOneRequiredWithoutEventsNestedInput
    venue?: VenueUpdateOneWithoutEventsNestedInput
  }

  export type EventUncheckedUpdateWithoutBookingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    theatre_id?: IntFieldUpdateOperationsInput | number
    venue_id?: NullableIntFieldUpdateOperationsInput | number | null
    event_type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    event_date?: DateTimeFieldUpdateOperationsInput | Date | string
    event_time?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    poster_url?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    content_language?: StringFieldUpdateOperationsInput | string
    translation_group?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    company?: EventUpdatecompanyInput | string[]
    director?: NullableStringFieldUpdateOperationsInput | string | null
    cast?: EventUpdatecastInput | string[]
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    subtitles?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookedSeatUpsertWithWhereUniqueWithoutBookingInput = {
    where: BookedSeatWhereUniqueInput
    update: XOR<BookedSeatUpdateWithoutBookingInput, BookedSeatUncheckedUpdateWithoutBookingInput>
    create: XOR<BookedSeatCreateWithoutBookingInput, BookedSeatUncheckedCreateWithoutBookingInput>
  }

  export type BookedSeatUpdateWithWhereUniqueWithoutBookingInput = {
    where: BookedSeatWhereUniqueInput
    data: XOR<BookedSeatUpdateWithoutBookingInput, BookedSeatUncheckedUpdateWithoutBookingInput>
  }

  export type BookedSeatUpdateManyWithWhereWithoutBookingInput = {
    where: BookedSeatScalarWhereInput
    data: XOR<BookedSeatUpdateManyMutationInput, BookedSeatUncheckedUpdateManyWithoutBookingInput>
  }

  export type BookingCreateWithoutBooked_seatsInput = {
    booking_reference: string
    total_amount: Decimal | DecimalJsLike | number | string
    booking_status?: $Enums.BookingStatus
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutBookingsInput
    event: EventCreateNestedOneWithoutBookingsInput
  }

  export type BookingUncheckedCreateWithoutBooked_seatsInput = {
    id?: number
    user_id: number
    event_id: number
    booking_reference: string
    total_amount: Decimal | DecimalJsLike | number | string
    booking_status?: $Enums.BookingStatus
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BookingCreateOrConnectWithoutBooked_seatsInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutBooked_seatsInput, BookingUncheckedCreateWithoutBooked_seatsInput>
  }

  export type SeatCreateWithoutBooked_seatsInput = {
    row_number: number
    seat_number: number
    is_available?: boolean
    is_accessible?: boolean
    created_at?: Date | string
    venueSection: VenueSectionCreateNestedOneWithoutSeatsInput
  }

  export type SeatUncheckedCreateWithoutBooked_seatsInput = {
    id?: number
    venue_section_id: number
    row_number: number
    seat_number: number
    is_available?: boolean
    is_accessible?: boolean
    created_at?: Date | string
  }

  export type SeatCreateOrConnectWithoutBooked_seatsInput = {
    where: SeatWhereUniqueInput
    create: XOR<SeatCreateWithoutBooked_seatsInput, SeatUncheckedCreateWithoutBooked_seatsInput>
  }

  export type BookingUpsertWithoutBooked_seatsInput = {
    update: XOR<BookingUpdateWithoutBooked_seatsInput, BookingUncheckedUpdateWithoutBooked_seatsInput>
    create: XOR<BookingCreateWithoutBooked_seatsInput, BookingUncheckedCreateWithoutBooked_seatsInput>
    where?: BookingWhereInput
  }

  export type BookingUpdateToOneWithWhereWithoutBooked_seatsInput = {
    where?: BookingWhereInput
    data: XOR<BookingUpdateWithoutBooked_seatsInput, BookingUncheckedUpdateWithoutBooked_seatsInput>
  }

  export type BookingUpdateWithoutBooked_seatsInput = {
    booking_reference?: StringFieldUpdateOperationsInput | string
    total_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    booking_status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBookingsNestedInput
    event?: EventUpdateOneRequiredWithoutBookingsNestedInput
  }

  export type BookingUncheckedUpdateWithoutBooked_seatsInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    event_id?: IntFieldUpdateOperationsInput | number
    booking_reference?: StringFieldUpdateOperationsInput | string
    total_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    booking_status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SeatUpsertWithoutBooked_seatsInput = {
    update: XOR<SeatUpdateWithoutBooked_seatsInput, SeatUncheckedUpdateWithoutBooked_seatsInput>
    create: XOR<SeatCreateWithoutBooked_seatsInput, SeatUncheckedCreateWithoutBooked_seatsInput>
    where?: SeatWhereInput
  }

  export type SeatUpdateToOneWithWhereWithoutBooked_seatsInput = {
    where?: SeatWhereInput
    data: XOR<SeatUpdateWithoutBooked_seatsInput, SeatUncheckedUpdateWithoutBooked_seatsInput>
  }

  export type SeatUpdateWithoutBooked_seatsInput = {
    row_number?: IntFieldUpdateOperationsInput | number
    seat_number?: IntFieldUpdateOperationsInput | number
    is_available?: BoolFieldUpdateOperationsInput | boolean
    is_accessible?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    venueSection?: VenueSectionUpdateOneRequiredWithoutSeatsNestedInput
  }

  export type SeatUncheckedUpdateWithoutBooked_seatsInput = {
    id?: IntFieldUpdateOperationsInput | number
    venue_section_id?: IntFieldUpdateOperationsInput | number
    row_number?: IntFieldUpdateOperationsInput | number
    seat_number?: IntFieldUpdateOperationsInput | number
    is_available?: BoolFieldUpdateOperationsInput | boolean
    is_accessible?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateManyUserInput = {
    id?: number
    event_id: number
    booking_reference: string
    total_amount: Decimal | DecimalJsLike | number | string
    booking_status?: $Enums.BookingStatus
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BookingUpdateWithoutUserInput = {
    booking_reference?: StringFieldUpdateOperationsInput | string
    total_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    booking_status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUpdateOneRequiredWithoutBookingsNestedInput
    booked_seats?: BookedSeatUpdateManyWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    event_id?: IntFieldUpdateOperationsInput | number
    booking_reference?: StringFieldUpdateOperationsInput | string
    total_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    booking_status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    booked_seats?: BookedSeatUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    event_id?: IntFieldUpdateOperationsInput | number
    booking_reference?: StringFieldUpdateOperationsInput | string
    total_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    booking_status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TheatreImageCreateManyTheatreInput = {
    id?: number
    image_url: string
    caption?: string | null
    is_primary?: boolean
    created_at?: Date | string
  }

  export type TheatreTagCreateManyTheatreInput = {
    id?: number
    tag_name: string
    created_at?: Date | string
  }

  export type EventCreateManyTheatreInput = {
    id?: number
    title: string
    venue_id?: number | null
    event_type: $Enums.EventType
    event_date: Date | string
    event_time: Date | string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    image_url?: string | null
    poster_url?: string | null
    language?: string | null
    content_language?: string
    translation_group?: string | null
    genre?: string | null
    company?: EventCreatecompanyInput | string[]
    director?: string | null
    cast?: EventCreatecastInput | string[]
    synopsis?: string | null
    subtitles?: string | null
    duration?: string | null
    is_featured?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TheatreImageUpdateWithoutTheatreInput = {
    image_url?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    is_primary?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TheatreImageUncheckedUpdateWithoutTheatreInput = {
    id?: IntFieldUpdateOperationsInput | number
    image_url?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    is_primary?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TheatreImageUncheckedUpdateManyWithoutTheatreInput = {
    id?: IntFieldUpdateOperationsInput | number
    image_url?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    is_primary?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TheatreTagUpdateWithoutTheatreInput = {
    tag_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TheatreTagUncheckedUpdateWithoutTheatreInput = {
    id?: IntFieldUpdateOperationsInput | number
    tag_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TheatreTagUncheckedUpdateManyWithoutTheatreInput = {
    id?: IntFieldUpdateOperationsInput | number
    tag_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventUpdateWithoutTheatreInput = {
    title?: StringFieldUpdateOperationsInput | string
    event_type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    event_date?: DateTimeFieldUpdateOperationsInput | Date | string
    event_time?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    poster_url?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    content_language?: StringFieldUpdateOperationsInput | string
    translation_group?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    company?: EventUpdatecompanyInput | string[]
    director?: NullableStringFieldUpdateOperationsInput | string | null
    cast?: EventUpdatecastInput | string[]
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    subtitles?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    venue?: VenueUpdateOneWithoutEventsNestedInput
    bookings?: BookingUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutTheatreInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    venue_id?: NullableIntFieldUpdateOperationsInput | number | null
    event_type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    event_date?: DateTimeFieldUpdateOperationsInput | Date | string
    event_time?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    poster_url?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    content_language?: StringFieldUpdateOperationsInput | string
    translation_group?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    company?: EventUpdatecompanyInput | string[]
    director?: NullableStringFieldUpdateOperationsInput | string | null
    cast?: EventUpdatecastInput | string[]
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    subtitles?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateManyWithoutTheatreInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    venue_id?: NullableIntFieldUpdateOperationsInput | number | null
    event_type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    event_date?: DateTimeFieldUpdateOperationsInput | Date | string
    event_time?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    poster_url?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    content_language?: StringFieldUpdateOperationsInput | string
    translation_group?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    company?: EventUpdatecompanyInput | string[]
    director?: NullableStringFieldUpdateOperationsInput | string | null
    cast?: EventUpdatecastInput | string[]
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    subtitles?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VenueSectionCreateManyVenueInput = {
    id?: number
    section_name: string
    section_type: $Enums.SectionType
    created_at?: Date | string
  }

  export type EventCreateManyVenueInput = {
    id?: number
    title: string
    theatre_id: number
    event_type: $Enums.EventType
    event_date: Date | string
    event_time: Date | string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    image_url?: string | null
    poster_url?: string | null
    language?: string | null
    content_language?: string
    translation_group?: string | null
    genre?: string | null
    company?: EventCreatecompanyInput | string[]
    director?: string | null
    cast?: EventCreatecastInput | string[]
    synopsis?: string | null
    subtitles?: string | null
    duration?: string | null
    is_featured?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type VenueSectionUpdateWithoutVenueInput = {
    section_name?: StringFieldUpdateOperationsInput | string
    section_type?: EnumSectionTypeFieldUpdateOperationsInput | $Enums.SectionType
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    seats?: SeatUpdateManyWithoutVenueSectionNestedInput
  }

  export type VenueSectionUncheckedUpdateWithoutVenueInput = {
    id?: IntFieldUpdateOperationsInput | number
    section_name?: StringFieldUpdateOperationsInput | string
    section_type?: EnumSectionTypeFieldUpdateOperationsInput | $Enums.SectionType
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    seats?: SeatUncheckedUpdateManyWithoutVenueSectionNestedInput
  }

  export type VenueSectionUncheckedUpdateManyWithoutVenueInput = {
    id?: IntFieldUpdateOperationsInput | number
    section_name?: StringFieldUpdateOperationsInput | string
    section_type?: EnumSectionTypeFieldUpdateOperationsInput | $Enums.SectionType
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventUpdateWithoutVenueInput = {
    title?: StringFieldUpdateOperationsInput | string
    event_type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    event_date?: DateTimeFieldUpdateOperationsInput | Date | string
    event_time?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    poster_url?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    content_language?: StringFieldUpdateOperationsInput | string
    translation_group?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    company?: EventUpdatecompanyInput | string[]
    director?: NullableStringFieldUpdateOperationsInput | string | null
    cast?: EventUpdatecastInput | string[]
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    subtitles?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    theatre?: TheatreUpdateOneRequiredWithoutEventsNestedInput
    bookings?: BookingUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutVenueInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    theatre_id?: IntFieldUpdateOperationsInput | number
    event_type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    event_date?: DateTimeFieldUpdateOperationsInput | Date | string
    event_time?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    poster_url?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    content_language?: StringFieldUpdateOperationsInput | string
    translation_group?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    company?: EventUpdatecompanyInput | string[]
    director?: NullableStringFieldUpdateOperationsInput | string | null
    cast?: EventUpdatecastInput | string[]
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    subtitles?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateManyWithoutVenueInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    theatre_id?: IntFieldUpdateOperationsInput | number
    event_type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    event_date?: DateTimeFieldUpdateOperationsInput | Date | string
    event_time?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    poster_url?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    content_language?: StringFieldUpdateOperationsInput | string
    translation_group?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    company?: EventUpdatecompanyInput | string[]
    director?: NullableStringFieldUpdateOperationsInput | string | null
    cast?: EventUpdatecastInput | string[]
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    subtitles?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SeatCreateManyVenueSectionInput = {
    id?: number
    row_number: number
    seat_number: number
    is_available?: boolean
    is_accessible?: boolean
    created_at?: Date | string
  }

  export type SeatUpdateWithoutVenueSectionInput = {
    row_number?: IntFieldUpdateOperationsInput | number
    seat_number?: IntFieldUpdateOperationsInput | number
    is_available?: BoolFieldUpdateOperationsInput | boolean
    is_accessible?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    booked_seats?: BookedSeatUpdateManyWithoutSeatNestedInput
  }

  export type SeatUncheckedUpdateWithoutVenueSectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    row_number?: IntFieldUpdateOperationsInput | number
    seat_number?: IntFieldUpdateOperationsInput | number
    is_available?: BoolFieldUpdateOperationsInput | boolean
    is_accessible?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    booked_seats?: BookedSeatUncheckedUpdateManyWithoutSeatNestedInput
  }

  export type SeatUncheckedUpdateManyWithoutVenueSectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    row_number?: IntFieldUpdateOperationsInput | number
    seat_number?: IntFieldUpdateOperationsInput | number
    is_available?: BoolFieldUpdateOperationsInput | boolean
    is_accessible?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookedSeatCreateManySeatInput = {
    id?: number
    booking_id: number
    created_at?: Date | string
  }

  export type BookedSeatUpdateWithoutSeatInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: BookingUpdateOneRequiredWithoutBooked_seatsNestedInput
  }

  export type BookedSeatUncheckedUpdateWithoutSeatInput = {
    id?: IntFieldUpdateOperationsInput | number
    booking_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookedSeatUncheckedUpdateManyWithoutSeatInput = {
    id?: IntFieldUpdateOperationsInput | number
    booking_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateManyEventInput = {
    id?: number
    user_id: number
    booking_reference: string
    total_amount: Decimal | DecimalJsLike | number | string
    booking_status?: $Enums.BookingStatus
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BookingUpdateWithoutEventInput = {
    booking_reference?: StringFieldUpdateOperationsInput | string
    total_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    booking_status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBookingsNestedInput
    booked_seats?: BookedSeatUpdateManyWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutEventInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    booking_reference?: StringFieldUpdateOperationsInput | string
    total_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    booking_status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    booked_seats?: BookedSeatUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateManyWithoutEventInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    booking_reference?: StringFieldUpdateOperationsInput | string
    total_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    booking_status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookedSeatCreateManyBookingInput = {
    id?: number
    seat_id: number
    created_at?: Date | string
  }

  export type BookedSeatUpdateWithoutBookingInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    seat?: SeatUpdateOneRequiredWithoutBooked_seatsNestedInput
  }

  export type BookedSeatUncheckedUpdateWithoutBookingInput = {
    id?: IntFieldUpdateOperationsInput | number
    seat_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookedSeatUncheckedUpdateManyWithoutBookingInput = {
    id?: IntFieldUpdateOperationsInput | number
    seat_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}